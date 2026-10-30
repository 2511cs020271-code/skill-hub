import React, { useEffect, useRef, useState } from 'react';
import { cn } from '../ui';
import { useChat } from './useChat';
import { ChatMessage, ChatInput, WelcomeScreen } from './ChatComponents';

// ─── Chat Window ──────────────────────────────────────────────────────────────
interface ChatWindowProps {
  onClose: () => void;
  onMinimize: () => void;
}

function ChatWindow({ onClose, onMinimize }: ChatWindowProps) {
  const { conversation, isLoading, sendMessage, clearChat, stopGeneration } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  // Auto-scroll to bottom
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const isNearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 120;
    if (isNearBottom || isLoading) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [conversation.messages, isLoading]);

  // Scroll button visibility
  const handleScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setShowScrollBtn(el.scrollHeight - el.scrollTop - el.clientHeight > 200);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const hasMessages = conversation.messages.length > 0;

  return (
    <div className="flex flex-col h-full">
      {/* ── Header ── */}
      <div className="flex items-center justify-between px-4 py-3 bg-surface-700/80 border-b border-white/[0.06] backdrop-blur-sm flex-shrink-0">
        <div className="flex items-center gap-3">
          {/* Bot avatar */}
          <div className="relative">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 via-purple-600 to-accent-500 flex items-center justify-center shadow-glow-brand">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-success-500 border-2 border-surface-700 flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-white" />
            </div>
          </div>

          <div>
            <div className="text-sm font-bold text-white leading-none">SkillBot</div>
            <div className="text-[11px] text-success-500 font-medium mt-0.5 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-success-500 inline-block animate-pulse" />
              AI Assistant · Online
            </div>
          </div>
        </div>

        {/* Header actions */}
        <div className="flex items-center gap-1">
          {hasMessages && (
            <button
              onClick={clearChat}
              title="New conversation"
              className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-surface-500 transition-all duration-200"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>
            </button>
          )}
          <button
            onClick={onMinimize}
            title="Minimize"
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-surface-500 transition-all duration-200"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
          <button
            onClick={onClose}
            title="Close"
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-danger-600/80 transition-all duration-200"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── Messages area ── */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto no-scrollbar"
      >
        {!hasMessages ? (
          <WelcomeScreen onPromptSelect={sendMessage} />
        ) : (
          <div className="flex flex-col gap-4 px-4 py-4">
            {conversation.messages.map(msg => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Scroll to bottom button */}
      {showScrollBtn && (
        <button
          onClick={scrollToBottom}
          className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 bg-surface-500 border border-white/10 rounded-full text-xs text-gray-300 hover:text-white shadow-lg transition-all duration-200 z-10"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="6 9 12 15 18 9" />
          </svg>
          Scroll to bottom
        </button>
      )}

      {/* ── Suggested prompts (when there are messages) ── */}
      {hasMessages && !isLoading && (
        <div className="flex-shrink-0 px-4 py-2 border-t border-white/[0.04]">
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {[
              { icon: '💡', label: 'Explain concept', prompt: 'Can you explain this concept in more detail?' },
              { icon: '🐛', label: 'Debug code', prompt: 'Help me debug the following code:' },
              { icon: '✅', label: 'Quiz me', prompt: 'Give me a quick quiz question on this topic.' },
            ].map(item => (
              <button
                key={item.label}
                onClick={() => sendMessage(item.prompt)}
                className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-surface-600/60 hover:bg-surface-500 border border-white/[0.06] hover:border-brand-500/30 rounded-xl text-xs text-gray-400 hover:text-white transition-all duration-200"
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Input ── */}
      <div className="flex-shrink-0">
        <ChatInput
          onSend={sendMessage}
          onStop={stopGeneration}
          isLoading={isLoading}
        />
        <div className="text-center pb-2 px-4">
          <span className="text-[10px] text-gray-600">
            SkillBot can make mistakes. Verify important information.
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Floating chatbot button + window ────────────────────────────────────────
export function SkillBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const open = () => {
    setIsOpen(true);
    setIsMinimized(false);
  };

  const close = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  const minimize = () => {
    setIsMinimized(true);
  };

  const restore = () => {
    setIsMinimized(false);
  };

  return (
    <>
      {/* ── Chat window ── */}
      {isOpen && (
        <div
          className={cn(
            'fixed bottom-20 right-4 sm:right-6 z-50',
            'w-[92vw] sm:w-[400px]',
            'transition-all duration-300 ease-out',
            isMinimized ? 'opacity-0 pointer-events-none scale-95 translate-y-4' : 'opacity-100 scale-100 translate-y-0'
          )}
          style={{ maxHeight: 'calc(100vh - 100px)' }}
        >
          <div
            className="relative flex flex-col bg-surface-800 border border-white/[0.08] rounded-2xl shadow-2xl overflow-hidden"
            style={{
              height: 'min(600px, calc(100vh - 100px))',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.8), 0 0 0 1px rgba(99,112,241,0.1)',
            }}
          >
            <ChatWindow onClose={close} onMinimize={minimize} />
          </div>
        </div>
      )}

      {/* ── Minimized pill ── */}
      {isOpen && isMinimized && (
        <button
          onClick={restore}
          className="fixed bottom-20 right-4 sm:right-6 z-50 flex items-center gap-2.5 px-4 py-3 bg-surface-700 border border-white/[0.08] rounded-2xl shadow-2xl hover:border-brand-500/30 transition-all duration-200 animate-slide-up"
        >
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="text-sm font-semibold text-white">SkillBot</span>
          <span className="w-2 h-2 rounded-full bg-success-500 animate-pulse" />
        </button>
      )}

      {/* ── Floating button ── */}
      <div className="fixed bottom-4 right-4 sm:right-6 z-50">
        {/* Tooltip */}
        {showTooltip && !isOpen && (
          <div className="absolute bottom-full right-0 mb-3 px-3 py-2 bg-surface-600 border border-white/10 rounded-xl text-xs text-white whitespace-nowrap shadow-xl animate-fade-in">
            Ask SkillBot
            <div className="absolute bottom-0 right-4 translate-y-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-surface-600" />
          </div>
        )}

        <button
          id="skillbot-toggle"
          onClick={isOpen ? close : open}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          aria-label={isOpen ? 'Close SkillBot' : 'Open SkillBot'}
          className={cn(
            'relative w-14 h-14 rounded-2xl flex items-center justify-center',
            'bg-gradient-to-br from-brand-500 via-brand-600 to-purple-700',
            'shadow-glow-brand hover:shadow-[0_0_30px_rgba(99,112,241,0.6)]',
            'transition-all duration-300 hover:scale-110 active:scale-95',
            'border border-brand-400/20',
            !isOpen && 'animate-pulse-glow'
          )}
        >
          {/* Ping ring */}
          {!isOpen && (
            <span className="absolute inset-0 rounded-2xl bg-brand-500/30 animate-ping" style={{ animationDuration: '2s' }} />
          )}

          {isOpen ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          )}
        </button>
      </div>
    </>
  );
}
