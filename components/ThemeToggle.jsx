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
      className="fixed bottom-5 right-5 z-50 grid h-11 w-11 place-items-center rounded-full border border-line/10 bg-paper/90 text-ink/70 shadow-[0_10px_30px_-12px_rgb(22_22_22/0.35)] backdrop-blur transition-colors hover:text-ink"
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )
}
