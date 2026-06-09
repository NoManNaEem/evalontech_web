import { useEffect, useState } from 'react'
import { apiFetch } from '@/lib/api'

export interface Benefit {
  id: number
  title: string
  description: string
  icon_name: string | null
  order_index: number
}

const FALLBACK: Benefit[] = [
  { id: 1, title: 'Reliability', description: 'When we agree to a deadline, we engineer everything around hitting it. No excuses, no last-minute surprises.', icon_name: 'Shield', order_index: 0 },
  { id: 2, title: 'Innovation', description: 'We continuously integrate AI, cloud, and modern engineering practices so every solution is future-proof from day one.', icon_name: 'Lightbulb', order_index: 1 },
  { id: 3, title: 'Clarity', description: 'Every decision is documented, every stage is communicated, and you always know exactly where things stand.', icon_name: 'Eye', order_index: 2 },
  { id: 4, title: 'Excellence', description: 'We hold every deliverable — engineering, design, and communication — to a standard that reflects long-term quality.', icon_name: 'Award', order_index: 3 },
]

export function useBenefits() {
  const [benefits, setBenefits] = useState<Benefit[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    apiFetch<Benefit[]>('/api/benefits/')
      .then(setBenefits)
      .catch(() => {
        setBenefits(FALLBACK)
        setError('offline')
      })
      .finally(() => setLoading(false))
  }, [])

  return { benefits, loading, error }
}
