// ============================================================
// Page Sections — Hero, About, Berita, Agenda, Galeri, Kontak, Dosen
// ============================================================

import { useState } from "react";
import {
  useLatestPosts,
  useUpcomingEvents,
  useGallery,
  useUsers,
  useContactForm,
  usePagination,
  usePosts,
} from "../../hooks/useWordPress";
import {
  PostCard,
  PostCardSkeleton,
  EventCard,
  MediaCard,
  UserCard,
  ErrorState,
  EmptyState,
  Section,
  Pagination,
} from "../ui/Components";
import type { WPMedia } from "../../types/wordpress";

// ============================================================
// HERO SECTION
// ============================================================
export function HeroSection() {
  return (
    <section
      id="beranda"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#07101f]"
    >
      {/* Animated Grid Background */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(200,146,42,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(200,146,42,0.3) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Coordinate Lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Meridian lines */}
        {[20, 40, 60, 80].map((pct) => (
          <div
            key={pct}
            className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#c8922a]/10 to-transparent"
            style={{ left: `${pct}%` }}
          />
        ))}
        {/* Latitude lines */}
        {[25, 50, 75].map((pct) => (
          <div
            key={pct}
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c8922a]/10 to-transparent"
            style={{ top: `${pct}%` }}
          />
        ))}
      </div>

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#c8922a]/5 blur-3xl" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        {/* Breadcrumb identifier */}
        <div className="inline-flex items-center gap-2 border border-[#c8922a]/30 bg-[#c8922a]/10 rounded-sm px-4 py-1.5 mb-8">
          <div className="w-1.5 h-1.5 rounded-full bg-[#c8922a] animate-pulse" />
          <span className="text-[#c8922a] text-xs font-bold uppercase tracking-widest">
            FITB — Institut Teknologi Bandung
          </span>
        </div>

        <h1 className="text-white text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6 tracking-tight">
          Teknik Geodesi
          <br />
          <span className="text-[#c8922a]">&</span> Geomatika
        </h1>

        <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-10">
          Memimpin riset dan pendidikan dalam pemetaan, penginderaan jauh,
          dan sistem informasi geospasial untuk masa depan yang lebih terukur.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#tentang"
            className="bg-[#c8922a] hover:bg-[#b07a22] text-white text-sm font-bold uppercase tracking-widest px-8 py-3 rounded-sm transition-colors"
          >
            Pelajari Program Studi
          </a>
          <a
            href="#berita"
            className="border border-white/20 hover:border-white/40 text-white text-sm font-bold uppercase tracking-widest px-8 py-3 rounded-sm transition-colors hover:bg-white/5"
          >
            Lihat Berita Terkini
          </a>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-8 border-t border-white/10 pt-10">
          {[
            { label: "Tahun Berdiri", value: "1950" },
            { label: "Dosen Aktif", value: "40+" },
            { label: "Alumni", value: "3000+" },
            { label: "Kelompok Keahlian", value: "4" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-[#c8922a] text-3xl font-bold">{stat.value}</div>
              <div className="text-gray-500 text-xs uppercase tracking-widest mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-gray-500 text-xs uppercase tracking-widest">Gulir</span>
        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}

// ============================================================
// ABOUT SECTION
// ============================================================
export function AboutSection() {
  const programs = [
    { level: "S1", name: "Teknik Geodesi dan Geomatika", desc: "Program sarjana 4 tahun yang mencakup geodesi, kartografi, fotogrametri, dan SIG." },
    { level: "S2", name: "Magister Ilmu dan Teknik Geomatika", desc: "Program pascasarjana untuk pengembangan riset dan keahlian tingkat lanjut." },
    { level: "S3", name: "Doktor Ilmu dan Teknik Geomatika", desc: "Program doktor berbasis riset orisinal di bidang geomatika dan geodesi." },
  ];

  return (
    <section id="tentang" className="py-20 bg-[#0c1829]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Text */}
          <div>
            <p className="text-[#c8922a] text-xs font-bold uppercase tracking-widest mb-2">
              Tentang Kami
            </p>
            <h2 className="text-white text-3xl font-bold mb-4">
              Departemen Terdepan dalam Geospasial
            </h2>
            <div className="w-12 h-0.5 bg-[#c8922a] mb-6" />
            <div className="space-y-4 text-gray-400 text-sm leading-relaxed">
              <p>
                Departemen Teknik Geodesi dan Geomatika FITB ITB merupakan salah satu
                program studi geodesi tertua dan paling prestisius di Indonesia,
                berdiri sejak tahun 1959.
              </p>
              <p>
                Kami berfokus pada pengembangan ilmu dan teknologi pengukuran bumi,
                sistem referensi geodetik, penginderaan jauh, sistem informasi geografis,
                serta teknologi geospasial terkini.
              </p>
              <p>
                Lulusan kami berkontribusi di berbagai sektor strategis nasional
                mulai dari badan survei pemerintahan, industri migas dan pertambangan,
                teknologi geospasial, hingga riset akademik internasional.
              </p>
            </div>

            {/* Core competencies */}
            <div className="mt-8 grid grid-cols-2 gap-3">
              {["Geodesi Fisis", "Fotogrametri", "Penginderaan Jauh", "Sistem Informasi Geografi", "Kartografi", "GNSS & Navigasi"].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-gray-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#c8922a] flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Program Cards */}
          <div className="space-y-4">
            {programs.map((prog) => (
              <div
                key={prog.level}
                className="group bg-[#111d30] hover:bg-[#162238] border border-white/5 hover:border-[#c8922a]/20 rounded-lg p-5 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#c8922a]/10 border border-[#c8922a]/20 rounded flex items-center justify-center">
                    <span className="text-[#c8922a] text-sm font-bold">{prog.level}</span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-sm mb-1.5 group-hover:text-[#c8922a] transition-colors">
                      {prog.name}
                    </h3>
                    <p className="text-gray-400 text-xs leading-relaxed">{prog.desc}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Accreditation badges */}
            <div className="mt-6 flex flex-wrap gap-3">
              {["Terakreditasi A — BAN-PT", "AUN-QA Certified", "ASEAN University Network"].map((acc) => (
                <span key={acc} className="inline-flex items-center gap-1.5 bg-[#c8922a]/10 border border-[#c8922a]/20 text-[#c8922a] text-xs px-3 py-1.5 rounded-sm">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {acc}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// BERITA (NEWS) SECTION
// ============================================================
export function BeritaSection() {
  const { page, goToPage } = usePagination(1);
  const { data, loading, error } = usePosts({ per_page: 6, page, _embed: true });

  return (
    <Section id="berita" title="Berita Terkini" subtitle="Informasi & Artikel" dark>
      {error && <ErrorState message={error} />}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => <PostCardSkeleton key={i} />)}
        </div>
      )}
      {!loading && !error && data && (
        <>
          {data.data.length === 0 ? (
            <EmptyState message="Belum ada berita" />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.data.map((post) => <PostCard key={post.id} post={post} />)}
            </div>
          )}
          <Pagination
            page={page}
            totalPages={data.totalPages}
            onPageChange={goToPage}
          />
        </>
      )}
    </Section>
  );
}

// ============================================================
// AGENDA (EVENTS) SECTION
// ============================================================
export function AgendaSection() {
  const { data: events, loading, error } = useUpcomingEvents(8);

  return (
    <Section id="agenda" title="Agenda Mendatang" subtitle="Kalender Kegiatan">
      <div className="grid lg:grid-cols-3 gap-10">
        {/* Events list */}
        <div className="lg:col-span-2">
          {error && <ErrorState message={error} />}
          {loading && (
            <div className="space-y-5">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-14 h-14 bg-white/10 animate-pulse rounded" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-white/10 animate-pulse rounded w-3/4" />
                    <div className="h-3 bg-white/10 animate-pulse rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          )}
          {!loading && !error && events && (
            events.length === 0 ? (
              <EmptyState message="Belum ada agenda mendatang" />
            ) : (
              <div className="space-y-5">
                {events.map((event) => <EventCard key={event.id} event={event} />)}
              </div>
            )
          )}
        </div>

        {/* Mini Calendar Info */}
        <div className="bg-[#111d30] rounded-lg p-6 border border-white/5 self-start">
          <h3 className="text-white font-semibold text-sm mb-4 flex items-center gap-2">
            <svg className="w-4 h-4 text-[#c8922a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Kalender Akademik
          </h3>
          <div className="space-y-3">
            {[
              { label: "Semester Ganjil", date: "Agt – Des 2025" },
              { label: "UTS", date: "Okt 2025" },
              { label: "UAS", date: "Des 2025" },
              { label: "Semester Genap", date: "Feb – Jun 2026" },
            ].map((item) => (
              <div key={item.label} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                <span className="text-gray-400 text-xs">{item.label}</span>
                <span className="text-[#c8922a] text-xs font-medium">{item.date}</span>
              </div>
            ))}
          </div>
          <a
            href="https://gd.fitb.itb.ac.id"
            target="_blank"
            rel="noreferrer"
            className="mt-4 block text-center text-xs text-[#c8922a] font-semibold uppercase tracking-widest hover:text-white transition-colors"
          >
            Lihat Semua Agenda →
          </a>
        </div>
      </div>
    </Section>
  );
}

// ============================================================
// GALERI SECTION
// ============================================================
export function GaleriSection() {
  const { data, loading, error } = useGallery({ per_page: 12 });
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  const openLightbox = (media: WPMedia) => {
    setLightbox({
      src: media.media_details?.sizes?.large?.source_url || media.source_url,
      alt: media.alt_text || media.title.rendered,
    });
  };

  return (
    <>
      <Section id="galeri" title="Galeri Foto" subtitle="Dokumentasi Kegiatan" dark>
        {error && <ErrorState message={error} />}
        {loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="aspect-square bg-white/10 animate-pulse rounded-lg" />
            ))}
          </div>
        )}
        {!loading && !error && data && (
          data.data.length === 0 ? (
            <EmptyState message="Belum ada foto di galeri" />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {data.data.map((media) => (
                <MediaCard
                  key={media.id}
                  media={media}
                  onClick={() => openLightbox(media)}
                />
              ))}
            </div>
          )
        )}
      </Section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-[#c8922a] transition-colors"
            onClick={() => setLightbox(null)}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img
            src={lightbox.src}
            alt={lightbox.alt}
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}

// ============================================================
// DOSEN SECTION
// ============================================================
export function DosenSection() {
  const { data, loading, error } = useUsers({ per_page: 8 });

  return (
    <Section id="dosen" title="Tim Pengajar" subtitle="Tenaga Pendidik">
      {error && <ErrorState message={error} />}
      {loading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-[#111d30] rounded-lg p-5 flex flex-col items-center gap-3">
              <div className="w-20 h-20 rounded-full bg-white/10 animate-pulse" />
              <div className="h-4 w-28 bg-white/10 animate-pulse rounded" />
              <div className="h-3 w-20 bg-white/10 animate-pulse rounded" />
            </div>
          ))}
        </div>
      )}
      {!loading && !error && data && (
        data.data.length === 0 ? (
          <EmptyState message="Data dosen tidak tersedia" />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.data.map((user) => <UserCard key={user.id} user={user} />)}
          </div>
        )
      )}
    </Section>
  );
}

// ============================================================
// CONTACT SECTION
// ============================================================
export function KontakSection() {
  // CF7 form ID — sesuaikan dengan ID form di WordPress
  const { submit, loading, result, error } = useContactForm(1);
  const [form, setForm] = useState({ your_name: "", your_email: "", your_subject: "", your_message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submit(form);
    } catch {
      // error handled by hook
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <Section id="kontak" title="Hubungi Kami" subtitle="Kontak" dark>
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Info */}
        <div>
          <p className="text-gray-400 text-sm leading-relaxed mb-8">
            Punya pertanyaan seputar program studi, penerimaan mahasiswa,
            atau kerjasama riset? Kami siap membantu Anda.
          </p>

          <div className="space-y-5">
            {[
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
                label: "Alamat",
                value: "Gedung Teknik Geodesi, Jl. Ganesha No. 10, Bandung 40132",
              },
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                ),
                label: "Telepon",
                value: "(022) 2502324",
              },
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
                label: "Email",
                value: "info@gd.fitb.itb.ac.id",
              },
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                label: "Jam Operasional",
                value: "Senin – Jumat, 08.00 – 16.00 WIB",
              },
            ].map((item) => (
              <div key={item.label} className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-[#c8922a]/10 border border-[#c8922a]/20 rounded flex items-center justify-center text-[#c8922a]">
                  {item.icon}
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest mb-0.5">{item.label}</div>
                  <div className="text-gray-300 text-sm">{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="bg-[#111d30] rounded-lg p-8 border border-white/5">
          {result?.status === "mail_sent" ? (
            <div className="text-center py-8">
              <div className="w-14 h-14 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-2">Pesan Terkirim!</h3>
              <p className="text-gray-400 text-sm">{result.message}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-400 uppercase tracking-widest mb-1.5">Nama</label>
                  <input
                    type="text"
                    name="your_name"
                    value={form.your_name}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 focus:border-[#c8922a] text-white text-sm rounded px-3 py-2.5 outline-none transition-colors placeholder-gray-600"
                    placeholder="Nama Anda"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 uppercase tracking-widest mb-1.5">Email</label>
                  <input
                    type="email"
                    name="your_email"
                    value={form.your_email}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 focus:border-[#c8922a] text-white text-sm rounded px-3 py-2.5 outline-none transition-colors placeholder-gray-600"
                    placeholder="email@contoh.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-400 uppercase tracking-widest mb-1.5">Subjek</label>
                <input
                  type="text"
                  name="your_subject"
                  value={form.your_subject}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 focus:border-[#c8922a] text-white text-sm rounded px-3 py-2.5 outline-none transition-colors placeholder-gray-600"
                  placeholder="Topik pesan Anda"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 uppercase tracking-widest mb-1.5">Pesan</label>
                <textarea
                  name="your_message"
                  value={form.your_message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full bg-white/5 border border-white/10 focus:border-[#c8922a] text-white text-sm rounded px-3 py-2.5 outline-none transition-colors placeholder-gray-600 resize-none"
                  placeholder="Tulis pesan Anda di sini…"
                />
              </div>

              {error && (
                <p className="text-red-400 text-xs bg-red-400/10 border border-red-400/20 rounded px-3 py-2">
                  {error}
                </p>
              )}

              {result?.status && result.status !== "mail_sent" && (
                <p className="text-yellow-400 text-xs bg-yellow-400/10 border border-yellow-400/20 rounded px-3 py-2">
                  {result.message}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#c8922a] hover:bg-[#b07a22] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-bold uppercase tracking-widest py-3 rounded-sm transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Mengirim…
                  </>
                ) : (
                  "Kirim Pesan"
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </Section>
  );
}
