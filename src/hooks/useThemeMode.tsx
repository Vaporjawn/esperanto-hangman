import { useState, useEffect, createContext, useContext } from 'react';
import type { PaletteMode } from '@mui/material';
import type { ReactNode } from 'react';

const THEME_STORAGE_KEY = 'esperanto-hangman-theme';

interface ThemeModeContextType {
  mode: PaletteMode;
  toggleTheme: () => void;
  setThemeMode: (mode: PaletteMode) => void;
}

const ThemeModeContext = createContext<ThemeModeContextType | null>(null);

/**
 * Provider component for theme mode context
 * Manages theme state and persistence across the entire app
 */
export const ThemeModeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<PaletteMode>(() => {
    // Try to load saved preference
    const savedMode = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedMode === 'light' || savedMode === 'dark') {
      return savedMode;
    }

    // Default to light mode
    return 'light';
  });

  useEffect(() => {
    // Save preference to localStorage
    localStorage.setItem(THEME_STORAGE_KEY, mode);
  }, [mode]);

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const setThemeMode = (newMode: PaletteMode) => {
    setMode(newMode);
  };

  return (
    <ThemeModeContext.Provider value={{ mode, toggleTheme, setThemeMode }}>
      {children}
    </ThemeModeContext.Provider>
  );
};

/**
 * Custom hook for accessing theme mode context
 * Must be used within ThemeModeProvider
 */
export const useThemeMode = () => {
  const context = useContext(ThemeModeContext);
  if (!context) {
    throw new Error('useThemeMode must be used within ThemeModeProvider');
  }
  return context;
};
