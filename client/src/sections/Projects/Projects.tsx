import { Fragment, useState } from 'react';
import { PROJECTS, type Project } from '../../data/projects';
import { GithubIcon } from '../../components/ui/GithubIcon';
import { useInView } from '../../hooks/useInView';
import styles from './Projects.module.css';
import ProjectsOverlay from './ProjectsOverlay';

const PLACEHOLDER = '/assets/images/projects/projects-placeholder.png';

export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [watched, setWatched] = useState<Set<string>>(new Set());
  const [fieldVisible, setFieldVisible] = useState(false); // description field opacity
  const [fieldInView, setFieldInView] = useState(false); // arrow toggles slide-in
  const [showVideo, setShowVideo] = useState(false);

  // Staggered entrance reveal, triggered when the section scrolls into view.
  const [sectionRef, loaded] = useInView<HTMLElement>({ threshold: 0.5 });

  const selectProject = (project: Project) => {
    setSelected(project);
    setWatched((prev) => new Set(prev).add(project.slug));
    setShowVideo(false);
    if (!fieldVisible) setFieldVisible(true);
  };

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
              const isActive = selected?.slug === project.slug;
              const isWatched = watched.has(project.slug);
              return (
                <li key={project.slug} className={styles.listObject}>
                  <div
                    className={`${styles.reveal} ${
                      loaded ? styles.revealIn : ''
                    }`}
                    style={{ transitionDelay: `${200 + index * 100}ms` }}
                  >
                    <div className={styles.arrow}>
                      <img src="/assets/svgs/projects/arrow-before.svg" />
                    </div>
                    <a
                      href="#projects"
                      className={`${styles.projectlink} ${isActive ? styles.linkActive : ''} ${
                        isWatched ? styles.watched : ''
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        selectProject(project);
                      }}
                    >
                      <span className={styles.listObjectSpan}>
                        {String(index + 1).padStart(2, '0')}{' '}
                      </span>
                      {project.name}
                    </a>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        <section className={`${styles.subsection} ${styles.subsectionRight}`}>
          {' '}
          {selected === null && (
            <div className={styles.placeholder}>
              <img src={PLACEHOLDER} />
            </div>
          )}
          <div
            className={`${styles.preview} ${
              loaded ? styles.previewLoaded : ''
            }`}
            style={selected ? { backgroundImage: 'none' } : undefined}
            onMouseEnter={() => selected && setShowVideo(true)}
            onMouseLeave={() => setShowVideo(false)}
          >
            {' '}
            <ProjectsOverlay selected={selected} isOverlayVisible={true} />
            <a
              className={styles.previewAnchor}
              href={selected?.link ?? '#projects'}
              target={selected ? '_blank' : undefined}
              rel="noreferrer"
            >
              {selected && (
                <img
                  className={styles.projectImage}
                  src={selected.image}
                  alt={`Image of project ${selected.name}`}
                  onError={(e) => {
                    e.currentTarget.src = PLACEHOLDER;
                  }}
                />
              )}
              {selected && showVideo && (
                <video
                  className={styles.projectVideo}
                  src={selected.video}
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
  );
}
