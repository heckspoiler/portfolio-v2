// Per-section theming, ported from the legacy IntersectionObserver scripts
// (backgroundColor.js, eyes.js, sidebarScroll.js). Each section drives the
// body background, the custom cursor color, the eyes color, and the navbar.

export type SectionId = 'landing' | 'about' | 'projects' | 'skills' | 'contact'

export interface SectionConfig {
  id: SectionId
  /** Label shown in the navbar; empty for sections without an indicator. */
  label: string
  /** Whether this section gets a dot in the navbar. */
  inNav: boolean
  /** Body background color while this section is active. */
  bg: string
  /** Custom cursor color while this section is active. */
  cursor: string
  /** Eyes (sclera) color while this section is active. */
  eyes: string
  /** Navbar text + indicator colors while this section is active. */
  nav: { text: string; border: string; active: string }
}

export const SECTIONS: SectionConfig[] = [
  {
    id: 'landing',
    label: 'LANDING',
    inNav: false,
    bg: '#A4FFDE',
    cursor: '#000000',
    eyes: '#FFFFFF',
    nav: { text: '#000000', border: '#000000', active: '#000000' },
  },
  {
    id: 'about',
    label: 'ABOUT',
    inNav: true,
    bg: '#A4FFDE',
    cursor: '#31ABFD',
    eyes: '#A4FFDE',
    nav: { text: '#000000', border: '#000000', active: '#31ABFD' },
  },
  {
    id: 'projects',
    label: 'PROJECTS',
    inNav: true,
    bg: '#FFEA29',
    cursor: '#FC1616',
    eyes: '#FFEA29',
    nav: { text: '#000000', border: '#000000', active: '#FC1616' },
  },
  {
    id: 'skills',
    label: 'SKILLS',
    inNav: true,
    bg: '#711EF8',
    cursor: '#FAF126',
    eyes: '#FAF126',
    nav: { text: '#FAF126', border: '#FAF126', active: '#FAF126' },
  },
  {
    id: 'contact',
    label: 'CONTACT',
    inNav: true,
    bg: '#F46265',
    cursor: '#31ABFD',
    eyes: '#FAF126',
    nav: { text: '#FAF126', border: '#FAF126', active: '#FAF126' },
  },
]

export const SECTION_MAP: Record<SectionId, SectionConfig> = SECTIONS.reduce(
  (acc, s) => ({ ...acc, [s.id]: s }),
  {} as Record<SectionId, SectionConfig>,
)

/** Sections that appear in the navbar, in order. */
export const NAV_SECTIONS = SECTIONS.filter((s) => s.inNav)
