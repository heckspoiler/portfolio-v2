import { NAV_SECTIONS, SECTION_MAP, type SectionId } from '../../data/sections'
import styles from './Navbar.module.css'

interface NavbarProps {
  active: SectionId
}

export function Navbar({ active }: NavbarProps) {
  const theme = SECTION_MAP[active].nav

  return (
    <header className={styles.navbar}>
      <p className={styles.current} style={{ color: theme.text }}>
        {SECTION_MAP[active].label}
      </p>
      <ul className={styles.list}>
        {NAV_SECTIONS.map((section) => {
          const isActive = section.id === active
          return (
            <a key={section.id} href={`#${section.id}`} aria-label={section.label}>
              <li
                className={styles.dot}
                style={{
                  borderColor: theme.border,
                  backgroundColor: isActive ? theme.active : 'transparent',
                }}
              />
            </a>
          )
        })}
      </ul>
    </header>
  )
}
