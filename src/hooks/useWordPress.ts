// ============================================================
// Custom Hooks — Data Fetching with SWR-like caching
// ============================================================

import { useState, useEffect, useCallback, useRef } from "react";
import {
  getPosts,
  getPost,
  getPostBySlug,
  getPages,
  getPage,
  getPageBySlug,
  getMedia,
  getCategories,
  getUsers,
  getEvents,
  getUpcomingEvents,
  getEvent,
  searchContent,
  submitContactForm,
} from "../utils/api";
import type {
  WPPost,
  WPPage,
  WPMedia,
  WPCategory,
  WPUser,
  TribeEvent,
  WPSearchResult,
  PostsQueryParams,
  EventsQueryParams,
  PaginatedResponse,
  CF7FeedbackResponse,
} from "../types/wordpress";

// ---- Generic fetch hook ----
function useFetch<T>(
  fetcher: () => Promise<T>,
  deps: unknown[] = []
): { data: T | null; loading: boolean; error: string | null; refetch: () => void } {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isMounted = useRef(true);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetcher();
      if (isMounted.current) setData(result);
    } catch (e) {
      if (isMounted.current)
        setError(e instanceof Error ? e.message : "Terjadi kesalahan");
    } finally {
      if (isMounted.current) setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    isMounted.current = true;
    fetch();
    return () => { isMounted.current = false; };
  }, [fetch]);

  return { data, loading, error, refetch: fetch };
}

// ============================================================
// POSTS
// ============================================================

export function usePosts(params: PostsQueryParams = {}) {
  return useFetch<PaginatedResponse<WPPost>>(
    () => getPosts(params),
    [JSON.stringify(params)]
  );
}

export function usePost(id: number) {
  return useFetch<WPPost>(() => getPost(id), [id]);
}

export function usePostBySlug(slug: string) {
  return useFetch<WPPost | null>(() => getPostBySlug(slug), [slug]);
}

export function useLatestPosts(count = 6) {
  return useFetch<PaginatedResponse<WPPost>>(
    () => getPosts({ per_page: count, orderby: "date", order: "desc", _embed: true }),
    [count]
  );
}

// ============================================================
// PAGES
// ============================================================

export function usePages(params: Partial<PostsQueryParams> = {}) {
  return useFetch<PaginatedResponse<WPPage>>(
    () => getPages(params),
    [JSON.stringify(params)]
  );
}

export function usePage(id: number) {
  return useFetch<WPPage>(() => getPage(id), [id]);
}

export function usePageBySlug(slug: string) {
  return useFetch<WPPage | null>(() => getPageBySlug(slug), [slug]);
}

// ============================================================
// MEDIA / GALLERY
// ============================================================

export function useGallery(params: { per_page?: number; page?: number } = {}) {
  return useFetch<PaginatedResponse<WPMedia>>(
    () => getMedia({ media_type: "image", ...params }),
    [JSON.stringify(params)]
  );
}

// ============================================================
// CATEGORIES
// ============================================================

export function useCategories() {
  return useFetch<WPCategory[]>(() => getCategories({ hide_empty: true }), []);
}

// ============================================================
// USERS / DOSEN
// ============================================================

export function useUsers(params: { per_page?: number; page?: number } = {}) {
  return useFetch<PaginatedResponse<WPUser>>(() => getUsers(params), [JSON.stringify(params)]);
}

// ============================================================
// EVENTS
// ============================================================

export function useEvents(params: EventsQueryParams = {}) {
  return useFetch(
    () => getEvents(params),
    [JSON.stringify(params)]
  );
}

export function useUpcomingEvents(count = 5) {
  return useFetch<TribeEvent[]>(() => getUpcomingEvents(count), [count]);
}

export function useEvent(id: number) {
  return useFetch<TribeEvent>(() => getEvent(id), [id]);
}

// ============================================================
// SEARCH
// ============================================================

export function useSearch(query: string) {
  const [results, setResults] = useState<WPSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!query || query.length < 2) {
      setResults([]);
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const data = await searchContent(query);
        setResults(data);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Error");
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  return { results, loading, error };
}

// ============================================================
// CONTACT FORM 7
// ============================================================

export function useContactForm(formId: number) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CF7FeedbackResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const submit = useCallback(
    async (data: Record<string, string>) => {
      setLoading(true);
      setError(null);
      try {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
          formData.append(key, value);
        });
        const response = await submitContactForm(formId, formData);
        setResult(response);
        return response;
      } catch (e) {
        const msg = e instanceof Error ? e.message : "Gagal mengirim pesan";
        setError(msg);
        throw e;
      } finally {
        setLoading(false);
      }
    },
    [formId]
  );

  return { submit, loading, result, error };
}

// ============================================================
// PAGINATION HELPER
// ============================================================

export function usePagination(initialPage = 1) {
  const [page, setPage] = useState(initialPage);

  const nextPage = useCallback((totalPages: number) => {
    setPage((p) => Math.min(p + 1, totalPages));
  }, []);

  const prevPage = useCallback(() => {
    setPage((p) => Math.max(p - 1, 1));
  }, []);

  const goToPage = useCallback((p: number) => setPage(p), []);

  return { page, nextPage, prevPage, goToPage, setPage };
}
