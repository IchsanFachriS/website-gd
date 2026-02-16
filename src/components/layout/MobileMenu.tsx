'use client'

import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Search } from 'lucide-react'

interface MenuItem {
  label: string
  href: string
}

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  navigation: MenuItem[]
}

export function MobileMenu({ isOpen, onClose, navigation }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />

          {/* Menu */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white z-50 lg:hidden overflow-y-auto"
          >
            <div className="p-6">
              {/* Close Button */}
              <div className="flex justify-end mb-8">
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Search */}
              <div className="mb-8">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Cari..."
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2">
                    <Search size={20} className="text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className="block px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-primary rounded-lg transition-colors font-medium"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              {/* Quick Links */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">
                  Link Cepat
                </h3>
                <div className="space-y-2">
                  <Link
                    href="/staff"
                    onClick={onClose}
                    className="block px-4 py-2 text-gray-600 hover:text-primary transition-colors"
                  >
                    Staff
                  </Link>
                  <Link
                    href="/students"
                    onClick={onClose}
                    className="block px-4 py-2 text-gray-600 hover:text-primary transition-colors"
                  >
                    Mahasiswa
                  </Link>
                  <Link
                    href="/alumni"
                    onClick={onClose}
                    className="block px-4 py-2 text-gray-600 hover:text-primary transition-colors"
                  >
                    Alumni
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}