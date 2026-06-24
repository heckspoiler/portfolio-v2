import { useEffect, useState } from 'react'
import styles from './Skills.module.css'

const LOGO = '/assets/icons/skills/skills-logos'

// Skill bars. `id` matches the legacy level-container ids used as cube targets
// (the falling-cube GSAP animation is wired up in Phase 4).
const DESIGN_SKILLS = ['illustrator', 'photoshop', 'indesign', 'figma']
const TECH_SKILLS = ['html', 'css', 'tailwind', 'javascript', 'react']

function SkillPair({ id, loaded }: { id: string; loaded: boolean }) {
  return (
    <div
      className={`${styles.skillsPair} ${styles[id] ?? ''} ${
        loaded ? styles.skillsPairLoaded : ''
      }`}
    >
      <img
        className={styles.skillsSvg}
        src={`${LOGO}/${id}.svg`}
        alt={`image for ${id}`}
      />
      <div className={styles.levelContainer} id={id} />
    </div>
  )
}

export function Skills() {
  const [loaded, setLoaded] = useState(false)

  // Entrance reveal; Phase 4 will re-trigger this on scroll + run the cubes.
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <section id="skills" data-section-id="skills" className={styles.section}>
      <section className={styles.clickMeField}>
        <p>well, that sucks :(</p>
      </section>

      <section className={styles.dotsUpperMid}>
        {Array.from({ length: 36 }, (_, i) => (
          <div key={i} className={styles.dotUpperMid} />
        ))}
      </section>

      <div
        className={`${styles.gameboyContainer} ${
          loaded ? styles.gameboyLoaded : ''
        }`}
      >
        <div className={styles.mostOutter}>
          <div className={styles.displayOutter} />
          <div className={styles.displayInner} />
          <p className={styles.carloboy}>carlo boy</p>
          <div className={styles.buttonsCrossContainer}>
            <div className={styles.buttonsCross} />
            <div className={styles.buttonsCross} />
            <div className={styles.buttonsCross} />
            <div className={styles.buttonsCross} />
          </div>
          <div className={styles.buttonsStartSelect}>
            <div className={`${styles.buttonStart} ${styles.buttonStartSelect}`} />
            <div className={`${styles.buttonSelect} ${styles.buttonStartSelect}`} />
          </div>
          <div className={styles.buttonsAb}>
            <button className={`${styles.buttonA} ${styles.buttonAb}`} type="button">
              <p>A</p>
            </button>
            <button className={`${styles.buttonB} ${styles.buttonAb}`} type="button">
              <p>B</p>
            </button>
          </div>
          <div className={styles.speakers}>
            <div />
            <div />
            <div />
          </div>
          <div className={styles.cross}>
            {Array.from({ length: 9 }, (_, i) => (
              <div key={i} className={styles.crossElement} />
            ))}
          </div>
        </div>
      </div>

      <h2 className={`${styles.title} ${loaded ? styles.titleLoaded : ''}`}>
        Skills
      </h2>

      <section className={styles.containerMain}>
        <section className={styles.subcontainer}>
          <h3
            className={`${styles.subtitle} ${loaded ? styles.subtitlesLoaded : ''}`}
          >
            design
          </h3>
          {DESIGN_SKILLS.map((id) => (
            <SkillPair key={id} id={id} loaded={loaded} />
          ))}
        </section>

        <section className={styles.subcontainer}>
          {TECH_SKILLS.map((id) => (
            <SkillPair key={id} id={id} loaded={loaded} />
          ))}
          <h3
            className={`${styles.subtitle} ${styles.programming} ${
              loaded ? styles.subtitlesLoaded : ''
            }`}
          >
            tech stacks
          </h3>
        </section>
      </section>
    </section>
  )
}
