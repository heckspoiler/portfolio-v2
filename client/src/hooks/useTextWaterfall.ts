import { useEffect, useRef } from 'react'

const SELECTOR = 'h2, h3, h4, p, span, div, a, img, button, svg'
const STEP = 80 // ms between each element

/**
 * Staggered "waterfall" entrance: when the section scrolls into view, its
 * descendants fade + slide up one after another (ported from textWaterfall.js).
 * Returns a ref to attach to the section element.
 */
export function useTextWaterfall<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const items = Array.from(el.querySelectorAll<HTMLElement>(SELECTOR))

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          items.forEach((node, i) => {
            node.style.opacity = '0'
            node.style.transform = 'translateY(20%)'
            setTimeout(() => {
              node.style.transition =
                'opacity 0.3s ease-in-out, transform 0.3s ease-in-out'
              node.style.opacity = '1'
              node.style.transform = 'translateY(0)'
            }, STEP * (i + 1) + 250)
          })
        } else {
          items.forEach((node) => {
            node.style.opacity = '0'
          })
        }
      },
      { threshold },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return ref
}
