import { useEffect, useState, type RefObject } from 'react'
import type { SectionId } from '../data/sections'

/**
 * Tracks which section is currently in view inside the scroll-snap container,
 * mirroring the legacy IntersectionObserver scripts (threshold 0.7).
 *
 * Sections are matched by their `[data-section-id]` attribute.
 */
export function useActiveSection(
  rootRef: RefObject<HTMLElement | null>,
  initial: SectionId = 'landing',
): SectionId {
  const [active, setActive] = useState<SectionId>(initial)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const targets = root.querySelectorAll<HTMLElement>('[data-section-id]')
    if (targets.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-section-id') as SectionId
            setActive(id)
            history.replaceState(null, '', `#${id}`)
          }
        }
      },
      { root, threshold: 0.7 },
    )

    targets.forEach((t) => observer.observe(t))
    return () => observer.disconnect()
  }, [rootRef])

  return active
}
