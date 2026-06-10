import { useState } from 'react'
import { Mail, Phone, Clock, Send, CheckCircle, MapPin, Loader2 } from 'lucide-react'
import SectionBadge from '@/components/SectionBadge'
import emailjs from '@emailjs/browser'

const budgetOptions = [
  '$ 5,000 - $ 10,000',
  '$ 10,000 - $ 25,000',
  '$ 25,000 - $ 50,000',
  '$ 50,000 - $ 100,000',
  '$ 100,000 +',
]

const serviceOptions = [
  'ERP Implementation',
  'ERP Custom Development',
  'Business Automation',
  'AI & Machine Learning',
  'E-commerce',
  'Cloud Computing',
  'SaaS Development',
  'Web & Mobile App Development',
  'Others',
]

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    budget: '',
    message: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID',
        {
          from_name: formData.name,
          from_email: formData.email,
          company: formData.company || 'Not specified',
          service: formData.service,
          budget: formData.budget || 'Not specified',
          message: formData.message,
          to_email: 'info@evalontech.com',
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY'
      )
      setSubmitted(true)
    } catch (err) {
      console.error('Email send failed:', err)
      setError('Failed to send message. Please try again or contact us directly.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <main>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-deep-navy/50 to-[#050505] pointer-events-none" />
        <div className="relative section-padding max-w-7xl mx-auto text-center">
          <SectionBadge text="Get in Touch" className="mb-6" />
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary tracking-tight mb-6">
            Let's Build Something That{' '}
            <span className="text-gradient">Matters</span>
          </h1>
          <p className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Not sure where to start? That's exactly where we come in. Tell us about your business and we'll take it from there.
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="section-spacing">
        <div className="section-padding max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <div className="glass-panel rounded-2xl p-8 sm:p-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8 text-green-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-text-primary mb-4">Message Sent!</h2>
                  <p className="text-text-secondary mb-6">
                    Thank you for reaching out. A member of our team will personally review your inquiry and respond within 24 hours with a clear, personalized reply.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false)
                      setFormData({ name: '', email: '', company: '', service: '', budget: '', message: '' })
                    }}
                    className="text-primary-blue hover:text-accent-cyan transition-colors font-medium"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="glass-panel rounded-2xl p-6 sm:p-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Full Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-primary-blue/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Email <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@company.com"
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-primary-blue/50 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Your Company"
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-primary-blue/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Service Interested In <span className="text-red-400">*</span>
                      </label>
                      <select
                        name="service"
                        required
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-text-primary focus:outline-none focus:border-primary-blue/50 transition-colors appearance-none cursor-pointer"
                      >
                        <option value="">Select a service</option>
                        {serviceOptions.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Project Budget
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-text-primary focus:outline-none focus:border-primary-blue/50 transition-colors appearance-none cursor-pointer"
                    >
                      <option value="">Select budget range</option>
                      {budgetOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Project Detail <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Tell us about your project, goals, and timeline..."
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-primary-blue/50 transition-colors resize-none"
                    />
                  </div>

                  {error && (
                    <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-gradient-to-r from-primary-blue to-[#4F46E5] text-white font-medium hover:shadow-glow-lg transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="glass-panel rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-primary-blue/20 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-accent-cyan" />
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary">Contact Information</h3>
                </div>

                <div className="space-y-4">
                  <a href="mailto:info@evalontech.com" className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group">
                    <div className="w-12 h-12 rounded-xl bg-primary-blue/10 flex items-center justify-center group-hover:bg-primary-blue/20 transition-colors">
                      <Mail className="w-5 h-5 text-primary-blue group-hover:text-accent-cyan transition-colors" />
                    </div>
                    <div>
                      <div className="text-sm text-text-secondary">Email</div>
                      <div className="text-text-primary font-medium">info@evalontech.com</div>
                    </div>
                  </a>

                  <a href="tel:+923075706474" className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group">
                    <div className="w-12 h-12 rounded-xl bg-primary-blue/10 flex items-center justify-center group-hover:bg-primary-blue/20 transition-colors">
                      <Phone className="w-5 h-5 text-primary-blue group-hover:text-accent-cyan transition-colors" />
                    </div>
                    <div>
                      <div className="text-sm text-text-secondary">Phone</div>
                      <div className="text-text-primary font-medium">+92-307-5706474</div>
                    </div>
                  </a>

                  <a href="https://wa.me/923075706474" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group">
                    <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                      <Phone className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <div className="text-sm text-text-secondary">WhatsApp</div>
                      <div className="text-text-primary font-medium">+92-307-5706474</div>
                    </div>
                  </a>

                  <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5">
                    <div className="w-12 h-12 rounded-xl bg-primary-blue/10 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-primary-blue" />
                    </div>
                    <div>
                      <div className="text-sm text-text-secondary">Response Time</div>
                      <div className="text-text-primary font-medium">Within an Hour</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Mini */}
              <div className="glass-panel rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-text-primary mb-4">Questions We Hear Often</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-text-primary mb-1">What happens after I submit the form?</h4>
                    <p className="text-text-secondary text-sm">You'll receive a confirmation immediately. Our team responds within 24 hours with a personalized reply.</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-text-primary mb-1">Do you offer free consultations?</h4>
                    <p className="text-text-secondary text-sm">Yes! We offer a free 30-minute discovery call to understand your needs and propose a roadmap.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
