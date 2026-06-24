import { useEffect, useRef, useState } from 'react'
import { useInView } from '../../hooks/useInView'
import { useSkillCubes } from '../../hooks/useSkillCubes'
import styles from './Skills.module.css'

const LOGO = '/assets/icons/skills/skills-logos'

// Skill bars. `data-skill-bar` matches the keys in SKILL_LEVELS (cube targets).
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
      <div className={styles.levelContainer} data-skill-bar={id} />
    </div>
  )
}

export function Skills() {
  // Entrance reveal, triggered when the section scrolls into view.
  const [sectionRef, loaded] = useInView<HTMLElement>({ threshold: 0.5 })

  // Falling-cube animation + the "press A/B" guidance field.
  const [arranged, setArranged] = useState(false)
  const [helpVisible, setHelpVisible] = useState(false)
  const [helpText, setHelpText] = useState('well, that sucks :(')
  const helpStarted = useRef(false)

  useSkillCubes(sectionRef, styles.cubeTest, loaded, arranged)

  // Guidance text automation (ported from actionTextField.js): a few seconds
  // after the cubes drop, reveal the field and nudge toward the A/B buttons.
  useEffect(() => {
    if (!loaded || helpStarted.current) return
    helpStarted.current = true
    const timers = [
      setTimeout(() => setHelpVisible(true), 5000),
      setTimeout(() => setHelpText('I think this could be solved...'), 8000),
      setTimeout(
        () => setHelpText('by clicking A or B on the carlo boy™!'),
        10500,
      ),
    ]
    return () => timers.forEach(clearTimeout)
  }, [loaded])

  const handleArrange = () => {
    setArranged(true)
    setHelpText('Thanks for helping out!')
    setTimeout(() => setHelpVisible(false), 2500)
  }

  return (
    <section
      id="skills"
      data-section-id="skills"
      className={styles.section}
      ref={sectionRef}
    >
      <section
        className={styles.clickMeField}
        style={{ opacity: helpVisible ? 1 : 0 }}
      >
        <p>{helpText}</p>
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
            <button
              className={`${styles.buttonA} ${styles.buttonAb}`}
              type="button"
              onClick={handleArrange}
            >
              <p>A</p>
            </button>
            <button
              className={`${styles.buttonB} ${styles.buttonAb}`}
              type="button"
              onClick={handleArrange}
            >
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
