import { useEffect, useState } from 'react'
import { apiFetch } from '@/lib/api'

export interface Service {
  id: number
  title: string
  description: string
  image_url: string | null
  icon_name: string | null
  order_index: number
}

const FALLBACK: Service[] = [
  { id: 1, title: 'ERP Solutions', description: 'Manage your entire business with a fully integrated Odoo ERP system. Streamline operations from finance and HR to inventory and sales.', image_url: '/images/erp-dashboard.jpg', icon_name: 'Grid3X3', order_index: 0 },
  { id: 2, title: 'AI & Automation', description: 'Automate workflows and unlock smarter decision-making. Harness AI to predict outcomes and surface insights that drive strategy.', image_url: '/images/ai-automation.jpg', icon_name: 'Sparkles', order_index: 1 },
  { id: 3, title: 'Web & App Development', description: 'Build scalable digital products tailored to your needs. Fast, scalable web and mobile applications built with modern frameworks.', image_url: '/images/web-dev.jpg', icon_name: 'Code2', order_index: 2 },
  { id: 4, title: 'Support & Optimization', description: 'Ensure performance with continuous support and improvements. We stay with you beyond delivery for long-term success.', image_url: '/images/case-study-logistics.jpg', icon_name: 'ShieldCheck', order_index: 3 },
]

export function useServices() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    apiFetch<Service[]>('/api/services/')
      .then(setServices)
      .catch(() => {
        // Backend unavailable — use hardcoded fallback so site still works
        setServices(FALLBACK)
        setError('offline')
      })
      .finally(() => setLoading(false))
  }, [])

  return { services, loading, error }
}
