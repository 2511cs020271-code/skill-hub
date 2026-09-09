import React from 'react';
import {
  Shield, Calendar, Flame, Zap, CheckCircle2,
  BookOpen, Code2, Clock, Trophy
} from 'lucide-react';
import { mockUser, mockAchievements, mockCourses } from '../../data/mockData';
import { Card, Avatar, ProgressBar, Button } from '../../components/ui';
import { useAuth } from '../../context/AuthContext';

export function ProfilePage() {
  const { user } = useAuth();
  const currentUser = user || mockUser;

  const xpProgress = Math.round((currentUser.xp / currentUser.xpToNextLevel) * 100);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Profile Header Banner */}
      <Card className="relative p-6 sm:p-8 bg-gradient-to-r from-surface-800 via-surface-750 to-brand-950/30 border-white/[0.08] overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <Avatar name={currentUser.name} size="xl" className="ring-4 ring-brand-500/40 shadow-glow-brand" />

          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{currentUser.name}</h1>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-brand-500/15 border border-brand-400/30 text-brand-300 text-xs font-semibold self-center sm:self-auto">
                <Shield size={12} /> {currentUser.role.toUpperCase()}
              </span>
            </div>

            <p className="text-sm text-gray-400 font-mono">@{currentUser.username}</p>

            <div className="flex items-center justify-center sm:justify-start gap-4 text-xs text-gray-400 pt-2 flex-wrap">
              <div className="flex items-center gap-1.5">
                <Calendar size={14} className="text-gray-500" />
                <span>Joined {currentUser.joinedAt}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Flame size={14} className="text-orange-400" />
                <span>{currentUser.streak} Day Streak (Best: {currentUser.longestStreak}d)</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="secondary" size="sm">
              Edit Profile
            </Button>
          </div>
        </div>

        {/* Level XP Bar */}
        <div className="mt-8 pt-6 border-t border-white/[0.06] space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-bold text-white flex items-center gap-2">
              <Zap size={16} className="text-accent-400" />
              Level {currentUser.level} Developer
            </span>
            <span className="text-xs font-mono text-gray-400">
              {currentUser.xp.toLocaleString()} / {currentUser.xpToNextLevel.toLocaleString()} XP
            </span>
          </div>
          <ProgressBar value={xpProgress} size="md" />
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Problems Solved', value: currentUser.problemsSolved, icon: <Code2 size={20} className="text-brand-400" />, color: 'bg-brand-500/10' },
          { label: 'Total XP', value: `${currentUser.xp.toLocaleString()} XP`, icon: <Zap size={20} className="text-accent-400" />, color: 'bg-accent-500/10' },
          { label: 'Current Streak', value: `${currentUser.streak} Days`, icon: <Flame size={20} className="text-orange-400" />, color: 'bg-orange-500/10' },
          { label: 'Hours Learned', value: `${currentUser.hoursLearned} hrs`, icon: <Clock size={20} className="text-purple-400" />, color: 'bg-purple-500/10' },
        ].map((stat, i) => (
          <Card key={i} className="p-5 bg-surface-800 border-white/[0.08] flex items-center gap-4">
            <div className={`w-12 h-12 rounded-2xl ${stat.color} flex items-center justify-center flex-shrink-0`}>
              {stat.icon}
            </div>
            <div>
              <div className="text-xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-gray-400">{stat.label}</div>
            </div>
          </Card>
        ))}
      </div>

      {/* Badges & Achievements */}
      <Card className="p-6 bg-surface-800 border-white/[0.08] space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Trophy size={20} className="text-accent-400" />
            Badges & Achievements ({mockAchievements.filter(a => a.unlocked).length} / {mockAchievements.length})
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockAchievements.map((ach) => (
            <div
              key={ach.id}
              className={`p-4 rounded-2xl border transition-all flex items-start gap-4 ${
                ach.unlocked
                  ? 'bg-surface-700/80 border-brand-500/30'
                  : 'bg-surface-850/50 border-white/[0.04] opacity-50'
              }`}
            >
              <div className="text-3xl p-2.5 rounded-xl bg-surface-600 border border-white/[0.06] flex-shrink-0">
                {ach.icon}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-white text-sm">{ach.title}</h4>
                  {ach.unlocked && <CheckCircle2 size={14} className="text-brand-400" />}
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">{ach.description}</p>
                <div className="text-[11px] text-accent-400 font-semibold pt-1">
                  +{ach.xpReward} XP
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Enrolled Courses Progress */}
      <Card className="p-6 bg-surface-800 border-white/[0.08] space-y-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <BookOpen size={20} className="text-brand-400" />
          Enrolled Courses
        </h2>

        <div className="grid sm:grid-cols-2 gap-4">
          {mockCourses.slice(0, 4).map((course) => (
            <div key={course.id} className="p-4 rounded-2xl bg-surface-700/60 border border-white/[0.06] flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ backgroundColor: `${course.color}20` }}>
                {course.icon}
              </div>
              <div className="flex-1 min-w-0 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white text-sm truncate">{course.title}</h4>
                  <span className="text-xs text-brand-300 font-mono">65%</span>
                </div>
                <ProgressBar value={65} size="sm" />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
