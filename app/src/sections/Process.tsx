import { useEffect, useRef } from 'react'
import { Search, Lightbulb, Code2, Rocket, Headphones, LucideIcon } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionBadge from '@/components/SectionBadge'
import { useProcessSteps } from '@/hooks/useProcessSteps'

gsap.registerPlugin(ScrollTrigger)

const iconMap: Record<string, LucideIcon> = { Search, Lightbulb, Code2, Rocket, Headphones }

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)
  const { steps, loading } = useProcessSteps()

  useEffect(() => {
    const section = sectionRef.current
    const stepsEl = stepsRef.current
    if (!section || !stepsEl || loading) return
    const stepElements = stepsEl.querySelectorAll('.process-step')
    gsap.set(stepElements, { x: -40, opacity: 0 })
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 75%',
      onEnter: () => {
        gsap.to(stepElements, { x: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power3.out' })
      },
      once: true,
    })
    return () => { trigger.kill() }
  }, [loading])

  return (
    <section ref={sectionRef} className="section-spacing relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-deep-navy/40 to-[#050505] pointer-events-none" />
      <div className="relative section-padding max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <SectionBadge text="Our Process" className="mb-6" />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary tracking-tight mb-4">
            The Precision <span className="text-gradient">Process</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            A proven methodology that ensures every project is delivered with precision, quality, and attention to detail.
          </p>
        </div>

        <div ref={stepsRef} className="relative">
          <div className="hidden lg:block absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary-blue/50 via-accent-cyan/30 to-transparent" />
          <div className="space-y-8">
            {loading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="process-step flex items-start gap-6 lg:gap-8 animate-pulse">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 flex-shrink-0" />
                    <div className="flex-1 glass-card rounded-xl p-6 space-y-3">
                      <div className="h-3 bg-white/10 rounded w-1/4" />
                      <div className="h-5 bg-white/10 rounded w-1/3" />
                      <div className="h-3 bg-white/5 rounded w-full" />
                    </div>
                  </div>
                ))
              : steps.map((step, index) => {
                  const Icon = iconMap[step.icon_name ?? ''] ?? Search
                  return (
                    <div key={step.id} className="process-step group relative flex items-start gap-6 lg:gap-8">
                      <div className="relative flex-shrink-0">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-blue/20 to-accent-cyan/10 border border-primary-blue/20 flex items-center justify-center group-hover:from-primary-blue/30 group-hover:border-primary-blue/40 transition-all duration-300 group-hover:shadow-glow">
                          <Icon className="w-7 h-7 text-accent-cyan" />
                        </div>
                        {index < steps.length - 1 && (
                          <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 -bottom-4 w-2 h-2 rounded-full bg-primary-blue/40" />
                        )}
                      </div>
                      <div className="flex-1 glass-card rounded-xl p-6 group-hover:border-primary-blue/30 transition-all duration-300">
                        <span className="text-xs font-bold text-primary-blue/60 tracking-wider">STEP {step.number}</span>
                        <h3 className="text-xl font-semibold text-text-primary mt-1 mb-2 group-hover:text-accent-cyan transition-colors">
                          {step.title}
                        </h3>
                        <p className="text-text-secondary text-sm leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  )
                })}
          </div>
        </div>
      </div>
    </section>
  )
}
