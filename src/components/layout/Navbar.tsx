import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  BookOpen, Search, Bell, ChevronDown, LogOut, User,
  Settings, Zap, Flame, Menu, X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { Avatar } from '../ui';

export function PublicNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-surface-900/95 backdrop-blur-md border-b border-white/[0.06] shadow-2xl' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-glow-brand group-hover:shadow-lg transition-shadow">
              <BookOpen size={16} className="text-white" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Skill<span className="text-brand-400">Hub</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {[
              { to: '/', label: 'Home' },
              { to: '/courses', label: 'Courses' },
              { to: '/challenges', label: 'Challenges' },
              { to: '/learning-paths', label: 'Learning Paths' },
              { to: '/leaderboard', label: 'Leaderboard' },
            ].map(link => (
              <Link
                key={link.to}
                to={link.to}
                className="px-3 py-2 text-sm text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-5 py-2 text-sm font-semibold bg-brand-600 hover:bg-brand-500 text-white rounded-xl transition-all duration-200 shadow-glow-brand hover:scale-[1.02] active:scale-[0.98]"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-surface-500 transition-colors"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-surface-800 border-t border-white/[0.06] px-4 py-4 flex flex-col gap-2 animate-slide-up">
          {[
            { to: '/', label: 'Home' },
            { to: '/courses', label: 'Courses' },
            { to: '/challenges', label: 'Challenges' },
            { to: '/learning-paths', label: 'Learning Paths' },
            { to: '/leaderboard', label: 'Leaderboard' },
          ].map(link => (
            <Link
              key={link.to}
              to={link.to}
              className="px-4 py-2.5 text-gray-300 hover:text-white hover:bg-surface-600 rounded-xl transition-all"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex gap-3 mt-2 pt-2 border-t border-white/[0.06]">
            <Link to="/login" className="flex-1 py-2.5 text-center text-sm font-medium text-gray-300 border border-white/10 rounded-xl hover:bg-surface-500">Login</Link>
            <Link to="/register" className="flex-1 py-2.5 text-center text-sm font-semibold bg-brand-600 text-white rounded-xl hover:bg-brand-500">Get Started</Link>
          </div>
        </div>
      )}
    </nav>
  );
}

// ==================== AUTHENTICATED TOPBAR ====================
export function AuthTopbar() {
  const { user, notifications, unreadCount, markAllRead } = useAuth();
  const { setSearchOpen, setSidebarCollapsed, sidebarCollapsed } = useApp();
  const [notifOpen, setNotifOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const notifRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
      if (userRef.current && !userRef.current.contains(e.target as Node)) setUserOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className="h-16 flex items-center justify-between px-4 sm:px-6 bg-surface-800/50 border-b border-white/[0.06] backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-surface-500 transition-colors"
        >
          <Menu size={18} />
        </button>
        
        {/* Search */}
        <button
          onClick={() => setSearchOpen(true)}
          className="hidden sm:flex items-center gap-2 px-4 py-2 bg-surface-600 border border-white/[0.06] rounded-xl text-sm text-gray-400 hover:text-gray-200 hover:border-brand-500/30 transition-all duration-200 w-64"
        >
          <Search size={14} />
          <span>Search anything...</span>
          <kbd className="ml-auto text-xs bg-surface-400 px-1.5 py-0.5 rounded">⌘K</kbd>
        </button>
      </div>

      <div className="flex items-center gap-2">
        {/* XP Display */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-surface-600 rounded-xl border border-white/[0.06]">
          <Zap size={14} className="text-accent-400" />
          <span className="text-sm font-semibold text-white">{user?.xp?.toLocaleString()}</span>
          <span className="text-xs text-gray-500">XP</span>
        </div>

        {/* Streak */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-surface-600 rounded-xl border border-white/[0.06]">
          <Flame size={14} className="text-orange-400" />
          <span className="text-sm font-semibold text-white">{user?.streak}</span>
        </div>

        {/* Notifications */}
        <div ref={notifRef} className="relative">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative p-2 rounded-xl text-gray-400 hover:text-white hover:bg-surface-500 transition-colors"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-danger-500 rounded-full text-white text-[10px] font-bold flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
          {notifOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-surface-700 border border-white/10 rounded-2xl shadow-2xl animate-slide-up z-50">
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
                <h3 className="font-semibold text-white">Notifications</h3>
                <button onClick={markAllRead} className="text-xs text-brand-400 hover:text-brand-300">Mark all read</button>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.slice(0, 5).map(n => (
                  <div key={n.id} className={`flex gap-3 px-4 py-3 border-b border-white/[0.04] hover:bg-surface-600 transition-colors cursor-pointer ${!n.read ? 'bg-brand-600/5' : ''}`}>
                    <span className="text-xl flex-shrink-0">{n.icon}</span>
                    <div>
                      <div className="text-sm font-medium text-white">{n.title}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{n.message}</div>
                    </div>
                    {!n.read && <div className="w-2 h-2 rounded-full bg-brand-400 flex-shrink-0 mt-1" />}
                  </div>
                ))}
              </div>
              <button
                onClick={() => { navigate('/notifications'); setNotifOpen(false); }}
                className="w-full py-3 text-center text-sm text-brand-400 hover:text-brand-300 font-medium hover:bg-surface-600 rounded-b-2xl transition-colors"
              >
                View all notifications
              </button>
            </div>
          )}
        </div>

        {/* User dropdown */}
        <div ref={userRef} className="relative">
          <button
            onClick={() => setUserOpen(!userOpen)}
            className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-surface-500 transition-colors"
          >
            <Avatar name={user?.name || 'Alex'} size="sm" />
            <ChevronDown size={14} className="text-gray-400 hidden sm:block" />
          </button>
          {userOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-surface-700 border border-white/10 rounded-2xl shadow-2xl animate-slide-up z-50">
              <div className="px-4 py-3 border-b border-white/[0.06]">
                <div className="font-semibold text-white text-sm">{user?.name}</div>
                <div className="text-xs text-gray-400">Level {user?.level} · {user?.xp} XP</div>
              </div>
              {[
                { icon: <User size={14} />, label: 'Profile', to: '/profile' },
                { icon: <Settings size={14} />, label: 'Settings', to: '/settings' },
              ].map(item => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-surface-600 transition-colors first:mt-1"
                  onClick={() => setUserOpen(false)}
                >
                  <span className="text-gray-400">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
              <div className="border-t border-white/[0.06] mt-1 mb-1">
                <button
                  onClick={() => { logout(); navigate('/'); setUserOpen(false); }}
                  className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-danger-500 hover:bg-surface-600 transition-colors rounded-b-2xl"
                >
                  <LogOut size={14} />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
