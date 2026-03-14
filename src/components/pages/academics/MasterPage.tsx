// ============================================================
// academics/MasterPage.tsx
// Program Magister (S2) — accordion per semester
// ============================================================
import { useState } from "react";
import { Breadcrumb, PageHero } from "../_shared/PageShell";
import type { PageProps } from "../_shared/PageShell";

// ── Types ────────────────────────────────────────────────────
interface Course {
  kode: string;
  nama: string;
  sks: number;
  semester: number;
}
interface Concentration {
  id: string;
  label: string;
  color: string;
  wajib: Course[];
}

// ── Data placeholder ─────────────────────────────────────────
const MK_WAJIB_UMUM: Course[] = [
  { kode: "WI7001", nama: "Literasi Digital, AI, & Etika Akademik",     sks: 2, semester: 1 },
  { kode: "GD5103", nama: "Metodologi Penelitian", sks: 3, semester: 1 },
  { kode: "GD5101", nama: "Sistem Referensi Geospasial",    sks: 3, semester: 1 },
  { kode: "GD5110", nama: "Metodologi Pemetaan",                     sks: 4, semester: 1 },
  { kode: "GD5000", nama: "Kolokium",                     sks: 4, semester: 1 },
];

const CONCENTRATIONS: Concentration[] = [
  {
    id: "pertanahan",
    label: "Administrasi Pertanahan",
    color: "var(--orange)",
    wajib: [
      { kode: "GD5101", nama: "Hukum dan Kebijakan Pertanahan",        sks: 3, semester: 1 },
      { kode: "GD5102", nama: "Administrasi dan Manajemen Pertanahan", sks: 3, semester: 1 },
      { kode: "GD5103", nama: "Kadaster dan Registrasi Tanah",         sks: 3, semester: 2 },
      { kode: "GD5104", nama: "Penilaian Tanah dan Properti",          sks: 3, semester: 2 },
      { kode: "GD5105", nama: "Pengelolaan Sumber Daya Agraria",       sks: 3, semester: 3 },
    ],
  },
  {
    id: "hidrografi",
    label: "Hidrografi",
    color: "var(--blue)",
    wajib: [
      { kode: "GD5201", nama: "Survei Hidrografi Lanjut",             sks: 3, semester: 1 },
      { kode: "GD5202", nama: "Sistem Navigasi dan Penentuan Posisi",  sks: 3, semester: 1 },
      { kode: "GD5203", nama: "Pemodelan Dasar Laut",                  sks: 3, semester: 2 },
      { kode: "GD5204", nama: "Oseanografi Fisika",                    sks: 3, semester: 2 },
      { kode: "GD5205", nama: "Manajemen Data Hidrografi",             sks: 3, semester: 3 },
    ],
  },
  {
    id: "kebencanaan",
    label: "Kebencanaan",
    color: "#16a34a",
    wajib: [
      { kode: "GD5301", nama: "Mitigasi dan Manajemen Bencana",       sks: 3, semester: 1 },
      { kode: "GD5302", nama: "Pemantauan Deformasi Geodetik",        sks: 3, semester: 1 },
      { kode: "GD5303", nama: "Penginderaan Jauh untuk Bencana",      sks: 3, semester: 2 },
      { kode: "GD5304", nama: "Analisis Risiko Geospasial",           sks: 3, semester: 2 },
      { kode: "GD5305", nama: "Sistem Peringatan Dini",               sks: 3, semester: 3 },
    ],
  },
  {
    id: "geodesi",
    label: "Teknik Geodesi dan Geomatika",
    color: "var(--navy)",
    wajib: [
      { kode: "GD5401", nama: "Geodesi Satelit Lanjut",               sks: 3, semester: 1 },
      { kode: "GD5402", nama: "Pemetaan dan Kartografi Lanjut",       sks: 3, semester: 1 },
      { kode: "GD5403", nama: "Jaringan Geodetik",                    sks: 3, semester: 2 },
      { kode: "GD5404", nama: "Geomatika Terestris Lanjut",           sks: 3, semester: 2 },
      { kode: "GD5405", nama: "Komputasi Geodetik",                   sks: 3, semester: 3 },
    ],
  },
];

const MK_PILIHAN: Course[] = [
  { kode: "GD6001", nama: "Topik Khusus Geodesi I",                    sks: 3, semester: 1 },
  { kode: "GD6002", nama: "Topik Khusus Geodesi II",                   sks: 3, semester: 2 },
  { kode: "GD6003", nama: "Pemrosesan Data Spasial Lanjut",            sks: 3, semester: 1 },
  { kode: "GD6004", nama: "Sistem Informasi Geografis Lanjut",         sks: 3, semester: 2 },
  { kode: "GD6005", nama: "Fotogrametri dan Penginderaan Jauh Lanjut", sks: 3, semester: 1 },
  { kode: "GD6006", nama: "Geodesi Fisis Lanjut",                      sks: 3, semester: 2 },
];

// ── Shared helpers ────────────────────────────────────────────
function groupBySemester(courses: Course[]): [number, Course[]][] {
  const map = new Map<number, Course[]>();
  for (const c of courses) {
    if (!map.has(c.semester)) map.set(c.semester, []);
    map.get(c.semester)!.push(c);
  }
  return Array.from(map.entries()).sort(([a], [b]) => a - b);
}

function Chevron({ open, color }: { open: boolean; color: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      style={{
        width: "15px",
        height: "15px",
        flexShrink: 0,
        color,
        transform: open ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform 0.2s",
      }}
    >
      <path
        fillRule="evenodd"
        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function CourseRows({ courses }: { courses: Course[] }) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse" as const }}>
      <thead>
        <tr style={{ borderBottom: "1px solid var(--gray-200)" }}>
          {(["Kode", "Nama Mata Kuliah", "SKS"] as const).map((h) => (
            <th
              key={h}
              style={{
                textAlign: h === "Nama Mata Kuliah" ? "left" : ("center" as const),
                fontFamily: "Inter, sans-serif",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase" as const,
                color: "var(--gray-400)",
                padding: "8px 16px",
                whiteSpace: "nowrap" as const,
              }}
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {courses.map((c, i) => (
          <tr
            key={c.kode}
            style={{
              borderBottom: i < courses.length - 1 ? "1px solid var(--gray-200)" : "none",
              background: i % 2 === 0 ? "transparent" : "rgba(0,0,0,0.015)",
            }}
          >
            <td
              style={{
                fontFamily: "Inter Mono, 'Courier New', monospace",
                fontSize: "12px",
                fontWeight: 600,
                color: "var(--gray-400)",
                padding: "11px 16px",
                whiteSpace: "nowrap" as const,
              }}
            >
              {c.kode}
            </td>
            <td
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "14px",
                color: "var(--navy)",
                padding: "11px 16px",
                lineHeight: 1.5,
              }}
            >
              {c.nama}
            </td>
            <td
              style={{
                textAlign: "center" as const,
                fontFamily: "Inter, sans-serif",
                fontSize: "13px",
                fontWeight: 700,
                color: "var(--navy)",
                padding: "11px 16px",
              }}
            >
              {c.sks}
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr style={{ borderTop: "2px solid var(--gray-200)" }}>
          <td
            colSpan={2}
            style={{
              padding: "9px 16px",
              fontFamily: "Inter, sans-serif",
              fontSize: "12px",
              color: "var(--gray-400)",
            }}
          >
            Total semester ini
          </td>
          <td
            style={{
              textAlign: "center" as const,
              fontFamily: "Inter, sans-serif",
              fontSize: "13px",
              fontWeight: 700,
              color: "var(--navy)",
              padding: "9px 16px",
            }}
          >
            {courses.reduce((s, c) => s + c.sks, 0)}
          </td>
        </tr>
      </tfoot>
    </table>
  );
}

// Semester accordion — reusable
function SemesterAccordion({
  courses,
  accentColor,
  defaultOpen,
}: {
  courses: Course[];
  accentColor: string;
  defaultOpen?: boolean;
}) {
  const grouped = groupBySemester(courses);
  const [openSems, setOpenSems] = useState<Set<number>>(
    () => new Set(defaultOpen ? grouped.map(([s]) => s) : [grouped[0]?.[0]])
  );

  const toggle = (sem: number) =>
    setOpenSems((prev) => {
      const next = new Set(prev);
      next.has(sem) ? next.delete(sem) : next.add(sem);
      return next;
    });

  return (
    <div style={{ display: "flex", flexDirection: "column" as const, gap: "6px" }}>
      {grouped.map(([sem, list]) => {
        const isOpen = openSems.has(sem);
        const totalSks = list.reduce((s, c) => s + c.sks, 0);
        return (
          <div
            key={sem}
            style={{
              border: "1px solid var(--gray-200)",
              borderLeft: `3px solid ${accentColor}`,
              overflow: "hidden",
              background: "var(--white, #fff)",
            }}
          >
            <button
              onClick={() => toggle(sem)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "13px 16px",
                background: isOpen ? "var(--off-white)" : "transparent",
                border: "none",
                cursor: "pointer",
                textAlign: "left" as const,
                gap: "12px",
                transition: "background 0.15s",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "13px",
                    fontWeight: 700,
                    color: isOpen ? accentColor : "var(--navy)",
                    letterSpacing: "0.02em",
                  }}
                >
                  Semester {sem}
                </span>
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "11px",
                    color: "var(--gray-400)",
                  }}
                >
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "12px",
                    fontWeight: 700,
                    color: isOpen ? accentColor : "var(--gray-400)",
                    background: "var(--gray-100, #f3f4f6)",
                    padding: "2px 9px",
                    borderRadius: "2px",
                  }}
                >
                  {totalSks} SKS
                </span>
                <Chevron open={isOpen} color={isOpen ? accentColor : "var(--gray-400)"} />
              </div>
            </button>
            {isOpen && (
              <div style={{ borderTop: "1px solid var(--gray-200)" }}>
                <CourseRows courses={list} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────
export function MasterPage({ onNavigate }: PageProps) {
  const [openConc, setOpenConc] = useState<string | null>(null);
  const toggleConc = (id: string) => setOpenConc((prev) => (prev === id ? null : id));

  return (
    <div style={{ fontFamily: "Inter, sans-serif" }}>
      <Breadcrumb
        items={[
          { label: "Academics", page: "academics" },
          { label: "Program Magister (S2)", page: "" },
        ]}
        onNavigate={onNavigate}
      />
      <PageHero
        kicker="Academics"
        title="Program Magister (S2)"
        subtitle="Geodesi dan Geomatika — Jenjang S2 · 4 Konsentrasi"
      />

      {/* ── Wajib Umum ── */}
      <section className="gd-page-section">
        <div className="gd-container">
          <p className="gd-section-kicker">Kurikulum</p>
          <h2 className="gd-section-title">Mata Kuliah Wajib Umum</h2>
          <div className="gd-section-divider" />
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "14px",
              color: "var(--gray-600)",
              lineHeight: 1.75,
              marginBottom: "28px",
              maxWidth: "680px",
            }}
          >
            Wajib ditempuh oleh seluruh mahasiswa S2, tidak bergantung pada
            konsentrasi yang dipilih.
          </p>
          <SemesterAccordion courses={MK_WAJIB_UMUM} accentColor="var(--navy)" defaultOpen />
        </div>
      </section>

      {/* ── Konsentrasi ── */}
      <section className="gd-page-section" style={{ background: "var(--off-white)" }}>
        <div className="gd-container">
          <p className="gd-section-kicker">Konsentrasi</p>
          <h2 className="gd-section-title">Mata Kuliah Wajib Konsentrasi</h2>
          <div className="gd-section-divider" />
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "14px",
              color: "var(--gray-600)",
              lineHeight: 1.75,
              marginBottom: "32px",
              maxWidth: "680px",
            }}
          >
            Klik konsentrasi untuk membuka daftar mata kuliah, lalu klik
            semester untuk melihat rinciannya.
          </p>

          <div style={{ display: "flex", flexDirection: "column" as const, gap: "10px" }}>
            {CONCENTRATIONS.map((c) => {
              const isOpen = openConc === c.id;
              return (
                <div
                  key={c.id}
                  style={{
                    background: "var(--white, #fff)",
                    border: "1px solid var(--gray-200)",
                    borderLeft: `4px solid ${c.color}`,
                    overflow: "hidden",
                  }}
                >
                  {/* Concentration header */}
                  <button
                    onClick={() => toggleConc(c.id)}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "18px 20px",
                      background: isOpen ? "var(--off-white)" : "transparent",
                      border: "none",
                      cursor: "pointer",
                      textAlign: "left" as const,
                      gap: "16px",
                      transition: "background 0.15s",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                      <div
                        style={{
                          width: "10px",
                          height: "10px",
                          borderRadius: "50%",
                          background: c.color,
                          flexShrink: 0,
                        }}
                      />
                      <div>
                        <p
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: "11px",
                            fontWeight: 700,
                            letterSpacing: "0.1em",
                            textTransform: "uppercase" as const,
                            color: c.color,
                            marginBottom: "2px",
                          }}
                        >
                          Konsentrasi
                        </p>
                        <strong
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: "15px",
                            fontWeight: 700,
                            color: "var(--navy)",
                          }}
                        >
                          {c.label}
                        </strong>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
                      <Chevron open={isOpen} color={isOpen ? c.color : "var(--gray-400)"} />
                    </div>
                  </button>

                  {/* Semester accordions inside */}
                  {isOpen && (
                    <div
                      style={{
                        borderTop: "1px solid var(--gray-200)",
                        padding: "16px 20px",
                        background: "var(--off-white)",
                      }}
                    >
                      <SemesterAccordion courses={c.wajib} accentColor={c.color} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Pilihan ── */}
      <section className="gd-page-section">
        <div className="gd-container">
          <p className="gd-section-kicker">Kurikulum</p>
          <h2 className="gd-section-title">Mata Kuliah Pilihan</h2>
          <div className="gd-section-divider" />
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "14px",
              color: "var(--gray-600)",
              lineHeight: 1.75,
              marginBottom: "28px",
              maxWidth: "680px",
            }}
          >
            Mahasiswa dapat memilih mata kuliah pilihan untuk melengkapi
            kurikulum sesuai minat dan kebutuhan penelitian.
          </p>
          <SemesterAccordion courses={MK_PILIHAN} accentColor="var(--gray-400)" />
        </div>
      </section>

      {/* Back */}
      <div className="gd-page-section" style={{ paddingTop: "32px", paddingBottom: "40px" }}>
        <div className="gd-container">
          <button className="gd-btn gd-btn--outline" onClick={() => onNavigate("academics")}>
            Back to Academics
          </button>
        </div>
      </div>
    </div>
  );
}