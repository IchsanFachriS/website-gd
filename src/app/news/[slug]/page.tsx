import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, ArrowLeft, Share2 } from 'lucide-react'
import { getPostBySlug, getRecentPosts } from '@/lib/wordpress'
import { formatDate, getFeaturedImageUrl, getCategoryNames } from '@/lib/utils'
import type { Metadata } from 'next'

interface PageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.title.rendered,
    description: post.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 160),
  }
}

export default async function NewsDetailPage({ params }: PageProps) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const imageUrl = getFeaturedImageUrl(post, 'large')
  const categories = getCategoryNames(post)
  const relatedPosts = await getRecentPosts(3)

  return (
    <div className="py-12 lg:py-16">
      <div className="container max-w-4xl">
        {/* Back Button */}
        <Link
          href="/news"
          className="inline-flex items-center gap-2 text-primary hover:text-secondary mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          Kembali ke Berita
        </Link>

        {/* Featured Image */}
        {imageUrl && (
          <div className="relative aspect-video mb-8 overflow-hidden rounded-lg">
            <Image
              src={imageUrl}
              alt={post.title.rendered}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 896px"
            />
          </div>
        )}

        {/* Categories */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map((category, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-secondary/10 text-secondary text-sm font-medium rounded-full"
              >
                {category}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-gray-900 mb-4">
          {post.title.rendered}
        </h1>

        {/* Meta */}
        <div className="flex items-center gap-4 text-gray-600 mb-8 pb-8 border-b">
          <div className="flex items-center gap-2">
            <Calendar size={18} />
            <time dateTime={post.date}>{formatDate(post.date, 'dd MMMM yyyy')}</time>
          </div>
          <button className="flex items-center gap-2 hover:text-primary transition-colors">
            <Share2 size={18} />
            Bagikan
          </button>
        </div>

        {/* Content */}
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16 pt-16 border-t">
            <h2 className="text-2xl font-heading font-bold text-gray-900 mb-8">
              Berita Terkait
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => {
                const relatedImageUrl = getFeaturedImageUrl(relatedPost, 'medium')

                return (
                  <Link
                    key={relatedPost.id}
                    href={`/news/${relatedPost.slug}`}
                    className="group"
                  >
                    {relatedImageUrl && (
                      <div className="relative aspect-video mb-3 overflow-hidden rounded-lg">
                        <Image
                          src={relatedImageUrl}
                          alt={relatedPost.title.rendered}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                    )}
                    <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
                      {relatedPost.title.rendered}
                    </h3>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}