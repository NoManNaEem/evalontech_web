import { useEffect, useState } from 'react'
import { apiFetch } from '@/lib/api'

export interface CaseStat {
  label: string
  value: string
}

export interface CaseStudy {
  id: number
  title: string
  category: string
  description: string
  image_url: string | null
  stats: CaseStat[]
  order_index: number
}

const FALLBACK: CaseStudy[] = [
  { id: 1, title: 'Global Logistics Network', category: 'ERP Implementation', description: 'Transformed a mid-size logistics company with a fully integrated Odoo ERP system, reducing operational overhead by 40% and improving delivery tracking accuracy to 99.8%.', image_url: '/images/case-study-logistics.jpg', stats: [{ label: 'Efficiency Gain', value: '+40%' }, { label: 'Tracking Accuracy', value: '99.8%' }], order_index: 0 },
  { id: 2, title: 'E-Commerce Platform', category: 'Web Development', description: 'Built a scalable e-commerce platform with seamless checkout, inventory management, and AI-powered recommendations that increased conversion rates by 65%.', image_url: '/images/case-study-retail.jpg', stats: [{ label: 'Conversion Rate', value: '+65%' }, { label: 'Page Load Time', value: '<1s' }], order_index: 1 },
  { id: 3, title: 'Smart Factory Automation', category: 'AI & Automation', description: 'Implemented IoT sensors, robotic process automation, and predictive maintenance AI that reduced downtime by 55% and increased production efficiency.', image_url: '/images/case-study-manufacturing.jpg', stats: [{ label: 'Downtime Reduced', value: '-55%' }, { label: 'Production Efficiency', value: '+35%' }], order_index: 2 },
]

export function useCaseStudies() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    apiFetch<CaseStudy[]>('/api/case-studies/')
      .then(setCaseStudies)
      .catch(() => {
        setCaseStudies(FALLBACK)
        setError('offline')
      })
      .finally(() => setLoading(false))
  }, [])

  return { caseStudies, loading, error }
}
