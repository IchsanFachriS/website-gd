export interface HeroSlide {
  id: string
  image: string
  title: string
  subtitle?: string
  ctaText: string
  ctaLink: string
}

export interface TabContent {
  id: string
  title: string
  image: string
  description: string
  links?: {
    text: string
    url: string
  }[]
}

export interface ResearchGroup {
  id: string
  name: string
  image: string
  description: string
  link: string
}

export interface NewsItem {
  id: number
  title: string
  excerpt: string
  slug: string
  date: string
  image?: string
  categories: string[]
}

export interface MenuItem {
  label: string
  href: string
  children?: MenuItem[]
}