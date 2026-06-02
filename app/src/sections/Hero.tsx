import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import { ArrowRight, Mail } from 'lucide-react'
import SectionBadge from '@/components/SectionBadge'

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const particlesRef = useRef<Array<{
    x: number
    y: number
    vx: number
    vy: number
    size: number
    opacity: number
    hue: number
  }>>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let width = window.innerWidth
    let height = window.innerHeight

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }
    resize()

    // Initialize particles
    const particleCount = Math.min(80, Math.floor(width * height / 15000))
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.2,
      hue: Math.random() > 0.5 ? 239 : 187, // Blue or Cyan
    }))

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / width,
        y: e.clientY / height,
      }
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(5, 5, 5, 0.08)'
      ctx.fillRect(0, 0, width, height)

      const mouseX = mouseRef.current.x * width
      const mouseY = mouseRef.current.y * height

      particlesRef.current.forEach((p, i) => {
        // Mouse attraction
        const dx = mouseX - p.x
        const dy = mouseY - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 200) {
          p.vx += dx * 0.0001
          p.vy += dy * 0.0001
        }

        // Update position
        p.x += p.vx
        p.y += p.vy

        // Damping
        p.vx *= 0.99
        p.vy *= 0.99

        // Wrap around
        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0

        // Draw particle
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        const color = p.hue === 239 ? '99, 102, 241' : '0, 229, 255'
        ctx.fillStyle = `rgba(${color}, ${p.opacity})`
        ctx.fill()

        // Draw connections
        particlesRef.current.slice(i + 1).forEach((p2) => {
          const ddx = p.x - p2.x
          const ddy = p.y - p2.y
          const d = Math.sqrt(ddx * ddx + ddy * ddy)
          if (d < 150) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.1 * (1 - d / 150)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })

      // Mouse glow
      const gradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 300)
      gradient.addColorStop(0, 'rgba(99, 102, 241, 0.08)')
      gradient.addColorStop(0.5, 'rgba(0, 229, 255, 0.04)')
      gradient.addColorStop(1, 'transparent')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      animationId = requestAnimationFrame(animate)
    }

    animate()
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: '#050505' }}
      />

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-primary-blue/5 via-transparent to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 section-padding w-full max-w-7xl mx-auto pt-24 pb-16">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="mb-6 flex justify-center lg:justify-start animate-fade-in-up">
              <SectionBadge text="Odoo Solutions Expert" />
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-text-primary tracking-tight mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Precision in{' '}
              <span className="text-gradient">Chaos</span>
            </h1>

            <p className="text-lg sm:text-xl text-text-secondary max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              Engineering fluid data streams into structured enterprise intelligence. From ERP implementation to AI-driven automation and custom development.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start mb-12 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <Link
                to="/contact"
                className="px-8 py-4 rounded-lg bg-gradient-to-r from-primary-blue to-[#4F46E5] text-white font-medium hover:shadow-glow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2 group"
              >
                Book Demo
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/services"
                className="px-8 py-4 rounded-lg glass-panel text-primary-blue font-medium hover:border-primary-blue/40 transition-all duration-300"
              >
                View Solutions
              </Link>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 justify-center lg:justify-start animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-gradient">20+</div>
                <div className="text-sm text-text-secondary mt-1">Clients Served</div>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-gradient">50+</div>
                <div className="text-sm text-text-secondary mt-1">Odoo Modules</div>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-gradient">5+</div>
                <div className="text-sm text-text-secondary mt-1">Years Experience</div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="flex-1 relative animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary-blue/20 to-accent-cyan/20 rounded-2xl blur-2xl" />
              <img
                src="/images/erp-dashboard.jpg"
                alt="ERP Dashboard"
                className="relative rounded-2xl border border-white/10 shadow-2xl w-full"
              />
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 px-4 py-2 glass-panel rounded-lg animate-float">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs text-text-primary font-medium">ERP Active</span>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 px-4 py-2 glass-panel rounded-lg animate-float" style={{ animationDelay: '1s' }}>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-accent-cyan" />
                  <span className="text-xs text-text-primary font-medium">info@evalontech.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
    </section>
  )
}
