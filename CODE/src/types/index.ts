export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface SlideItem {
  image: string;
  title?: string;
  subtitle?: string;
  cta?: { label: string; href: string };
}

export interface TabItem {
  label: string;
  title: string;
  image: string;
  imageAlt: string;
  body: string;
  links?: { label: string; href: string }[];
}

export interface NewsPost {
  id: string;
  image: string;
  caption: string;
  timestamp: string;
  likes: number;
  permalink: string;
}

export interface TimelineItem {
  year: string;
  event: string;
}
