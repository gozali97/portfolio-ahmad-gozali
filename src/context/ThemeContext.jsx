import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Check for saved theme preference or use system preference
  const getSavedTheme = () => {
    if (typeof window === 'undefined') return 'dark';
    
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark' || savedTheme === 'light') {
      return savedTheme;
    }
    
    // If saved theme is system or no preference, check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    return 'light';
  };

  const [theme, setTheme] = useState('dark'); // Default to dark to prevent flash
  const [themeMode, setThemeMode] = useState('system'); // 'system', 'dark', or 'light'

  // Initialize theme after mount to avoid hydration mismatch
  useEffect(() => {
    setTheme(getSavedTheme());
    const savedMode = localStorage.getItem('themeMode') || 'system';
    setThemeMode(savedMode);
  }, []);

  // Apply theme to document
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const root = window.document.documentElement;
    
    // Apply dark mode
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    // Save to localStorage
    localStorage.setItem('theme', theme);
    localStorage.setItem('themeMode', themeMode);
  }, [theme, themeMode]);

  // Listen for system preference changes if in system mode
  useEffect(() => {
    if (typeof window === 'undefined' || themeMode !== 'system') return;
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      if (themeMode === 'system') {
        setTheme(mediaQuery.matches ? 'dark' : 'light');
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [themeMode]);

  // Function to change theme mode
  const changeThemeMode = (mode) => {
    setThemeMode(mode);
    
    if (mode === 'system') {
      // Check system preference
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      setTheme(systemTheme);
    } else {
      // Apply selected theme directly
      setTheme(mode);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, themeMode, changeThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
