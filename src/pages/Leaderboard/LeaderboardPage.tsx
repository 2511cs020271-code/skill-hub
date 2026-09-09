import React, { useState } from 'react';
import {
  Trophy, Flame, Search, Crown,
  TrendingUp, Medal, Award
} from 'lucide-react';
import { mockLeaderboard, mockUser } from '../../data/mockData';
import { Card, Avatar } from '../../components/ui';

export function LeaderboardPage() {
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly' | 'allTime'>('weekly');
  const [search, setSearch] = useState('');

  const filteredLeaderboard = mockLeaderboard.filter(entry =>
    entry.name.toLowerCase().includes(search.toLowerCase()) ||
    entry.username.toLowerCase().includes(search.toLowerCase())
  );

  const top3 = filteredLeaderboard.slice(0, 3);
  const remainingList = filteredLeaderboard.slice(3);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-yellow-950/40 via-amber-900/20 to-surface-800 border border-amber-500/20 p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
              <Trophy size={14} className="text-amber-400" />
              Global Coding Arena
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Community Leaderboard
            </h1>
            <p className="text-gray-300 text-base leading-relaxed">
              Compete with fellow developers around the world. Earn XP by completing courses, solving coding challenges, and maintaining daily streaks!
            </p>
          </div>

          {/* Timeframe Selector */}
          <div className="flex bg-surface-700/80 p-1.5 rounded-2xl border border-white/[0.08] self-start md:self-center">
            {[
              { id: 'weekly', label: 'This Week' },
              { id: 'monthly', label: 'This Month' },
              { id: 'allTime', label: 'All Time' },
            ].map(tf => (
              <button
                key={tf.id}
                onClick={() => setTimeframe(tf.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                  timeframe === tf.id
                    ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tf.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Podium Top 3 */}
      {top3.length >= 3 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {/* 2nd Place */}
          <Card className="relative p-6 bg-surface-800/90 border-slate-400/30 text-center flex flex-col items-center justify-between order-2 md:order-1 transform hover:-translate-y-1 transition-transform">
            <div className="absolute -top-4 bg-slate-400 text-black font-black text-xs px-3 py-1 rounded-full shadow-md flex items-center gap-1">
              <Medal size={12} /> #2 SILVER
            </div>
            <div className="mt-2 relative">
              <Avatar name={top3[1].name} size="xl" className="ring-4 ring-slate-400/40" />
              <span className="absolute -bottom-2 -right-1 bg-surface-600 border border-slate-400 text-slate-300 text-xs px-2 py-0.5 rounded-full font-bold">
                Lvl {top3[1].level}
              </span>
            </div>
            <div className="mt-4 space-y-1">
              <h3 className="font-bold text-white text-lg">{top3[1].name}</h3>
              <p className="text-xs text-gray-400">@{top3[1].username}</p>
            </div>
            <div className="mt-4 w-full pt-4 border-t border-white/[0.06] flex items-center justify-around text-xs">
              <div>
                <span className="text-gray-400 block text-[10px]">XP</span>
                <span className="font-extrabold text-amber-400">{top3[1].xp.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px]">Streak</span>
                <span className="font-bold text-orange-400 flex items-center justify-center gap-0.5">
                  <Flame size={12} /> {top3[1].streak}d
                </span>
              </div>
            </div>
          </Card>

          {/* 1st Place */}
          <Card className="relative p-6 bg-gradient-to-b from-amber-500/10 to-surface-800 border-amber-500/50 text-center flex flex-col items-center justify-between order-1 md:order-2 transform -translate-y-2 md:-translate-y-4 shadow-glow-accent">
            <div className="absolute -top-5 bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-black text-xs px-4 py-1.5 rounded-full shadow-xl flex items-center gap-1.5 uppercase tracking-wider">
              <Crown size={14} className="fill-black" /> #1 CHAMPION
            </div>
            <div className="mt-2 relative">
              <Avatar name={top3[0].name} size="xl" className="ring-4 ring-amber-400 shadow-glow-accent" />
              <span className="absolute -bottom-2 -right-1 bg-amber-500 text-black text-xs px-2 py-0.5 rounded-full font-black shadow-md">
                Lvl {top3[0].level}
              </span>
            </div>
            <div className="mt-4 space-y-1">
              <h3 className="font-extrabold text-white text-xl">{top3[0].name}</h3>
              <p className="text-xs text-amber-300 font-medium">@{top3[0].username}</p>
            </div>
            <div className="mt-4 w-full pt-4 border-t border-amber-500/20 flex items-center justify-around text-xs">
              <div>
                <span className="text-gray-400 block text-[10px]">TOTAL XP</span>
                <span className="font-extrabold text-amber-400 text-base">{top3[0].xp.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px]">STREAK</span>
                <span className="font-bold text-orange-400 text-sm flex items-center justify-center gap-0.5">
                  <Flame size={14} className="fill-orange-400" /> {top3[0].streak}d
                </span>
              </div>
            </div>
          </Card>

          {/* 3rd Place */}
          <Card className="relative p-6 bg-surface-800/90 border-amber-700/30 text-center flex flex-col items-center justify-between order-3 transform hover:-translate-y-1 transition-transform">
            <div className="absolute -top-4 bg-amber-700 text-white font-black text-xs px-3 py-1 rounded-full shadow-md flex items-center gap-1">
              <Award size={12} /> #3 BRONZE
            </div>
            <div className="mt-2 relative">
              <Avatar name={top3[2].name} size="xl" className="ring-4 ring-amber-700/40" />
              <span className="absolute -bottom-2 -right-1 bg-surface-600 border border-amber-700 text-amber-300 text-xs px-2 py-0.5 rounded-full font-bold">
                Lvl {top3[2].level}
              </span>
            </div>
            <div className="mt-4 space-y-1">
              <h3 className="font-bold text-white text-lg">{top3[2].name}</h3>
              <p className="text-xs text-gray-400">@{top3[2].username}</p>
            </div>
            <div className="mt-4 w-full pt-4 border-t border-white/[0.06] flex items-center justify-around text-xs">
              <div>
                <span className="text-gray-400 block text-[10px]">XP</span>
                <span className="font-extrabold text-amber-400">{top3[2].xp.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px]">Streak</span>
                <span className="font-bold text-orange-400 flex items-center justify-center gap-0.5">
                  <Flame size={12} /> {top3[2].streak}d
                </span>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Search & Full Rankings Table */}
      <Card className="p-6 bg-surface-800 border-white/[0.08] space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <TrendingUp size={20} className="text-amber-400" />
            Rankings Table
          </h2>

          <div className="relative w-full sm:w-64">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search user..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-surface-700 border border-white/[0.08] rounded-xl pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-amber-500/50"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/[0.08] text-xs font-semibold text-gray-400 uppercase tracking-wider">
                <th className="py-3 px-4">Rank</th>
                <th className="py-3 px-4">Developer</th>
                <th className="py-3 px-4">Level</th>
                <th className="py-3 px-4">Solved</th>
                <th className="py-3 px-4">Streak</th>
                <th className="py-3 px-4 text-right">Total XP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {remainingList.map((entry) => {
                const isCurrentUser = entry.name === mockUser.name;
                return (
                  <tr
                    key={entry.rank}
                    className={`hover:bg-surface-700/50 transition-colors text-sm ${
                      isCurrentUser ? 'bg-amber-500/10 border-l-4 border-l-amber-400' : ''
                    }`}
                  >
                    <td className="py-4 px-4 font-mono font-bold text-gray-300">
                      #{entry.rank}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <Avatar name={entry.name} size="sm" />
                        <div>
                          <div className="font-semibold text-white flex items-center gap-1.5">
                            {entry.name}
                            {isCurrentUser && (
                              <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-1.5 py-0.2 rounded font-mono">
                                YOU
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-gray-400">@{entry.username}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-2.5 py-1 rounded-lg bg-surface-600 text-xs font-semibold text-gray-300">
                        Lvl {entry.level}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-medium text-gray-300">
                      {entry.problemsSolved}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1 text-orange-400 font-semibold">
                        <Flame size={14} />
                        <span>{entry.streak}d</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right font-bold text-amber-400">
                      {entry.xp.toLocaleString()} XP
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
