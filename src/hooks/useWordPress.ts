'use client'

import { useState, useEffect } from 'react'
import { WPPost, WPPage, WPCategory } from '@/types/wordpress'
import {
  getPosts,
  getPostBySlug,
  getPageBySlug,
  getCategories,
  getPostsByCategory,
  searchPosts,
} from '@/lib/wordpress'

export function usePosts(page: number = 1, perPage: number = 10) {
  const [posts, setPosts] = useState<WPPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [total, setTotal] = useState(0)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true)
        const response = await getPosts(page, perPage)
        setPosts(response.data)
        setTotal(response.total)
        setTotalPages(response.totalPages)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [page, perPage])

  return { posts, loading, error, total, totalPages }
}

export function usePost(slug: string) {
  const [post, setPost] = useState<WPPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchPost() {
      try {
        setLoading(true)
        const data = await getPostBySlug(slug)
        setPost(data)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchPost()
    }
  }, [slug])

  return { post, loading, error }
}

export function usePage(slug: string) {
  const [page, setPage] = useState<WPPage | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchPage() {
      try {
        setLoading(true)
        const data = await getPageBySlug(slug)
        setPage(data)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchPage()
    }
  }, [slug])

  return { page, loading, error }
}

export function useCategories() {
  const [categories, setCategories] = useState<WPCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoading(true)
        const data = await getCategories()
        setCategories(data)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  return { categories, loading, error }
}

export function useSearch(query: string, page: number = 1) {
  const [results, setResults] = useState<WPPost[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    async function search() {
      if (!query.trim()) {
        setResults([])
        return
      }

      try {
        setLoading(true)
        const response = await searchPosts(query, page)
        setResults(response.data)
        setTotal(response.total)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    const timeoutId = setTimeout(search, 300)
    return () => clearTimeout(timeoutId)
  }, [query, page])

  return { results, loading, error, total }
}