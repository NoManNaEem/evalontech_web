import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import { ArrowRight, Phone, Mail, MapPin } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useSiteConfig } from '@/hooks/useSiteConfig'

gsap.registerPlugin(ScrollTrigger)

export default function CTABanner() {
  const sectionRef = useRef<HTMLElement>(null)
  const { config, loading } = useSiteConfig()

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const elements = section.querySelectorAll('.reveal-item')
    gsap.set(elements, { y: 30, opacity: 0 })
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(elements, { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out' })
      },
      once: true,
    })
    return () => { trigger.kill() }
  }, [])

  const email = config.email ?? 'info@evalontech.com'
  const phone = config.phone ?? '+92-336-5361778'
  const whatsapp = config.whatsapp_number ?? '923365361778'
  const headline = config.cta_headline ?? 'Ready to Transform Your Business?'
  const subtext = config.cta_subtext ?? "Let's discuss how our ERP, AI, and automation solutions can drive your business forward. Get a free consultation today."
  const responseTime = config.response_time ?? 'Within an hour during business hours'

  return (
    <section ref={sectionRef} className="py-20 sm:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary-blue/10 via-deep-navy to-accent-cyan/10 pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-blue/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-cyan/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative section-padding max-w-7xl mx-auto">
        <div className="glass-panel rounded-3xl p-8 sm:p-12 lg:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left */}
            <div>
              {loading ? (
                <div className="space-y-4 animate-pulse">
                  <div className="h-10 bg-white/10 rounded w-3/4" />
                  <div className="h-4 bg-white/5 rounded w-full" />
                  <div className="h-4 bg-white/5 rounded w-5/6" />
                </div>
              ) : (
                <>
                  <h2 className="reveal-item text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary tracking-tight mb-4">
                    {headline.split('Transform').length > 1 ? (
                      <>Ready to <span className="text-gradient">Transform</span> Your Business?</>
                    ) : headline}
                  </h2>
                  <p className="reveal-item text-text-secondary text-lg leading-relaxed mb-8">{subtext}</p>
                </>
              )}
              <div className="reveal-item flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-gradient-to-r from-primary-blue to-[#4F46E5] text-white font-medium hover:shadow-glow-lg transition-all duration-300 hover:scale-105 group"
                >
                  Start a Project
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href={`https://wa.me/${whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg glass-panel text-text-primary hover:border-primary-blue/40 transition-all duration-300 font-medium"
                >
                  <Phone className="w-5 h-5" />
                  WhatsApp Us
                </a>
              </div>
            </div>

            {/* Right - Contact Info */}
            <div className="space-y-6">
              <div className="reveal-item flex items-start gap-4 p-4 rounded-xl bg-white/5">
                <div className="w-12 h-12 rounded-xl bg-primary-blue/20 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-accent-cyan" />
                </div>
                <div>
                  <h4 className="text-text-primary font-semibold mb-1">Email Us</h4>
                  <a href={`mailto:${email}`} className="text-text-secondary hover:text-accent-cyan transition-colors">
                    {email}
                  </a>
                </div>
              </div>

              <div className="reveal-item flex items-start gap-4 p-4 rounded-xl bg-white/5">
                <div className="w-12 h-12 rounded-xl bg-primary-blue/20 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-accent-cyan" />
                </div>
                <div>
                  <h4 className="text-text-primary font-semibold mb-1">Call Us</h4>
                  <a href={`tel:${phone}`} className="text-text-secondary hover:text-accent-cyan transition-colors">
                    {phone}
                  </a>
                </div>
              </div>

              <div className="reveal-item flex items-start gap-4 p-4 rounded-xl bg-white/5">
                <div className="w-12 h-12 rounded-xl bg-primary-blue/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-accent-cyan" />
                </div>
                <div>
                  <h4 className="text-text-primary font-semibold mb-1">Response Time</h4>
                  <p className="text-text-secondary">{responseTime}</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
