import { useEffect, useRef, useState } from 'react'
import styles from './Cursor.module.css'

type CursorShape = 'default' | 'grow' | 'text'

// Elements that grow the cursor on hover (ported from cursor.js).
const GROW_SELECTOR =
  'img, a, button, .projects-github, .contact-cross, .arrow-container'
const TEXT_SELECTOR = 'input, textarea'

interface CursorProps {
  /** Cursor fill color for the active section. */
  color: string
}

export function Cursor({ color }: CursorProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [shape, setShape] = useState<CursorShape>('default')

  useEffect(() => {
    const cursor = ref.current
    if (!cursor) return

    const move = (e: MouseEvent) => {
      cursor.style.transform = `translate3d(${e.clientX - 10}px, ${
        e.clientY - 10
      }px, 0)`
    }
    window.addEventListener('mousemove', move)

    // Delegate hover detection so dynamically-added elements are covered.
    const over = (e: MouseEvent) => {
      const target = e.target as Element | null
      if (!target?.closest) return
      if (target.closest(TEXT_SELECTOR)) setShape('text')
      else if (target.closest(GROW_SELECTOR)) setShape('grow')
      else setShape('default')
    }
    document.addEventListener('mouseover', over)

    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', over)
    }
  }, [])

  return (
    <div
      ref={ref}
      className={`${styles.cursor} ${styles[shape]}`}
      style={{ backgroundColor: color }}
      aria-hidden="true"
    />
  )
}
