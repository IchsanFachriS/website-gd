import { apiClient } from './api-client'
import type {
  WPPost,
  WPPage,
  WPMedia,
  WPCategory,
  WPTag,
  WPAPIResponse,
} from '@/types/wordpress'

const POSTS_PER_PAGE = 10

// Helper function to extract total from headers
function parsePaginationHeaders(headers: any) {
  return {
    total: parseInt(headers['x-wp-total'] || '0', 10),
    totalPages: parseInt(headers['x-wp-totalpages'] || '0', 10),
  }
}

/**
 * Get all posts with pagination
 */
export async function getPosts(
  page: number = 1,
  perPage: number = POSTS_PER_PAGE
): Promise<WPAPIResponse<WPPost>> {
  try {
    const response = await apiClient.get<WPPost[]>(
      `/posts?page=${page}&per_page=${perPage}&_embed=1`
    )
    
    // In a real implementation, you'd parse headers for pagination
    return {
      data: response,
      total: response.length,
      totalPages: 1,
    }
  } catch (error) {
    console.error('Error fetching posts:', error)
    return {
      data: [],
      total: 0,
      totalPages: 0,
    }
  }
}

/**
 * Get a single post by slug
 */
export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  try {
    const response = await apiClient.get<WPPost[]>(`/posts?slug=${slug}&_embed=1`)
    return response.length > 0 ? response[0] : null
  } catch (error) {
    console.error(`Error fetching post with slug ${slug}:`, error)
    return null
  }
}

/**
 * Get a single post by ID
 */
export async function getPostById(id: number): Promise<WPPost | null> {
  try {
    const response = await apiClient.get<WPPost>(`/posts/${id}?_embed=1`)
    return response
  } catch (error) {
    console.error(`Error fetching post with ID ${id}:`, error)
    return null
  }
}

/**
 * Get all pages
 */
export async function getPages(): Promise<WPPage[]> {
  try {
    const response = await apiClient.get<WPPage[]>('/pages?per_page=100&_embed=1')
    return response
  } catch (error) {
    console.error('Error fetching pages:', error)
    return []
  }
}

/**
 * Get a single page by slug
 */
export async function getPageBySlug(slug: string): Promise<WPPage | null> {
  try {
    const response = await apiClient.get<WPPage[]>(`/pages?slug=${slug}&_embed=1`)
    return response.length > 0 ? response[0] : null
  } catch (error) {
    console.error(`Error fetching page with slug ${slug}:`, error)
    return null
  }
}

/**
 * Get all categories
 */
export async function getCategories(): Promise<WPCategory[]> {
  try {
    const response = await apiClient.get<WPCategory[]>('/categories?per_page=100')
    return response
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

/**
 * Get posts by category
 */
export async function getPostsByCategory(
  categoryId: number,
  page: number = 1,
  perPage: number = POSTS_PER_PAGE
): Promise<WPAPIResponse<WPPost>> {
  try {
    const response = await apiClient.get<WPPost[]>(
      `/posts?categories=${categoryId}&page=${page}&per_page=${perPage}&_embed=1`
    )
    
    return {
      data: response,
      total: response.length,
      totalPages: 1,
    }
  } catch (error) {
    console.error(`Error fetching posts for category ${categoryId}:`, error)
    return {
      data: [],
      total: 0,
      totalPages: 0,
    }
  }
}

/**
 * Get all tags
 */
export async function getTags(): Promise<WPTag[]> {
  try {
    const response = await apiClient.get<WPTag[]>('/tags?per_page=100')
    return response
  } catch (error) {
    console.error('Error fetching tags:', error)
    return []
  }
}

/**
 * Get media by ID
 */
export async function getMediaById(id: number): Promise<WPMedia | null> {
  try {
    const response = await apiClient.get<WPMedia>(`/media/${id}`)
    return response
  } catch (error) {
    console.error(`Error fetching media with ID ${id}:`, error)
    return null
  }
}

/**
 * Search posts
 */
export async function searchPosts(
  query: string,
  page: number = 1,
  perPage: number = POSTS_PER_PAGE
): Promise<WPAPIResponse<WPPost>> {
  try {
    const response = await apiClient.get<WPPost[]>(
      `/posts?search=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}&_embed=1`
    )
    
    return {
      data: response,
      total: response.length,
      totalPages: 1,
    }
  } catch (error) {
    console.error(`Error searching posts with query "${query}":`, error)
    return {
      data: [],
      total: 0,
      totalPages: 0,
    }
  }
}

/**
 * Get featured posts (sticky posts)
 */
export async function getFeaturedPosts(limit: number = 5): Promise<WPPost[]> {
  try {
    const response = await apiClient.get<WPPost[]>(
      `/posts?sticky=true&per_page=${limit}&_embed=1`
    )
    return response
  } catch (error) {
    console.error('Error fetching featured posts:', error)
    return []
  }
}

/**
 * Get recent posts
 */
export async function getRecentPosts(limit: number = 5): Promise<WPPost[]> {
  try {
    const response = await apiClient.get<WPPost[]>(
      `/posts?per_page=${limit}&orderby=date&order=desc&_embed=1`
    )
    return response
  } catch (error) {
    console.error('Error fetching recent posts:', error)
    return []
  }
}