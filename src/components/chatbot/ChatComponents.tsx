import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChatMessage as ChatMessageType } from './types';
import { cn } from '../ui';

// ─── Tiny markdown renderer ───────────────────────────────────────────────────
// Renders: code blocks, inline code, bold, italic, lists, headings, links

interface CodeBlockProps {
  code: string;
  language: string;
}

function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  }, [code]);

  return (
    <div className="my-3 rounded-xl overflow-hidden border border-white/[0.08] bg-surface-800">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-surface-700 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
          {language && (
            <span className="ml-2 text-xs text-gray-400 font-mono font-medium">{language}</span>
          )}
        </div>
        <button
          onClick={copy}
          className={cn(
            'flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all duration-200',
            copied
              ? 'bg-success-500/20 text-success-500'
              : 'bg-surface-600 text-gray-400 hover:text-white hover:bg-surface-500'
          )}
        >
          {copied ? (
            <>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>
      {/* Code */}
      <pre className="p-4 overflow-x-auto text-sm font-mono text-gray-200 leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}

// Simple markdown parser - converts markdown to React elements
function renderMarkdown(text: string): React.ReactNode[] {
  const elements: React.ReactNode[] = [];
  const lines = text.split('\n');
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Fenced code block
    if (line.trimStart().startsWith('```')) {
      const lang = line.trim().slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      elements.push(
        <CodeBlock key={`code-${i}`} code={codeLines.join('\n')} language={lang} />
      );
      i++;
      continue;
    }

    // Headings
    const headingMatch = line.match(/^(#{1,3})\s+(.+)/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const headingText = headingMatch[2];
      const classes = level === 1 ? 'text-lg font-bold text-white mt-3 mb-1' :
                      level === 2 ? 'text-base font-semibold text-white mt-2 mb-1' :
                                   'text-sm font-semibold text-gray-200 mt-2';
      elements.push(
        <div key={`h-${i}`} className={classes}>{inlineMarkdown(headingText)}</div>
      );
      i++;
      continue;
    }

    // Unordered list
    if (line.match(/^[\s]*[-*+]\s/)) {
      const listItems: string[] = [];
      while (i < lines.length && lines[i].match(/^[\s]*[-*+]\s/)) {
        listItems.push(lines[i].replace(/^[\s]*[-*+]\s/, ''));
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`} className="my-2 space-y-1 pl-4">
          {listItems.map((item, idx) => (
            <li key={idx} className="text-sm text-gray-200 flex gap-2">
              <span className="text-brand-400 mt-0.5 flex-shrink-0">•</span>
              <span>{inlineMarkdown(item)}</span>
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Ordered list
    if (line.match(/^[\s]*\d+\.\s/)) {
      const listItems: string[] = [];
      let num = 1;
      while (i < lines.length && lines[i].match(/^[\s]*\d+\.\s/)) {
        listItems.push(lines[i].replace(/^[\s]*\d+\.\s/, ''));
        i++;
        num++;
      }
      elements.push(
        <ol key={`ol-${i}`} className="my-2 space-y-1 pl-4">
          {listItems.map((item, idx) => (
            <li key={idx} className="text-sm text-gray-200 flex gap-2">
              <span className="text-brand-400 font-mono flex-shrink-0">{idx + 1}.</span>
              <span>{inlineMarkdown(item)}</span>
            </li>
          ))}
        </ol>
      );
      num;
      continue;
    }

    // Horizontal rule
    if (line.match(/^[-*_]{3,}$/)) {
      elements.push(<hr key={`hr-${i}`} className="my-3 border-white/10" />);
      i++;
      continue;
    }

    // Blockquote
    if (line.startsWith('> ')) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].startsWith('> ')) {
        quoteLines.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <blockquote key={`bq-${i}`} className="my-2 pl-3 border-l-2 border-brand-500/60 text-gray-300 text-sm italic">
          {quoteLines.join(' ')}
        </blockquote>
      );
      continue;
    }

    // Empty line
    if (line.trim() === '') {
      i++;
      continue;
    }

    // Paragraph
    elements.push(
      <p key={`p-${i}`} className="text-sm text-gray-200 leading-relaxed my-0.5">
        {inlineMarkdown(line)}
      </p>
    );
    i++;
  }

  return elements;
}

function inlineMarkdown(text: string): React.ReactNode {
  // Split on bold, italic, inline code, links
  const parts: React.ReactNode[] = [];
  const regex = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*|__[^_]+__|_[^_]+_|\[([^\]]+)\]\(([^)]+)\))/g;
  let last = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) {
      parts.push(text.slice(last, match.index));
    }

    const m = match[0];

    if (m.startsWith('`')) {
      parts.push(
        <code key={match.index} className="px-1.5 py-0.5 rounded-md bg-surface-600 text-brand-300 font-mono text-[0.8em]">
          {m.slice(1, -1)}
        </code>
      );
    } else if (m.startsWith('**') || m.startsWith('__')) {
      parts.push(
        <strong key={match.index} className="font-semibold text-white">
          {m.slice(2, -2)}
        </strong>
      );
    } else if (m.startsWith('*') || m.startsWith('_')) {
      parts.push(
        <em key={match.index} className="italic text-gray-300">
          {m.slice(1, -1)}
        </em>
      );
    } else if (m.startsWith('[')) {
      parts.push(
        <a
          key={match.index}
          href={match[3]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-400 hover:text-brand-300 underline underline-offset-2"
        >
          {match[2]}
        </a>
      );
    }

    last = match.index + m.length;
  }

  if (last < text.length) {
    parts.push(text.slice(last));
  }

  return parts.length === 1 && typeof parts[0] === 'string' ? parts[0] : <>{parts}</>;
}

// ─── Typing indicator ─────────────────────────────────────────────────────────
export function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3">
      {[0, 1, 2].map(i => (
        <span
          key={i}
          className="w-2 h-2 rounded-full bg-brand-400 animate-bounce"
          style={{ animationDelay: `${i * 0.15}s`, animationDuration: '0.9s' }}
        />
      ))}
    </div>
  );
}

// ─── Chat message ─────────────────────────────────────────────────────────────
interface ChatMessageProps {
  message: ChatMessageType;
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className={cn('flex gap-3 group', isUser && 'flex-row-reverse')}>
      {/* Avatar */}
      <div
        className={cn(
          'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-lg',
          isUser
            ? 'bg-gradient-to-br from-brand-500 to-brand-700 text-white'
            : 'bg-gradient-to-br from-accent-600 to-purple-600 text-white'
        )}
      >
        {isUser ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        )}
      </div>

      {/* Bubble */}
      <div className={cn('flex flex-col max-w-[85%]', isUser && 'items-end')}>
        <div
          className={cn(
            'px-4 py-3 rounded-2xl shadow-sm relative',
            isUser
              ? 'bg-brand-600 text-white rounded-tr-sm'
              : 'bg-surface-600 border border-white/[0.06] text-gray-100 rounded-tl-sm'
          )}
        >
          {isUser ? (
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
          ) : message.isStreaming && message.content === '' ? (
            <TypingIndicator />
          ) : (
            <div className="min-w-0">
              {renderMarkdown(message.content)}
              {message.isStreaming && (
                <span className="inline-block w-1 h-4 bg-brand-400 ml-0.5 animate-pulse rounded-sm align-middle" />
              )}
            </div>
          )}
        </div>

        {/* Timestamp */}
        <span className="text-[10px] text-gray-600 mt-1 px-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {formatTime(message.timestamp)}
        </span>
      </div>
    </div>
  );
}

// ─── Suggested prompts ────────────────────────────────────────────────────────
const SUGGESTED_PROMPTS = [
  { icon: '💡', label: 'Explain a concept', prompt: 'Explain how recursion works in programming with a simple example.' },
  { icon: '🐛', label: 'Debug my code', prompt: 'Help me debug my code. Here is the error I am getting: ' },
  { icon: '🐍', label: 'Teach me Python', prompt: 'I want to learn Python from scratch. Where should I start?' },
  { icon: '⚡', label: 'Coding challenge', prompt: 'Give me a coding challenge to practice arrays and loops.' },
  { icon: '🎯', label: 'Interview prep', prompt: 'Help me prepare for a technical interview. Start with common data structure questions.' },
  { icon: '🗺️', label: 'Learning path', prompt: 'Recommend a learning path for a complete beginner who wants to become a web developer.' },
];

interface SuggestedPromptsProps {
  onSelect: (prompt: string) => void;
}

export function SuggestedPrompts({ onSelect }: SuggestedPromptsProps) {
  return (
    <div className="grid grid-cols-2 gap-2 px-4 py-2">
      {SUGGESTED_PROMPTS.map((item) => (
        <button
          key={item.label}
          onClick={() => onSelect(item.prompt)}
          className="flex items-center gap-2 px-3 py-2.5 bg-surface-600/60 hover:bg-surface-500 border border-white/[0.06] hover:border-brand-500/30 rounded-xl text-left transition-all duration-200 group"
        >
          <span className="text-base flex-shrink-0">{item.icon}</span>
          <span className="text-xs text-gray-300 group-hover:text-white font-medium truncate">
            {item.label}
          </span>
        </button>
      ))}
    </div>
  );
}

// ─── Chat input ───────────────────────────────────────────────────────────────
interface ChatInputProps {
  onSend: (text: string) => void;
  onStop: () => void;
  isLoading: boolean;
  disabled?: boolean;
}

export function ChatInput({ onSend, onStop, isLoading }: ChatInputProps) {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = Math.min(ta.scrollHeight, 120) + 'px';
  };

  useEffect(() => {
    adjustHeight();
  }, [value]);

  const handleSend = () => {
    if (!value.trim() || isLoading) return;
    onSend(value);
    setValue('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-end gap-2 px-4 py-3 bg-surface-700/50 border-t border-white/[0.06]">
      <div className="flex-1 flex items-end gap-2 bg-surface-600 border border-white/10 rounded-2xl px-3 py-2 focus-within:border-brand-500/50 focus-within:ring-1 focus-within:ring-brand-500/20 transition-all duration-200">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask SkillBot anything..."
          rows={1}
          className="flex-1 bg-transparent text-sm text-white placeholder-gray-500 resize-none focus:outline-none leading-relaxed py-0.5 max-h-[120px] overflow-y-auto"
          style={{ height: 'auto' }}
        />
      </div>

      {isLoading ? (
        <button
          onClick={onStop}
          className="flex-shrink-0 w-9 h-9 flex items-center justify-center bg-danger-600 hover:bg-danger-500 text-white rounded-xl transition-all duration-200 active:scale-95"
          title="Stop generating"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <rect x="4" y="4" width="16" height="16" rx="2" />
          </svg>
        </button>
      ) : (
        <button
          onClick={handleSend}
          disabled={!value.trim()}
          className={cn(
            'flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-xl transition-all duration-200 active:scale-95',
            value.trim()
              ? 'bg-brand-600 hover:bg-brand-500 text-white shadow-glow-brand'
              : 'bg-surface-500 text-gray-600 cursor-not-allowed'
          )}
          title="Send message (Enter)"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      )}
    </div>
  );
}

// ─── Welcome screen ───────────────────────────────────────────────────────────
interface WelcomeScreenProps {
  onPromptSelect: (prompt: string) => void;
}

export function WelcomeScreen({ onPromptSelect }: WelcomeScreenProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Hero */}
      <div className="flex flex-col items-center justify-center py-8 px-6 text-center">
        {/* Bot icon */}
        <div className="relative mb-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 via-purple-600 to-accent-500 flex items-center justify-center shadow-glow-brand">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-success-500 border-2 border-surface-700 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-white" />
          </div>
        </div>

        <h2 className="text-lg font-bold text-white mb-2">
          Hey there! 👋 I'm <span className="gradient-text">SkillBot</span>
        </h2>
        <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
          Your personal AI coding assistant. I can help you learn programming, solve coding problems,
          debug errors, and become a better developer.
        </p>
        <p className="text-xs text-gray-500 mt-3 font-medium">What would you like to learn today?</p>
      </div>

      {/* Suggested prompts */}
      <div className="px-2">
        <SuggestedPrompts onSelect={onPromptSelect} />
      </div>
    </div>
  );
}
