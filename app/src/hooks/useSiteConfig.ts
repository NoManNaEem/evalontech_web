import { useEffect, useState } from 'react'
import { apiFetch } from '@/lib/api'

export type SiteConfig = Record<string, string>

const FALLBACK: SiteConfig = {
  email: 'info@evalontech.com',
  phone: '+92-336-5361778',
  whatsapp_number: '923365361778',
  cta_headline: 'Ready to Transform Your Business?',
  cta_subtext: "Let's discuss how our ERP, AI, and automation solutions can drive your business forward. Get a free consultation today.",
  response_time: 'Within an hour during business hours',
}

export function useSiteConfig() {
  const [config, setConfig] = useState<SiteConfig>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    apiFetch<SiteConfig>('/api/site-config/')
      .then(setConfig)
      .catch(() => {
        setConfig(FALLBACK)
        setError('offline')
      })
      .finally(() => setLoading(false))
  }, [])

  return { config, loading, error }
}
