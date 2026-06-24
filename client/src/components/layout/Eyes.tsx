import { useEffect, useRef } from 'react'
import styles from './Eyes.module.css'

interface EyesProps {
  /** Sclera color for the active section. */
  color: string
}

// Moves an iris toward the cursor, capped to a small radius (ported from eyes.js).
function moveEye(eye: HTMLElement | null, mouseX: number, mouseY: number) {
  if (!eye) return
  const { left, top } = eye.getBoundingClientRect()
  const angle = Math.atan2(mouseY - top, mouseX - left)
  const pupil = eye.querySelector<HTMLElement>('div')
  if (!pupil) return
  pupil.style.left = `${8 * Math.cos(angle)}px`
  pupil.style.top = `${10 * Math.sin(angle)}px`
}

export function Eyes({ color }: EyesProps) {
  const leftIris = useRef<HTMLDivElement>(null)
  const rightIris = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      moveEye(leftIris.current, e.pageX, e.pageY)
      moveEye(rightIris.current, e.pageX, e.pageY)
    }
    document.addEventListener('mousemove', onMove)
    return () => document.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div className={styles.container} aria-hidden="true">
      <div className={styles.relative}>
        <div
          className={`${styles.eye} ${styles.left}`}
          style={{ backgroundColor: color }}
        >
          <div ref={leftIris} className={styles.iris}>
            <div />
          </div>
        </div>
        <div
          className={`${styles.eye} ${styles.right}`}
          style={{ backgroundColor: color }}
        >
          <div ref={rightIris} className={styles.iris}>
            <div />
          </div>
        </div>
      </div>
    </div>
  )
}
