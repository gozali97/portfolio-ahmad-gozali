'use client'

import { useTheme } from '@/components/ThemeProvider'
import { Sun, Moon } from 'lucide-react'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full grid place-items-center bg-paper transition-all duration-300 hover:text-accent"
      style={{ border: '1px solid rgb(var(--line) / 0.2)' }}
    >
      <div className="relative w-5 h-5">
        <Sun
          size={20}
          className={`absolute inset-0 transition-all duration-500 ${
            isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'
          }`}
        />
        <Moon
          size={20}
          className={`absolute inset-0 transition-all duration-500 ${
            isDark ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'
          }`}
        />
      </div>
    </button>
  )
}
