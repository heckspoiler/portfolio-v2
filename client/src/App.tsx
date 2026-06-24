import { useEffect, useRef } from 'react'
import styles from './App.module.css'
import { SECTION_MAP } from './data/sections'
import { useActiveSection } from './hooks/useActiveSection'
import { Cursor } from './components/layout/Cursor'
import { Eyes } from './components/layout/Eyes'
import { Navbar } from './components/layout/Navbar'
import { PhoneOverlay } from './components/layout/PhoneOverlay'
import { Landing } from './sections/Landing/Landing'
import { About } from './sections/About/About'
import { Projects } from './sections/Projects/Projects'
import { Skills } from './sections/Skills/Skills'
import { Contact } from './sections/Contact/Contact'

function App() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const active = useActiveSection(scrollRef)
  const theme = SECTION_MAP[active]

  // Drive the body background from the active section (was backgroundColor.js).
  useEffect(() => {
    document.body.style.backgroundColor = theme.bg
  }, [theme.bg])

  return (
    <>
      <PhoneOverlay />
      <Cursor color={theme.cursor} />
      <Eyes color={theme.eyes} />
      <Navbar active={active} />

      <div ref={scrollRef} className={styles.scrollContainer}>
        <Landing />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </div>
    </>
  )
}

export default App
