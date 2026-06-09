import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import { Grid3X3, Sparkles, Code2, ShieldCheck, ArrowRight, LucideIcon } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionBadge from '@/components/SectionBadge'
import { useServices } from '@/hooks/useServices'

gsap.registerPlugin(ScrollTrigger)

// Map icon_name strings from DB back to Lucide components
const iconMap: Record<string, LucideIcon> = {
  Grid3X3,
  Sparkles,
  Code2,
  ShieldCheck,
}

function ServiceSkeleton() {
  return (
    <div className="service-card glass-card rounded-2xl overflow-hidden animate-pulse">
      <div className="h-48 bg-white/5" />
      <div className="p-6 space-y-3">
        <div className="h-5 bg-white/10 rounded w-2/3" />
        <div className="h-3 bg-white/5 rounded w-full" />
        <div className="h-3 bg-white/5 rounded w-5/6" />
      </div>
    </div>
  )
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const { services, loading } = useServices()

  useEffect(() => {
    const section = sectionRef.current
    const cards = cardsRef.current
    if (!section || !cards || loading) return

    const cardElements = cards.querySelectorAll('.service-card')

    gsap.set(cardElements, { y: 60, opacity: 0 })

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(cardElements, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
        })
      },
      once: true,
    })

    return () => {
      trigger.kill()
    }
  }, [loading])

  return (
    <section ref={sectionRef} className="section-spacing relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-deep-navy/30 to-[#050505] pointer-events-none" />

      <div className="relative section-padding max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <SectionBadge text="What We Do" className="mb-6" />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary tracking-tight mb-4">
            Our Core <span className="text-gradient">Solutions</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Delivering intelligent business systems that simplify operations, enhance visibility, and accelerate growth.
          </p>
        </div>

        {/* Services Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <ServiceSkeleton key={i} />)
            : services.map((service) => {
                const Icon = iconMap[service.icon_name ?? ''] ?? Grid3X3
                return (
                  <div
                    key={service.id}
                    className="service-card group glass-card rounded-2xl overflow-hidden cursor-pointer"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={service.image_url ?? '/images/erp-dashboard.jpg'}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <div className="w-12 h-12 rounded-xl bg-primary-blue/20 backdrop-blur-sm flex items-center justify-center mb-3 group-hover:bg-primary-blue/40 transition-colors">
                          <Icon className="w-6 h-6 text-accent-cyan" />
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-text-primary mb-2 group-hover:text-accent-cyan transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-text-secondary text-sm leading-relaxed mb-4">
                        {service.description}
                      </p>
                      <Link
                        to="/services"
                        className="inline-flex items-center gap-2 text-primary-blue text-sm font-medium group-hover:text-accent-cyan transition-colors"
                      >
                        Learn More
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                )
              })}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg border border-primary-blue/30 text-primary-blue hover:bg-primary-blue/10 transition-all duration-300 font-medium"
          >
            View All Services
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
