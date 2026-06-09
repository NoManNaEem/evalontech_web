import { useEffect, useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionBadge from '@/components/SectionBadge'
import { useCaseStudies } from '@/hooks/useCaseStudies'

gsap.registerPlugin(ScrollTrigger)

function CaseStudySkeleton() {
  return (
    <div className="case-card grid grid-cols-1 lg:grid-cols-2 gap-8 items-center animate-pulse">
      <div className="h-64 sm:h-80 rounded-2xl bg-white/5" />
      <div className="space-y-4">
        <div className="h-6 bg-white/10 rounded w-3/4" />
        <div className="h-4 bg-white/5 rounded w-full" />
        <div className="h-4 bg-white/5 rounded w-5/6" />
        <div className="flex gap-8 mt-4">
          <div className="h-10 bg-white/10 rounded w-20" />
          <div className="h-10 bg-white/10 rounded w-20" />
        </div>
      </div>
    </div>
  )
}

export default function CaseStudies() {
  const sectionRef = useRef<HTMLElement>(null)
  const { caseStudies, loading } = useCaseStudies()

  useEffect(() => {
    const section = sectionRef.current
    if (!section || loading) return

    const cards = section.querySelectorAll('.case-card')
    gsap.set(cards, { y: 60, opacity: 0 })

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 75%',
      onEnter: () => {
        gsap.to(cards, {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.2,
          ease: 'power3.out',
        })
      },
      once: true,
    })

    return () => { trigger.kill() }
  }, [loading])

  return (
    <section ref={sectionRef} className="section-spacing relative">
      <div className="section-padding max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <SectionBadge text="Case Studies" className="mb-6" />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary tracking-tight mb-4">
            Success <span className="text-gradient">Stories</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Real results from real businesses that trusted us with their digital transformation.
          </p>
        </div>

        {/* Case Studies */}
        <div className="space-y-12">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => <CaseStudySkeleton key={i} />)
            : caseStudies.map((study, index) => (
                <div
                  key={study.id}
                  className={`case-card group relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
                    index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Image */}
                  <div className={`relative overflow-hidden rounded-2xl ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-10 opacity-60" />
                    <img
                      src={study.image_url ?? '/images/case-study-logistics.jpg'}
                      alt={study.title}
                      className="w-full h-64 sm:h-80 object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 z-20">
                      <span className="px-3 py-1 rounded-full glass-panel text-xs font-medium text-accent-cyan">
                        {study.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`${index % 2 === 1 ? 'lg:order-1 lg:text-right' : ''}`}>
                    <h3 className="text-2xl sm:text-3xl font-bold text-text-primary mb-4 group-hover:text-gradient transition-all duration-300">
                      {study.title}
                    </h3>
                    <p className="text-text-secondary leading-relaxed mb-6">
                      {study.description}
                    </p>

                    {/* Stats */}
                    <div className={`flex gap-8 mb-6 ${index % 2 === 1 ? 'lg:justify-end' : ''}`}>
                      {(study.stats ?? []).map((stat) => (
                        <div key={stat.label}>
                          <div className="text-2xl sm:text-3xl font-bold text-gradient">{stat.value}</div>
                          <div className="text-sm text-text-secondary">{stat.label}</div>
                        </div>
                      ))}
                    </div>

                    <button className={`inline-flex items-center gap-2 text-primary-blue hover:text-accent-cyan transition-colors font-medium ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                      <span>View Case Study</span>
                      <ArrowUpRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  )
}
