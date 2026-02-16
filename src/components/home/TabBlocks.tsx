'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import type { TabContent } from '@/types'

interface TabBlocksProps {
  tabs: TabContent[]
}

export function TabBlocks({ tabs }: TabBlocksProps) {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <section className="py-0">
      {/* Tab Navigation */}
      <div className="bg-gray-100 border-b border-gray-200">
        <div className="container">
          <div className="flex overflow-x-auto scrollbar-hide">
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(index)}
                className={`px-6 py-4 font-heading font-semibold whitespace-nowrap transition-colors relative ${
                  activeTab === index
                    ? 'text-primary bg-white'
                    : 'text-gray-600 hover:text-primary'
                }`}
              >
                {tab.title}
                {activeTab === index && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-secondary"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="container-fluid p-0"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Image */}
              <div className="relative h-64 md:h-96 lg:h-[500px]">
                <Image
                  src={tabs[activeTab].image}
                  alt={tabs[activeTab].title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              {/* Content */}
              <div className="p-8 md:p-12 lg:p-16 flex items-center">
                <div className="max-w-xl">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-primary mb-6">
                    {tabs[activeTab].title}
                  </h2>
                  
                  <div
                    className="prose prose-lg max-w-none text-gray-700 mb-8"
                    dangerouslySetInnerHTML={{ __html: tabs[activeTab].description }}
                  />

                  {tabs[activeTab].links && tabs[activeTab].links!.length > 0 && (
                    <div className="flex flex-wrap gap-4">
                      {tabs[activeTab].links!.map((link, index) => (
                        <Link
                          key={index}
                          href={link.url}
                          className="inline-block px-6 py-3 bg-primary hover:bg-primary-600 text-white rounded-lg font-semibold transition-all hover:-translate-y-1 hover:shadow-lg"
                        >
                          {link.text}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}