import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Sidebar } from './Sidebar';
import { AuthTopbar } from './Navbar';
import { useApp } from '../../context/AppContext';
import { SearchOverlay } from '../SearchOverlay';
import { Toaster } from 'react-hot-toast';
import { LoadingSpinner } from '../ui';

// ==================== PUBLIC LAYOUT ====================
export function PublicLayout() {
  return (
    <div className="min-h-screen bg-surface-900">
      <Outlet />
    </div>
  );
}

// ==================== AUTH LAYOUT ====================
export function AuthLayout() {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;
  return (
    <div className="min-h-screen bg-surface-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
      <Outlet />
      <Toaster position="top-right" toastOptions={{
        style: { background: '#1c1f35', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' },
      }} />
    </div>
  );
}

// ==================== PROTECTED LAYOUT ====================
export function ProtectedLayout() {
  const { isAuthenticated, isLoading } = useAuth();
  const { searchOpen, setSearchOpen, xpAnimation } = useApp();
  const location = useLocation();
  const [pageKey, setPageKey] = useState(location.pathname);

  useEffect(() => {
    setPageKey(location.pathname);
  }, [location.pathname]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface-900 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return (
    <div className="flex h-screen bg-surface-900 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <AuthTopbar />
        <main className="flex-1 overflow-y-auto">
          <div key={pageKey} className="animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Search overlay */}
      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}

      {/* XP Animation */}
      {xpAnimation.show && (
        <div className="fixed bottom-8 right-8 z-50 pointer-events-none">
          <div className="animate-xp-gain bg-accent-600 text-white font-bold text-lg px-5 py-3 rounded-2xl shadow-glow-accent flex items-center gap-2">
            <span>⚡</span>
            <span>+{xpAnimation.amount} XP</span>
          </div>
        </div>
      )}

      <Toaster position="top-right" toastOptions={{
        style: { background: '#1c1f35', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' },
      }} />
    </div>
  );
}
