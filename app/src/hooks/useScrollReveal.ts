import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ScrollRevealOptions {
  y?: number
  x?: number
  scale?: number
  opacity?: number
  duration?: number
  delay?: number
  stagger?: number
  ease?: string
  start?: string
}

export function useScrollReveal<T extends HTMLElement>(
  options: ScrollRevealOptions = {}
) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const {
      y = 40,
      x = 0,
      scale = 1,
      opacity = 0,
      duration = 0.8,
      delay = 0,
      ease = 'power3.out',
      start = 'top 85%',
    } = options

    gsap.set(el, { y, x, scale, opacity })

    const trigger = ScrollTrigger.create({
      trigger: el,
      start,
      onEnter: () => {
        gsap.to(el, {
          y: 0,
          x: 0,
          scale: 1,
          opacity: 1,
          duration,
          delay,
          ease,
        })
      },
      once: true,
    })

    return () => {
      trigger.kill()
    }
  }, [])

  return ref
}

export function useStaggerReveal<T extends HTMLElement>(
  options: ScrollRevealOptions = {}
) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const children = el.children
    if (!children.length) return

    const {
      y = 40,
      opacity = 0,
      duration = 0.8,
      delay = 0,
      stagger = 0.1,
      ease = 'power3.out',
      start = 'top 85%',
    } = options

    gsap.set(children, { y, opacity })

    const trigger = ScrollTrigger.create({
      trigger: el,
      start,
      onEnter: () => {
        gsap.to(children, {
          y: 0,
          opacity: 1,
          duration,
          delay,
          stagger,
          ease,
        })
      },
      once: true,
    })

    return () => {
      trigger.kill()
    }
  }, [])

  return ref
}
