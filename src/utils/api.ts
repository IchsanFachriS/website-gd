// ============================================================
// API Client — gd.fitb.itb.ac.id/wp-json
// ============================================================

import type {
  WPPost,
  WPPage,
  WPMedia,
  WPCategory,
  WPTag,
  WPUser,
  WPComment,
  WPSearchResult,
  TribeEvent,
  TribeEventsResponse,
  TribeVenue,
  TribeOrganizer,
  CF7Form,
  CF7FeedbackResponse,
  PostsQueryParams,
  EventsQueryParams,
  MediaQueryParams,
  PaginatedResponse,
} from "../types/wordpress";

const BASE_URL = "https://gd.fitb.itb.ac.id/wp-json";
const WP_V2 = `${BASE_URL}/wp/v2`;
const TRIBE = `${BASE_URL}/tribe/events/v1`;
const CF7 = `${BASE_URL}/contact-form-7/v1`;

// ---- Generic fetcher ----
async function apiFetch<T>(
  url: string,
  options?: RequestInit
): Promise<{ data: T; headers: Headers }> {
  const response = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(
      (error as { message?: string }).message ||
        `API Error: ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json();
  return { data, headers: response.headers };
}

function buildQueryString(params: object): string {
  const query = new URLSearchParams();
  Object.entries(params as Record<string, unknown>).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    if (Array.isArray(value)) {
      value.forEach((v) => query.append(`${key}[]`, String(v)));
    } else {
      query.set(key, String(value));
    }
  });
  return query.toString() ? `?${query.toString()}` : "";
}

// ============================================================
// POSTS — /wp/v2/posts
// ============================================================

export async function getPosts(
  params: PostsQueryParams = {}
): Promise<PaginatedResponse<WPPost>> {
  const qs = buildQueryString({ _embed: true, ...params });
  const { data, headers } = await apiFetch<WPPost[]>(`${WP_V2}/posts${qs}`);
  return {
    data,
    total: parseInt(headers.get("X-WP-Total") || "0", 10),
    totalPages: parseInt(headers.get("X-WP-TotalPages") || "1", 10),
    page: params.page || 1,
  };
}

export async function getPost(id: number): Promise<WPPost> {
  const { data } = await apiFetch<WPPost>(`${WP_V2}/posts/${id}?_embed=true`);
  return data;
}

export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  const { data } = await apiFetch<WPPost[]>(
    `${WP_V2}/posts?slug=${slug}&_embed=true`
  );
  return data[0] || null;
}

// ============================================================
// PAGES — /wp/v2/pages
// ============================================================

export async function getPages(
  params: Partial<PostsQueryParams> = {}
): Promise<PaginatedResponse<WPPage>> {
  const qs = buildQueryString({ _embed: true, ...params });
  const { data, headers } = await apiFetch<WPPage[]>(`${WP_V2}/pages${qs}`);
  return {
    data,
    total: parseInt(headers.get("X-WP-Total") || "0", 10),
    totalPages: parseInt(headers.get("X-WP-TotalPages") || "1", 10),
    page: params.page || 1,
  };
}

export async function getPage(id: number): Promise<WPPage> {
  const { data } = await apiFetch<WPPage>(`${WP_V2}/pages/${id}?_embed=true`);
  return data;
}

export async function getPageBySlug(slug: string): Promise<WPPage | null> {
  const { data } = await apiFetch<WPPage[]>(
    `${WP_V2}/pages?slug=${slug}&_embed=true`
  );
  return data[0] || null;
}

// ============================================================
// MEDIA — /wp/v2/media
// ============================================================

export async function getMedia(
  params: MediaQueryParams = {}
): Promise<PaginatedResponse<WPMedia>> {
  const qs = buildQueryString(params);
  const { data, headers } = await apiFetch<WPMedia[]>(`${WP_V2}/media${qs}`);
  return {
    data,
    total: parseInt(headers.get("X-WP-Total") || "0", 10),
    totalPages: parseInt(headers.get("X-WP-TotalPages") || "1", 10),
    page: params.page || 1,
  };
}

export async function getMediaById(id: number): Promise<WPMedia> {
  const { data } = await apiFetch<WPMedia>(`${WP_V2}/media/${id}`);
  return data;
}

// ============================================================
// CATEGORIES — /wp/v2/categories
// ============================================================

export async function getCategories(params: {
  per_page?: number;
  hide_empty?: boolean;
} = {}): Promise<WPCategory[]> {
  const qs = buildQueryString({ per_page: 100, ...params });
  const { data } = await apiFetch<WPCategory[]>(`${WP_V2}/categories${qs}`);
  return data;
}

export async function getCategory(id: number): Promise<WPCategory> {
  const { data } = await apiFetch<WPCategory>(`${WP_V2}/categories/${id}`);
  return data;
}

// ============================================================
// TAGS — /wp/v2/tags
// ============================================================

export async function getTags(params: { per_page?: number } = {}): Promise<WPTag[]> {
  const qs = buildQueryString({ per_page: 100, ...params });
  const { data } = await apiFetch<WPTag[]>(`${WP_V2}/tags${qs}`);
  return data;
}

// ============================================================
// USERS / DOSEN — /wp/v2/users
// ============================================================

export async function getUsers(params: {
  per_page?: number;
  page?: number;
} = {}): Promise<PaginatedResponse<WPUser>> {
  const qs = buildQueryString({ per_page: 20, ...params });
  const { data, headers } = await apiFetch<WPUser[]>(`${WP_V2}/users${qs}`);
  return {
    data,
    total: parseInt(headers.get("X-WP-Total") || "0", 10),
    totalPages: parseInt(headers.get("X-WP-TotalPages") || "1", 10),
    page: params.page || 1,
  };
}

export async function getUser(id: number): Promise<WPUser> {
  const { data } = await apiFetch<WPUser>(`${WP_V2}/users/${id}`);
  return data;
}

// ============================================================
// COMMENTS — /wp/v2/comments
// ============================================================

export async function getComments(params: {
  post?: number;
  page?: number;
  per_page?: number;
} = {}): Promise<PaginatedResponse<WPComment>> {
  const qs = buildQueryString(params);
  const { data, headers } = await apiFetch<WPComment[]>(`${WP_V2}/comments${qs}`);
  return {
    data,
    total: parseInt(headers.get("X-WP-Total") || "0", 10),
    totalPages: parseInt(headers.get("X-WP-TotalPages") || "1", 10),
    page: params.page || 1,
  };
}

// ============================================================
// SEARCH — /wp/v2/search
// ============================================================

export async function searchContent(query: string, params: {
  per_page?: number;
  type?: string;
  subtype?: string;
} = {}): Promise<WPSearchResult[]> {
  const qs = buildQueryString({ search: query, per_page: 10, ...params });
  const { data } = await apiFetch<WPSearchResult[]>(`${WP_V2}/search${qs}`);
  return data;
}

// ============================================================
// TRIBE EVENTS — /tribe/events/v1/events
// ============================================================

export async function getEvents(
  params: EventsQueryParams = {}
): Promise<TribeEventsResponse> {
  const qs = buildQueryString(params);
  const { data } = await apiFetch<TribeEventsResponse>(`${TRIBE}/events${qs}`);
  return data;
}

export async function getEvent(id: number): Promise<TribeEvent> {
  const { data } = await apiFetch<TribeEvent>(`${TRIBE}/events/${id}`);
  return data;
}

export async function getEventBySlug(slug: string): Promise<TribeEvent | null> {
  const { data } = await apiFetch<TribeEvent>(`${TRIBE}/events/by-slug/${slug}`);
  return data;
}

export async function getUpcomingEvents(count = 5): Promise<TribeEvent[]> {
  const now = new Date().toISOString().split("T")[0];
  const response = await getEvents({
    per_page: count,
    start_date: now,
  });
  return response.events || [];
}

// ---- Venues ----
export async function getVenues(params: { per_page?: number } = {}): Promise<TribeVenue[]> {
  const qs = buildQueryString({ per_page: 50, ...params });
  const { data } = await apiFetch<{ venues: TribeVenue[] }>(`${TRIBE}/venues${qs}`);
  return data.venues || [];
}

export async function getVenue(id: number): Promise<TribeVenue> {
  const { data } = await apiFetch<TribeVenue>(`${TRIBE}/venues/${id}`);
  return data;
}

// ---- Organizers ----
export async function getOrganizers(params: { per_page?: number } = {}): Promise<TribeOrganizer[]> {
  const qs = buildQueryString({ per_page: 50, ...params });
  const { data } = await apiFetch<{ organizers: TribeOrganizer[] }>(`${TRIBE}/organizers${qs}`);
  return data.organizers || [];
}

// ---- Event Categories ----
export async function getEventCategories(): Promise<TribeEvent[]> {
  const { data } = await apiFetch<{ categories: TribeEvent[] }>(`${TRIBE}/categories`);
  return data.categories || [];
}

// ============================================================
// CONTACT FORM 7 — /contact-form-7/v1
// ============================================================

export async function getContactForms(): Promise<CF7Form[]> {
  const { data } = await apiFetch<CF7Form[]>(`${CF7}/contact-forms`);
  return data;
}

export async function getContactForm(id: number): Promise<CF7Form> {
  const { data } = await apiFetch<CF7Form>(`${CF7}/contact-forms/${id}`);
  return data;
}

export async function submitContactForm(
  formId: number,
  formData: FormData
): Promise<CF7FeedbackResponse> {
  const { data } = await apiFetch<CF7FeedbackResponse>(
    `${CF7}/contact-forms/${formId}/feedback`,
    {
      method: "POST",
      headers: {}, // Let browser set multipart boundary
      body: formData,
    }
  );
  return data;
}

// ============================================================
// HELPERS
// ============================================================

export function getFeaturedImageUrl(
  post: WPPost | WPPage,
  size: "thumbnail" | "medium" | "large" | "full" = "large"
): string | null {
  const media = post._embedded?.["wp:featuredmedia"]?.[0];
  if (!media) return null;
  return (
    media.media_details?.sizes?.[size]?.source_url ||
    media.source_url ||
    null
  );
}

export function getExcerpt(post: WPPost, maxLength = 150): string {
  const raw = post.excerpt.rendered.replace(/<[^>]+>/g, "").trim();
  return raw.length > maxLength ? raw.slice(0, maxLength) + "…" : raw;
}

export function formatEventDate(event: TribeEvent): string {
  const start = new Date(event.start_date);
  const end = new Date(event.end_date);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  if (event.all_day) {
    return start.toLocaleDateString("id-ID", options);
  }
  return `${start.toLocaleDateString("id-ID", options)}, ${start.toLocaleTimeString(
    "id-ID",
    { hour: "2-digit", minute: "2-digit" }
  )} – ${end.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}`;
}
