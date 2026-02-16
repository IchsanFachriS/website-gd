import { Hero } from '@/components/home/Hero'
import { TabBlocks } from '@/components/home/TabBlocks'
import { StatsBlock } from '@/components/home/StatsBlock'
import { ResearchGroups } from '@/components/home/ResearchGroups'
import { NewsSection } from '@/components/home/NewsSection'
import { getRecentPosts } from '@/lib/wordpress'
import type { HeroSlide, TabContent, ResearchGroup } from '@/types'

// Hero Slides Data
const heroSlides: HeroSlide[] = [
  {
    id: '1',
    image: '/images/hero-1.jpg',
    title: 'Teknik Geodesi dan Geomatika',
    subtitle: 'Memadukan ilmu pengukuran bumi dengan teknologi geospasial modern',
    ctaText: 'Pelajari Lebih Lanjut',
    ctaLink: '/about',
  },
  {
    id: '2',
    image: '/images/hero-2.jpg',
    title: 'Riset dan Inovasi',
    subtitle: 'Mengembangkan solusi geospasial untuk masa depan',
    ctaText: 'Lihat Penelitian Kami',
    ctaLink: '/research',
  },
  {
    id: '3',
    image: '/images/hero-3.jpg',
    title: 'Bergabunglah Bersama Kami',
    subtitle: 'Jadilah bagian dari komunitas geodesi terbaik di Indonesia',
    ctaText: 'Info Pendaftaran',
    ctaLink: '/study',
  },
]

// Tab Content Data
const tabContent: TabContent[] = [
  {
    id: 'about',
    title: 'Tentang Kami',
    image: '/images/about-tab.jpg',
    description: `
      <p>Program Studi Teknik Geodesi dan Geomatika ITB merupakan program studi tertua dan terbaik di Indonesia dalam bidang geodesi dan geomatika. Sejak didirikan pada tahun 1950, kami telah menghasilkan ribuan lulusan yang berkiprah di berbagai sektor.</p>
      <p>Kami menggabungkan ilmu pengukuran dan pemetaan bumi dengan teknologi geospasial modern untuk menghasilkan informasi yang akurat dan tepat guna bagi pembangunan nasional.</p>
    `,
    links: [
      { text: 'Sejarah Kami', url: '/about/history' },
      { text: 'Visi & Misi', url: '/about/vision' },
    ],
  },
  {
    id: 'research',
    title: 'Penelitian',
    image: '/images/research-tab.jpg',
    description: `
      <p>Penelitian kami fokus pada pengembangan teknologi geospasial, geodesi satelit, sistem informasi geografis, dan fotogrametri. Kami memiliki berbagai laboratorium modern yang mendukung kegiatan riset mahasiswa dan dosen.</p>
      <p>Kerja sama dengan berbagai institusi nasional dan internasional memperkuat posisi kami sebagai pusat keunggulan penelitian geodesi di Indonesia.</p>
    `,
    links: [
      { text: 'Kelompok Riset', url: '/research' },
      { text: 'Publikasi', url: '/research/publications' },
    ],
  },
  {
    id: 'study',
    title: 'Program Studi',
    image: '/images/study-tab.jpg',
    description: `
      <p>Kami menawarkan program Sarjana (S1), Magister (S2), dan Doktor (S3) dengan kurikulum yang dirancang untuk menghasilkan lulusan yang kompeten dan siap menghadapi tantangan industri 4.0.</p>
      <p>Mahasiswa kami mendapatkan pengalaman praktis melalui kerja praktik, tugas akhir, dan berbagai kegiatan ekstrakurikuler.</p>
    `,
    links: [
      { text: 'Program Sarjana', url: '/study/undergraduate' },
      { text: 'Program Pascasarjana', url: '/study/graduate' },
    ],
  },
]

// Research Groups Data
const researchGroups: ResearchGroup[] = [
  {
    id: '1',
    name: 'Geodesi Satelit',
    image: '/images/research-satellite.jpg',
    description: 'Penelitian tentang sistem navigasi satelit dan positioning',
    link: '/research/satellite-geodesy',
  },
  {
    id: '2',
    name: 'Sistem Informasi Geografis',
    image: '/images/research-gis.jpg',
    description: 'Pengembangan aplikasi dan analisis spasial',
    link: '/research/gis',
  },
  {
    id: '3',
    name: 'Fotogrametri & Penginderaan Jauh',
    image: '/images/research-photogrammetry.jpg',
    description: 'Teknologi pemetaan menggunakan foto udara dan citra satelit',
    link: '/research/photogrammetry',
  },
  {
    id: '4',
    name: 'Geodesi Fisik',
    image: '/images/research-physical.jpg',
    description: 'Studi tentang bentuk dan medan gaya berat bumi',
    link: '/research/physical-geodesy',
  },
]

export default async function HomePage() {
  // Fetch recent posts from WordPress
  const recentPosts = await getRecentPosts(6)

  return (
    <>
      <Hero slides={heroSlides} />
      <TabBlocks tabs={tabContent} />
      <StatsBlock />
      <ResearchGroups groups={researchGroups} />
      <NewsSection posts={recentPosts} />
    </>
  )
}