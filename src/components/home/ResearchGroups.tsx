'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import type { ResearchGroup } from '@/types'

interface ResearchGroupsProps {
  groups: ResearchGroup[]
}

export function ResearchGroups({ groups }: ResearchGroupsProps) {
  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="container">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary mb-4">
            Kelompok Riset
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Eksplorasi berbagai bidang penelitian unggulan di Teknik Geodesi dan Geomatika ITB
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {groups.map((group, index) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={group.link}
                className="group block relative aspect-square overflow-hidden rounded-lg"
              >
                {/* Image */}
                <div className="absolute inset-0">
                  <Image
                    src={group.image}
                    alt={group.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <h3 className="text-white font-heading font-semibold text-xl mb-2 transform transition-transform group-hover:-translate-y-2">
                    {group.name}
                  </h3>
                  <p className="text-white/80 text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {group.description}
                  </p>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 border-2 border-secondary opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/research"
            className="inline-block px-8 py-4 bg-primary hover:bg-primary-600 text-white rounded-lg font-semibold transition-all hover:-translate-y-1 hover:shadow-xl"
          >
            Lihat Semua Riset
          </Link>
        </div>
      </div>
    </section>
  )
}