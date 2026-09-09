import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, Eye, Plus, Search, Sparkles, Filter, CheckCircle2 } from 'lucide-react';
import { Card, Avatar, Button, Badge } from '../../components/ui';
import toast from 'react-hot-toast';

const mockPosts = [
  {
    id: 'p1',
    author: 'Priya Sharma',
    avatar: 'Priya',
    role: 'Instructor',
    time: '2 hours ago',
    title: 'Understanding Java Garbage Collection (G1GC vs ZGC)',
    content: 'A deep dive into how JVM manages memory heap allocation and how GC algorithms optimize pause times in enterprise Java applications...',
    tags: ['Java', 'JVM', 'Performance'],
    upvotes: 42,
    replies: 15,
    views: 320,
    solved: true
  },
  {
    id: 'p2',
    author: 'Alex Johnson',
    avatar: 'Alex',
    role: 'Student',
    time: '5 hours ago',
    title: 'How to approach dynamic programming subproblems intuitively?',
    content: 'I often struggle to recognize whether a problem requires memoization or bottom-up tabulation. Any tips or mental models to master DP?',
    tags: ['DSA', 'Algorithms', 'DP'],
    upvotes: 28,
    replies: 9,
    views: 180,
    solved: false
  },
  {
    id: 'p3',
    author: 'David Chen',
    avatar: 'David',
    role: 'Top Contributor',
    time: '1 day ago',
    title: 'Python 3.12 performance enhancements: What developers should know',
    content: 'Specialized adaptive interpreter and immortal objects lead to significant speedups for nested loops and recursive functions...',
    tags: ['Python', 'Backend'],
    upvotes: 64,
    replies: 23,
    views: 540,
    solved: true
  }
];

export function CommunityPage() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [posts, setPosts] = useState(mockPosts);

  const handleUpvote = (id: string) => {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, upvotes: p.upvotes + 1 } : p));
    toast.success('Upvoted post!');
  };

  const categories = ['All', 'Java', 'Python', 'DSA', 'Backend'];

  const filteredPosts = posts.filter(p => {
    const matchTag = filter === 'All' || p.tags.includes(filter);
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.content.toLowerCase().includes(search.toLowerCase());
    return matchTag && matchSearch;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/[0.08] pb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center text-white shadow-glow-brand">
            <MessageSquare size={28} />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Developer Community & Discussions</h1>
            <p className="text-gray-400 text-sm mt-1">Ask questions, share insights, and discuss solutions with fellow developers</p>
          </div>
        </div>

        <Button
          variant="primary"
          icon={<Plus size={16} />}
          onClick={() => toast.success('Post creation modal coming right up!')}
        >
          New Discussion
        </Button>
      </div>

      {/* Filter & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                filter === cat
                  ? 'bg-brand-600 text-white shadow-glow-brand'
                  : 'bg-surface-700 text-gray-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search discussions..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-surface-700 border border-white/[0.08] rounded-xl pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-brand-500"
          />
        </div>
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {filteredPosts.map(post => (
          <Card key={post.id} className="p-6 bg-surface-800 border-white/[0.08] hover:border-brand-500/30 transition-all space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <Avatar name={post.author} size="md" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{post.author}</span>
                    <span className="text-[10px] bg-brand-500/20 text-brand-300 px-2 py-0.5 rounded-full font-semibold">
                      {post.role}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">{post.time}</span>
                </div>
              </div>

              {post.solved && (
                <span className="flex items-center gap-1 text-xs text-green-400 font-medium bg-green-500/10 px-2.5 py-1 rounded-lg border border-green-500/20">
                  <CheckCircle2 size={14} /> Solved
                </span>
              )}
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white hover:text-brand-300 cursor-pointer transition-colors">
                {post.title}
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed line-clamp-2">{post.content}</p>
            </div>

            <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-2">
                {post.tags.map(tag => (
                  <span key={tag} className="text-xs px-2.5 py-1 rounded-lg bg-surface-600 text-gray-300 font-mono">
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4 text-xs text-gray-400">
                <button
                  onClick={() => handleUpvote(post.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-surface-600 text-gray-300 hover:text-amber-400 transition-colors"
                >
                  <ThumbsUp size={14} />
                  <span className="font-bold">{post.upvotes}</span>
                </button>
                <div className="flex items-center gap-1.5">
                  <MessageSquare size={14} />
                  <span>{post.replies} Replies</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Eye size={14} />
                  <span>{post.views} Views</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
