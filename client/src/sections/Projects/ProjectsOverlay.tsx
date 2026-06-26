import React from 'react';

import styles from './ProjectsOverlay.module.css';
import type { Project } from '../../data/projects';

type ProjectsOverlayProps = {
  selected: Project | null;
  isOverlayVisible: boolean;
};

export default function ProjectsOverlay({ selected }: ProjectsOverlayProps) {
  return (
    <div className={styles.overlay}>
      <div className={styles.overlaycontent}>
        <p>{selected?.longDescription}</p>
      </div>
    </div>
  );
}
