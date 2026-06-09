import { useEffect, useState } from 'react'
import { apiFetch } from '@/lib/api'

export interface ProcessStep {
  id: number
  number: string
  title: string
  description: string
  icon_name: string | null
  order_index: number
}

const FALLBACK: ProcessStep[] = [
  { id: 1, number: '01', title: 'Discovery', description: 'We dive deep into your business processes, challenges, and goals to understand exactly what you need.', icon_name: 'Search', order_index: 0 },
  { id: 2, number: '02', title: 'Strategy', description: 'We design a tailored solution architecture that aligns with your business objectives and growth plans.', icon_name: 'Lightbulb', order_index: 1 },
  { id: 3, number: '03', title: 'Development', description: 'Our engineers build your solution with precision, following agile methodologies for transparency.', icon_name: 'Code2', order_index: 2 },
  { id: 4, number: '04', title: 'Deployment', description: 'We launch your solution with comprehensive testing, training, and a smooth transition plan.', icon_name: 'Rocket', order_index: 3 },
  { id: 5, number: '05', title: 'Support', description: 'Continuous monitoring, optimization, and dedicated support to ensure long-term success.', icon_name: 'Headphones', order_index: 4 },
]

export function useProcessSteps() {
  const [steps, setSteps] = useState<ProcessStep[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    apiFetch<ProcessStep[]>('/api/process-steps/')
      .then(setSteps)
      .catch(() => {
        setSteps(FALLBACK)
        setError('offline')
      })
      .finally(() => setLoading(false))
  }, [])

  return { steps, loading, error }
}
