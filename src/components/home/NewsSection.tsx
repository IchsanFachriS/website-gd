'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Calendar, ArrowRight } from 'lucide-react'
import { formatDate, truncateText, getFeaturedImageUrl } from '@/lib/utils'
import type { WPPost } from '@/types/wordpress'

interface NewsSectionProps {
  posts: WPPost[]
}

export function NewsSection({ posts }: NewsSectionProps) {
  return (
    <section className="py-16 lg:py-24">
      <div className="container">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary mb-4">
              Berita Terkini
            </h2>
            <p className="text-lg text-gray-600">
              Update terbaru dari Teknik Geodesi dan Geomatika ITB
            </p>
          </div>
          <Link
            href="/news"
            className="hidden md:inline-flex items-center gap-2 text-primary hover:text-secondary font-semibold transition-colors"
          >
            Lihat Semua
            <ArrowRight size={20} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => {
            const imageUrl = getFeaturedImageUrl(post, 'medium_large')
            
            return (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Link href={`/news/${post.slug}`} className="block">
                  {/* Image */}
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

                  {/* Date */}
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <Calendar size={16} />
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-heading font-semibold text-gray-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title.rendered}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-600 line-clamp-3 mb-4">
                    {truncateText(post.excerpt.rendered, 120)}
                  </p>

                  {/* Read More */}
                  <span className="inline-flex items-center gap-2 text-secondary font-semibold group-hover:gap-3 transition-all">
                    Baca Selengkapnya
                    <ArrowRight size={18} />
                  </span>
                </Link>
              </motion.article>
            )
          })}
        </div>

        <div className="text-center mt-12 md:hidden">
          <Link
            href="/news"
            className="inline-block px-8 py-4 bg-primary hover:bg-primary-600 text-white rounded-lg font-semibold transition-all hover:-translate-y-1 hover:shadow-xl"
          >
            Lihat Semua Berita
          </Link>
        </div>
      </div>
    </section>
  )
}