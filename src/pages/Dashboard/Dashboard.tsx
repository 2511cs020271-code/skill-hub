import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Flame, Zap, Trophy, BookOpen, Code2, Target,
  ChevronRight, Clock, ArrowRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { Card, ProgressBar, Badge, Button, StatCard, Avatar } from '../../components/ui';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip,
  ResponsiveContainer, CartesianGrid
} from 'recharts';
import {
  mockUserProgress, mockCourses, mockChallenges,
  weeklyChartData, mockLeaderboard, mockAchievements
} from '../../data/mockData';

// ==================== GREETING ====================
function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

// ==================== ACTIVITY CHART ====================
function ActivityChart() {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-white">Weekly Activity</h3>
        <Badge variant="default">This Week</Badge>
      </div>
      <ResponsiveContainer width="100%" height={160}>
        <BarChart data={weeklyChartData} barSize={28}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis dataKey="day" tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} tickLine={false} />
          <RechartsTooltip
            contentStyle={{ background: '#1c1f35', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
            cursor={{ fill: 'rgba(255,255,255,0.03)' }}
          />
          <Bar dataKey="problems" name="Problems" fill="#6370f1" radius={[4, 4, 0, 0]} />
          <Bar dataKey="minutes" name="Minutes" fill="#f97316" radius={[4, 4, 0, 0]} opacity={0.6} />
        </BarChart>
      </ResponsiveContainer>
      <div className="flex items-center gap-4 mt-2">
        <div className="flex items-center gap-1.5 text-xs text-gray-400"><span className="w-3 h-3 rounded-sm bg-brand-600 inline-block" />Problems Solved</div>
        <div className="flex items-center gap-1.5 text-xs text-gray-400"><span className="w-3 h-3 rounded-sm bg-accent-600 inline-block opacity-60" />Minutes Learned</div>
      </div>
    </Card>
  );
}

// ==================== CONTINUE LEARNING ====================
function ContinueLearning() {
  const navigate = useNavigate();
  const progress = mockUserProgress.find(p => p.courseId === 'course-java');
  const course = mockCourses.find(c => c.id === 'course-java');
  if (!course || !progress) return null;

  return (
    <Card className="p-5 overflow-hidden relative" hover>
      <div className="absolute top-0 right-0 w-48 h-48 opacity-10 text-[120px] leading-none pointer-events-none flex items-center justify-center">
        {course.icon}
      </div>
      <div className="flex items-start gap-4 relative">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ backgroundColor: `${course.color}20` }}>
          {course.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-xs text-gray-400 mb-0.5">Continue Learning</div>
          <h3 className="font-semibold text-white">{course.title}</h3>
          <p className="text-sm text-gray-400 mt-1 truncate">Current: Object-Oriented Programming</p>
          <div className="mt-3">
            <div className="flex items-center justify-between text-xs text-gray-400 mb-1.5">
              <span>Progress</span>
              <span className="font-medium text-white">{progress.progressPercent}%</span>
            </div>
            <ProgressBar value={progress.progressPercent} />
          </div>
          <div className="mt-4 flex items-center gap-2">
            <Button size="sm" onClick={() => navigate(`/courses/${course.id}`)} iconRight={<ArrowRight size={14} />}>
              Continue →
            </Button>
            <span className="text-xs text-gray-400">{42 - 9} lessons remaining</span>
          </div>
        </div>
      </div>
    </Card>
  );
}

// ==================== DAILY CHALLENGE ====================
function DailyChallenge() {
  const navigate = useNavigate();
  const challenge = mockChallenges[1]; // Two Sum

  return (
    <Card className="p-5" hover>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-accent-500/20 flex items-center justify-center">
          <Target size={16} className="text-accent-400" />
        </div>
        <div>
          <h3 className="font-semibold text-white text-sm">Daily Challenge</h3>
          <p className="text-xs text-gray-400">Resets in 6h 42m</p>
        </div>
        <Badge variant="accent" className="ml-auto">+50 XP</Badge>
      </div>

      <div className="bg-surface-600 rounded-xl p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-semibold text-white">{challenge.title}</h4>
          <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-500/15 text-yellow-400 font-semibold">Medium</span>
        </div>
        <p className="text-sm text-gray-400 line-clamp-2">{challenge.description}</p>
      </div>

      <Button size="sm" variant="accent" className="w-full" onClick={() => navigate(`/challenges/${challenge.id}`)}>
        <Target size={14} />
        Solve Challenge
      </Button>
    </Card>
  );
}

// ==================== RECENT ACTIVITY ====================
const recentActivity = [
  { icon: '✅', text: 'Completed Java Variables lesson', time: '2h ago', xp: '+20 XP' },
  { icon: '💻', text: 'Solved Array Rotation challenge', time: '4h ago', xp: '+75 XP' },
  { icon: '🏆', text: 'Earned "Debugging Master" badge', time: 'Yesterday', xp: '+200 XP' },
  { icon: '📝', text: 'Completed OOP Module quiz', time: 'Yesterday', xp: '+40 XP' },
  { icon: '🔥', text: '7-day learning streak maintained', time: '2 days ago', xp: '+100 XP' },
];

export default function Dashboard() {
  const { user } = useAuth();
  const { showXPGain } = useApp();
  const navigate = useNavigate();
  const firstName = user?.name?.split(' ')[0] || 'Alex';

  const topUsers = mockLeaderboard.slice(0, 3);
  const unlockedBadges = mockAchievements.filter(a => a.unlocked).slice(0, 4);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-1">
          {getGreeting()}, {firstName} 👋
        </h1>
        <p className="text-gray-400">Ready to continue your coding journey?</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          icon={<Flame size={20} />}
          label="Current Streak"
          value={`${user?.streak} days`}
          sub="Keep it going!"
          color="bg-orange-500/20 text-orange-400"
          trend={12}
        />
        <StatCard
          icon={<Zap size={20} />}
          label="Total XP"
          value={user?.xp?.toLocaleString() || '0'}
          sub={`Level ${user?.level}`}
          color="bg-accent-500/20 text-accent-400"
          trend={8}
        />
        <StatCard
          icon={<Code2 size={20} />}
          label="Problems Solved"
          value={user?.problemsSolved || 0}
          sub={`${user?.acceptanceRate}% acceptance`}
          color="bg-brand-500/20 text-brand-400"
          trend={5}
        />
        <StatCard
          icon={<Clock size={20} />}
          label="Hours Learned"
          value={`${user?.hoursLearned}h`}
          sub="This month"
          color="bg-success-500/20 text-success-500"
          trend={15}
        />
      </div>

      {/* Main grid */}
      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        {/* Left column — 2 spans */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <ContinueLearning />
          <ActivityChart />
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-6">
          {/* XP Level card */}
          <Card className="p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent-600 to-accent-400 flex items-center justify-center text-white font-bold text-lg">
                {user?.level}
              </div>
              <div>
                <div className="font-semibold text-white">Code Explorer</div>
                <div className="text-xs text-gray-400">Level {user?.level}</div>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
              <span><Zap size={10} className="inline text-accent-400 mr-1" />{user?.xp} XP</span>
              <span>{user?.xpToNextLevel} to Level {(user?.level || 0) + 1}</span>
            </div>
            <div className="h-2.5 bg-surface-400 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-accent-600 to-accent-400 rounded-full transition-all duration-700"
                style={{ width: `${((user?.xp || 0) / (user?.xpToNextLevel || 1)) * 100}%` }}
              />
            </div>
          </Card>

          <DailyChallenge />

          {/* Mini leaderboard */}
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-white">Top Learners</h3>
              <Link to="/leaderboard" className="text-xs text-brand-400 hover:text-brand-300">View all</Link>
            </div>
            <div className="space-y-3">
              {topUsers.map(u => (
                <div key={u.rank} className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                    u.rank === 1 ? 'bg-yellow-500/20 text-yellow-400' :
                    u.rank === 2 ? 'bg-gray-400/20 text-gray-300' :
                    'bg-orange-500/20 text-orange-400'
                  }`}>
                    {u.rank}
                  </div>
                  <Avatar name={u.name} size="sm" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-white truncate">{u.name}</div>
                    <div className="text-xs text-gray-400">Level {u.level}</div>
                  </div>
                  <div className="text-xs font-semibold text-accent-400">{(u.xp / 1000).toFixed(1)}k</div>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-white/[0.06] flex items-center justify-between">
              <span className="text-xs text-gray-400">Your rank</span>
              <span className="text-sm font-bold text-white">#127</span>
            </div>
          </Card>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <Card className="p-5">
            <h3 className="font-semibold text-white mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {recentActivity.map((a, i) => (
                <div key={i} className="flex items-center gap-3 py-2 border-b border-white/[0.04] last:border-none">
                  <span className="text-xl w-8 text-center">{a.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-white">{a.text}</div>
                    <div className="text-xs text-gray-500">{a.time}</div>
                  </div>
                  <Badge variant="accent">{a.xp}</Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Achievements */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white">Recent Badges</h3>
            <Link to="/achievements" className="text-xs text-brand-400 hover:text-brand-300">View all</Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {unlockedBadges.map(b => (
              <div key={b.id} className="bg-surface-600 border border-white/[0.06] rounded-xl p-3 text-center hover:border-brand-500/30 transition-all hover:scale-[1.02]">
                <div className="text-2xl mb-1">{b.icon}</div>
                <div className="text-xs font-medium text-white leading-tight">{b.title}</div>
                <div className="text-xs text-accent-400 mt-0.5">+{b.xpReward} XP</div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-white/[0.06]">
            <div className="text-xs text-gray-400 mb-2">Next badge</div>
            <div className="flex items-center gap-3">
              <span className="text-2xl opacity-50">🧠</span>
              <div className="flex-1">
                <div className="text-sm text-white">Problem Solver</div>
                <div className="text-xs text-gray-400">Solve 50 challenges ({user?.problemsSolved}/50)</div>
                <ProgressBar value={user?.problemsSolved || 0} max={50} size="sm" className="mt-1.5" />
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Recommended */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold text-white mb-4">Recommended For You</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { label: 'Practice Arrays', desc: 'Your success rate in Arrays is below average', icon: '📊', to: '/challenges', color: 'border-danger-500/30' },
            { label: 'OOP Deep Dive', desc: 'Continue where you left off in Inheritance', icon: '🏗️', to: '/courses/course-java', color: 'border-brand-500/30' },
            { label: 'Algorithm Practice', desc: 'Strengthen your sorting algorithm knowledge', icon: '🧮', to: '/challenges', color: 'border-purple-500/30' },
          ].map(r => (
            <Link key={r.label} to={r.to}>
              <Card className={`p-4 flex items-center gap-3 hover:border-brand-500/40 transition-all ${r.color}`} hover>
                <span className="text-2xl">{r.icon}</span>
                <div>
                  <div className="text-sm font-semibold text-white">{r.label}</div>
                  <div className="text-xs text-gray-400">{r.desc}</div>
                </div>
                <ChevronRight size={16} className="text-gray-400 ml-auto" />
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
