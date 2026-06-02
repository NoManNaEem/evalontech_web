import { useEffect, useRef, useState } from 'react'
import { Shield, Lightbulb, Eye, Award, ChevronDown, Target, Users, Clock, Zap } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionBadge from '@/components/SectionBadge'

gsap.registerPlugin(ScrollTrigger)

const values = [
  {
    icon: Shield,
    title: 'Reliability',
    description: 'When we agree to a deadline, we engineer everything around hitting it. No excuses, no last-minute surprises.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'We continuously integrating AI, cloud, and modern engineering practices so every solution is future-proof.',
  },
  {
    icon: Eye,
    title: 'Clarity',
    description: 'Every decision is documented, every stage is communicated, and you always know exactly where things stand.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'We hold every deliverable to a standard that reflects long-term quality in engineering, design, and communication.',
  },
]

const stats = [
  { icon: Users, value: '20+', label: 'Clients Served' },
  { icon: Target, value: '50+', label: 'Odoo Modules' },
  { icon: Clock, value: '5+', label: 'Years Experience' },
  { icon: Zap, value: '99%', label: 'On-Time Delivery' },
]

const faqs = [
  {
    question: 'What services does EvalonTech offer?',
    answer: 'We specialize in three core areas: Odoo ERP implementation and customization, business process automation, and custom software development. We also integrate AI capabilities where they create measurable operational impact for your business.',
  },
  {
    question: 'Where is EvalonTech based and do you work with international clients?',
    answer: 'We are headquartered with a global delivery model. We work with clients across multiple continents and time zones, offering flexible engagement models to suit international collaboration.',
  },
  {
    question: 'Do you work with startups or only large enterprises?',
    answer: 'We work with businesses of all sizes. Whether you are a startup looking to build your first MVP or an enterprise seeking digital transformation, we tailor our solutions to match your scale and budget.',
  },
  {
    question: 'Can you provide a dedicated development team?',
    answer: 'Yes, we offer dedicated team models where our engineers work exclusively on your project. This ensures deep domain knowledge and consistent delivery.',
  },
  {
    question: 'How does a project typically begin at EvalonTech?',
    answer: 'Every project starts with a discovery phase. We conduct workshops to understand your business, map your processes, and define clear objectives before writing a single line of code.',
  },
  {
    question: 'Do you offer post-launch support and maintenance?',
    answer: 'Absolutely. We provide comprehensive post-launch support including monitoring, bug fixes, performance optimization, and continuous feature enhancements.',
  },
]

export default function About() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

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
          stagger: 0.08,
          ease: 'power3.out',
        })
      },
      once: true,
    })

    return () => { trigger.kill() }
  }, [])

  return (
    <main>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-deep-navy/50 to-[#050505] pointer-events-none" />
        <div className="relative section-padding max-w-7xl mx-auto text-center">
          <SectionBadge text="Our Mission" className="mb-6" />
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary tracking-tight mb-6">
            We Build Technology That{' '}
            <span className="text-gradient">Powers Growth</span>
          </h1>
          <p className="text-lg sm:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            EvalonTech is an ERP and AI solutions company helping startups and enterprises automate, integrate, and scale with precision, transparency, and results you can measure.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16">
        <div className="section-padding max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="glass-panel rounded-2xl p-6 text-center hover:border-primary-blue/30 transition-all duration-300">
                <stat.icon className="w-8 h-8 text-accent-cyan mx-auto mb-3" />
                <div className="text-3xl font-bold text-gradient mb-1">{stat.value}</div>
                <div className="text-sm text-text-secondary">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section ref={sectionRef} className="section-spacing">
        <div className="section-padding max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="reveal-item">
              <SectionBadge text="What Drives Us" className="mb-6" />
            </div>
            <h2 className="reveal-item text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary tracking-tight mb-4">
              The Client is Never an <span className="text-gradient">Afterthought</span>
            </h2>
            <p className="reveal-item text-text-secondary text-lg max-w-2xl mx-auto">
              At EvalonTech, every decision — from how we structure a project to how we write a line of code — starts with one question: what's best for the client?
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="reveal-item glass-card rounded-2xl p-6 text-center group"
              >
                <div className="w-14 h-14 rounded-xl bg-primary-blue/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-blue/20 transition-colors">
                  <value.icon className="w-7 h-7 text-primary-blue group-hover:text-accent-cyan transition-colors" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">{value.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-spacing">
        <div className="section-padding max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <SectionBadge text="FAQ" className="mb-6" />
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary tracking-tight mb-4">
              Questions About <span className="text-gradient">Us</span>
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="glass-panel rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                >
                  <span className="text-text-primary font-medium pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-text-secondary flex-shrink-0 transition-transform duration-300 ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaq === index ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <p className="px-6 pb-6 text-text-secondary leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
