import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router'
import { Menu, X, Phone, BookOpen } from 'lucide-react'

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact Us', path: '/contact' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileOpen(false)
  }, [location])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#050505]/80 backdrop-blur-xl border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        <div className="section-padding">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-blue to-accent-cyan flex items-center justify-center group-hover:shadow-glow transition-shadow duration-300">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <span className="text-xl font-semibold text-text-primary tracking-tight">
                Evalon<span className="text-primary-blue">Tech</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative text-sm font-medium transition-colors duration-300 ${
                    location.pathname === link.path
                      ? 'text-accent-cyan'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {link.label}
                  {location.pathname === link.path && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-blue to-accent-cyan rounded-full" />
                  )}
                </Link>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-4">
              <Link
                to="/blog"
                className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                <span>Insights</span>
              </Link>
              <a
                href="https://wa.me/923365361778"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>+92 336 5361778</span>
              </a>
              <Link
                to="/contact"
                className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-primary-blue to-[#4F46E5] text-white text-sm font-medium hover:shadow-glow transition-all duration-300 hover:scale-105"
              >
                Book Demo
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="lg:hidden p-2 text-text-primary"
            >
              {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          isMobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="absolute inset-0 bg-[#050505]/95 backdrop-blur-xl" />
        <div className="relative flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMobileOpen(false)}
              className={`text-2xl font-medium transition-all duration-300 ${
                location.pathname === link.path
                  ? 'text-accent-cyan'
                  : 'text-text-primary hover:text-accent-cyan'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/contact"
            onClick={() => setIsMobileOpen(false)}
            className="mt-4 px-8 py-3 rounded-lg bg-gradient-to-r from-primary-blue to-[#4F46E5] text-white font-medium"
          >
            Book Demo
          </Link>
        </div>
      </div>
    </>
  )
}
