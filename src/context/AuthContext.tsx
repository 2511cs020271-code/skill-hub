import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { User, Notification } from '../types';
import { mockUser, mockNotifications } from '../data/mockData';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  notifications: Notification[];
  unreadCount: number;
}

type AuthAction =
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'ADD_XP'; payload: number }
  | { type: 'MARK_NOTIFICATION_READ'; payload: string }
  | { type: 'MARK_ALL_READ' }
  | { type: 'ADD_NOTIFICATION'; payload: Notification }
  | { type: 'UPDATE_USER'; payload: Partial<User> };

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  notifications: mockNotifications,
  unreadCount: mockNotifications.filter(n => !n.read).length,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload, isAuthenticated: true, isLoading: false };
    case 'LOGOUT':
      return { ...state, user: null, isAuthenticated: false };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'ADD_XP': {
      if (!state.user) return state;
      const newXP = state.user.xp + action.payload;
      const leveled = newXP >= state.user.xpToNextLevel;
      return {
        ...state,
        user: {
          ...state.user,
          xp: leveled ? newXP - state.user.xpToNextLevel : newXP,
          level: leveled ? state.user.level + 1 : state.user.level,
          xpToNextLevel: leveled ? Math.floor(state.user.xpToNextLevel * 1.2) : state.user.xpToNextLevel,
        }
      };
    }
    case 'MARK_NOTIFICATION_READ':
      return {
        ...state,
        notifications: state.notifications.map(n =>
          n.id === action.payload ? { ...n, read: true } : n
        ),
        unreadCount: Math.max(0, state.unreadCount - 1),
      };
    case 'MARK_ALL_READ':
      return {
        ...state,
        notifications: state.notifications.map(n => ({ ...n, read: true })),
        unreadCount: 0,
      };
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [action.payload, ...state.notifications],
        unreadCount: state.unreadCount + 1,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null,
      };
    default:
      return state;
  }
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  addXP: (amount: number) => void;
  markNotificationRead: (id: string) => void;
  markAllRead: () => void;
  addNotification: (notification: Notification) => void;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check for existing session on mount
  useEffect(() => {
    const stored = localStorage.getItem('skillhub_user');
    if (stored) {
      try {
        const user = JSON.parse(stored);
        dispatch({ type: 'LOGIN', payload: user });
      } catch {}
    }
  }, []);

  const login = async (email: string, _password: string): Promise<boolean> => {
    dispatch({ type: 'SET_LOADING', payload: true });
    await new Promise(r => setTimeout(r, 1200)); // Simulate API
    // Demo: accept any credentials
    const user = { ...mockUser, email };
    dispatch({ type: 'LOGIN', payload: user });
    localStorage.setItem('skillhub_user', JSON.stringify(user));
    return true;
  };

  const register = async (name: string, email: string, _password: string): Promise<boolean> => {
    dispatch({ type: 'SET_LOADING', payload: true });
    await new Promise(r => setTimeout(r, 1500));
    const user = { ...mockUser, name, email, username: name.toLowerCase().replace(' ', ''), xp: 0, level: 1, streak: 0 };
    dispatch({ type: 'LOGIN', payload: user });
    localStorage.setItem('skillhub_user', JSON.stringify(user));
    return true;
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('skillhub_user');
  };

  const addXP = (amount: number) => {
    dispatch({ type: 'ADD_XP', payload: amount });
    if (state.user) {
      const updated = { ...state.user, xp: state.user.xp + amount };
      localStorage.setItem('skillhub_user', JSON.stringify(updated));
    }
  };

  const markNotificationRead = (id: string) => dispatch({ type: 'MARK_NOTIFICATION_READ', payload: id });
  const markAllRead = () => dispatch({ type: 'MARK_ALL_READ' });
  const addNotification = (n: Notification) => dispatch({ type: 'ADD_NOTIFICATION', payload: n });
  const updateUser = (updates: Partial<User>) => dispatch({ type: 'UPDATE_USER', payload: updates });

  return (
    <AuthContext.Provider value={{
      ...state,
      login,
      register,
      logout,
      addXP,
      markNotificationRead,
      markAllRead,
      addNotification,
      updateUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
