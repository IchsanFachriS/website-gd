import Image from 'next/image'
import { Users, Target, Award, Lightbulb } from 'lucide-react'

const features = [
  {
    icon: Target,
    title: 'Visi',
    description: 'Menjadi program studi terkemuka di bidang geodesi dan geomatika yang diakui secara internasional.',
  },
  {
    icon: Lightbulb,
    title: 'Misi',
    description: 'Menyelenggarakan pendidikan, penelitian, dan pengabdian masyarakat yang berkualitas tinggi.',
  },
  {
    icon: Users,
    title: 'Kolaborasi',
    description: 'Membangun kerjasama dengan berbagai institusi nasional dan internasional.',
  },
  {
    icon: Award,
    title: 'Keunggulan',
    description: 'Menghasilkan lulusan yang kompeten dan berdaya saing global.',
  },
]

export const metadata = {
  title: 'Tentang Kami',
  description: 'Mengenal lebih dekat Program Studi Teknik Geodesi dan Geomatika ITB',
}

export default function AboutPage() {
  return (
    <div className="py-12 lg:py-16">
      {/* Hero Section */}
      <div className="relative h-[400px] mb-16">
        <Image
          src="/images/about-hero.jpg"
          alt="Tentang Geodesi ITB"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70 flex items-center">
          <div className="container">
            <h1 className="text-4xl lg:text-6xl font-heading font-bold text-white mb-4">
              Tentang Kami
            </h1>
            <p className="text-xl text-white/90 max-w-2xl">
              Lebih dari 70 tahun berkiprah dalam pendidikan dan penelitian geodesi di Indonesia
            </p>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Introduction */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-700 leading-relaxed">
              Program Studi Teknik Geodesi dan Geomatika ITB merupakan program studi tertua dan terbaik di Indonesia dalam bidang geodesi dan geomatika. Didirikan pada tahun 1950, kami telah menghasilkan ribuan alumni yang berkiprah di berbagai sektor, baik pemerintah maupun swasta.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Kami menggabungkan ilmu pengukuran dan pemetaan bumi dengan teknologi geospasial modern untuk menghasilkan informasi yang akurat dan tepat guna bagi pembangunan nasional. Dengan didukung oleh dosen-dosen berkualitas dan fasilitas laboratorium yang lengkap, kami berkomitmen untuk menghasilkan lulusan yang kompeten dan siap menghadapi tantangan global.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-lg bg-gray-50 hover:bg-white hover:shadow-lg transition-all"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <feature.icon className="text-primary" size={32} />
              </div>
              <h3 className="text-xl font-heading font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* History Timeline */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-primary mb-8 text-center">
            Sejarah Singkat
          </h2>
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-24 font-bold text-secondary text-xl">
                1950
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Pendirian</h3>
                <p className="text-gray-600">
                  Didirikan sebagai bagian dari Fakultas Teknik ITB dengan nama Jurusan Geodesi.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-24 font-bold text-secondary text-xl">
                1982
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Fakultas FIKTM</h3>
                <p className="text-gray-600">
                  Menjadi bagian dari Fakultas Ilmu Kebumian dan Teknologi Mineral (FIKTM).
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-24 font-bold text-secondary text-xl">
                2006
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Rebranding</h3>
                <p className="text-gray-600">
                  Berubah nama menjadi Program Studi Teknik Geodesi dan Geomatika.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-24 font-bold text-secondary text-xl">
                2023
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Akreditasi Unggul</h3>
                <p className="text-gray-600">
                  Meraih akreditasi Unggul dari BAN-PT dan terus berinovasi dalam pendidikan geodesi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}