// ============================================================
// student-affairs/StudentAffairsPage.tsx
// ============================================================
import { Breadcrumb, PageHero } from "../_shared/PageShell";
import type { PageProps } from "../_shared/PageShell";

const orgs = [
  { name: "HIMAGD ITB",     full: "Himpunan Mahasiswa Geodesi ITB",   desc: "The main student organization representing all geodesy and geomatics students at ITB.", icon: "🏛️" },
  { name: "GeoGIS Club",    full: "Geographic Information Science Club", desc: "Student club focused on GIS applications, web mapping, and open-source geospatial tools.", icon: "🗺️" },
  { name: "GNSS Student Team", full: "Satellite Navigation Research Team", desc: "Student research team working on GNSS projects and competitions.", icon: "🛰️" },
  { name: "GD Photography Club", full: "Geodesy Photography & UAV Club", desc: "Club for aerial photography, drone piloting, and photogrammetric documentation.", icon: "📸" },
];

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

      <section className="gd-page-section">
        <div className="gd-container">
          <p className="gd-section-kicker">Organizations</p>
          <h2 className="gd-section-title">Student Organizations</h2>
          <div className="gd-section-divider" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
            {orgs.map((org) => (
              <div key={org.name} style={{ background: "var(--white)", border: "1px solid var(--gray-200)", overflow: "hidden" }}>
                <div style={{ background: "var(--navy)", padding: "20px 24px", display: "flex", alignItems: "center", gap: "14px" }}>
                  <span style={{ fontSize: "28px" }}>{org.icon}</span>
                  <div>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: "17px", fontWeight: 700, color: "var(--white)" }}>{org.name}</h3>
                    <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)" }}>{org.full}</p>
                  </div>
                </div>
                <div style={{ padding: "20px 24px" }}>
                  <p style={{ fontSize: "14px", lineHeight: 1.7, color: "var(--gray-600)" }}>{org.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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