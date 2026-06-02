import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import { Grid3X3, Sparkles, Code2, ShieldCheck, ArrowRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionBadge from '@/components/SectionBadge'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    icon: Grid3X3,
    title: 'ERP Solutions',
    description: 'Manage your entire business with a fully integrated Odoo ERP system. Streamline operations from finance and HR to inventory and sales.',
    image: '/images/erp-dashboard.jpg',
  },
  {
    icon: Sparkles,
    title: 'AI & Automation',
    description: 'Automate workflows and unlock smarter decision-making. Harness AI to predict outcomes and surface insights that drive strategy.',
    image: '/images/ai-automation.jpg',
  },
  {
    icon: Code2,
    title: 'Web & App Development',
    description: 'Build scalable digital products tailored to your needs. Fast, scalable web and mobile applications built with modern frameworks.',
    image: '/images/web-dev.jpg',
  },
  {
    icon: ShieldCheck,
    title: 'Support & Optimization',
    description: 'Ensure performance with continuous support and improvements. We stay with you beyond delivery for long-term success.',
    image: '/images/case-study-logistics.jpg',
  },
]

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const cards = cardsRef.current
    if (!section || !cards) return

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
  }, [])

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
          {services.map((service) => (
            <div
              key={service.title}
              className="service-card group glass-card rounded-2xl overflow-hidden cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-blue/20 backdrop-blur-sm flex items-center justify-center mb-3 group-hover:bg-primary-blue/40 transition-colors">
                    <service.icon className="w-6 h-6 text-accent-cyan" />
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
          ))}
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
