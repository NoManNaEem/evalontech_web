import { useEffect, useRef } from 'react'
import { Shield, Lightbulb, Eye, Award } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionBadge from '@/components/SectionBadge'

gsap.registerPlugin(ScrollTrigger)

const benefits = [
  {
    icon: Shield,
    title: 'Reliability',
    description: 'When we agree to a deadline, we engineer everything around hitting it. No excuses, no last-minute surprises.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'We continuously integrate AI, cloud, and modern engineering practices so every solution is future-proof from day one.',
  },
  {
    icon: Eye,
    title: 'Clarity',
    description: 'Every decision is documented, every stage is communicated, and you always know exactly where things stand.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'We hold every deliverable — engineering, design, and communication — to a standard that reflects long-term quality.',
  },
]

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const elements = section.querySelectorAll('.reveal-item')
    gsap.set(elements, { y: 50, opacity: 0 })

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(elements, {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
        })
      },
      once: true,
    })

    return () => { trigger.kill() }
  }, [])

  return (
    <section ref={sectionRef} className="section-spacing relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-blue/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative section-padding max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image */}
          <div className="reveal-item relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-primary-blue/20 to-accent-cyan/10 rounded-3xl blur-2xl" />
            <img
              src="/images/ai-automation.jpg"
              alt="AI Automation"
              className="relative rounded-2xl border border-white/10 shadow-2xl w-full"
            />
            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-6 glass-panel rounded-xl p-4 animate-float">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <Award className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <div className="text-text-primary font-semibold text-sm">5+ Years</div>
                  <div className="text-text-secondary text-xs">Experience</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div>
            <div className="reveal-item mb-6">
              <SectionBadge text="Effective Benefits" />
            </div>

            <h2 className="reveal-item text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary tracking-tight mb-4">
              Why Companies Work{' '}
              <span className="text-gradient">With Us</span>
            </h2>

            <p className="reveal-item text-text-secondary text-lg mb-10 leading-relaxed">
              We combine technical expertise with business understanding to deliver solutions that create real impact. Our focus is not just implementation — it's building systems that drive long-term success.
            </p>

            <div className="space-y-6">
              {benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="reveal-item group flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary-blue/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-blue/20 transition-colors">
                    <benefit.icon className="w-6 h-6 text-primary-blue group-hover:text-accent-cyan transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-text-primary font-semibold mb-1 group-hover:text-accent-cyan transition-colors">
                      {benefit.title}
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
