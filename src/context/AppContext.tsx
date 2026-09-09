import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AppContextType {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (v: boolean) => void;
  theme: 'dark' | 'light';
  setTheme: (t: 'dark' | 'light') => void;
  searchOpen: boolean;
  setSearchOpen: (v: boolean) => void;
  xpAnimation: { show: boolean; amount: number };
  showXPGain: (amount: number) => void;
  editorLanguage: string;
  setEditorLanguage: (lang: string) => void;
  editorFontSize: number;
  setEditorFontSize: (size: number) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [searchOpen, setSearchOpen] = useState(false);
  const [xpAnimation, setXpAnimation] = useState({ show: false, amount: 0 });
  const [editorLanguage, setEditorLanguage] = useState('java');
  const [editorFontSize, setEditorFontSize] = useState(14);

  const showXPGain = (amount: number) => {
    setXpAnimation({ show: true, amount });
    setTimeout(() => setXpAnimation({ show: false, amount: 0 }), 2000);
  };

  return (
    <AppContext.Provider value={{
      sidebarCollapsed,
      setSidebarCollapsed,
      theme,
      setTheme,
      searchOpen,
      setSearchOpen,
      xpAnimation,
      showXPGain,
      editorLanguage,
      setEditorLanguage,
      editorFontSize,
      setEditorFontSize,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
