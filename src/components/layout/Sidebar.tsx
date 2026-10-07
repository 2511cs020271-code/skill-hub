import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, BookOpen, Map, Code2, Trophy, BarChart3,
  Target, Award, Users, User, Settings, ChevronLeft, ChevronRight,
  Zap, ClipboardList, Puzzle, Youtube
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { ProgressBar, Tooltip, Avatar } from '../ui';

const navItems = [
  { group: 'Main', items: [
    { icon: <LayoutDashboard size={18} />, label: 'Dashboard', to: '/dashboard' },
    { icon: <BookOpen size={18} />, label: 'My Learning', to: '/my-learning' },
    { icon: <Map size={18} />, label: 'Learning Paths', to: '/learning-paths' },
    { icon: <BookOpen size={18} />, label: 'Courses', to: '/courses' },
    { icon: <Youtube size={18} />, label: 'Video Classes', to: '/classes' },
  ]},
  { group: 'Practice', items: [
    { icon: <Code2 size={18} />, label: 'Code Editor', to: '/editor' },
    { icon: <Puzzle size={18} />, label: 'Challenges', to: '/challenges' },
    { icon: <ClipboardList size={18} />, label: 'Assessments', to: '/assessments' },
  ]},
  { group: 'Progress', items: [
    { icon: <BarChart3 size={18} />, label: 'Progress', to: '/progress' },
    { icon: <Award size={18} />, label: 'Achievements', to: '/achievements' },
    { icon: <Trophy size={18} />, label: 'Leaderboard', to: '/leaderboard' },
  ]},
  { group: 'Account', items: [
    { icon: <User size={18} />, label: 'Profile', to: '/profile' },
    { icon: <Settings size={18} />, label: 'Settings', to: '/settings' },
  ]},
];

export function Sidebar() {
  const { sidebarCollapsed, setSidebarCollapsed } = useApp();
  const { user } = useAuth();
  const location = useLocation();

  const isActive = (to: string) => location.pathname === to || location.pathname.startsWith(to + '/');

  return (
    <aside
      className={`
        flex-shrink-0 h-screen bg-surface-800 border-r border-white/[0.06] flex flex-col
        transition-all duration-300 ease-in-out overflow-hidden
        ${sidebarCollapsed ? 'w-[72px]' : 'w-64'}
      `}
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-white/[0.06] flex-shrink-0">
        <Link to="/dashboard" className="flex items-center gap-2.5 group min-w-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-glow-brand flex-shrink-0">
            <BookOpen size={16} className="text-white" />
          </div>
          {!sidebarCollapsed && (
            <span className="text-lg font-bold whitespace-nowrap overflow-hidden">
              Skill<span className="text-brand-400">Hub</span>
            </span>
          )}
        </Link>
      </div>

      {/* Nav groups */}
      <nav className="flex-1 overflow-y-auto no-scrollbar py-4 px-2">
        {navItems.map((group) => (
          <div key={group.group} className="mb-4">
            {!sidebarCollapsed && (
              <div className="px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-gray-600 mb-1">
                {group.group}
              </div>
            )}
            {group.items.map((item) => {
              const active = isActive(item.to);
              const content = (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-200
                    ${sidebarCollapsed ? 'justify-center' : ''}
                    ${active
                      ? 'text-white bg-brand-600/20 border border-brand-500/30'
                      : 'text-gray-400 hover:text-white hover:bg-surface-600'}
                  `}
                >
                  <span className={active ? 'text-brand-400' : ''}>{item.icon}</span>
                  {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
                </Link>
              );
              return sidebarCollapsed ? (
                <Tooltip key={item.to} content={item.label}>{content}</Tooltip>
              ) : content;
            })}
          </div>
        ))}
      </nav>

      {/* XP bar + user */}
      {!sidebarCollapsed && user && (
        <div className="px-3 pb-4 flex-shrink-0">
          <div className="bg-surface-600 border border-white/[0.06] rounded-xl p-3">
            <div className="flex items-center gap-2 mb-2">
              <Avatar name={user.name} size="sm" />
              <div className="min-w-0">
                <div className="text-sm font-semibold text-white truncate">{user.name}</div>
                <div className="text-xs text-gray-400">Level {user.level} · Code Explorer</div>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
              <span className="flex items-center gap-1"><Zap size={10} className="text-accent-400" />{user.xp} XP</span>
              <span>{user.xpToNextLevel} needed</span>
            </div>
            <ProgressBar value={user.xp} max={user.xpToNextLevel} size="sm" color="bg-gradient-to-r from-accent-600 to-accent-400" />
          </div>
        </div>
      )}

      {/* Collapse toggle */}
      <div className="border-t border-white/[0.06] p-2 flex-shrink-0">
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="w-full flex items-center justify-center p-2 rounded-xl text-gray-400 hover:text-white hover:bg-surface-600 transition-colors"
        >
          {sidebarCollapsed ? <ChevronRight size={16} /> : <><ChevronLeft size={16} /><span className="ml-2 text-sm">Collapse</span></>}
        </button>
      </div>
    </aside>
  );
}
