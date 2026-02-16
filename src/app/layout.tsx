import type { Metadata } from 'next'
import { Roboto, Barlow_Semi_Condensed } from 'next/font/google'
import { TopBar } from '@/components/layout/TopBar'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ErrorBoundary } from '@/components/common/ErrorBoundary'
import './globals.css'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-roboto',
  display: 'swap',
})

const barlow = Barlow_Semi_Condensed({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-barlow',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Teknik Geodesi dan Geomatika - ITB',
    template: '%s | Teknik Geodesi dan Geomatika ITB',
  },
  description: 'Program Studi Teknik Geodesi dan Geomatika, Fakultas Ilmu dan Teknologi Kebumian, Institut Teknologi Bandung',
  keywords: ['Geodesi', 'Geomatika', 'ITB', 'FITB', 'Institut Teknologi Bandung', 'Teknik Geodesi'],
  authors: [{ name: 'Teknik Geodesi dan Geomatika ITB' }],
  creator: 'Teknik Geodesi dan Geomatika ITB',
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://gd.fitb.itb.ac.id',
    siteName: 'Teknik Geodesi dan Geomatika ITB',
    title: 'Teknik Geodesi dan Geomatika - ITB',
    description: 'Program Studi Teknik Geodesi dan Geomatika, Fakultas Ilmu dan Teknologi Kebumian, Institut Teknologi Bandung',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Teknik Geodesi dan Geomatika - ITB',
    description: 'Program Studi Teknik Geodesi dan Geomatika, Fakultas Ilmu dan Teknologi Kebumian, Institut Teknologi Bandung',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className={`${roboto.variable} ${barlow.variable}`}>
      <body className="font-sans antialiased">
        <ErrorBoundary>
          <TopBar />
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ErrorBoundary>
      </body>
    </html>
  )
}