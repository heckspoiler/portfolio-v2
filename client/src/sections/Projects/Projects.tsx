import { Fragment, useState } from 'react';
import { PROJECTS, type Project } from '../../data/projects';
import { GithubIcon } from '../../components/ui/GithubIcon';
import { useInView } from '../../hooks/useInView';
import styles from './Projects.module.css';
import ProjectsOverlay from './ProjectsOverlay';

const PLACEHOLDER = '/assets/images/projects/projects-placeholder.png';

const STATUS_LABELS: Record<Project['status'], string> = {
  production: 'In Production',
  development: 'In Development',
};

export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [watched, setWatched] = useState<Set<string>>(new Set());
  const [showVideo, setShowVideo] = useState(false);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [mediaLoaded, setMediaLoaded] = useState(false);

  const [sectionRef, loaded] = useInView<HTMLElement>({ threshold: 0.5 });

  const selectProject = (project: Project) => {
    setSelected(project);
    setWatched((prev) => new Set(prev).add(project.slug));
    setShowVideo(false);
    setOverlayOpen(false);
    setMediaLoaded(false);
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
                      <img src="/assets/svgs/projects/arrow-before.svg" alt="" />
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
              <img src={PLACEHOLDER} alt="" />
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
            <ProjectsOverlay
              selected={selected}
              isOverlayVisible={overlayOpen}
              onClose={() => setOverlayOpen(false)}
            />
            {selected && (
              <span
                className={`${styles.statusBadge} ${styles[selected.status]}`}
              >
                {STATUS_LABELS[selected.status]}
              </span>
            )}
            <a
              className={`${styles.previewAnchor} ${
                selected?.link
                  ? 'project-has-link'
                  : selected
                    ? 'project-no-link'
                    : ''
              }`}
              href={selected?.link ?? undefined}
              target={selected?.link ? '_blank' : undefined}
              rel={selected?.link ? 'noreferrer' : undefined}
            >
              {selected && !mediaLoaded && (
                <div className={styles.loader} aria-label="Loading project media">
                  <span />
                  <span />
                  <span />
                </div>
              )}
              {selected && (
                <img
                  className={styles.projectImage}
                  src={selected.image}
                  alt={`Image of project ${selected.name}`}
                  onLoad={() => setMediaLoaded(true)}
                  onError={(e) => {
                    e.currentTarget.src = PLACEHOLDER;
                    setMediaLoaded(true);
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
          <div className={styles.footnotes}>
            <div className={styles.footnotesHeader}>
              <h3 className={styles.subtitle}>{selected?.shortDescription}</h3>
              {selected && (
                <button
                  type="button"
                  className={styles.readMore}
                  onClick={() => setOverlayOpen((open) => !open)}
                >
                  {overlayOpen ? 'close' : 'read more'}
                </button>
              )}
            </div>
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
