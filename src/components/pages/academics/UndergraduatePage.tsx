// ============================================================
// academics/UndergraduatePage.tsx
// Full S1 page — Overview, Kurikulum, Admission
// Redesigned: Inter font, no emojis, specialization electives
// ============================================================
import { useState } from "react";
import { Breadcrumb, PageHero } from "../_shared/PageShell";
import type { PageProps } from "../_shared/PageShell";

const SUB_TABS = [
  { id: "overview",   label: "Overview" },
  { id: "curriculum", label: "Kurikulum" },
  { id: "admission",  label: "Admission" },
];

// ── Mandatory courses ───────────────────────────────────────
const mandatoryCourses = [
  { code: "MA1101", name: "Matematika I",                             credits: 4, semester: 1 },
  { code: "FI1101", name: "Fisika Dasar I",                           credits: 3, semester: 1 },
  { code: "KI1101", name: "Kimia Dasar I",                            credits: 3, semester: 1 },
  { code: "WI1101", name: "Pancasila",                                credits: 2, semester: 1 },
  { code: "WI1102", name: "Berpikir Komputasional",                   credits: 2, semester: 1 },
  { code: "WI1103", name: "Pengantar Prinsip Keberlanjutan",          credits: 2, semester: 1 },
  { code: "WI1111", name: "Laboratorium Fisika Dasar",                credits: 1, semester: 1 },
  { code: "WI1112", name: "Laboratorium Kimia Dasar",                 credits: 1, semester: 1 },
  { code: "GD1201", name: "Aljabar Linier Terapan",                   credits: 3, semester: 2 },
  { code: "GD1202", name: "Mekanika dan Gaya Berat",                  credits: 3, semester: 2 },
  { code: "WI2001", name: "Pengenalan Rekayasa dan Desain",           credits: 3, semester: 2 },
  { code: "WI2002", name: "Literasi Data dan Inteligensi Artifisial", credits: 2, semester: 2 },
  { code: "WI2004", name: "Bahasa Inggris",                           credits: 2, semester: 2 },
  { code: "WI2005", name: "Bahasa Indonesia",                         credits: 2, semester: 2 },
  { code: "WF1211", name: "Sistem Bumi",                              credits: 3, semester: 2 },
  { code: "GD2101", name: "Statistika dan Probabilistik",             credits: 3, semester: 3 },
  { code: "GD2103", name: "Fisika Gelombang",                         credits: 3, semester: 3 },
  { code: "WI2023", name: "Olah Raga",                                credits: 1, semester: 3 },
  { code: "GD2102", name: "Penentuan Posisi",                         credits: 3, semester: 3 },
  { code: "GD2104", name: "Geodesi Geometrik",                        credits: 3, semester: 3 },
  { code: "GD2105", name: "Hukum Perundangan Geospasial",             credits: 3, semester: 3 },
  { code: "GD2106", name: "Ekspedisi Geospasial",                     credits: 2, semester: 3 },
  { code: "GD2201", name: "Estimasi dan Aproksimasi",                 credits: 2, semester: 4 },
  { code: "GD2202", name: "Komputasi Geodetik",                       credits: 3, semester: 4 },
  { code: "GD2203", name: "Dasar-dasar Geodesi Fisis",                credits: 2, semester: 4 },
  { code: "GD2204", name: "Sistem Referensi Geometrik",               credits: 3, semester: 4 },
  { code: "GD2205", name: "Pemetaan Terestris",                       credits: 3, semester: 4 },
  { code: "GD2206", name: "Geodesi Satelit",                          credits: 2, semester: 4 },
  { code: "GD3101", name: "Basis Data Spasial",                       credits: 3, semester: 5 },
  { code: "GD3102", name: "Kartografi",                               credits: 3, semester: 5 },
  { code: "GD3103", name: "Hidrografi",                               credits: 3, semester: 5 },
  { code: "GD3104", name: "Fotogrametri",                             credits: 3, semester: 5 },
  { code: "GD3105", name: "Survei GNSS",                              credits: 3, semester: 5 },
  { code: "WI2006", name: "Kewarganegaraan",                          credits: 2, semester: 6 },
  { code: "WI201X", name: "Agama",                                    credits: 2, semester: 6 },
  { code: "GD3201", name: "Survei Konstruksi",                        credits: 3, semester: 6 },
  { code: "GD3202", name: "Penginderaan Jauh",                        credits: 3, semester: 6 },
  { code: "GD3203", name: "Pemetaan Tematik",                         credits: 3, semester: 6 },
  { code: "GD3204", name: "Kemah Kerja",                              credits: 3, semester: 6 },
  { code: "GD4101", name: "Kerja Praktik",                            credits: 2, semester: 7 },
  { code: "GD4102", name: "Proposal Capstone Project",                credits: 1, semester: 7 },
  { code: "GD4103", name: "Sistem Informasi Geografis",               credits: 3, semester: 7 },
  { code: "GD4104", name: "Sistem Kadaster",                          credits: 3, semester: 7 },
  { code: "GD4201", name: "Capstone Project",                         credits: 3, semester: 8 },
  { code: "GD4202", name: "Geografi Lingkungan",                      credits: 3, semester: 8 },
  { code: "WI2023", name: "Manajemen Bisnis dan Kewirausahaan",       credits: 2, semester: 8 },
];

// ── Specialization elective packages ───────────────────────
const specializationPackages = [
  {
    id: "hidro",
    abbr: "HIDRO",
    name: "Hidrografi",
    description: "Survei dan pemetaan wilayah perairan, batimetri, pemantauan pesisir, dan navigasi maritim.",
    accent: "var(--blue)",
    courses: [
      { code: "GD3301", name: "Batimetri dan Survei Kelautan",           credits: 3 },
      { code: "GD3302", name: "Oseanografi Fisis",                       credits: 3 },
      { code: "GD3303", name: "Navigasi dan Penentuan Posisi Maritim",   credits: 3 },
      { code: "GD4301", name: "Survei Hidrografi Lanjut",                credits: 3 },
      { code: "GD4302", name: "Pengelolaan Wilayah Pesisir",             credits: 3 },
    ],
  },
  {
    id: "stig",
    abbr: "STIG",
    name: "Sains dan Teknologi Informasi Geografis",
    description: "Infrastruktur data spasial, UAV dan MMS, pemodelan perubahan tata guna lahan, dan web GIS.",
    accent: "var(--orange)",
    courses: [
      { code: "GD3401", name: "Infrastruktur Data Spasial",              credits: 3 },
      { code: "GD3402", name: "Fotogrametri Jarak Dekat dan UAV",        credits: 3 },
      { code: "GD3403", name: "Penginderaan Jauh Lanjut",                credits: 3 },
      { code: "GD4401", name: "Pemodelan Spasial dan GIS Lanjut",        credits: 3 },
      { code: "GD4402", name: "Pengembangan Aplikasi Geospasial",        credits: 3 },
    ],
  },
  {
    id: "srig",
    abbr: "SRIG",
    name: "Sains, Rekayasa dan Inovasi Geodesi",
    description: "Sistem referensi, medan gayaberat bumi, penentuan posisi GNSS, dan pemantauan deformasi.",
    accent: "var(--navy)",
    courses: [
      { code: "GD3501", name: "Geodesi Fisis Lanjut",                    credits: 3 },
      { code: "GD3502", name: "Penentuan Posisi Presisi Tinggi",          credits: 3 },
      { code: "GD3503", name: "Pemantauan Deformasi Geodetik",            credits: 3 },
      { code: "GD4501", name: "Geodesi Satelit Lanjut",                   credits: 3 },
      { code: "GD4502", name: "Sains Data Geodesi",                       credits: 3 },
    ],
  },
  {
    id: "siska",
    abbr: "SISKA",
    name: "Sistem Spasial dan Kadaster",
    description: "Kadaster 3D, sistem informasi pertanahan, survei konstruksi, dan kebencanaan spasial.",
    accent: "#4a7c59",
    courses: [
      { code: "GD3601", name: "Infrastruktur Kadaster 3D",               credits: 3 },
      { code: "GD3602", name: "Sistem Informasi Pertanahan",              credits: 3 },
      { code: "GD3603", name: "Survei Rekayasa Lanjut",                   credits: 3 },
      { code: "GD4601", name: "Administrasi Pertanahan dan Hukum",        credits: 3 },
      { code: "GD4602", name: "Pemodelan Spasial Kebencanaan",            credits: 3 },
    ],
  },
];

// ── Non-specialization electives ────────────────────────────
const generalElectives = [
  { code: "GD3206", name: "Hidroinformatika",                            credits: 3 },
  { code: "GD3207", name: "Pemetaan Partisipatif",                       credits: 2 },
  { code: "GD4105", name: "Topik Khusus Geodesi",                        credits: 3 },
  { code: "GD4106", name: "Kerja Sama Internasional",                    credits: 2 },
];

// ── Semester accordion ───────────────────────────────────────
function SemesterRow({
  semester,
  courses,
}: {
  semester: number;
  courses: { code: string; name: string; credits: number }[];
}) {
  const [open, setOpen] = useState(semester === 1);
  const total = courses.reduce((s, c) => s + c.credits, 0);
  const isTpb = semester <= 1;

  return (
    <div style={{
      border: "1px solid var(--gray-200)",
      borderLeft: `3px solid ${isTpb ? "var(--navy)" : "var(--blue)"}`,
      marginBottom: "2px",
      background: "var(--white)",
    }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          padding: "14px 20px",
          background: open ? "var(--off-white)" : "var(--white)",
          cursor: "pointer",
          gap: "14px",
          border: "none",
          transition: "background 0.2s",
        }}
      >
        <div style={{
          flexShrink: 0,
          width: "32px",
          height: "32px",
          background: isTpb ? "var(--navy)" : "var(--blue)",
          color: "var(--white)",
          fontFamily: "Inter, sans-serif",
          fontSize: "13px",
          fontWeight: 700,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          {semester}
        </div>
        <div style={{ flex: 1, textAlign: "left", display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "14px",
            fontWeight: 700,
            color: "var(--navy)",
          }}>
            Semester {semester}
          </span>
          {isTpb && (
            <span style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              background: "var(--navy)",
              color: "var(--white)",
              padding: "2px 7px",
              textTransform: "uppercase" as const,
            }}>
              TPB
            </span>
          )}
        </div>
        <span style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "12px",
          fontWeight: 700,
          color: "var(--blue)",
          marginRight: "10px",
          letterSpacing: "0.04em",
        }}>
          {total} SKS
        </span>
        <svg
          viewBox="0 0 12 8"
          fill="none"
          style={{
            width: "11px",
            height: "8px",
            color: "var(--gray-400)",
            transform: open ? "rotate(180deg)" : "none",
            transition: "transform 0.2s",
            flexShrink: 0,
          }}
        >
          <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <div style={{ borderTop: "1px solid var(--gray-200)" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "80px 1fr 56px",
            padding: "8px 20px 4px 66px",
            borderBottom: "1px solid var(--gray-100)",
          }}>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "var(--gray-400)" }}>Kode</span>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "var(--gray-400)" }}>Mata Kuliah</span>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "var(--gray-400)", textAlign: "right" as const }}>SKS</span>
          </div>
          {courses.map((c, i) => (
            <div
              key={c.code}
              style={{
                display: "grid",
                gridTemplateColumns: "80px 1fr 56px",
                alignItems: "center",
                padding: "10px 20px",
                paddingLeft: "66px",
                borderBottom: i < courses.length - 1 ? "1px solid var(--gray-100)" : "none",
                background: i % 2 === 0 ? "var(--white)" : "var(--off-white)",
              }}
            >
              <span style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.06em",
                color: "var(--orange)",
              }}>
                {c.code}
              </span>
              <span style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "13px",
                color: "var(--navy)",
                fontWeight: 500,
              }}>
                {c.name}
              </span>
              <span style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "13px",
                fontWeight: 600,
                color: "var(--gray-400)",
                textAlign: "right" as const,
              }}>
                {c.credits}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Specialization card ──────────────────────────────────────
function SpecializationCard({ pkg }: { pkg: typeof specializationPackages[0] }) {
  const [open, setOpen] = useState(false);
  const total = pkg.courses.reduce((s, c) => s + c.credits, 0);

  return (
    <div style={{
      border: "1px solid var(--gray-200)",
      borderTop: `3px solid ${pkg.accent}`,
      background: "var(--white)",
      transition: "box-shadow 0.2s",
    }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: "flex",
          width: "100%",
          alignItems: "flex-start",
          padding: "20px 24px",
          background: "none",
          border: "none",
          cursor: "pointer",
          gap: "16px",
          textAlign: "left" as const,
        }}
      >
        <div style={{
          flexShrink: 0,
          width: "40px",
          height: "40px",
          background: pkg.accent,
          color: "var(--white)",
          fontFamily: "Inter, sans-serif",
          fontSize: "10px",
          fontWeight: 800,
          letterSpacing: "0.06em",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center" as const,
          lineHeight: 1.2,
          padding: "4px",
        }}>
          {pkg.abbr.length > 5 ? pkg.abbr.slice(0, 4) : pkg.abbr}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase" as const,
            color: pkg.accent,
            marginBottom: "4px",
          }}>
            Paket Spesialisasi
          </div>
          <div style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "15px",
            fontWeight: 700,
            color: "var(--navy)",
            lineHeight: 1.25,
            marginBottom: "6px",
          }}>
            {pkg.name}
          </div>
          <p style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "12px",
            lineHeight: 1.65,
            color: "var(--gray-400)",
            margin: 0,
          }}>
            {pkg.description}
          </p>
        </div>
        <div style={{ flexShrink: 0, display: "flex", flexDirection: "column" as const, alignItems: "flex-end", gap: "6px" }}>
          <span style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "13px",
            fontWeight: 700,
            color: "var(--blue)",
          }}>
            {total} SKS
          </span>
          <svg
            viewBox="0 0 12 8"
            fill="none"
            style={{
              width: "12px",
              height: "8px",
              color: "var(--gray-400)",
              transform: open ? "rotate(180deg)" : "none",
              transition: "transform 0.2s",
            }}
          >
            <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      </button>

      {open && (
        <div style={{ borderTop: "1px solid var(--gray-200)" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "80px 1fr 56px",
            padding: "8px 24px 4px",
            borderBottom: "1px solid var(--gray-100)",
            background: "var(--off-white)",
          }}>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "var(--gray-400)" }}>Kode</span>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "var(--gray-400)" }}>Mata Kuliah</span>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "var(--gray-400)", textAlign: "right" as const }}>SKS</span>
          </div>
          {pkg.courses.map((c, i) => (
            <div
              key={c.code}
              style={{
                display: "grid",
                gridTemplateColumns: "80px 1fr 56px",
                alignItems: "center",
                padding: "10px 24px",
                borderBottom: i < pkg.courses.length - 1 ? "1px solid var(--gray-100)" : "none",
                background: i % 2 === 0 ? "var(--white)" : "var(--off-white)",
              }}
            >
              <span style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.06em",
                color: pkg.accent,
              }}>
                {c.code}
              </span>
              <span style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "13px",
                color: "var(--navy)",
                fontWeight: 500,
              }}>
                {c.name}
              </span>
              <span style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "13px",
                fontWeight: 600,
                color: "var(--gray-400)",
                textAlign: "right" as const,
              }}>
                {c.credits}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Main page ────────────────────────────────────────────────
export function UndergraduatePage({ onNavigate }: PageProps) {
  const [activeTab, setActiveTab] = useState("overview");

  const scrollTo = (id: string) => {
    setActiveTab(id);
    const el = document.getElementById(`s1-${id}`);
    if (el) {
      const offset = el.getBoundingClientRect().top + window.scrollY - 140;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  };

  const bySemester = Array.from({ length: 8 }, (_, i) =>
    mandatoryCourses.filter((c) => c.semester === i + 1)
  );

  return (
    <div style={{ fontFamily: "Inter, sans-serif" }}>
      {/* ── Breadcrumb ── */}
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

      {/* ── Sticky sub-nav ── */}
      <div style={{
        position: "sticky",
        top: "var(--header-h)",
        zIndex: 50,
        background: "var(--navy)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}>
        <div className="gd-container">
          <div style={{ display: "flex", overflowX: "auto" as const, scrollbarWidth: "none" as const }}>
            {SUB_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => scrollTo(tab.id)}
                style={{
                  flexShrink: 0,
                  fontFamily: "Inter, sans-serif",
                  fontSize: "13px",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase" as const,
                  color: activeTab === tab.id ? "var(--white)" : "rgba(255,255,255,0.55)",
                  padding: "16px 24px",
                  background: "none",
                  border: "none",
                  borderBottom: activeTab === tab.id ? "3px solid var(--orange)" : "3px solid transparent",
                  cursor: "pointer",
                  transition: "color 0.2s, border-color 0.2s",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════
          OVERVIEW
      ════════════════════════════════════════════ */}
      <section id="s1-overview" className="gd-page-section">
        <div className="gd-container">
          <p className="gd-section-kicker">Program Overview</p>
          <h2 className="gd-section-title">Program Sarjana Teknik (S1)</h2>
          <div className="gd-section-divider" />

          {/* Stats strip */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "1px",
            background: "var(--gray-200)",
            border: "1px solid var(--gray-200)",
            marginBottom: "52px",
          }}>
            {[
              { label: "Gelar",      value: "S.T." },
              { label: "Durasi",     value: "8 Semester" },
              { label: "Total SKS",  value: "144 SKS" },
              { label: "SKS Wajib",  value: "119 SKS" },
              { label: "SKS Pilihan",value: "25 SKS" },
            ].map((item) => (
              <div key={item.label} style={{
                background: "var(--white)",
                padding: "24px 16px",
                textAlign: "center" as const,
              }}>
                <span style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "var(--blue)",
                  display: "block",
                  marginBottom: "5px",
                  letterSpacing: "-0.01em",
                }}>
                  {item.value}
                </span>
                <span style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "10px",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase" as const,
                  color: "var(--gray-400)",
                }}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          {/* Two-column description */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "start" }}>
            <div>
              <p style={{ fontSize: "15px", lineHeight: 1.8, color: "var(--gray-600)", marginBottom: "16px", fontFamily: "Inter, sans-serif" }}>
                Program sarjana adalah pendidikan akademik selama <strong>8 semester (4 tahun)</strong> yang mengarah ke gelar <strong>Sarjana Teknik (S.T.)</strong>. Program ini terdiri dari <strong>144 SKS</strong>, di mana <strong>18 SKS</strong> merupakan program dalam <strong>Tahap Persiapan Bersama (TPB)</strong> pada tahun pertama.
              </p>
              <p style={{ fontSize: "15px", lineHeight: 1.8, color: "var(--gray-600)", fontFamily: "Inter, sans-serif" }}>
                Mahasiswa dapat memilih salah satu dari empat paket spesialisasi yang mencerminkan kelompok keahlian departemen, atau mengambil mata kuliah pilihan umum sesuai minat.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column" as const, gap: "0" }}>
              {[
                { title: "Ekskursi Lapangan", desc: "Pengukuran dan survei di berbagai medan nyata di lapangan." },
                { title: "Magang (Kerja Praktik)", desc: "Pengalaman kerja di instansi pemerintah atau industri selama minimum dua bulan." },
                { title: "Kemah Kerja", desc: "Praktik terpadu multi-disiplin mengintegrasikan semua ilmu yang telah dipelajari." },
              ].map((item, i, arr) => (
                <div
                  key={item.title}
                  style={{
                    display: "flex",
                    gap: "16px",
                    alignItems: "flex-start",
                    padding: "18px 0",
                    borderBottom: i < arr.length - 1 ? "1px solid var(--gray-200)" : "none",
                  }}
                >
                  <div style={{
                    flexShrink: 0,
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "var(--orange)",
                    marginTop: "8px",
                  }} />
                  <div>
                    <strong style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "var(--navy)",
                      display: "block",
                      marginBottom: "4px",
                    }}>
                      {item.title}
                    </strong>
                    <p style={{ fontSize: "13px", lineHeight: 1.65, color: "var(--gray-600)", fontFamily: "Inter, sans-serif" }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          CURRICULUM
      ════════════════════════════════════════════ */}
      <section id="s1-curriculum" className="gd-page-section-alt">
        <div className="gd-container">

          {/* ── Mandatory ── */}
          <p className="gd-section-kicker">Mata Kuliah Wajib</p>
          <h2 className="gd-section-title">Kurikulum Wajib</h2>
          <div className="gd-section-divider" />

          <div style={{ display: "flex", flexDirection: "column" as const, marginBottom: "64px" }}>
            {bySemester.map((courses, si) =>
              courses.length === 0 ? null : (
                <SemesterRow key={si} semester={si + 1} courses={courses} />
              )
            )}
          </div>

          {/* ── Elective header ── */}
          <p className="gd-section-kicker">Mata Kuliah Pilihan</p>
          <h2 className="gd-section-title">Mata Kuliah Pilihan</h2>
          <div className="gd-section-divider" />
          <p style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "15px",
            lineHeight: 1.8,
            color: "var(--gray-600)",
            marginBottom: "32px",
            maxWidth: "700px",
          }}>
            Mahasiswa wajib menempuh minimal <strong>25 SKS</strong> mata kuliah pilihan. Pilihan tersedia dalam empat paket spesialisasi sesuai kelompok keahlian departemen, serta mata kuliah pilihan umum.
          </p>

          {/* ── Specialization packages ── */}
          <div style={{ marginBottom: "16px" }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "16px",
            }}>
              <div style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase" as const,
                color: "var(--navy)",
              }}>
                Paket Spesialisasi
              </div>
              <div style={{ flex: 1, height: "1px", background: "var(--gray-200)" }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px", background: "var(--gray-200)" }}>
              {specializationPackages.map((pkg) => (
                <SpecializationCard key={pkg.id} pkg={pkg} />
              ))}
            </div>
          </div>

          {/* ── General electives ── */}
          <div style={{ marginTop: "32px" }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "16px",
            }}>
              <div style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase" as const,
                color: "var(--navy)",
              }}>
                Pilihan Umum
              </div>
              <div style={{ flex: 1, height: "1px", background: "var(--gray-200)" }} />
            </div>
            <p style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "13px",
              lineHeight: 1.65,
              color: "var(--gray-600)",
              marginBottom: "12px",
            }}>
              Mata kuliah berikut dapat diambil oleh seluruh mahasiswa tanpa terikat paket spesialisasi tertentu.
            </p>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
              gap: "1px",
              background: "var(--gray-200)",
              border: "1px solid var(--gray-200)",
            }}>
              <div style={{
                display: "grid",
                gridTemplateColumns: "80px 1fr 60px",
                padding: "8px 20px",
                background: "var(--navy)",
              }}>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.45)" }}>Kode</span>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.45)" }}>Mata Kuliah</span>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.45)", textAlign: "right" as const }}>SKS</span>
              </div>
              {generalElectives.map((c, i) => (
                <div
                  key={c.code}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "80px 1fr 60px",
                    alignItems: "center",
                    padding: "12px 20px",
                    background: i % 2 === 0 ? "var(--white)" : "var(--off-white)",
                    gridColumn: "1 / -1",
                  }}
                >
                  <span style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    color: "var(--orange)",
                  }}>
                    {c.code}
                  </span>
                  <span style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "var(--navy)",
                  }}>
                    {c.name}
                  </span>
                  <span style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "var(--gray-400)",
                    textAlign: "right" as const,
                  }}>
                    {c.credits}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          ADMISSION
      ════════════════════════════════════════════ */}
      <section id="s1-admission" className="gd-page-section">
        <div className="gd-container">
          <p className="gd-section-kicker">Penerimaan Mahasiswa</p>
          <h2 className="gd-section-title">Admission</h2>
          <div className="gd-section-divider" />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "56px", alignItems: "start" }}>
            <div>
              <p style={{
                fontSize: "15px",
                lineHeight: 1.8,
                color: "var(--gray-600)",
                marginBottom: "28px",
                fontFamily: "Inter, sans-serif",
              }}>
                Penerimaan mahasiswa baru program sarjana dikelola secara terpusat oleh <strong>Institut Teknologi Bandung</strong> melalui berbagai jalur seleksi nasional maupun mandiri.
              </p>

              <div style={{ display: "flex", flexDirection: "column" as const, gap: "2px" }}>
                {[
                  {
                    jalur: "SNBP",
                    full: "Seleksi Nasional Berdasarkan Prestasi",
                    desc: "Seleksi berdasarkan nilai rapor dan prestasi akademik serta non-akademik siswa.",
                    color: "var(--navy)",
                  },
                  {
                    jalur: "SNBT",
                    full: "Seleksi Nasional Berdasarkan Tes",
                    desc: "Seleksi berdasarkan hasil Ujian Tulis Berbasis Komputer (UTBK) dari SNPMB.",
                    color: "var(--blue)",
                  },
                  {
                    jalur: "SM-ITB",
                    full: "Seleksi Mandiri ITB",
                    desc: "Seleksi mandiri ITB untuk calon mahasiswa yang belum lolos jalur nasional.",
                    color: "var(--orange)",
                  },
                ].map((item) => (
                  <div
                    key={item.jalur}
                    style={{
                      background: "var(--white)",
                      border: "1px solid var(--gray-200)",
                      borderLeft: `3px solid ${item.color}`,
                      padding: "16px 20px",
                      display: "flex",
                      gap: "14px",
                      alignItems: "flex-start",
                    }}
                  >
                    <div style={{
                      flexShrink: 0,
                      background: item.color,
                      color: "var(--white)",
                      fontFamily: "Inter, sans-serif",
                      fontSize: "10px",
                      fontWeight: 800,
                      letterSpacing: "0.06em",
                      padding: "4px 8px",
                      whiteSpace: "nowrap" as const,
                    }}>
                      {item.jalur}
                    </div>
                    <div>
                      <strong style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "13px",
                        fontWeight: 700,
                        color: "var(--navy)",
                        display: "block",
                        marginBottom: "3px",
                      }}>
                        {item.full}
                      </strong>
                      <p style={{
                        fontSize: "13px",
                        lineHeight: 1.6,
                        color: "var(--gray-600)",
                        fontFamily: "Inter, sans-serif",
                      }}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div style={{
                background: "var(--navy)",
                padding: "40px",
                position: "relative",
                overflow: "hidden",
              }}>
                {/* Grid overlay */}
                <div style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                  pointerEvents: "none",
                }} />
                <div style={{ position: "relative", zIndex: 1 }}>
                  <div style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase" as const,
                    color: "var(--orange)",
                    marginBottom: "12px",
                  }}>
                    Portal Pendaftaran
                  </div>
                  <h3 style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "20px",
                    fontWeight: 700,
                    color: "var(--white)",
                    lineHeight: 1.3,
                    marginBottom: "14px",
                  }}>
                    Daftar ke Program S1 Teknik Geodesi dan Geomatika ITB
                  </h3>
                  <p style={{
                    fontSize: "14px",
                    lineHeight: 1.75,
                    color: "rgba(255,255,255,0.65)",
                    marginBottom: "28px",
                    fontFamily: "Inter, sans-serif",
                  }}>
                    Informasi lengkap mengenai jadwal, persyaratan, biaya, dan tata cara pendaftaran tersedia di portal resmi penerimaan mahasiswa baru Institut Teknologi Bandung.
                  </p>
                  <a
                    href="https://admission.itb.ac.id"
                    target="_blank"
                    rel="noreferrer"
                    className="gd-btn gd-btn--primary"
                    style={{ display: "inline-flex", width: "100%", justifyContent: "center" }}
                  >
                    Portal Admisi ITB
                  </a>
                </div>
              </div>

              {/* Accreditation note */}
              <div style={{
                marginTop: "16px",
                background: "var(--off-white)",
                border: "1px solid var(--gray-200)",
                borderLeft: "3px solid var(--blue)",
                padding: "16px 20px",
              }}>
                <div style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase" as const,
                  color: "var(--blue)",
                  marginBottom: "6px",
                }}>
                  Akreditasi
                </div>
                <p style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "13px",
                  lineHeight: 1.65,
                  color: "var(--gray-600)",
                }}>
                  Program S1 Teknik Geodesi dan Geomatika ITB terakreditasi <strong>Unggul</strong> oleh BAN-PT dan memperoleh akreditasi internasional dari <strong>ASIIN</strong> (Jerman).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Back button */}
      <div className="gd-page-section" style={{ paddingTop: "24px", paddingBottom: "48px" }}>
        <div className="gd-container">
          <button className="gd-btn gd-btn--outline" onClick={() => onNavigate("academics")}>
            Back to Academics
          </button>
        </div>
      </div>
    </div>
  );
}