import { useEffect, useRef, useState } from 'react'

interface UseInViewOptions {
  /** Visibility ratio required to count as "in view". */
  threshold?: number
  /** If true, stays true once triggered (doesn't reset on scroll out). */
  once?: boolean
}

/**
 * Tracks whether the referenced element is in the viewport, driving the
 * scroll-triggered entrance animations (ported from the per-section
 * IntersectionObserver "loading animation" scripts).
 */
export function useInView<T extends HTMLElement>({
  threshold = 0.5,
  once = false,
}: UseInViewOptions = {}) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true)
        else if (!once) setInView(false)
      },
      { threshold },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, once])

  return [ref, inView] as const
}
