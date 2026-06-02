import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useCountUp(
  end: number,
  duration: number = 2,
  suffix: string = ''
) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      onEnter: () => {
        if (hasAnimated.current) return
        hasAnimated.current = true

        const obj = { value: 0 }
        gsap.to(obj, {
          value: end,
          duration,
          ease: 'power2.out',
          onUpdate: () => {
            setCount(Math.round(obj.value))
          },
        })
      },
      once: true,
    })

    return () => {
      trigger.kill()
    }
  }, [end, duration])

  return { ref, count, display: `${count}${suffix}` }
}
