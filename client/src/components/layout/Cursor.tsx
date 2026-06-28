import { useEffect, useRef, useState, type CSSProperties } from 'react';
import styles from './Cursor.module.css';

type CursorShape = 'default' | 'grow' | 'text' | 'arrow' | 'outline';

const GROW_SELECTOR =
  'img, a, button, .projects-github, .contact-cross, .arrow-container';
const TEXT_SELECTOR = 'input, textarea';
// Previews that link out get a filled arrow cursor; selected previews without a
// link get a hollow (border-only) dot. Both are checked before GROW so they win
// over the image's plain grow shape. Applied via the `project-has-link` /
// `project-no-link` classes.
const LINK_SELECTOR = '.project-has-link';
const NO_LINK_SELECTOR = '.project-no-link';

interface CursorProps {
  color: string;
}

export function Cursor({ color }: CursorProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shape, setShape] = useState<CursorShape>('default');

  useEffect(() => {
    const cursor = ref.current;
    if (!cursor) return;

    const resolveShape = (target: Element | null): CursorShape => {
      if (!target?.closest) return 'default';
      if (target.closest(TEXT_SELECTOR)) return 'text';
      if (target.closest(LINK_SELECTOR)) return 'arrow';
      if (target.closest(NO_LINK_SELECTOR)) return 'outline';
      if (target.closest(GROW_SELECTOR)) return 'grow';
      return 'default';
    };

    const move = (e: MouseEvent) => {
      cursor.style.transform = `translate3d(${e.clientX - 10}px, ${
        e.clientY - 10
      }px, 0)`;
      // Re-evaluate every move so the shape stays correct even when the element
      // under a stationary cursor changes (setShape no-ops on an equal value).
      setShape(resolveShape(e.target as Element | null));
    };
    window.addEventListener('mousemove', move);

    const over = (e: MouseEvent) => {
      setShape(resolveShape(e.target as Element | null));
    };
    document.addEventListener('mouseover', over);

    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', over);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`${styles.cursor} ${styles[shape]}`}
      style={{ '--cursor-color': color } as CSSProperties}
      aria-hidden="true"
    />
  );
}
