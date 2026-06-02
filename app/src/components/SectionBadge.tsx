interface SectionBadgeProps {
  text: string
  className?: string
}

export default function SectionBadge({ text, className = '' }: SectionBadgeProps) {
  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel ${className}`}>
      <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
      <span className="text-xs font-medium tracking-widest uppercase text-accent-cyan">
        {text}
      </span>
    </div>
  )
}
