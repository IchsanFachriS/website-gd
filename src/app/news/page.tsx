'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Search } from 'lucide-react'
import { usePosts } from '@/hooks/useWordPress'
import { Loading } from '@/components/common/Loading'
import { Pagination } from '@/components/common/Pagination'
import { formatDate, truncateText, getFeaturedImageUrl } from '@/lib/utils'

export default function NewsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const { posts, loading, totalPages } = usePosts(currentPage, 12)

  const filteredPosts = searchQuery
    ? posts.filter(post =>
        post.title.rendered.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : posts

  return (
    <div className="py-12 lg:py-16">
      <div className="container">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl lg:text-5xl font-heading font-bold text-primary mb-4">
            Berita & Artikel
          </h1>
          <p className="text-lg text-gray-600">
            Ikuti perkembangan terbaru dari Teknik Geodesi dan Geomatika ITB
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Cari berita..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>

        {/* Posts Grid */}
        {loading ? (
          <Loading size="lg" className="py-20" />
        ) : filteredPosts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {filteredPosts.map((post) => {
                const imageUrl = getFeaturedImageUrl(post, 'medium_large')

                return (
                  <article key={post.id} className="group">
                    <Link href={`/news/${post.slug}`}>
                      <div className="relative aspect-video mb-4 overflow-hidden rounded-lg bg-gray-200">
                        {imageUrl ? (
                          <Image
                            src={imageUrl}
                            alt={post.title.rendered}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-300">
                            <span className="text-gray-500">No Image</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                        <Calendar size={16} />
                        <time dateTime={post.date}>{formatDate(post.date)}</time>
                      </div>

                      <h2 className="text-xl font-heading font-semibold text-gray-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title.rendered}
                      </h2>

                      <p className="text-gray-600 line-clamp-3">
                        {truncateText(post.excerpt.rendered, 120)}
                      </p>
                    </Link>
                  </article>
                )
              })}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">Tidak ada berita yang ditemukan.</p>
          </div>
        )}
      </div>
    </div>
  )
}