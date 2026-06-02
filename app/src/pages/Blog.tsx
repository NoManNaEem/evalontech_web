import { useEffect, useRef } from 'react'
import { Calendar, ArrowRight, Clock, User } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionBadge from '@/components/SectionBadge'

gsap.registerPlugin(ScrollTrigger)

const blogPosts = [
  {
    title: 'Why Odoo ERP is the Smart Choice for Growing Businesses',
    excerpt: 'Discover how Odoo ERP can streamline your operations, reduce costs, and provide the scalability your growing business needs in 2026.',
    image: '/images/erp-dashboard.jpg',
    author: 'EvalonTech Team',
    date: 'Jan 15, 2026',
    readTime: '5 min read',
    category: 'ERP',
  },
  {
    title: 'The Future of AI in Business Automation',
    excerpt: 'Explore how artificial intelligence is transforming business processes and what it means for enterprises looking to stay competitive.',
    image: '/images/ai-automation.jpg',
    author: 'EvalonTech Team',
    date: 'Jan 10, 2026',
    readTime: '7 min read',
    category: 'AI',
  },
  {
    title: 'Building Scalable Web Applications with Modern Frameworks',
    excerpt: 'Learn about the latest web development frameworks and best practices for building applications that can handle millions of users.',
    image: '/images/web-dev.jpg',
    author: 'EvalonTech Team',
    date: 'Jan 5, 2026',
    readTime: '6 min read',
    category: 'Development',
  },
  {
    title: 'Cloud Migration: A Complete Guide for Enterprises',
    excerpt: 'Everything you need to know about migrating your infrastructure to the cloud — from planning to execution and optimization.',
    image: '/images/case-study-logistics.jpg',
    author: 'EvalonTech Team',
    date: 'Dec 28, 2025',
    readTime: '8 min read',
    category: 'Cloud',
  },
  {
    title: 'How AI Chatbots are Revolutionizing Customer Support',
    excerpt: 'See how intelligent chatbots are reducing response times, improving customer satisfaction, and cutting support costs.',
    image: '/images/case-study-retail.jpg',
    author: 'EvalonTech Team',
    date: 'Dec 20, 2025',
    readTime: '5 min read',
    category: 'AI',
  },
  {
    title: 'Smart Manufacturing: IoT and Predictive Maintenance',
    excerpt: 'Discover how IoT sensors and AI-driven predictive maintenance are transforming the manufacturing industry.',
    image: '/images/case-study-manufacturing.jpg',
    author: 'EvalonTech Team',
    date: 'Dec 15, 2025',
    readTime: '6 min read',
    category: 'Manufacturing',
  },
]

export default function Blog() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const cards = section.querySelectorAll('.blog-card')
    gsap.set(cards, { y: 40, opacity: 0 })

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(cards, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
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
          <SectionBadge text="Insights" className="mb-6" />
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary tracking-tight mb-6">
            Latest <span className="text-gradient">Insights</span>
          </h1>
          <p className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Stay updated with the latest trends in ERP, AI, automation, and digital transformation.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section ref={sectionRef} className="section-spacing">
        <div className="section-padding max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.title}
                className="blog-card group glass-card rounded-2xl overflow-hidden cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full glass-panel text-xs font-medium text-accent-cyan">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-text-secondary mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-accent-cyan transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-xs text-text-secondary">
                      <User className="w-3 h-3" />
                      {post.author}
                    </span>
                    <span className="flex items-center gap-1 text-primary-blue text-sm font-medium group-hover:text-accent-cyan transition-colors">
                      Read More
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
