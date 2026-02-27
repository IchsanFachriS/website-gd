// ============================================================
// profile/VisionMissionPage.tsx
// ============================================================
import { Breadcrumb, PageHero } from "../_shared/PageShell";
import type { PageProps } from "../_shared/PageShell";

const objectives = [
  "Memperoleh pengetahuan terintegrasi di bidang teknik geodesi dan geomatika seperti yang dituntut oleh industri, profesi, dan layanan publik",
  "Memiliki keterampilan dalam memanfaatkan pengetahuan dalam memecahkan masalah yang relevan di industri, profesi, dan layanan publik",
  "Mampu menangani masalah yang terbuka dan kompleks, terutama dengan mempertimbangkan solusi rekayasa, yang terdiri dari aspek teknis, desain, sosio-ekonomi, budaya, lingkungan, dan bisnis",
  "Menunjukkan kemampuan untuk beradaptasi, menyesuaikan diri, dan berkembang secara mandiri serta bersaing secara global",
  "Menunjukkan kepatuhan terhadap standar etika dan profesional",
];

export function VisionMissionPage({ onNavigate }: PageProps) {
  return (
    <div>
      <Breadcrumb
        items={[
          { label: "Profile", page: "profile" },
          { label: "Vision & Mission", page: "" },
        ]}
        onNavigate={onNavigate}
      />
      <PageHero
        kicker="Profile"
        title="Vision & Mission"
        subtitle="Becoming a leading center of excellence in geospatial science and technology for Indonesia and the world."
      />

      <section className="gd-page-section">
        <div className="gd-container">
          {/* Vision */}
          <div style={{ marginBottom: "64px" }}>
            <p className="gd-section-kicker">Visi</p>
            <h2 className="gd-section-title">Vision</h2>
            <div className="gd-section-divider" />
            <div style={{ background: "var(--navy)", padding: "48px", borderLeft: "6px solid var(--orange)", maxWidth: "860px" }}>
              <svg viewBox="0 0 40 32" fill="none" style={{ width: "40px", height: "32px", color: "var(--orange)", marginBottom: "20px", opacity: 0.6 }} aria-hidden="true">
                <path d="M0 32V20C0 14.667 1.333 10.333 4 7 6.667 3.667 10.667 1.333 16 0l2 4C14 5.333 12.333 7 11 9c-1.333 2-2 4.333-2 7h7v16H0zm22 0V20c0-5.333 1.333-9.667 4-13 2.667-3.333 6.667-5.667 12-7l2 4c-4 1.333-5.667 3-5 5-.667 2-1 4.333-1 7h7v16H22z" fill="currentColor" />
              </svg>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "17px", fontWeight: 500, lineHeight: 1.8, color: "rgba(255,255,255,0.88)", fontStyle: "italic" }}>
                Menjadi pemimpin, pusat pendidikan dan teknologi tinggi yang unggul, bermartabat untuk ilmu pengetahuan dan teknologi dalam survei dan pemetaan serta ilmu informasi geografis dalam perspektif aktivitas manusia yang unik dan perubahan lingkungan yang menjadi karakteristik Indonesia.
              </p>
            </div>
          </div>

          {/* Mission */}
          <div style={{ marginBottom: "64px" }}>
            <p className="gd-section-kicker">Misi</p>
            <h2 className="gd-section-title">Mission</h2>
            <div className="gd-section-divider" />
            <div style={{ background: "var(--off-white)", padding: "40px", borderLeft: "6px solid var(--blue)", maxWidth: "860px" }}>
              <p style={{ fontSize: "16px", lineHeight: 1.8, color: "var(--gray-600)" }}>
                Melaksanakan pendidikan tinggi yang inovatif dan unggul dalam survei, pemetaan dan ilmu informasi geografis berdasarkan penelitian dan berorientasi pada perubahan lingkungan dan hubungannya dengan kegiatan manusia untuk mendukung pembangunan nasional Indonesia.
              </p>
            </div>
          </div>

          {/* Program Objectives */}
          <div>
            <p className="gd-section-kicker">Tujuan Program</p>
            <h2 className="gd-section-title">Program Objectives</h2>
            <div className="gd-section-divider" />
            <p style={{ fontSize: "15px", lineHeight: 1.75, color: "var(--gray-600)", marginBottom: "28px", maxWidth: "700px" }}>
              Program Teknik Geodesi dan Geomatika bertujuan untuk menghasilkan lulusan yang:
            </p>
            <div style={{ display: "flex", flexDirection: "column" as const, gap: "16px", maxWidth: "860px" }}>
              {objectives.map((obj, i) => (
                <div key={i} style={{ display: "flex", gap: "20px", alignItems: "flex-start", background: "var(--white)", border: "1px solid var(--gray-200)", padding: "24px" }}>
                  <div style={{ flexShrink: 0, width: "40px", height: "40px", background: "var(--orange)", color: "var(--white)", fontFamily: "var(--font-display)", fontSize: "18px", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {i + 1}
                  </div>
                  <p style={{ fontSize: "15px", lineHeight: 1.7, color: "var(--gray-600)", paddingTop: "8px" }}>{obj}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}