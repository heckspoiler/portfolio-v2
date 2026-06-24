import { useEffect, useRef } from 'react'
import VanillaTilt, {
  type TiltOptions,
  type HTMLVanillaTiltElement,
} from 'vanilla-tilt'

/**
 * Attaches a vanilla-tilt 3D hover effect to the referenced element
 * (ported from tilt.js, which tilted the landing "show me something!" box).
 */
export function useTilt<T extends HTMLElement>(options: TiltOptions) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    VanillaTilt.init(el, options)
    return () => (el as unknown as HTMLVanillaTiltElement).vanillaTilt?.destroy()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return ref
}
