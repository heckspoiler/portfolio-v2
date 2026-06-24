import { useEffect, useRef, type RefObject } from 'react'
import gsap from 'gsap'

// Cube count per skill = proficiency out of 10 (the bar fills to count * 10%).
export const SKILL_LEVELS: Record<string, number> = {
  illustrator: 5,
  photoshop: 4,
  indesign: 4,
  figma: 5,
  html: 6,
  css: 6,
  tailwind: 4,
  javascript: 6,
  react: 5,
}

const ARRANGE_TRANSITION =
  'opacity 0.7s cubic-bezier(0.53, 1, 0.72, 1), left 2s cubic-bezier(0.45, 0.05, 0.85, 0.95), top 2s cubic-bezier(0.175, 0.885, 0.32, 1.275), transform 2s cubic-bezier(0.445, 0.05, 0.55, 0.95)'

/**
 * Ports the Skills falling-cube animation (skillsLoadingAnimation.js +
 * cubePositioning.js): when the section enters view, scatter cubes into each
 * skill bar and drop them with a GSAP bounce; when `arranged` flips true
 * (A/B pressed) they stack into level bars.
 */
export function useSkillCubes(
  sectionRef: RefObject<HTMLElement | null>,
  cubeClass: string,
  active: boolean,
  arranged: boolean,
) {
  const created = useRef(false)
  const cubesBySkill = useRef<Record<string, HTMLElement[]>>({})

  // Create + drop cubes (once, when the section first comes into view).
  useEffect(() => {
    if (!active || created.current) return
    const section = sectionRef.current
    if (!section) return
    created.current = true

    const vw = window.innerWidth
    const vh = window.innerHeight

    for (const [id, count] of Object.entries(SKILL_LEVELS)) {
      const bar = section.querySelector<HTMLElement>(`[data-skill-bar="${id}"]`)
      if (!bar) continue

      const cubes: HTMLElement[] = []
      for (let i = 0; i < count; i++) {
        const cube = document.createElement('div')
        cube.className = cubeClass
        cube.style.left = `${Math.random() * vw}px`
        cube.style.top = `${(Math.random() * vh) / 2}px`
        cube.style.opacity = '0'
        bar.appendChild(cube)
        cubes.push(cube)
        setTimeout(() => {
          cube.style.opacity = '1'
        }, 30 * (i + 1))
      }
      cubesBySkill.current[id] = cubes

      const bottom = section.getBoundingClientRect().bottom
      cubes.forEach((cube) => {
        const fall = bottom + 100 - cube.getBoundingClientRect().top
        gsap.to(cube, { duration: 2, y: fall, ease: 'bounce.out' })
      })
    }
  }, [active, sectionRef, cubeClass])

  // Arrange cubes into stacked bars when A/B is pressed.
  useEffect(() => {
    if (!arranged) return
    for (const cubes of Object.values(cubesBySkill.current)) {
      cubes.forEach((cube, index) => {
        setTimeout(() => {
          gsap.killTweensOf(cube)
          cube.style.transition = ARRANGE_TRANSITION
          cube.style.transform = 'translate(0, 0)'
          cube.style.width = '100%'
          cube.style.height = '10%'
          cube.style.left = '0'
          cube.style.top = `${(9 - index) * 10}%`
          cube.style.marginTop = '0'
        }, index * 300)
      })
    }
  }, [arranged])
}
