'use client'

import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Linkedin, Youtube } from 'lucide-react'
import { footer } from 'framer-motion/m'

const footerLinks = {
  about: [
    { label: 'Tentang Kami', href: '/about' },
    { label: 'Visi & Misi', href: '/about/vision' },
    { label: 'Sejarah', href: '/about/history' },
    { label: 'Organisasi', href: '/about/organization' },
  ],
  academic: [
    { label: 'Program Sarjana', href: '/study/undergraduate' },
    { label: 'Program Magister', href: '/study/master' },
    { label: 'Program Doktor', href: '/study/doctoral' },
    { label: 'Kurikulum', href: '/study/curriculum' },
  ],
  research: [
    { label: 'Kelompok Riset', href: '/research' },
    { label: 'Publikasi', href: '/research/publications' },
    { label: 'Laboratorium', href: '/research/labs' },
    { label: 'Kerjasama', href: '/research/collaboration' },
  ],
  resources: [
    { label: 'Dosen', href: '/people/faculty' },
    { label: 'Staff', href: '/people/staff' },
    { label: 'Mahasiswa', href: '/people/students' },
    { label: 'Alumni', href: '/people/alumni' },
  ],
}

const socialMedia = [
  { icon: Facebook, href: 'https://facebook.com/geodesiitb', label: 'Facebook' },
  { icon: Instagram, href: 'https://instagram.com/geodesiitb', label: 'Instagram' },
  { icon: Twitter, href: 'https://twitter.com/geodesiitb', label: 'Twitter' },
  { icon: Linkedin, href: 'https://linkedin.com/school/geodesiitb', label: 'LinkedIn' },
  { icon: Youtube, href: 'https://youtube.com/@geodesiitb', label: 'YouTube' },
]

export function Footer() {
  return (
    <footer className="bg-primary text-white">
      {/* Main Footer */}
      <div className="container py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* About Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative w-12 h-12">
                <Image
                  src="/images/logo-geodesi.svg"
                  alt="Logo Geodesi ITB"
                  fill
                  className="object-contain brightness-0 invert"
                />
              </div>
              <div>
                <div className="font-heading font-semibold text-lg">
                  Teknik Geodesi dan Geomatika
                </div>
                <div className="text-sm text-white/70">
                  Institut Teknologi Bandung
                </div>
              </div>
            </div>
            
            <div className="space-y-4 text-sm text-white/80">
              <div className="flex gap-3">
                <MapPin size={18} className="flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold mb-1">Kampus Ganesha</p>
                  <p>Gedung Labtek IX-C, Lantai 3</p>
                  <p>Jl. Ganesha No. 10, Bandung 40132</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Phone size={18} className="flex-shrink-0" />
                <div>
                  <p>+62 22 2500089</p>
                  <p>+62 22 2506059</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Mail size={18} className="flex-shrink-0" />
                <a href="mailto:geodesi@fitb.itb.ac.id" className="hover:text-secondary transition-colors">
                  geodesi@fitb.itb.ac.id
                </a>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Tentang</h3>
            <ul className="space-y-2">
              {footerLinks.about.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/80 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Akademik</h3>
            <ul className="space-y-2">
              {footerLinks.academic.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/80 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Penelitian</h3>
            <ul className="space-y-2 mb-6">
              {footerLinks.research.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/80 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Media */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex gap-4">
              {socialMedia.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
            
            <Link
              href="/contact"
              className="px-6 py-2 border-2 border-white hover:bg-white hover:text-primary rounded-lg transition-colors font-medium"
            >
              Hubungi Kami
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-primary-900 py-6">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/70">
            <p>
              © {new Date().getFullYear()} Teknik Geodesi dan Geomatika ITB. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/sitemap" className="hover:text-white transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}