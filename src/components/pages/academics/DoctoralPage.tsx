// ============================================================
// academics/DoctoralPage.tsx
// Program Doktoral (S3) — Wajib + Pilihan, accordion per semester
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

// ── Data placeholder ─────────────────────────────────────────
const MK_WAJIB: Course[] = [
  { kode: "WI7001", nama: "Literasi Digital, AI, dan Etika Akademik",  sks: 2,  semester: 1 },
  { kode: "GD7101", nama: "Metodologi Penelitian",        sks: 3,  semester: 1 },
  { kode: "GD7012", nama: "Ujian Kualifikasi",       sks: 3,  semester: 1 },
  { kode: "WI7002", nama: "Filsafat Ilmu Pengetahuan",      sks: 2,  semester: 2 },
  { kode: "GD7021", nama: "Penyusunan Proposal",     sks: 5,  semester: 2 },
  { kode: "GD8011", nama: "Penelitian Doktoral I",                           sks: 8, semester: 3 },
  { kode: "GD8012", nama: "Seminar Kemajuan I",      sks: 2,  semester: 3 },
  { kode: "GD8021", nama: "Penelitian Doktoral II",     sks: 8,  semester: 4 },
  { kode: "GD8022", nama: "Seminar Kemajuan II",                           sks: 2, semester: 4 },
  { kode: "GD8031", nama: "Penelitian Doktoral III",      sks: 8,  semester: 5 },
  { kode: "GD8032", nama: "Seminar Kemajuan III",     sks: 2,  semester: 5 },
  { kode: "GD8041", nama: "Penelitian Doktoral IV",                           sks: 8, semester: 6 },
  { kode: "GD8091", nama: "Penulisan Disertasi",     sks: 2,  semester: 6 },
  { kode: "GD8099", nama: "Sidang Doktor",                           sks: 3, semester: 6 },
];

const MK_PILIHAN: Course[] = [
  { kode: "GD7000", nama: "Topik Khusus Geodesi",                     sks: 2, semester: 1 },
  { kode: "GD7001", nama: "Topik Khusus Geomatika",                    sks: 2, semester: 1 },
  { kode: "GD7002", nama: "Studi Mandiri",               sks: 3, semester: 1 },
  { kode: "GD7202", nama: "Ilmu Sistem Bumi",          sks: 4, semester: 4 },
  { kode: "GD7203", nama: "Telaah Hidrografi",      sks: 4, semester: 4 },
  { kode: "GD7204", nama: "Sains Pengamatan Bumi", sks: 4, semester: 4 },
  { kode: "GD7205", nama: "Survei Rekayasa dan Infrastruktur",                     sks: 4, semester: 4 },
  { kode: "GD8102", nama: "Sains Informasi Geografis",                    sks: 4, semester: 5 },
  { kode: "GD8103", nama: "Sistem Kadaster Modern",               sks: 4, semester: 5 },
  { kode: "GD8104", nama: "Akta Sains Maritim",          sks: 4, semester: 5 },
  { kode: "GD8105", nama: "Pemodelan Geodesi",      sks: 4, semester: 5 },
];

// ── Helpers ──────────────────────────────────────────────────
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
            Total
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
export function DoctoralPage({ onNavigate }: PageProps) {
  return (
    <div style={{ fontFamily: "Inter, sans-serif" }}>
      <Breadcrumb
        items={[
          { label: "Academics", page: "academics" },
          { label: "Program Doktoral (S3)", page: "" },
        ]}
        onNavigate={onNavigate}
      />
      <PageHero
        kicker="Academics"
        title="Program Doktoral (S3)"
        subtitle="Geodesi dan Geomatika — Jenjang S3"
      />

      {/* ── Wajib ── */}
      <section className="gd-page-section">
        <div className="gd-container">
          <p className="gd-section-kicker">Kurikulum</p>
          <h2 className="gd-section-title">Mata Kuliah Wajib</h2>
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
            Seluruh mahasiswa doktoral wajib menyelesaikan mata kuliah berikut
            sebagai fondasi akademik dan penyelesaian disertasi.
          </p>
          <SemesterAccordion courses={MK_WAJIB} accentColor="var(--navy)" defaultOpen />
        </div>
      </section>

      {/* ── Pilihan ── */}
      <section className="gd-page-section" style={{ background: "var(--off-white)" }}>
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
            Mahasiswa dapat memilih mata kuliah pilihan berikut.
          </p>
          <SemesterAccordion courses={MK_PILIHAN} accentColor="var(--orange)" />
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