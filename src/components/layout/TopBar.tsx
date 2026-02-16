'use client'

import Link from 'next/link'
import { Globe } from 'lucide-react'

const topLinks = [
  { label: 'Staff', href: '/staff' },
  { label: 'Mahasiswa', href: '/students' },
  { label: 'Alumni', href: '/alumni' },
  { label: 'Mitra', href: '/partners' },
]

export function TopBar() {
  return (
    <div className="bg-primary text-white py-2 hidden lg:block">
      <div className="container">
        <div className="flex justify-between items-center text-sm">
          {/* Language Switcher */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Globe size={16} />
              <Link 
                href="/id" 
                className="hover:text-accent transition-colors"
              >
                ID
              </Link>
              <span className="text-white/50">|</span>
              <Link 
                href="/en" 
                className="hover:text-accent transition-colors"
              >
                EN
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <nav className="flex gap-6">
            {topLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-accent transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}