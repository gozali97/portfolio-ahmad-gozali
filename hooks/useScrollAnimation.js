'use client'

import { useEffect, useRef } from 'react'

/**
 * Reveals elements as they enter the viewport.
 * Usage: const ref = useScrollAnimation()
 * Then add className="reveal" (optionally data-delay="1..6") to children.
 */
export function useScrollAnimation() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-in')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    )

    if (el.classList.contains('reveal')) observer.observe(el)
    el.querySelectorAll('.reveal').forEach((child) => observer.observe(child))

    return () => observer.disconnect()
  }, [])

  return ref
}
