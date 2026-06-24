import { useTextWaterfall } from '../../hooks/useTextWaterfall'
import { useTilt } from '../../hooks/useTilt'
import styles from './Landing.module.css'

export function Landing() {
  const sectionRef = useTextWaterfall<HTMLElement>(0.2)
  const tiltRef = useTilt<HTMLDivElement>({
    max: 15,
    speed: 400,
    scale: 1.05,
    perspective: 1000,
  })

  return (
    <section
      id="landing"
      data-section-id="landing"
      className={styles.section}
      ref={sectionRef}
    >
      <div className={styles.inner}>
        <div className={styles.clickMe} ref={tiltRef}>
          <h2>show me something!</h2>
        </div>
        <div className={styles.magnetBlock} />
        <h3 className={styles.animationText}>welcome to my portfolio!</h3>
        <button className={styles.button} type="button">
          <span className={styles.buttonInner}>
            SHOW ME <br /> MORE!
          </span>
        </button>
      </div>
    </section>
  )
}
