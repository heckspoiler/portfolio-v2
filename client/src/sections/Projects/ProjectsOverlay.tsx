import { useEffect } from 'react';
import styles from './ProjectsOverlay.module.css';
import type { Project } from '../../data/projects';

type ProjectsOverlayProps = {
  selected: Project | null;
  isOverlayVisible: boolean;
  onClose: () => void;
};

export default function ProjectsOverlay({
  selected,
  isOverlayVisible,
  onClose,
}: ProjectsOverlayProps) {
  // Close the panel when Escape is pressed (only while it's open).
  useEffect(() => {
    if (!isOverlayVisible) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOverlayVisible, onClose]);

  return (
    <div
      className={`${styles.overlay} ${
        isOverlayVisible ? styles.overlayVisible : ''
      }`}
    >
      <div className={styles.close} onClick={onClose} />
      <div className={styles.overlaycontent}>
        <h3>{selected?.name}</h3>
        <p>{selected?.longDescription}</p>
      </div>
    </div>
  );
}
