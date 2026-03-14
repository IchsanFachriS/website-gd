// ============================================================
// student-affairs/StudentAffairsPage.tsx
// ============================================================
import { Breadcrumb, PageHero } from "../_shared/PageShell";
import type { PageProps } from "../_shared/PageShell";

const scholarships = [
  "Beasiswa KIP Kuliah (Kartu Indonesia Pintar)",
  "ITB Endowment Scholarship",
  "BRI Scholarship for Engineering Students",
  "Industry Partnership Scholarships (BIG, BPN, Pertamina)",
  "LPDP Government Scholarship (S2/S3)",
];

const employers = [
  "Badan Informasi Geospasial (BIG)",
  "Badan Pertanahan Nasional (BPN)",
  "LAPAN / BRIN Space Agency",
  "Pertamina & Oil & Gas Industry",
  "Esri Indonesia & GIS Companies",
  "International Research Institutions",
];

export function StudentAffairsPage({ onNavigate }: PageProps) {
  return (
    <div>
      <Breadcrumb items={[{ label: "Student Affairs", page: "student-affairs" }]} onNavigate={onNavigate} />
      <PageHero
        kicker="Student Affairs"
        title="Student Life & Support"
        subtitle="Empowering students beyond the classroom through organizations, scholarships, and career development."
      />

      <section className="gd-page-section-alt">
        <div className="gd-container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px" }}>
            <div>
              <p className="gd-section-kicker">Financial Aid</p>
              <h2 className="gd-section-title">Scholarships</h2>
              <div className="gd-section-divider" />
              <p style={{ fontSize: "15px", lineHeight: 1.75, color: "var(--gray-600)", marginBottom: "16px" }}>
                ITB and the Department of Geodesy & Geomatics Engineering offer various scholarship programs for both domestic and international students based on academic achievement and financial need.
              </p>
              {scholarships.map((s) => (
                <div key={s} style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "8px" }}>
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--orange)", flexShrink: 0, marginTop: "8px" }} />
                  <span style={{ fontFamily: "var(--font-display)", fontSize: "13px", color: "var(--gray-600)" }}>{s}</span>
                </div>
              ))}
            </div>
            <div>
              <p className="gd-section-kicker">Career Development</p>
              <h2 className="gd-section-title">Career & Alumni</h2>
              <div className="gd-section-divider" />
              <p style={{ fontSize: "15px", lineHeight: 1.75, color: "var(--gray-600)", marginBottom: "16px" }}>
                With over 3,000 alumni worldwide, our graduates work across government agencies, private companies, and academic institutions throughout Indonesia and internationally.
              </p>
              {employers.map((s) => (
                <div key={s} style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "8px" }}>
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--blue)", flexShrink: 0, marginTop: "8px" }} />
                  <span style={{ fontFamily: "var(--font-display)", fontSize: "13px", color: "var(--gray-600)" }}>{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}