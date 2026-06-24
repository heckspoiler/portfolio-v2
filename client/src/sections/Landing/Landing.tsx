import styles from './Landing.module.css'

export function Landing() {
  return (
    <section id="landing" data-section-id="landing" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.clickMe} data-tilt>
          <h2>show me something!</h2>
        </div>
        <div className={styles.magnetBlock} />
        <h3 className={styles.animationText} data-tilt>
          welcome to my portfolio!
        </h3>
        <button className={styles.button} type="button" data-tilt>
          <span className={styles.buttonInner}>
            SHOW ME <br /> MORE!
          </span>
        </button>
      </div>
    </section>
  )
}
