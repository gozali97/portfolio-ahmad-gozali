'use client'

import { useEffect, useRef, useCallback } from 'react'
import { useClerk } from '@clerk/nextjs'

// Auto sign-out after this many minutes of inactivity.
const TIMEOUT_MINUTES = 10
const TIMEOUT_MS = TIMEOUT_MINUTES * 60 * 1000
const STORAGE_KEY = 'admin-session-deadline'

/**
 * Signs the admin out after a period of inactivity.
 * Any mouse/keyboard/scroll/touch activity resets the countdown.
 * The deadline is stored so a page refresh does not reset it.
 * Mount this inside the protected admin area only.
 */
export default function SessionTimeout() {
  const { signOut } = useClerk()
  const timerRef = useRef(null)

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    signOut({ redirectUrl: '/admin/sign-in?expired=1' })
  }, [signOut])

  // (Re)start the countdown and persist the new deadline.
  const resetTimer = useCallback(() => {
    const deadline = Date.now() + TIMEOUT_MS
    localStorage.setItem(STORAGE_KEY, String(deadline))
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(logout, TIMEOUT_MS)
  }, [logout])

  useEffect(() => {
    // If a stored deadline already passed (e.g. tab was closed), sign out now.
    const stored = Number(localStorage.getItem(STORAGE_KEY))
    const remaining = stored ? stored - Date.now() : TIMEOUT_MS

    if (stored && remaining <= 0) {
      logout()
      return
    }

    // Resume the existing countdown instead of restarting it from scratch.
    timerRef.current = setTimeout(logout, remaining > 0 ? remaining : TIMEOUT_MS)

    const events = ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart', 'click']
    events.forEach((e) => window.addEventListener(e, resetTimer, { passive: true }))

    return () => {
      events.forEach((e) => window.removeEventListener(e, resetTimer))
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [resetTimer, logout])

  return null
}
