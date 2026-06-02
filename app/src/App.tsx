import { Routes, Route } from 'react-router'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Home from '@/pages/Home'
import About from '@/pages/About'
import ServicesPage from '@/pages/Services'
import Contact from '@/pages/Contact'
import Blog from '@/pages/Blog'

export default function App() {
  return (
    <div className="min-h-screen bg-[#050505]">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
      <Footer />
    </div>
  )
}
