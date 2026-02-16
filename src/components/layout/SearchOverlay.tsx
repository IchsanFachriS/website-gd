'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Search } from 'lucide-react'
import Link from 'next/link'
import { useSearch } from '@/hooks/useWordPress'
import { truncateText, formatDate } from '@/lib/utils'

interface SearchOverlayProps {
  isOpen: boolean
  onClose: () => void
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('')
  const { results, loading } = useSearch(query)

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 z-50 flex items-start justify-center pt-32"
          onClick={onClose}
        >
          <div
            className="container max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input */}
            <div className="relative mb-8">
              <input
                type="text"
                placeholder="Cari berdasarkan kata kunci, subjek, atau nama..."
                className="w-full bg-transparent text-white text-3xl lg:text-4xl border-b-2 border-white pb-4 outline-none placeholder:text-white/50"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button
                onClick={onClose}
                className="absolute -top-16 right-0 text-white hover:text-gray-300 transition-colors"
              >
                <X size={32} />
              </button>
            </div>

            {/* Search Results */}
            {query && (
              <div className="bg-white rounded-lg max-h-[60vh] overflow-y-auto">
                {loading ? (
                  <div className="p-8 text-center text-gray-500">
                    Mencari...
                  </div>
                ) : results.length > 0 ? (
                  <div className="divide-y">
                    {results.map((post) => (
                      <Link
                        key={post.id}
                        href={`/news/${post.slug}`}
                        onClick={onClose}
                        className="block p-6 hover:bg-gray-50 transition-colors"
                      >
                        <h3 className="font-semibold text-lg mb-2 text-primary">
                          {post.title.rendered}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2">
                          {truncateText(post.excerpt.rendered, 120)}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatDate(post.date)}
                        </p>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-gray-500">
                    Tidak ada hasil untuk &quot;{query}&quot;
                  </div>
                )}
              </div>
            )}

            {/* Search Tips */}
            {!query && (
              <div className="text-white/70 text-sm">
                <p className="mb-4">Tips pencarian:</p>
                <ul className="space-y-2 text-white/50">
                  <li>• Gunakan kata kunci spesifik untuk hasil yang lebih akurat</li>
                  <li>• Coba variasi kata atau sinonim</li>
                  <li>• Gunakan tanda kutip untuk mencari frasa lengkap</li>
                </ul>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}