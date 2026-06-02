import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionBadge from '@/components/SectionBadge'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    name: 'Michael Richardson',
    role: 'CEO',
    company: 'LogiChain Solutions',
    image: '/images/testimonial-1.jpg',
    content: 'EvalonTech transformed our entire logistics operation. Their Odoo ERP implementation reduced our operational overhead by 40% and gave us real-time visibility we never had before. The team was professional, responsive, and delivered on every promise.',
    rating: 5,
  },
  {
    name: 'Sarah Chen',
    role: 'CTO',
    company: 'NexGen Retail',
    image: '/images/testimonial-2.jpg',
    content: 'The AI-powered e-commerce platform they built increased our conversion rates by 65%. Their understanding of both technology and business is remarkable. They do not just write code — they solve problems.',
    rating: 5,
  },
  {
    name: 'David Martinez',
    role: 'Operations Director',
    company: 'Precision Manufacturing',
    image: '/images/testimonial-3.jpg',
    content: 'Factory downtime dropped by 55% after implementing their IoT and predictive maintenance solution. The ROI was evident within the first quarter. EvalonTech truly understands industrial automation.',
    rating: 5,
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const elements = section.querySelectorAll('.reveal-item')
    gsap.set(elements, { y: 40, opacity: 0 })

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(elements, {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
        })
      },
      once: true,
    })

    return () => { trigger.kill() }
  }, [])

  const goTo = (index: number) => {
    if (!contentRef.current) return
    gsap.to(contentRef.current, {
      opacity: 0,
      x: index > currentIndex ? -20 : 20,
      duration: 0.2,
      onComplete: () => {
        setCurrentIndex(index)
        gsap.fromTo(contentRef.current, 
          { opacity: 0, x: index > currentIndex ? 20 : -20 },
          { opacity: 1, x: 0, duration: 0.3 }
        )
      },
    })
  }

  const next = () => goTo((currentIndex + 1) % testimonials.length)
  const prev = () => goTo((currentIndex - 1 + testimonials.length) % testimonials.length)

  const current = testimonials[currentIndex]

  return (
    <section ref={sectionRef} className="section-spacing relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-deep-navy/50 to-[#050505] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-blue/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative section-padding max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="reveal-item">
            <SectionBadge text="Testimonials" className="mb-6" />
          </div>
          <h2 className="reveal-item text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary tracking-tight mb-4">
            What Our <span className="text-gradient">Clients Say</span>
          </h2>
        </div>

        {/* Testimonial Card */}
        <div className="reveal-item">
          <div className="glass-panel rounded-3xl p-8 sm:p-12 relative">
            {/* Quote icon */}
            <Quote className="absolute top-8 right-8 w-16 h-16 text-primary-blue/10" />

            <div ref={contentRef}>
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: current.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-neural-gold text-neural-gold" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-lg sm:text-xl text-text-primary leading-relaxed mb-8">
                "{current.content}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={current.image}
                  alt={current.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-primary-blue/30"
                />
                <div>
                  <div className="text-text-primary font-semibold">{current.name}</div>
                  <div className="text-text-secondary text-sm">
                    {current.role}, {current.company}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-8 border-t border-white/5">
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === currentIndex
                        ? 'w-8 bg-gradient-to-r from-primary-blue to-accent-cyan'
                        : 'bg-white/20 hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={prev}
                  className="w-10 h-10 rounded-lg glass-panel flex items-center justify-center hover:border-primary-blue/40 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-text-primary" />
                </button>
                <button
                  onClick={next}
                  className="w-10 h-10 rounded-lg glass-panel flex items-center justify-center hover:border-primary-blue/40 transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-text-primary" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
