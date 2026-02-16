import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  fullScreen?: boolean
}

export function Loading({ size = 'md', className, fullScreen = false }: LoadingProps) {
  const sizes = {
    sm: 24,
    md: 40,
    lg: 64,
  }

  const content = (
    <div className={cn('flex items-center justify-center', className)}>
      <Loader2
        className="animate-spin text-primary"
        size={sizes[size]}
      />
    </div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
        {content}
      </div>
    )
  }

  return content
}