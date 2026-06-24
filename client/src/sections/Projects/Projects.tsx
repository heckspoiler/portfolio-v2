import { Fragment, useEffect, useRef, useState } from 'react'
import { PROJECTS, type Project } from '../../data/projects'
import { GithubIcon } from '../../components/ui/GithubIcon'
import styles from './Projects.module.css'

const IMG_BASE = '/assets/images/projects/testimages'
const VIDEO_BASE = '/assets/images/projects/testvideos'

export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null)
  const [watched, setWatched] = useState<Set<string>>(new Set())
  const [fieldVisible, setFieldVisible] = useState(false) // description field opacity
  const [fieldInView, setFieldInView] = useState(false) // arrow toggles slide-in
  const [showVideo, setShowVideo] = useState(false)
  const [loaded, setLoaded] = useState(false) // entrance reveal (Phase 4 wires to scroll)

  const sectionRef = useRef<HTMLElement>(null)

  // Reveal once mounted; Phase 4 will re-trigger this on scroll into view.
  useEffect(() => {
    const id = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(id)
  }, [])

  const selectProject = (project: Project) => {
    setSelected(project)
    setWatched((prev) => new Set(prev).add(project.slug))
    setShowVideo(false)
    if (!fieldVisible) setFieldVisible(true)
  }

  return (
    <section
      id="projects"
      data-section-id="projects"
      className={styles.section}
      ref={sectionRef}
    >
      <h2 className={`${styles.title} ${loaded ? styles.titleLoaded : ''}`}>
        Projects
      </h2>

      <div
        className={`${styles.descriptionField} ${
          fieldVisible ? styles.fieldVisible : ''
        } ${fieldInView ? styles.fieldInView : ''}`}
      >
        <div
          className={styles.arrowContainer}
          onClick={() => setFieldInView((v) => !v)}
        >
          <div
            className={`${styles.arrow} ${
              fieldInView ? styles.arrowRotated : ''
            }`}
          />
        </div>
        <h3>{selected ? selected.name : 'quite empty here...'}</h3>
        <p>
          {selected
            ? selected.longDescription
            : 'click on a project to get more information'}
        </p>
      </div>

      <section className={styles.container}>
        <section className={`${styles.subsection} ${styles.subsectionLeft}`}>
          <ul className={styles.list}>
            {PROJECTS.map((project, index) => {
              const isActive = selected?.slug === project.slug
              const isWatched = watched.has(project.slug)
              return (
                <li
                  key={project.slug}
                  className={`${styles.listObject} ${
                    loaded ? styles.listObjectLoaded : ''
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <a
                    href="#projects"
                    className={`${isActive ? styles.linkActive : ''} ${
                      isWatched ? styles.watched : ''
                    }`}
                    onClick={(e) => {
                      e.preventDefault()
                      selectProject(project)
                    }}
                  >
                    <span className={styles.listObjectSpan}>
                      {String(index + 1).padStart(2, '0')}{' '}
                    </span>
                    {project.name}
                  </a>
                </li>
              )
            })}
          </ul>
        </section>

        <section className={`${styles.subsection} ${styles.subsectionRight}`}>
          <div
            className={`${styles.preview} ${
              loaded ? styles.previewLoaded : ''
            }`}
            style={selected ? { backgroundImage: 'none' } : undefined}
            onMouseEnter={() => selected && setShowVideo(true)}
            onMouseLeave={() => setShowVideo(false)}
          >
            <a
              className={styles.previewAnchor}
              href={selected?.link ?? '#projects'}
              target={selected ? '_blank' : undefined}
              rel="noreferrer"
            >
              {selected && (
                <img
                  className={styles.projectImage}
                  src={`${IMG_BASE}/${selected.slug}.png`}
                  alt={`Image of project ${selected.name}`}
                />
              )}
              {selected && showVideo && (
                <video
                  className={styles.projectVideo}
                  src={`${VIDEO_BASE}/${selected.slug}.mp4`}
                  preload="metadata"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              )}
            </a>
          </div>

          <div
            className={`${styles.footnotes} ${
              fieldInView ? styles.footnotesHidden : ''
            }`}
          >
            <h3 className={styles.subtitle}>{selected?.shortDescription}</h3>
            {selected && (
              <div className={styles.technologies}>
                {selected.technologies.map((tech) => (
                  <Fragment key={tech}>
                    <p>{tech}</p>
                    <div className={styles.decorDot} />
                  </Fragment>
                ))}
                <a href={selected.github} target="_blank" rel="noreferrer">
                  <GithubIcon className={styles.githubIcon} />
                </a>
              </div>
            )}
          </div>
        </section>
      </section>
    </section>
  )
}
