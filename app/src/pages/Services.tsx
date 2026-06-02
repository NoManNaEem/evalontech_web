import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import {
  Grid3X3, Sparkles, Code2, ShieldCheck, Cloud, Brain,
  Smartphone, ShoppingCart, BarChart3, Lock, Layers,
  Bot, MessageSquare, Rocket, ArrowRight,
} from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionBadge from '@/components/SectionBadge'

gsap.registerPlugin(ScrollTrigger)

const allServices = [
  {
    icon: Grid3X3,
    title: 'ERP Solutions',
    description: 'Implement and customize Odoo ERP to unify your entire business from finance and HR to inventory and sales.',
    color: 'from-primary-blue/20 to-primary-blue/5',
  },
  {
    icon: Sparkles,
    title: 'AI & Automation',
    description: 'Automate workflows and unlock smarter decision-making with intelligent process automation.',
    color: 'from-accent-cyan/20 to-accent-cyan/5',
  },
  {
    icon: Code2,
    title: 'Custom Web Development',
    description: 'Fast, scalable web applications built with modern frameworks — designed to perform and built to last.',
    color: 'from-primary-blue/20 to-primary-blue/5',
  },
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    description: 'Native and cross-platform mobile apps for iOS and Android with intuitive UX and strong user retention.',
    color: 'from-accent-cyan/20 to-accent-cyan/5',
  },
  {
    icon: Cloud,
    title: 'Cloud Solutions & Migration',
    description: 'Migrate and optimize your infrastructure on AWS, Azure, or Google Cloud to scale without limits.',
    color: 'from-primary-blue/20 to-primary-blue/5',
  },
  {
    icon: Rocket,
    title: 'SaaS Development',
    description: 'Build subscription software with multi-tenancy, billing, analytics, and growth-ready architecture.',
    color: 'from-accent-cyan/20 to-accent-cyan/5',
  },
  {
    icon: Brain,
    title: 'AI & Machine Learning',
    description: 'Harness AI to automate decisions, predict outcomes, and surface insights that drive smarter business strategy.',
    color: 'from-primary-blue/20 to-primary-blue/5',
  },
  {
    icon: Layers,
    title: 'API Development & Integration',
    description: 'Robust APIs that connect your systems and enable seamless, reliable data flow across every platform.',
    color: 'from-accent-cyan/20 to-accent-cyan/5',
  },
  {
    icon: Lock,
    title: 'Cybersecurity Services',
    description: 'Protect your digital assets with security audits, penetration testing, and compliance-ready assessments.',
    color: 'from-primary-blue/20 to-primary-blue/5',
  },
  {
    icon: ShoppingCart,
    title: 'E-commerce Solutions',
    description: 'Powerful online stores with seamless checkout, inventory management, and payment integrations built to convert.',
    color: 'from-accent-cyan/20 to-accent-cyan/5',
  },
  {
    icon: BarChart3,
    title: 'Data Analytics & BI',
    description: 'Transform raw data into actionable intelligence with custom dashboards, reports, and real-time visualizations.',
    color: 'from-primary-blue/20 to-primary-blue/5',
  },
  {
    icon: ShieldCheck,
    title: 'Support & Optimization',
    description: 'Ensure performance with continuous support, monitoring, and improvements for long-term success.',
    color: 'from-accent-cyan/20 to-accent-cyan/5',
  },
  {
    icon: Bot,
    title: 'AI Calling Agent',
    description: 'Deploy voice AI agents that handle inbound calls, qualify leads, and book appointments around the clock.',
    color: 'from-primary-blue/20 to-primary-blue/5',
  },
  {
    icon: MessageSquare,
    title: 'AI Chatbots',
    description: 'Deploy intelligent chatbots that handle customer queries, qualify leads, and automate support 24/7.',
    color: 'from-accent-cyan/20 to-accent-cyan/5',
  },
]

export default function ServicesPage() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const cards = section.querySelectorAll('.service-item')
    gsap.set(cards, { y: 40, opacity: 0 })

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(cards, {
          y: 0,
          opacity: 1,
          duration: 0.6,
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
          <SectionBadge text="What We Do" className="mb-6" />
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary tracking-tight mb-6">
            Technology Built Around Your{' '}
            <span className="text-gradient">Business Goals</span>
          </h1>
          <p className="text-lg sm:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            We don't offer services for the sake of a longer list. Every solution we provide is chosen because it solves a real business problem and delivered with the same standard of precision and accountability.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section ref={sectionRef} className="section-spacing">
        <div className="section-padding max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allServices.map((service) => (
              <div
                key={service.title}
                className="service-item group glass-card rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 group-hover:shadow-glow transition-shadow`}>
                  <service.icon className="w-7 h-7 text-accent-cyan" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-accent-cyan transition-colors">
                  {service.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed mb-4">
                  {service.description}
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1 text-primary-blue text-sm font-medium group-hover:text-accent-cyan transition-colors"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20">
        <div className="section-padding max-w-4xl mx-auto text-center">
          <div className="glass-panel rounded-2xl p-8 sm:p-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-4">
              Not Sure Which Service You Need?
            </h2>
            <p className="text-text-secondary mb-8">
              Let's have a conversation. We'll help you identify the right solution for your business challenges.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-gradient-to-r from-primary-blue to-[#4F46E5] text-white font-medium hover:shadow-glow-lg transition-all duration-300 hover:scale-105 group"
            >
              Book a Free Consultation
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
