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
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 group hover:scale-110 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]"
      style={{
        background: isDark
          ? 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))'
          : 'linear-gradient(135deg, rgba(0,0,0,0.08), rgba(0,0,0,0.03))',
        border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* Icon container with rotation animation */}
      <div className="relative w-5 h-5">
        {/* Sun */}
        <Sun
          size={20}
          className={`absolute inset-0 transition-all duration-500 ${
            isDark
              ? 'opacity-100 rotate-0 scale-100 text-amber-400'
              : 'opacity-0 -rotate-90 scale-50 text-amber-400'
          }`}
        />
        {/* Moon */}
        <Moon
          size={20}
          className={`absolute inset-0 transition-all duration-500 ${
            isDark
              ? 'opacity-0 rotate-90 scale-50 text-blue-400'
              : 'opacity-100 rotate-0 scale-100 text-blue-400'
          }`}
        />
      </div>

      {/* Ripple ring on hover */}
      <span className="absolute inset-0 rounded-full border border-cyan-400/0 group-hover:border-cyan-400/20 group-hover:scale-125 transition-all duration-700" />
    </button>
  )
}
