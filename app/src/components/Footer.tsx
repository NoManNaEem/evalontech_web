import { Link } from 'react-router'
import { Mail, Phone, Clock, ArrowRight } from 'lucide-react'

const companyLinks = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Contact Us', path: '/contact' },
]

const serviceLinks = [
  'ERP Implementation',
  'Custom Development',
  'Web & Mobile Apps',
  'AI Chat Bot',
  'SaaS',
]

export default function Footer() {
  return (
    <footer className="relative bg-deep-navy border-t border-white/5">
      {/* CTA Banner */}
      <div className="section-padding py-16 border-b border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-6 tracking-tight">
            Let's build something that <span className="text-gradient">matters</span>
          </h2>
          <p className="text-text-secondary text-lg mb-8 max-w-xl mx-auto">
            Have a project in mind? Let's discuss how we can help your business grow.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-gradient-to-r from-primary-blue to-[#4F46E5] text-white font-medium hover:shadow-glow-lg transition-all duration-300 hover:scale-105 group"
          >
            Contact Us
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Main Footer */}
      <div className="section-padding py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-blue to-accent-cyan flex items-center justify-center">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <span className="text-xl font-semibold text-text-primary">
                Evalon<span className="text-primary-blue">Tech</span>
              </span>
            </Link>
            <p className="text-text-secondary text-sm leading-relaxed mb-6">
              Forward-thinking technology company specializing in ERP, AI solutions, business automation, and digital transformation.
            </p>
            <div className="space-y-3">
              <a href="mailto:info@evalontech.com" className="flex items-center gap-3 text-text-secondary hover:text-accent-cyan transition-colors text-sm">
                <Mail className="w-4 h-4" />
                info@evalontech.com
              </a>
              <a href="tel:+923365361778" className="flex items-center gap-3 text-text-secondary hover:text-accent-cyan transition-colors text-sm">
                <Phone className="w-4 h-4" />
                +92-336-5361778
              </a>
              <div className="flex items-center gap-3 text-text-secondary text-sm">
                <Clock className="w-4 h-4" />
                Response within an hour
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-text-primary font-semibold mb-6">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-text-secondary hover:text-accent-cyan transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-text-primary font-semibold mb-6">Our Services</h4>
            <ul className="space-y-3">
              {serviceLinks.map((service) => (
                <li key={service}>
                  <Link
                    to="/services"
                    className="text-text-secondary hover:text-accent-cyan transition-colors text-sm"
                  >
                    {service}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/services"
                  className="text-primary-blue hover:text-accent-cyan transition-colors text-sm flex items-center gap-1"
                >
                  View all Services
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Get in Touch */}
          <div>
            <h4 className="text-text-primary font-semibold mb-6">Get in Touch</h4>
            <p className="text-text-secondary text-sm leading-relaxed mb-6">
              Ready to transform your business? Reach out and let's start the conversation.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-primary-blue/30 text-primary-blue hover:bg-primary-blue/10 transition-all duration-300 text-sm font-medium"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/5 py-6">
        <div className="section-padding flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-text-secondary text-sm">
            &copy; 2026 evalontech.com. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-text-secondary hover:text-text-primary text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-text-secondary hover:text-text-primary text-sm transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
