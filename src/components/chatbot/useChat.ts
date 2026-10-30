import { useState, useCallback, useRef } from 'react';
import { ChatMessage, Conversation } from './types';

// ─── System prompt ────────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are SkillBot, an expert AI coding assistant and personal programming tutor for SkillHub — a modern online learning platform for developers.

Your role:
- Teach programming languages: Python, Java, C, C++, JavaScript, HTML/CSS, and more.
- Explain programming concepts with simple, beginner-friendly language and practical examples.
- Generate clean, well-commented code based on user requirements.
- Debug code and identify errors with clear explanations.
- Explain code line by line when requested.
- Solve programming challenges with hints before full solutions when appropriate.
- Help with data structures and algorithms.
- Prepare users for technical interviews (theory + coding questions).
- Generate quizzes and practice questions.
- Recommend learning paths based on skill level.
- Answer questions about the SkillHub platform features.

Behavior guidelines:
- Always use proper Markdown formatting. Wrap all code in fenced code blocks with the language specified, e.g. \`\`\`python ... \`\`\`.
- Explain concepts step-by-step when asked.
- Give hints before full solutions for practice problems.
- Ask clarifying questions when a problem is vague.
- Adapt explanations to the user's stated skill level (beginner / intermediate / advanced).
- Stay focused on programming, technology, career development, and SkillHub-related topics.
- If asked about something unrelated, politely redirect to programming topics.
- Keep answers concise but complete — do not over-explain unless asked.`;

// ─── Helper to generate IDs ───────────────────────────────────────────────────
function genId(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function createConversation(): Conversation {
  const now = new Date();
  return {
    id: genId(),
    title: 'New Conversation',
    messages: [],
    createdAt: now,
    updatedAt: now,
  };
}

// ─── API call ─────────────────────────────────────────────────────────────────
async function callOpenAI(
  messages: { role: string; content: string }[],
  onChunk: (delta: string) => void,
  signal: AbortSignal
): Promise<void> {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY as string | undefined;

  if (!apiKey) {
    throw new Error('NO_API_KEY');
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
      stream: true,
      max_tokens: 2048,
      temperature: 0.7,
    }),
    signal,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    if (response.status === 429) throw new Error('RATE_LIMIT');
    if (response.status === 401) throw new Error('INVALID_API_KEY');
    throw new Error(error?.error?.message || 'API_ERROR');
  }

  const reader = response.body?.getReader();
  if (!reader) throw new Error('NO_STREAM');

  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() || '';

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed === 'data: [DONE]') continue;
      if (!trimmed.startsWith('data: ')) continue;

      try {
        const json = JSON.parse(trimmed.slice(6));
        const delta = json.choices?.[0]?.delta?.content;
        if (delta) onChunk(delta);
      } catch {
        // ignore parse errors for partial chunks
      }
    }
  }
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useChat() {
  const [conversation, setConversation] = useState<Conversation>(() => createConversation());
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const sendMessage = useCallback(
    async (userText: string) => {
      if (!userText.trim() || isLoading) return;

      // Build user message
      const userMsg: ChatMessage = {
        id: genId(),
        role: 'user',
        content: userText.trim(),
        timestamp: new Date(),
      };

      // Placeholder streaming assistant message
      const assistantId = genId();
      const assistantMsg: ChatMessage = {
        id: assistantId,
        role: 'assistant',
        content: '',
        timestamp: new Date(),
        isStreaming: true,
      };

      setConversation(prev => ({
        ...prev,
        messages: [...prev.messages, userMsg, assistantMsg],
        updatedAt: new Date(),
        title:
          prev.messages.length === 0
            ? userText.slice(0, 40) + (userText.length > 40 ? '…' : '')
            : prev.title,
      }));

      setIsLoading(true);
      setError(null);

      // Build API message history (exclude streaming placeholder)
      const history = conversation.messages
        .concat(userMsg)
        .map(m => ({ role: m.role as string, content: m.content }));

      abortRef.current = new AbortController();

      try {
        await callOpenAI(
          history,
          (delta) => {
            setConversation(prev => ({
              ...prev,
              messages: prev.messages.map(m =>
                m.id === assistantId
                  ? { ...m, content: m.content + delta }
                  : m
              ),
            }));
          },
          abortRef.current.signal
        );

        // Mark streaming done
        setConversation(prev => ({
          ...prev,
          messages: prev.messages.map(m =>
            m.id === assistantId ? { ...m, isStreaming: false } : m
          ),
          updatedAt: new Date(),
        }));
      } catch (err) {
        const e = err as Error;
        if (e.name === 'AbortError') return;

        let msg = '⚠️ Something went wrong. Please try again.';
        if (e.message === 'NO_API_KEY') {
          msg =
            '🔑 No API key configured. Please add **VITE_OPENAI_API_KEY** to your `.env` file to enable AI responses.';
        } else if (e.message === 'RATE_LIMIT') {
          msg = '⏳ Rate limit reached. Please wait a moment before sending another message.';
        } else if (e.message === 'INVALID_API_KEY') {
          msg = '🔑 Invalid API key. Please check your **VITE_OPENAI_API_KEY** in the `.env` file.';
        }

        setConversation(prev => ({
          ...prev,
          messages: prev.messages.map(m =>
            m.id === assistantId
              ? { ...m, content: msg, isStreaming: false }
              : m
          ),
        }));
        setError(msg);
      } finally {
        setIsLoading(false);
      }
    },
    [conversation.messages, isLoading]
  );

  const clearChat = useCallback(() => {
    if (conversation.messages.length > 0) {
      setConversations(prev => [conversation, ...prev.slice(0, 19)]);
    }
    setConversation(createConversation());
    setError(null);
  }, [conversation]);

  const stopGeneration = useCallback(() => {
    abortRef.current?.abort();
    setIsLoading(false);
    setConversation(prev => ({
      ...prev,
      messages: prev.messages.map(m =>
        m.isStreaming ? { ...m, isStreaming: false } : m
      ),
    }));
  }, []);

  const loadConversation = useCallback((conv: Conversation) => {
    if (conversation.messages.length > 0) {
      setConversations(prev => {
        const filtered = prev.filter(c => c.id !== conv.id);
        return [conversation, ...filtered];
      });
    }
    setConversation(conv);
  }, [conversation]);

  return {
    conversation,
    conversations,
    isLoading,
    error,
    sendMessage,
    clearChat,
    stopGeneration,
    loadConversation,
  };
}
