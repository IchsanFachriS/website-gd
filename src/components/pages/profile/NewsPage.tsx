// ============================================================
// profile/NewsPage.tsx
// ============================================================
import { Breadcrumb, PageHero } from "../_shared/PageShell";
import type { PageProps } from "../_shared/PageShell";

const posts = [
  {
    title: "Tim Geodesi ITB Raih Penghargaan di Konferensi ION GNSS+ 2024",
    date: "15 November 2024",
    category: "Research",
    excerpt: "Tim riset dari Departemen Teknik Geodesi dan Geomatika ITB berhasil mempresentasikan hasil penelitian terkait sistem GPS-CORS di konferensi internasional ION GNSS+ 2024 yang berlangsung di Baltimore, Amerika Serikat.",
    image: "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=600&q=80",
  },
  {
    title: "Wisuda Oktober 2024: Selamat kepada Lulusan Geodesi & Geomatika",
    date: "28 Oktober 2024",
    category: "Academic",
    excerpt: "Sebanyak 87 mahasiswa Teknik Geodesi dan Geomatika ITB diwisuda pada periode Oktober 2024. Upacara wisuda dihadiri oleh Rektor ITB, Dekan FITB, dan keluarga para wisudawan.",
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=600&q=80",
  },
  {
    title: "Kuliah Lapangan Fotogrametri UAV di Bandung Selatan",
    date: "10 Oktober 2024",
    category: "Academic",
    excerpt: "Mahasiswa semester 5 mengikuti praktikum fotogrametri menggunakan drone UAV di kawasan Bandung Selatan. Pengolahan data dilakukan menggunakan software Agisoft Metashape untuk menghasilkan model 3D kawasan.",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&q=80",
  },
  {
    title: "Departemen GD-ITB Tandatangani MoU dengan BIG untuk Riset Geospasial",
    date: "5 September 2024",
    category: "Collaboration",
    excerpt: "Departemen Teknik Geodesi dan Geomatika ITB resmi menandatangani Memorandum of Understanding dengan Badan Informasi Geospasial (BIG) untuk memperkuat kerja sama riset dan pengembangan infrastruktur data spasial nasional.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&q=80",
  },
  {
    title: "Seminar Nasional Geomatika 2024: Geospasial untuk Indonesia Emas",
    date: "20 Agustus 2024",
    category: "Event",
    excerpt: "Seminar Nasional Geomatika 2024 dengan tema 'Geospasial untuk Indonesia Emas 2045' berhasil diselenggarakan dengan sukses. Acara ini dihadiri oleh lebih dari 300 peserta dari berbagai universitas dan instansi pemerintah.",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=600&q=80",
  },
  {
    title: "Beasiswa LPDP 2024: Mahasiswa GD-ITB Raih Pendanaan S2 Internasional",
    date: "1 Agustus 2024",
    category: "Student",
    excerpt: "Tiga mahasiswa Teknik Geodesi dan Geomatika ITB berhasil meraih beasiswa LPDP untuk melanjutkan studi S2 di universitas terkemuka di Belanda, Jerman, dan Australia pada tahun akademik 2024/2025.",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80",
  },
];

const categoryColors: Record<string, string> = {
  Research: "var(--blue)",
  Academic: "var(--navy)",
  Collaboration: "var(--orange)",
  Event: "#6b7280",
  Student: "#059669",
};

export function NewsPage({ onNavigate }: PageProps) {
  return (
    <div>
      <Breadcrumb
        items={[
          { label: "Profile", page: "profile" },
          { label: "News", page: "" },
        ]}
        onNavigate={onNavigate}
      />
      <PageHero
        kicker="Profile"
        title="News & Activities"
        subtitle="Latest news, events, and achievements from the Department of Geodesy & Geomatics Engineering."
      />

      <section className="gd-page-section">
        <div className="gd-container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "28px" }}>
            {posts.map((post) => (
              <article
                key={post.title}
                style={{ background: "var(--white)", border: "1px solid var(--gray-200)", overflow: "hidden", display: "flex", flexDirection: "column" as const }}
              >
                <div style={{ height: "200px", overflow: "hidden" }}>
                  <img src={post.image} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ padding: "24px", flex: 1, display: "flex", flexDirection: "column" as const }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" as const, padding: "3px 10px", background: categoryColors[post.category] || "var(--navy)", color: "var(--white)" }}>
                      {post.category}
                    </span>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: "12px", color: "var(--gray-400)", marginLeft: "auto" }}>{post.date}</span>
                  </div>
                  <h2 style={{ fontFamily: "var(--font-display)", fontSize: "17px", fontWeight: 700, color: "var(--navy)", lineHeight: 1.35, marginBottom: "10px" }}>{post.title}</h2>
                  <p style={{ fontSize: "14px", lineHeight: 1.7, color: "var(--gray-600)", flex: 1 }}>{post.excerpt}</p>
                  <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontFamily: "var(--font-display)", fontSize: "12px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" as const, color: "var(--navy)", marginTop: "16px" }}>
                    Read More →
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}