import React, { useState } from 'react';
import { Award, Trophy, Zap, Flame, Lock, CheckCircle, Star } from 'lucide-react';
import { mockAchievements, mockUser } from '../../data/mockData';
import { Card, Badge, ProgressBar } from '../../components/ui';

export function AchievementsPage() {
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all');

  const filteredAchievements = mockAchievements.filter(a => {
    if (filter === 'unlocked') return a.unlocked;
    if (filter === 'locked') return !a.unlocked;
    return true;
  });

  const unlockedCount = mockAchievements.filter(a => a.unlocked).length;
  const totalXP = mockAchievements.filter(a => a.unlocked).reduce((sum, a) => sum + a.xpReward, 0);

  const getRarityBadge = (rarity: string) => {
    switch (rarity) {
      case 'legendary':
        return <Badge variant="warning">Legendary</Badge>;
      case 'epic':
        return <Badge variant="accent">Epic</Badge>;
      case 'rare':
        return <Badge variant="brand">Rare</Badge>;
      default:
        return <Badge variant="default">Common</Badge>;
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-surface-800 via-surface-700 to-surface-800 p-6 sm:p-8 rounded-3xl border border-white/[0.08] relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-xl">
        <div className="space-y-2 z-10">
          <Badge variant="accent" className="mb-2">Trophy Room</Badge>
          <h1 className="text-3xl font-extrabold text-white">Achievements & Badges</h1>
          <p className="text-gray-400 max-w-xl text-sm">
            Earn badges by completing courses, solving coding challenges, and maintaining daily streaks.
          </p>
        </div>

        {/* Stats Summary */}
        <div className="flex items-center gap-4 z-10 w-full md:w-auto">
          <div className="bg-surface-900/80 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/[0.06] text-center flex-1 md:flex-initial">
            <div className="text-xs text-gray-400 uppercase font-semibold">Unlocked</div>
            <div className="text-2xl font-bold text-white mt-1">{unlockedCount} / {mockAchievements.length}</div>
          </div>
          <div className="bg-surface-900/80 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/[0.06] text-center flex-1 md:flex-initial">
            <div className="text-xs text-gray-400 uppercase font-semibold">Badge XP</div>
            <div className="text-2xl font-bold text-accent-400 mt-1">+{totalXP}</div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        {(['all', 'unlocked', 'locked'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize transition-all ${
              filter === tab
                ? 'bg-brand-600 text-white shadow-glow-brand'
                : 'bg-surface-700 text-gray-400 hover:text-white hover:bg-surface-600'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Achievements Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredAchievements.map(achievement => (
          <Card
            key={achievement.id}
            className={`p-5 relative transition-all duration-300 ${
              achievement.unlocked
                ? 'bg-surface-800 border-brand-500/30'
                : 'bg-surface-800/40 border-white/[0.04] opacity-75'
            }`}
            hover={achievement.unlocked}
          >
            <div className="flex items-start gap-4">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 relative ${
                achievement.unlocked
                  ? 'bg-brand-600/20 border border-brand-500/40 shadow-glow-brand'
                  : 'bg-surface-700 border border-white/[0.06] grayscale'
              }`}>
                {achievement.icon}
                {!achievement.unlocked && (
                  <div className="absolute inset-0 bg-surface-900/60 rounded-2xl flex items-center justify-center">
                    <Lock size={18} className="text-gray-400" />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className="font-bold text-white text-base truncate">{achievement.title}</h3>
                  {getRarityBadge(achievement.rarity)}
                </div>
                <p className="text-xs text-gray-400 leading-relaxed mb-3">{achievement.description}</p>

                <div className="flex items-center justify-between pt-3 border-t border-white/[0.06] text-xs">
                  <span className="flex items-center gap-1 text-accent-400 font-semibold">
                    <Zap size={12} /> +{achievement.xpReward} XP
                  </span>
                  {achievement.unlocked ? (
                    <span className="text-success-500 font-semibold flex items-center gap-1">
                      <CheckCircle size={12} /> Unlocked
                    </span>
                  ) : (
                    <span className="text-gray-500 font-medium">Locked</span>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
