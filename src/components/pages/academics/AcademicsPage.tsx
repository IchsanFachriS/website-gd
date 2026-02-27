// ============================================================
// academics/AcademicsPage.tsx
// ============================================================
import { Breadcrumb, PageHero } from "../_shared/PageShell";
import type { PageProps } from "../_shared/PageShell";

const programs = [
  {
    level: "S1",
    name: "Undergraduate Program (S1)",
    duration: "4 Years",
    credits: "144 SKS",
    desc: "A comprehensive 4-year program covering geodesy, cartography, photogrammetry, remote sensing, and geographic information systems. Graduates are equipped to work in government, industry, and research.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&q=80",
    page: "undergraduate-program-s1",
  },
  {
    level: "S2",
    name: "Graduate Program (S2)",
    duration: "2 Years",
    credits: "36 SKS",
    desc: "An advanced master's program focused on research and specialized expertise in geomatics engineering. Students develop deep knowledge in chosen specializations and conduct original research.",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=600&q=80",
    page: "graduate-program-s2",
  },
  {
    level: "S3",
    name: "Doctoral Program (S3)",
    duration: "3–5 Years",
    credits: "48 SKS",
    desc: "A research-intensive doctoral program producing scholars and researchers who contribute original knowledge to geodesy and geomatics. Graduates pursue careers in academia and high-level research institutions.",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80",
    page: "doctoral-program-s3",
  },
];

const specializations = [
  { icon: "🛰️", title: "Physical Geodesy & GNSS", desc: "Satellite positioning, Earth's gravity field, geodetic networks" },
  { icon: "📸", title: "Photogrammetry", desc: "Aerial and close-range photogrammetry, 3D reconstruction, LiDAR" },
  { icon: "🌍", title: "Remote Sensing", desc: "Satellite imagery analysis, land use classification, environmental monitoring" },
  { icon: "🗺️", title: "Geographic Information Systems", desc: "Spatial databases, GIS analysis, web mapping, spatial decision support" },
  { icon: "📐", title: "Cadastral & Land Surveying", desc: "Land registration, boundary surveys, property mapping" },
  { icon: "⚓", title: "Hydrography & Marine Geodesy", desc: "Bathymetric surveys, coastal mapping, maritime navigation" },
];

export function AcademicsPage({ onNavigate }: PageProps) {
  return (
    <div>
      <Breadcrumb items={[{ label: "Academics", page: "academics" }]} onNavigate={onNavigate} />
      <PageHero
        kicker="Academics"
        title="Programs of Study"
        subtitle="World-class geodesy and geomatics education at undergraduate, graduate, and doctoral levels."
      />

      <section className="gd-page-section">
        <div className="gd-container">
          <p className="gd-section-kicker">Our Programs</p>
          <h2 className="gd-section-title">Academic Degrees</h2>
          <div className="gd-section-divider" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px", marginTop: "16px" }}>
            {programs.map((prog) => (
              <div key={prog.level} style={{ border: "1px solid var(--gray-200)", overflow: "hidden", background: "var(--white)" }}>
                <div style={{ position: "relative", height: "200px", overflow: "hidden" }}>
                  <img src={prog.image} alt={prog.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", top: "16px", left: "16px", background: "var(--orange)", color: "var(--white)", fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 700, width: "48px", height: "48px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {prog.level}
                  </div>
                </div>
                <div style={{ padding: "28px" }}>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 700, color: "var(--navy)", marginBottom: "8px" }}>{prog.name}</h3>
                  <div style={{ display: "flex", gap: "16px", fontFamily: "var(--font-display)", fontSize: "13px", fontWeight: 600, color: "var(--blue)", marginBottom: "12px" }}>
                    <span>⏱ {prog.duration}</span>
                    <span>📚 {prog.credits}</span>
                  </div>
                  <p style={{ fontSize: "14px", lineHeight: 1.7, color: "var(--gray-600)" }}>{prog.desc}</p>
                  <button
                    onClick={() => onNavigate(prog.page)}
                    className="gd-btn gd-btn--outline"
                    style={{ marginTop: "20px" }}
                  >
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="gd-page-section-alt">
        <div className="gd-container">
          <p className="gd-section-kicker">Fields of Study</p>
          <h2 className="gd-section-title">Areas of Specialization</h2>
          <div className="gd-section-divider" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
            {specializations.map((spec) => (
              <div key={spec.title} style={{ background: "var(--white)", padding: "28px", borderLeft: "4px solid var(--blue)" }}>
                <span style={{ fontSize: "32px", display: "block", marginBottom: "12px" }}>{spec.icon}</span>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "17px", fontWeight: 700, color: "var(--navy)", marginBottom: "8px" }}>{spec.title}</h3>
                <p style={{ fontSize: "14px", lineHeight: 1.65, color: "var(--gray-600)" }}>{spec.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}