import { useState } from 'react'
import styles from './About.module.css'

const SVG = '/assets/svgs/about'

export function About() {
  const [laptopVisible, setLaptopVisible] = useState(false)

  return (
    <section id="about" data-section-id="about" className={styles.section}>
      <div className={styles.upper}>
        <h2>Hi!</h2>
        <img className={styles.waves} src={`${SVG}/waves.svg`} alt="" />
      </div>

      <div className={styles.mid}>
        <h2 className={styles.outlines}>I'm</h2>
        <div className={styles.carloContainer} data-tilt>
          <h2 className={styles.carloBlack}>Carlo</h2>
          <h2 className={styles.carloGreen}>Carlo</h2>
        </div>
      </div>

      <div className={styles.belowBlock} />

      <img className={styles.arrow} src={`${SVG}/arrow.svg`} alt="" />

      <h3 className={styles.description}>
        A self taught{' '}
        <span
          className={styles.descriptionOutlines}
          onMouseOver={() => setLaptopVisible(true)}
          onMouseOut={() => setLaptopVisible(false)}
        >
          junior web developer
        </span>
        <br /> based in Switzerland
      </h3>

      <img
        className={`${styles.laptop} ${laptopVisible ? styles.laptopActive : ''}`}
        src={`${SVG}/laptop.svg`}
        alt="Laptop illustration"
      />

      <div className={styles.design}>
        <img className={styles.wavyLine} src={`${SVG}/curvyline.svg`} alt="" />
        <p className={styles.smallText}>
          *I also like <span className={styles.emphasize}>designing</span> stuff!
        </p>
      </div>
    </section>
  )
}
