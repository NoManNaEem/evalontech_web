import Hero from '@/sections/Hero'
import Services from '@/sections/Services'
import WhyChooseUs from '@/sections/WhyChooseUs'
import Process from '@/sections/Process'
import CaseStudies from '@/sections/CaseStudies'
// import Testimonials from '@/sections/Testimonials' // Commented out for future use
import CTABanner from '@/sections/CTABanner'

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <WhyChooseUs />
      <Process />
      <CaseStudies />
      {/* <Testimonials /> */} {/* Commented out for future use */}
      <CTABanner />
    </main>
  )
}
