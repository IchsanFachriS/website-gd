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
  { kode: "GD7001", nama: "Filsafat Ilmu dan Metodologi Riset",  sks: 3,  semester: 1 },
  { kode: "GD7002", nama: "Geodesi dan Geomatika Lanjut",        sks: 3,  semester: 1 },
  { kode: "GD7003", nama: "Seminar Kemajuan Penelitian I",       sks: 2,  semester: 2 },
  { kode: "GD7004", nama: "Seminar Kemajuan Penelitian II",      sks: 2,  semester: 3 },
  { kode: "GD7005", nama: "Seminar Kemajuan Penelitian III",     sks: 2,  semester: 4 },
  { kode: "GD7099", nama: "Disertasi",                           sks: 12, semester: 6 },
];

const MK_PILIHAN: Course[] = [
  { kode: "GD7101", nama: "Topik Riset Geodesi I",                     sks: 3, semester: 1 },
  { kode: "GD7102", nama: "Topik Riset Geodesi II",                    sks: 3, semester: 2 },
  { kode: "GD7103", nama: "Pemodelan Geospasial Lanjut",               sks: 3, semester: 1 },
  { kode: "GD7104", nama: "Teknik Komputasi Geodetik Lanjut",          sks: 3, semester: 2 },
  { kode: "GD7105", nama: "Survei dan Deformasi Geodetik Lanjut",      sks: 3, semester: 1 },
  { kode: "GD7106", nama: "Integrasi Data Penginderaan Jauh dan GNSS", sks: 3, semester: 2 },
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
                  {list.length} mata kuliah
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
            Mahasiswa memilih mata kuliah pilihan untuk mendukung topik
            penelitian disertasi sesuai arahan promotor.
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