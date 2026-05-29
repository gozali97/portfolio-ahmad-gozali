'use client'

import { useEffect, useRef } from 'react'

/**
 * Hook that triggers CSS class changes when elements enter viewport.
 * Usage: const ref = useScrollAnimation()
 * Then: <div ref={ref} className="scroll-hidden">
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
            entry.target.classList.add('scroll-visible', 'scroll-visible-x')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    // Observe the element itself and all children with scroll-hidden
    observer.observe(el)
    el.querySelectorAll('.scroll-hidden, .scroll-hidden-left, .scroll-hidden-right').forEach((child) => {
      observer.observe(child)
    })

    return () => observer.disconnect()
  }, [])

  return ref
}
