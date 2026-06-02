import { useEffect, useRef } from 'react'
import { Search, Lightbulb, Code2, Rocket, Headphones } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionBadge from '@/components/SectionBadge'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Discovery',
    description: 'We dive deep into your business processes, challenges, and goals to understand exactly what you need.',
  },
  {
    number: '02',
    icon: Lightbulb,
    title: 'Strategy',
    description: 'We design a tailored solution architecture that aligns with your business objectives and growth plans.',
  },
  {
    number: '03',
    icon: Code2,
    title: 'Development',
    description: 'Our engineers build your solution with precision, following agile methodologies for transparency.',
  },
  {
    number: '04',
    icon: Rocket,
    title: 'Deployment',
    description: 'We launch your solution with comprehensive testing, training, and a smooth transition plan.',
  },
  {
    number: '05',
    icon: Headphones,
    title: 'Support',
    description: 'Continuous monitoring, optimization, and dedicated support to ensure long-term success.',
  },
]

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const stepsEl = stepsRef.current
    if (!section || !stepsEl) return

    const stepElements = stepsEl.querySelectorAll('.process-step')
    gsap.set(stepElements, { x: -40, opacity: 0 })

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 75%',
      onEnter: () => {
        gsap.to(stepElements, {
          x: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
        })
      },
      once: true,
    })

    return () => { trigger.kill() }
  }, [])

  return (
    <section ref={sectionRef} className="section-spacing relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-deep-navy/40 to-[#050505] pointer-events-none" />

      <div className="relative section-padding max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <SectionBadge text="Our Process" className="mb-6" />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary tracking-tight mb-4">
            The Precision <span className="text-gradient">Process</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            A proven methodology that ensures every project is delivered with precision, quality, and attention to detail.
          </p>
        </div>

        {/* Process Steps */}
        <div ref={stepsRef} className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary-blue/50 via-accent-cyan/30 to-transparent" />

          <div className="space-y-8">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="process-step group relative flex items-start gap-6 lg:gap-8"
              >
                {/* Step number & icon */}
                <div className="relative flex-shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-blue/20 to-accent-cyan/10 border border-primary-blue/20 flex items-center justify-center group-hover:from-primary-blue/30 group-hover:to-accent-cyan/20 group-hover:border-primary-blue/40 transition-all duration-300 group-hover:shadow-glow">
                    <step.icon className="w-7 h-7 text-accent-cyan" />
                  </div>
                  {/* Connector dot */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 -bottom-4 w-2 h-2 rounded-full bg-primary-blue/40" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 glass-card rounded-xl p-6 group-hover:border-primary-blue/30 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-bold text-primary-blue/60 tracking-wider">
                      STEP {step.number}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary mb-2 group-hover:text-accent-cyan transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
