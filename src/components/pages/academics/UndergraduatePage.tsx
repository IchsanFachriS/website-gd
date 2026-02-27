// ============================================================
// academics/UndergraduatePage.tsx
// Full S1 page — Overview, Kurikulum, Admission, IUP
// ============================================================
import { useState } from "react";
import { Breadcrumb, PageHero } from "../_shared/PageShell";
import type { PageProps } from "../_shared/PageShell";

const SUB_TABS = [
  { id: "overview",    label: "Overview" },
  { id: "curriculum",  label: "Kurikulum" },
  { id: "admission",   label: "Admission" },
  { id: "iup",         label: "International Program" },
];

const mandatoryCourses = [
  { code: "GD1101", name: "Matematika I",                credits: 3, semester: 1 },
  { code: "GD1102", name: "Fisika Dasar I",              credits: 3, semester: 1 },
  { code: "GD1103", name: "Kimia Dasar",                 credits: 2, semester: 1 },
  { code: "GD1104", name: "Pengantar Teknik & Sains",    credits: 2, semester: 1 },
  { code: "GD1201", name: "Matematika II",               credits: 3, semester: 2 },
  { code: "GD1202", name: "Fisika Dasar II",             credits: 3, semester: 2 },
  { code: "GD1203", name: "Pemrograman Komputer",        credits: 3, semester: 2 },
  { code: "GD2101", name: "Pengukuran Topografi",        credits: 4, semester: 3 },
  { code: "GD2102", name: "Geodesi Fisis",               credits: 3, semester: 3 },
  { code: "GD2103", name: "Kartografi",                  credits: 3, semester: 3 },
  { code: "GD2104", name: "Fotogrametri Dasar",          credits: 3, semester: 3 },
  { code: "GD2201", name: "Penginderaan Jauh",           credits: 3, semester: 4 },
  { code: "GD2202", name: "Sistem Informasi Geografis",  credits: 3, semester: 4 },
  { code: "GD2203", name: "GNSS & Navigasi Satelit",     credits: 3, semester: 4 },
  { code: "GD2204", name: "Survei Kadaster",             credits: 3, semester: 4 },
  { code: "GD3101", name: "Hitung Perataan",             credits: 3, semester: 5 },
  { code: "GD3102", name: "Fotogrametri Lanjut",         credits: 3, semester: 5 },
  { code: "GD3103", name: "SIG Lanjut",                  credits: 3, semester: 5 },
  { code: "GD3201", name: "Geodesi Satelit",             credits: 3, semester: 6 },
  { code: "GD3202", name: "Hidrografi",                  credits: 3, semester: 6 },
  { code: "GD4101", name: "Kerja Praktek",               credits: 2, semester: 7 },
  { code: "GD4201", name: "Tugas Akhir",                 credits: 6, semester: 8 },
];

const electiveCourses = [
  { code: "GD3E01", name: "Geodynamics & Deformasi Kerak Bumi",       credits: 3 },
  { code: "GD3E02", name: "LiDAR & Point Cloud Processing",            credits: 3 },
  { code: "GD3E03", name: "Analisis Citra SAR",                        credits: 3 },
  { code: "GD3E04", name: "Geospasial Intelligence",                   credits: 3 },
  { code: "GD3E05", name: "3D City Modeling & Digital Twin",           credits: 3 },
  { code: "GD3E06", name: "Spatial Data Science & Machine Learning",   credits: 3 },
  { code: "GD3E07", name: "Manajemen Proyek Geospasial",               credits: 2 },
  { code: "GD3E08", name: "Kebijakan & Hukum Pertanahan",              credits: 2 },
  { code: "GD3E09", name: "UAV Mapping & Photogrammetry",              credits: 3 },
  { code: "GD3E10", name: "Lingkungan Pesisir & Kelautan",             credits: 3 },
];

// ---- Collapsible semester row ----
function SemesterRow({
  semester,
  courses,
}: {
  semester: number;
  courses: { code: string; name: string; credits: number }[];
}) {
  const [open, setOpen] = useState(semester <= 2);
  const total  = courses.reduce((s, c) => s + c.credits, 0);
  const isTpb  = semester <= 2;

  return (
    <div style={{ border: "1px solid var(--gray-200)", borderLeft: `4px solid ${isTpb ? "var(--navy)" : "var(--blue)"}` }}>
      <button
        onClick={() => setOpen(!open)}
        style={{ display: "flex", width: "100%", alignItems: "center", padding: "16px 20px", background: open ? "var(--white)" : "var(--off-white)", cursor: "pointer", gap: "14px", border: "none" }}
      >
        <div style={{ flexShrink: 0, width: "36px", height: "36px", background: isTpb ? "var(--navy)" : "var(--blue)", color: "var(--white)", fontFamily: "var(--font-display)", fontSize: "14px", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {semester}
        </div>
        <div style={{ flex: 1, textAlign: "left" }}>
          <span style={{ fontFamily: "var(--font-display)", fontSize: "15px", fontWeight: 700, color: "var(--navy)" }}>
            Semester {semester}
          </span>
          {isTpb && (
            <span style={{ marginLeft: "10px", fontFamily: "var(--font-display)", fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", background: "var(--navy)", color: "var(--white)", padding: "2px 8px" }}>
              TPB
            </span>
          )}
        </div>
        <span style={{ fontFamily: "var(--font-display)", fontSize: "13px", fontWeight: 600, color: "var(--blue)", marginRight: "12px" }}>{total} SKS</span>
        <svg viewBox="0 0 12 8" fill="none" style={{ width: "12px", height: "8px", color: "var(--gray-400)", transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s", flexShrink: 0 }}>
          <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <div style={{ borderTop: "1px solid var(--gray-200)" }}>
          {courses.map((c, i) => (
            <div key={c.code} style={{ display: "flex", alignItems: "center", padding: "12px 20px 12px 70px", borderBottom: i < courses.length - 1 ? "1px solid var(--gray-100)" : "none", background: i % 2 === 0 ? "var(--white)" : "var(--off-white)" }}>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", color: "var(--orange)", minWidth: "80px" }}>{c.code}</span>
              <span style={{ flex: 1, fontFamily: "var(--font-display)", fontSize: "14px", color: "var(--navy)" }}>{c.name}</span>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "13px", fontWeight: 600, color: "var(--gray-400)" }}>{c.credits} SKS</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function UndergraduatePage({ onNavigate }: PageProps) {
  const [activeTab, setActiveTab] = useState("overview");

  const scrollTo = (id: string) => {
    setActiveTab(id);
    const el = document.getElementById(`s1-${id}`);
    if (el) {
      const offset = el.getBoundingClientRect().top + window.scrollY - 130;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  };

  const bySemester = Array.from({ length: 8 }, (_, i) =>
    mandatoryCourses.filter((c) => c.semester === i + 1)
  );

  return (
    <div>
      <Breadcrumb
        items={[
          { label: "Academics", page: "academics" },
          { label: "Undergraduate Program (S1)", page: "" },
        ]}
        onNavigate={onNavigate}
      />
      <PageHero
        kicker="Academics"
        title="Undergraduate Program (S1)"
        subtitle="Program Sarjana Teknik Geodesi dan Geomatika — 144 SKS · 8 Semester"
      />

      {/* Sticky sub-nav */}
      <div style={{ position: "sticky", top: "var(--header-h)", zIndex: 50, background: "var(--navy)", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <div className="gd-container">
          <div style={{ display: "flex", overflowX: "auto" as const, scrollbarWidth: "none" as const }}>
            {SUB_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => scrollTo(tab.id)}
                style={{ flexShrink: 0, fontFamily: "var(--font-display)", fontSize: "13px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: activeTab === tab.id ? "var(--white)" : "rgba(255,255,255,0.6)", padding: "16px 24px", background: "none", border: "none", borderBottom: activeTab === tab.id ? "3px solid var(--orange)" : "3px solid transparent", cursor: "pointer", transition: "color 0.2s, border-color 0.2s" }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* OVERVIEW */}
      <section id="s1-overview" className="gd-page-section">
        <div className="gd-container">
          <p className="gd-section-kicker">Program Overview</p>
          <h2 className="gd-section-title">Program Sarjana Teknik (S1)</h2>
          <div className="gd-section-divider" />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "1px", background: "var(--gray-200)", border: "1px solid var(--gray-200)", marginBottom: "48px" }}>
            {[
              { label: "Gelar",       value: "Sarjana Teknik (S.T.)" },
              { label: "Durasi",      value: "8 Semester" },
              { label: "Total SKS",   value: "144 SKS" },
              { label: "SKS TPB",     value: "36 SKS" },
              { label: "Tugas Akhir", value: "6 SKS" },
              { label: "Akreditasi",  value: "BAN-PT: A" },
            ].map((item) => (
              <div key={item.label} style={{ background: "var(--white)", padding: "24px 20px", textAlign: "center" }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 700, color: "var(--blue)", display: "block", marginBottom: "4px" }}>{item.value}</span>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "var(--gray-400)" }}>{item.label}</span>
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px" }}>
            <div>
              <p style={{ fontSize: "15px", lineHeight: 1.8, color: "var(--gray-600)", marginBottom: "16px" }}>
                Program sarjana adalah pendidikan akademik selama <strong>8 semester (4 tahun)</strong> yang mengarah ke gelar <strong>Sarjana Teknik (S.T.)</strong>
              </p>
              <p style={{ fontSize: "15px", lineHeight: 1.8, color: "var(--gray-600)", marginBottom: "16px" }}>
                Program ini terdiri dari <strong>144 SKS</strong>, di mana <strong>36 SKS</strong> merupakan program dalam <strong>Tahap Persiapan Bersama (TPB)</strong> pada tahun pertama.
              </p>
              <p style={{ fontSize: "15px", lineHeight: 1.8, color: "var(--gray-600)" }}>
                <strong>Tugas Akhir (6 SKS)</strong> adalah kegiatan bagi mahasiswa untuk melaksanakan karya ilmiah, mencakup penyampaian laporan teknis, seminar, penelitian sarjana, dan ujian komprehensif.
              </p>
            </div>
            <div>
              {[
                { icon: "🗺️", title: "Ekspedisi Lapang", desc: "Pengukuran dan survei di berbagai medan — pantai, pegunungan, dan perkotaan." },
                { icon: "🏢", title: "Magang (Kerja Praktek)", desc: "Pengalaman kerja di instansi pemerintah atau industri selama minimum 2 bulan." },
                { icon: "⛺", title: "Kamp Lapangan", desc: "Praktik terpadu multi-disiplin mengintegrasikan semua ilmu yang telah dipelajari." },
                { icon: "📖", title: "Tugas Akhir", desc: "Penelitian orisinal dengan bimbingan dosen, diseminarkan, dan diuji secara lisan." },
              ].map((item) => (
                <div key={item.title} style={{ display: "flex", gap: "16px", alignItems: "flex-start", padding: "16px 0", borderBottom: "1px solid var(--gray-200)" }}>
                  <span style={{ fontSize: "24px", flexShrink: 0, marginTop: "2px" }}>{item.icon}</span>
                  <div>
                    <strong style={{ fontFamily: "var(--font-display)", fontSize: "14px", fontWeight: 700, color: "var(--navy)", display: "block", marginBottom: "4px" }}>{item.title}</strong>
                    <p style={{ fontSize: "13px", lineHeight: 1.65, color: "var(--gray-600)" }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CURRICULUM */}
      <section id="s1-curriculum" className="gd-page-section-alt">
        <div className="gd-container">
          <p className="gd-section-kicker">Kurikulum</p>
          <h2 className="gd-section-title">Mata Kuliah Wajib & Pilihan</h2>
          <div className="gd-section-divider" />

          <div style={{ display: "flex", flexDirection: "column" as const, gap: "2px", marginBottom: "48px" }}>
            {bySemester.map((courses, si) =>
              courses.length === 0 ? null : <SemesterRow key={si} semester={si + 1} courses={courses} />
            )}
          </div>

          <p className="gd-section-kicker">Mata Kuliah Pilihan</p>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: 700, color: "var(--navy)", marginBottom: "8px" }}>
            Pilih minimal 12 SKS
          </h3>
          <div className="gd-section-divider" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "2px", background: "var(--gray-200)", border: "1px solid var(--gray-200)" }}>
            {electiveCourses.map((c) => (
              <div key={c.code} style={{ background: "var(--white)", padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
                <div>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", color: "var(--orange)", display: "block", marginBottom: "2px" }}>{c.code}</span>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: "14px", fontWeight: 600, color: "var(--navy)" }}>{c.name}</span>
                </div>
                <div style={{ flexShrink: 0, background: "var(--blue-pale)", color: "var(--blue)", fontFamily: "var(--font-display)", fontSize: "12px", fontWeight: 700, padding: "4px 10px", whiteSpace: "nowrap" as const }}>
                  {c.credits} SKS
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ADMISSION */}
      <section id="s1-admission" className="gd-page-section">
        <div className="gd-container">
          <p className="gd-section-kicker">Penerimaan Mahasiswa</p>
          <h2 className="gd-section-title">Admission</h2>
          <div className="gd-section-divider" />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px" }}>
            <div>
              <p style={{ fontSize: "15px", lineHeight: 1.8, color: "var(--gray-600)", marginBottom: "24px" }}>
                Penerimaan mahasiswa baru program sarjana dikelola secara terpusat oleh <strong>Institut Teknologi Bandung</strong> melalui berbagai jalur seleksi nasional maupun mandiri.
              </p>
              {[
                { jalur: "SNBP", full: "Seleksi Nasional Berdasarkan Prestasi", desc: "Seleksi berdasarkan nilai rapor dan prestasi akademik/non-akademik siswa." },
                { jalur: "SNBT", full: "Seleksi Nasional Berdasarkan Tes", desc: "Seleksi berdasarkan hasil Ujian Tulis Berbasis Komputer (UTBK)." },
                { jalur: "SM-ITB", full: "Seleksi Mandiri ITB", desc: "Seleksi mandiri ITB untuk calon mahasiswa yang belum lolos jalur nasional." },
                { jalur: "KIP-K", full: "Kartu Indonesia Pintar Kuliah", desc: "Jalur beasiswa untuk mahasiswa dari keluarga kurang mampu secara ekonomi." },
              ].map((item) => (
                <div key={item.jalur} style={{ background: "var(--off-white)", border: "1px solid var(--gray-200)", borderLeft: "4px solid var(--blue)", padding: "16px 20px", marginBottom: "12px" }}>
                  <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                    <div style={{ flexShrink: 0, background: "var(--blue)", color: "var(--white)", fontFamily: "var(--font-display)", fontSize: "11px", fontWeight: 700, padding: "3px 8px", letterSpacing: "0.06em" }}>{item.jalur}</div>
                    <div>
                      <strong style={{ fontFamily: "var(--font-display)", fontSize: "13px", fontWeight: 700, color: "var(--navy)", display: "block", marginBottom: "3px" }}>{item.full}</strong>
                      <p style={{ fontSize: "13px", lineHeight: 1.6, color: "var(--gray-600)" }}>{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <div style={{ background: "var(--navy)", padding: "40px", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
                <div style={{ position: "relative", zIndex: 1 }}>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: 700, color: "var(--white)", marginBottom: "12px" }}>
                    Daftarkan Diri ke Program S1 Geodesi ITB
                  </h3>
                  <p style={{ fontSize: "14px", lineHeight: 1.75, color: "rgba(255,255,255,0.7)", marginBottom: "28px" }}>
                    Informasi lengkap mengenai jadwal, persyaratan, biaya, dan tata cara pendaftaran tersedia di portal resmi penerimaan mahasiswa baru Institut Teknologi Bandung.
                  </p>
                  <div style={{ display: "flex", flexDirection: "column" as const, gap: "12px" }}>
                    <a href="https://admission.itb.ac.id" target="_blank" rel="noreferrer" className="gd-btn gd-btn--primary" style={{ width: "100%", justifyContent: "center" }}>
                      Portal Admisi ITB →
                    </a>
                    <a href="https://www.itb.ac.id/pendaftaran" target="_blank" rel="noreferrer" style={{ display: "flex", justifyContent: "center", fontFamily: "var(--font-display)", fontSize: "13px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.6)", padding: "12px 24px", border: "2px solid rgba(255,255,255,0.25)" }}>
                      Info Pendaftaran ITB
                    </a>
                  </div>
                  <p style={{ marginTop: "20px", fontSize: "12px", color: "rgba(255,255,255,0.45)" }}>
                    Pertanyaan? Hubungi <a href="mailto:info@gd.fitb.itb.ac.id" style={{ color: "var(--orange)" }}>info@gd.fitb.itb.ac.id</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IUP */}
      <section id="s1-iup" className="gd-page-section-alt">
        <div className="gd-container">
          <p className="gd-section-kicker">International Program</p>
          <h2 className="gd-section-title">International Undergraduate Program (IUP)</h2>
          <div className="gd-section-divider" />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px" }}>
            <div>
              <p style={{ fontSize: "15px", lineHeight: 1.8, color: "var(--gray-600)", marginBottom: "16px" }}>
                Institut Teknologi Bandung menawarkan <strong>International Undergraduate Program (IUP)</strong> — program sarjana berpengantar bahasa Inggris untuk calon mahasiswa internasional maupun Indonesia yang ingin menempuh pendidikan berkelas dunia.
              </p>
              {[
                { icon: "🌍", title: "Pengantar Bahasa Inggris", desc: "Seluruh perkuliahan, bahan ajar, dan ujian menggunakan bahasa Inggris." },
                { icon: "🤝", title: "Jaringan Alumni Global", desc: "Bergabung dengan komunitas alumni ITB yang tersebar di lebih dari 50 negara." },
                { icon: "🔬", title: "Riset Berstandar Internasional", desc: "Kesempatan berkolaborasi dengan universitas dan lembaga riset internasional." },
                { icon: "📜", title: "Ijazah Diakui Internasional", desc: "Gelar S.T. dari ITB diakui secara internasional melalui akreditasi ASIIN dan AUN-QA." },
              ].map((item) => (
                <div key={item.title} style={{ display: "flex", gap: "14px", alignItems: "flex-start", marginBottom: "16px" }}>
                  <span style={{ fontSize: "22px", flexShrink: 0 }}>{item.icon}</span>
                  <div>
                    <strong style={{ fontFamily: "var(--font-display)", fontSize: "14px", fontWeight: 700, color: "var(--navy)", display: "block", marginBottom: "3px" }}>{item.title}</strong>
                    <p style={{ fontSize: "13px", lineHeight: 1.65, color: "var(--gray-600)" }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: "var(--white)", border: "1px solid var(--gray-200)", overflow: "hidden" }}>
              <div style={{ background: "var(--blue)", padding: "28px 32px" }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 700, color: "var(--white)", marginBottom: "6px" }}>Apply to IUP — ITB</h3>
                <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.75)" }}>International Undergraduate Program · Full English Instruction</p>
              </div>
              <div style={{ padding: "28px 32px" }}>
                <p style={{ fontSize: "14px", lineHeight: 1.75, color: "var(--gray-600)", marginBottom: "20px" }}>
                  Pendaftaran IUP dikelola secara terpisah dari program reguler. Kunjungi portal resmi IUP ITB untuk informasi lengkap.
                </p>
                <div style={{ display: "flex", flexDirection: "column" as const, gap: "10px" }}>
                  <a href="https://iup.itb.ac.id" target="_blank" rel="noreferrer" className="gd-btn gd-btn--primary" style={{ width: "100%", justifyContent: "center" }}>
                    Portal IUP ITB →
                  </a>
                  <a href="https://www.itb.ac.id/international" target="_blank" rel="noreferrer" className="gd-btn gd-btn--outline" style={{ width: "100%", justifyContent: "center" }}>
                    International Student Info
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="gd-page-section" style={{ paddingTop: "32px", paddingBottom: "40px" }}>
        <div className="gd-container">
          <button className="gd-btn gd-btn--outline" onClick={() => onNavigate("academics")}>← Back to Academics</button>
        </div>
      </div>
    </div>
  );
}