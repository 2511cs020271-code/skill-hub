import React from 'react';
import { BarChart3, TrendingUp, Clock, Target, CheckCircle, Zap, Flame, Award, BookOpen } from 'lucide-react';
import { mockUser, mockDailyActivity, mockUserProgress } from '../../data/mockData';
import { Card, ProgressBar, Badge } from '../../components/ui';

export function ProgressPage() {
  const skillMetrics = [
    { skill: 'Java Programming', score: 85, color: 'bg-orange-500' },
    { skill: 'Python & Automation', score: 92, color: 'bg-green-500' },
    { skill: 'Data Structures & Alg', score: 68, color: 'bg-purple-500' },
    { skill: 'Web Dev (JS/React)', score: 78, color: 'bg-blue-500' },
    { skill: 'SQL & Database Design', score: 60, color: 'bg-cyan-500' },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Learning Progress & Analytics</h1>
        <p className="text-gray-400">Detailed stats on your coding velocity, completed modules, and skill breakdown.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-600/20 text-brand-400 flex items-center justify-center text-xl">
            <Zap />
          </div>
          <div>
            <div className="text-xs text-gray-400 font-medium">Total Experience</div>
            <div className="text-2xl font-extrabold text-white mt-0.5">{mockUser.xp.toLocaleString()} XP</div>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-500/20 text-orange-400 flex items-center justify-center text-xl">
            <Flame />
          </div>
          <div>
            <div className="text-xs text-gray-400 font-medium">Current Streak</div>
            <div className="text-2xl font-extrabold text-white mt-0.5">{mockUser.streak} Days</div>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-green-500/20 text-green-400 flex items-center justify-center text-xl">
            <CheckCircle />
          </div>
          <div>
            <div className="text-xs text-gray-400 font-medium">Problems Solved</div>
            <div className="text-2xl font-extrabold text-white mt-0.5">{mockUser.problemsSolved}</div>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center text-xl">
            <Clock />
          </div>
          <div>
            <div className="text-xs text-gray-400 font-medium">Hours Learned</div>
            <div className="text-2xl font-extrabold text-white mt-0.5">{mockUser.hoursLearned} hrs</div>
          </div>
        </Card>
      </div>

      {/* Grid: Skill Scores & Weekly Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Skill Scores */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <BarChart3 className="text-brand-400" size={20} /> Skill Proficiency Breakdown
            </h2>
            <Badge variant="brand">Level {mockUser.level}</Badge>
          </div>

          <div className="space-y-4 pt-2">
            {skillMetrics.map(item => (
              <div key={item.skill} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-gray-300">
                  <span>{item.skill}</span>
                  <span>{item.score}%</span>
                </div>
                <ProgressBar value={item.score} color={item.color} />
              </div>
            ))}
          </div>
        </Card>

        {/* Weekly Activity Heatmap */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <TrendingUp className="text-accent-400" size={20} /> Daily Learning Activity
            </h2>
            <span className="text-xs text-gray-400">Last 7 Days</span>
          </div>

          <div className="grid grid-cols-7 gap-2 pt-4">
            {mockDailyActivity.slice(-7).map((act, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="w-full bg-surface-900 rounded-xl p-3 text-center border border-white/[0.04]">
                  <div className="text-xs font-bold text-white mb-1">{act.xpEarned}</div>
                  <div className="text-[10px] text-gray-500">XP</div>
                </div>
                <span className="text-[11px] font-medium text-gray-400">{act.date.split('-').slice(1).join('/')}</span>
              </div>
            ))}
          </div>

          <div className="p-4 bg-brand-600/10 border border-brand-500/20 rounded-2xl flex items-center gap-3 text-xs text-gray-300 mt-4">
            <Target size={20} className="text-brand-400 flex-shrink-0" />
            <p>You're on track to complete your weekly learning goal of 500 XP!</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
