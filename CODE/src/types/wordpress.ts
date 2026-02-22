// ============================================================
// WordPress REST API Types
// Base: https://gd.fitb.itb.ac.id/wp-json/
// ============================================================

export interface WPRendered {
  rendered: string;
  protected?: boolean;
}

export interface WPLinks {
  self?: Array<{ href: string }>;
  collection?: Array<{ href: string }>;
  about?: Array<{ href: string }>;
  author?: Array<{ embeddable: boolean; href: string }>;
  replies?: Array<{ embeddable: boolean; href: string }>;
  "wp:featuredmedia"?: Array<{ embeddable: boolean; href: string }>;
  "wp:attachment"?: Array<{ href: string }>;
  "wp:term"?: Array<{ taxonomy: string; embeddable: boolean; href: string }>;
  curies?: Array<{ name: string; href: string; templated: boolean }>;
}

// ---- Posts (/wp/v2/posts) ----
export interface WPPost {
  id: number;
  date: string;
  date_gmt: string;
  guid: WPRendered;
  modified: string;
  modified_gmt: string;
  slug: string;
  status: "publish" | "future" | "draft" | "pending" | "private";
  type: string;
  link: string;
  title: WPRendered;
  content: WPRendered;
  excerpt: WPRendered;
  author: number;
  featured_media: number;
  comment_status: "open" | "closed";
  ping_status: "open" | "closed";
  sticky: boolean;
  template: string;
  format: string;
  meta: Record<string, unknown>;
  categories: number[];
  tags: number[];
  _links: WPLinks;
  _embedded?: {
    author?: WPUser[];
    "wp:featuredmedia"?: WPMedia[];
    "wp:term"?: WPCategory[][];
  };
}

// ---- Pages (/wp/v2/pages) ----
export interface WPPage {
  id: number;
  date: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: WPRendered;
  content: WPRendered;
  excerpt: WPRendered;
  author: number;
  featured_media: number;
  parent: number;
  menu_order: number;
  template: string;
  _links: WPLinks;
  _embedded?: {
    "wp:featuredmedia"?: WPMedia[];
  };
}

// ---- Media (/wp/v2/media) ----
export interface WPMediaSize {
  file: string;
  width: number;
  height: number;
  mime_type: string;
  source_url: string;
}

export interface WPMedia {
  id: number;
  date: string;
  slug: string;
  type: string;
  link: string;
  title: WPRendered;
  author: number;
  caption: WPRendered;
  alt_text: string;
  media_type: string;
  mime_type: string;
  media_details: {
    width: number;
    height: number;
    file: string;
    sizes: {
      thumbnail?: WPMediaSize;
      medium?: WPMediaSize;
      medium_large?: WPMediaSize;
      large?: WPMediaSize;
      full?: WPMediaSize;
      [key: string]: WPMediaSize | undefined;
    };
  };
  source_url: string;
  _links: WPLinks;
}

// ---- Categories (/wp/v2/categories) ----
export interface WPCategory {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy: string;
  parent: number;
  _links: WPLinks;
}

// ---- Tags (/wp/v2/tags) ----
export interface WPTag {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy: string;
  _links: WPLinks;
}

// ---- Users (/wp/v2/users) ----
export interface WPUser {
  id: number;
  name: string;
  url: string;
  description: string;
  link: string;
  slug: string;
  avatar_urls: {
    "24": string;
    "48": string;
    "96": string;
  };
  meta: Record<string, unknown>;
  _links: WPLinks;
}

// ---- Comments (/wp/v2/comments) ----
export interface WPComment {
  id: number;
  post: number;
  parent: number;
  author: number;
  author_name: string;
  author_url: string;
  date: string;
  content: WPRendered;
  link: string;
  status: string;
  type: string;
  author_avatar_urls: {
    "24": string;
    "48": string;
    "96": string;
  };
  _links: WPLinks;
}

// ---- Search (/wp/v2/search) ----
export interface WPSearchResult {
  id: number;
  title: string;
  url: string;
  type: string;
  subtype: string;
  _links: WPLinks;
}

// ---- Tribe Events (/tribe/events/v1/events) ----
export interface TribeEvent {
  id: number;
  global_id: string;
  global_id_lineage: string[];
  author: string;
  status: string;
  date: string;
  date_utc: string;
  modified: string;
  modified_utc: string;
  url: string;
  rest_url: string;
  title: string;
  description: string;
  excerpt: string;
  slug: string;
  image: false | {
    url: string;
    id: number;
    extension: string;
    width: number;
    height: number;
    sizes: {
      medium: { width: number; height: number; url: string };
      thumbnail: { width: number; height: number; url: string };
      large: { width: number; height: number; url: string };
      full: { url: string };
    };
  };
  all_day: boolean;
  start_date: string;
  start_date_details: {
    year: string;
    month: string;
    day: string;
    hour: string;
    minutes: string;
    seconds: string;
  };
  end_date: string;
  end_date_details: {
    year: string;
    month: string;
    day: string;
    hour: string;
    minutes: string;
    seconds: string;
  };
  utc_start_date: string;
  utc_end_date: string;
  timezone: string;
  timezone_abbr: string;
  cost: string;
  cost_details: {
    currency_symbol: string;
    currency_position: string;
    values: string[];
  };
  website: string;
  show_map: boolean;
  show_map_link: boolean;
  hide_from_listings: boolean;
  sticky: boolean;
  featured: boolean;
  categories: TribeCategory[];
  tags: TribeTag[];
  venue: TribeVenue | false;
  organizer: TribeOrganizer[];
}

export interface TribeCategory {
  id: number;
  name: string;
  slug: string;
  term_group: number;
  term_taxonomy_id: number;
  taxonomy: string;
  description: string;
  parent: number;
  count: number;
  filter: string;
  urls: { self: string; collection: string };
}

export interface TribeTag {
  id: number;
  name: string;
  slug: string;
  term_group: number;
  term_taxonomy_id: number;
  taxonomy: string;
  description: string;
  parent: number;
  count: number;
  filter: string;
  urls: { self: string; collection: string };
}

export interface TribeVenue {
  id: number;
  author: string;
  status: string;
  date: string;
  modified: string;
  url: string;
  venue: string;
  slug: string;
  address: string;
  city: string;
  country: string;
  province: string;
  zip: string;
  phone: string;
  website: string;
  show_map: boolean;
  show_map_link: boolean;
  global_id: string;
}

export interface TribeOrganizer {
  id: number;
  author: string;
  status: string;
  date: string;
  modified: string;
  url: string;
  organizer: string;
  slug: string;
  phone: string;
  website: string;
  email: string;
  global_id: string;
}

// ---- Tribe Events List Response ----
export interface TribeEventsResponse {
  events: TribeEvent[];
  rest_url: string;
  total: number;
  total_pages: number;
  next_rest_url?: string;
  previous_rest_url?: string;
}

// ---- Contact Form 7 (/contact-form-7/v1) ----
export interface CF7Form {
  id: number;
  slug: string;
  title: string;
  locale: string;
}

export interface CF7FeedbackResponse {
  into: string;
  status: string;
  message: string;
  posted_data_hash?: string;
  invalid_fields?: Array<{
    field: string;
    message: string;
    idref: string | null;
    error_id: string;
  }>;
}

// ---- API Query Params ----
export interface PostsQueryParams {
  page?: number;
  per_page?: number;
  search?: string;
  categories?: number[];
  tags?: number[];
  orderby?: "date" | "relevance" | "id" | "title" | "slug";
  order?: "asc" | "desc";
  _embed?: boolean;
  status?: string;
}

export interface EventsQueryParams {
  page?: number;
  per_page?: number;
  search?: string;
  start_date?: string;
  end_date?: string;
  featured?: boolean;
  categories?: number[];
}

export interface MediaQueryParams {
  page?: number;
  per_page?: number;
  media_type?: "image" | "video" | "audio" | "application";
  search?: string;
}

// ---- Generic Pagination ----
export interface PaginatedResponse<T> {
  data: T[];
  totalPages: number;
  total: number;
  page: number;
}
