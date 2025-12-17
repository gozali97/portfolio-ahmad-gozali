import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { IconSun, IconMoon, IconDeviceDesktop } from '@tabler/icons-react';

const ThemeToggle = () => {
  const { themeMode, changeThemeMode } = useTheme();

  return (
    <div className="flex items-center space-x-2 bg-gray-800 dark:bg-gray-800 bg-gray-200 p-1 rounded-lg">
      <button
        onClick={() => changeThemeMode('light')}
        className={`p-1.5 rounded-md ${
          themeMode === 'light'
            ? 'bg-cyan-500 text-white'
            : 'text-gray-400 dark:hover:text-white hover:text-gray-700 hover:bg-gray-300 dark:hover:bg-gray-700'
        }`}
        aria-label="Light mode"
      >
        <IconSun size={18} />
      </button>
      <button
        onClick={() => changeThemeMode('dark')}
        className={`p-1.5 rounded-md ${
          themeMode === 'dark'
            ? 'bg-cyan-500 text-white'
            : 'text-gray-400 dark:hover:text-white hover:text-gray-700 hover:bg-gray-300 dark:hover:bg-gray-700'
        }`}
        aria-label="Dark mode"
      >
        <IconMoon size={18} />
      </button>
      <button
        onClick={() => changeThemeMode('system')}
        className={`p-1.5 rounded-md ${
          themeMode === 'system'
            ? 'bg-cyan-500 text-white'
            : 'text-gray-400 dark:hover:text-white hover:text-gray-700 hover:bg-gray-300 dark:hover:bg-gray-700'
        }`}
        aria-label="System preference"
      >
        <IconDeviceDesktop size={18} />
      </button>
    </div>
  );
};

export default ThemeToggle;
