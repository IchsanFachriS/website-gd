import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format, parseISO } from 'date-fns'
import { id as localeId } from 'date-fns/locale'

/**
 * Merge Tailwind classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format date to Indonesian locale
 */
export function formatDate(dateString: string, formatString: string = 'dd MMMM yyyy'): string {
  try {
    const date = parseISO(dateString)
    return format(date, formatString, { locale: localeId })
  } catch (error) {
    return dateString
  }
}

/**
 * Strip HTML tags from string
 */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '')
}

/**
 * Truncate text to specified length
 */
export function truncateText(text: string, maxLength: number = 150): string {
  const stripped = stripHtml(text)
  if (stripped.length <= maxLength) return stripped
  return stripped.substring(0, maxLength).trim() + '...'
}

/**
 * Get featured image URL from WordPress post
 */
export function getFeaturedImageUrl(post: any, size: string = 'large'): string | null {
  if (!post._embedded?.['wp:featuredmedia']?.[0]) return null
  
  const media = post._embedded['wp:featuredmedia'][0]
  
  // Try to get specific size
  if (media.media_details?.sizes?.[size]) {
    return media.media_details.sizes[size].source_url
  }
  
  // Fallback to source URL
  return media.source_url || null
}

/**
 * Get category names from WordPress post
 */
export function getCategoryNames(post: any): string[] {
  if (!post._embedded?.['wp:term']?.[0]) return []
  
  return post._embedded['wp:term'][0].map((term: any) => term.name)
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null
      func(...args)
    }
    
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

/**
 * Generate excerpt from content
 */
export function generateExcerpt(content: string, length: number = 150): string {
  const text = stripHtml(content)
  return truncateText(text, length)
}