'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

type ThemeMode = 'dark' | 'light';

interface ThemeContextType {
  currentTheme: ThemeMode;
  setCurrentTheme: (theme: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<ThemeMode>('dark');

  // 當主題改變時，更新 document.body 的背景色（平滑過渡）
  useEffect(() => {
    const body = document.body;
    if (currentTheme === 'light') {
      body.style.backgroundColor = '#FFFFFF';
      body.style.color = '#000000';
    } else {
      body.style.backgroundColor = '#000000';
      body.style.color = '#FFFFFF';
    }
  }, [currentTheme]);

  return (
    <ThemeContext.Provider value={{ currentTheme, setCurrentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
