import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, BookOpen, Code2, Target, Map, Zap } from 'lucide-react';
import { mockCourses, mockChallenges, mockLearningPaths } from '../data/mockData';

interface SearchResult {
  type: 'course' | 'challenge' | 'path' | 'lesson';
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  to: string;
}

function buildResults(query: string): SearchResult[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  const results: SearchResult[] = [];

  mockCourses.filter(c => c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)).slice(0, 3).forEach(c => {
    results.push({ type: 'course', icon: <BookOpen size={14} />, title: c.title, subtitle: `Course · ${c.difficulty} · ${c.totalLessons} lessons`, to: `/courses/${c.id}` });
  });

  mockChallenges.filter(c => c.title.toLowerCase().includes(q) || c.category.some(cat => cat.toLowerCase().includes(q))).slice(0, 3).forEach(c => {
    results.push({ type: 'challenge', icon: <Code2 size={14} />, title: c.title, subtitle: `Challenge · ${c.difficulty} · +${c.xpReward} XP`, to: `/challenges/${c.id}` });
  });

  mockLearningPaths.filter(p => p.title.toLowerCase().includes(q)).slice(0, 2).forEach(p => {
    results.push({ type: 'path', icon: <Map size={14} />, title: p.title, subtitle: `Learning Path · ${p.estimatedWeeks} weeks`, to: `/learning-paths` });
  });

  return results;
}

export function SearchOverlay({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    setResults(buildResults(query));
  }, [query]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  const handleSelect = (to: string) => {
    navigate(to);
    onClose();
  };

  const suggestions = [
    { icon: <BookOpen size={14} />, label: 'Java Programming', to: '/courses/course-java' },
    { icon: <Code2 size={14} />, label: 'Two Sum', to: '/challenges/ch-2' },
    { icon: <Target size={14} />, label: 'Assessments', to: '/assessments' },
    { icon: <Map size={14} />, label: 'Learning Paths', to: '/learning-paths' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl animate-slide-up">
        {/* Search input */}
        <div className="flex items-center gap-3 bg-surface-700 border border-white/10 rounded-2xl px-4 py-3.5 shadow-2xl">
          <Search size={18} className="text-gray-400 flex-shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search courses, challenges, topics..."
            className="flex-1 bg-transparent text-white placeholder-gray-500 focus:outline-none text-base"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-gray-400 hover:text-white">
              <X size={16} />
            </button>
          )}
          <kbd className="text-xs bg-surface-500 text-gray-400 px-2 py-1 rounded-md border border-white/10">ESC</kbd>
        </div>

        {/* Results */}
        <div className="mt-2 bg-surface-700 border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
          {results.length > 0 ? (
            <>
              <div className="px-4 py-2 text-xs text-gray-500 font-semibold uppercase tracking-wider border-b border-white/[0.06]">
                Results ({results.length})
              </div>
              {results.map((r, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect(r.to)}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-surface-600 transition-colors text-left border-b border-white/[0.04] last:border-none"
                >
                  <div className="w-8 h-8 rounded-lg bg-surface-500 flex items-center justify-center text-brand-400">
                    {r.icon}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">{r.title}</div>
                    <div className="text-xs text-gray-400">{r.subtitle}</div>
                  </div>
                </button>
              ))}
            </>
          ) : query ? (
            <div className="px-4 py-8 text-center text-gray-400">
              <Search size={32} className="mx-auto mb-2 opacity-30" />
              <div>No results for "{query}"</div>
            </div>
          ) : (
            <>
              <div className="px-4 py-2 text-xs text-gray-500 font-semibold uppercase tracking-wider border-b border-white/[0.06]">
                Quick Links
              </div>
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect(s.to)}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-surface-600 transition-colors text-left border-b border-white/[0.04] last:border-none"
                >
                  <div className="w-8 h-8 rounded-lg bg-surface-500 flex items-center justify-center text-brand-400">
                    {s.icon}
                  </div>
                  <span className="text-sm text-gray-300">{s.label}</span>
                  <Zap size={12} className="ml-auto text-gray-600" />
                </button>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
