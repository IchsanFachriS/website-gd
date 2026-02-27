// ============================================================
// research/ResearchPage.tsx
// ============================================================
import { Breadcrumb, PageHero } from "../_shared/PageShell";
import type { PageProps } from "../_shared/PageShell";

const groups = [
  { icon: "🛰️", name: "Physical Geodesy & Satellite Navigation", focus: "GNSS positioning, geodetic datum, Earth's gravity field modeling" },
  { icon: "📸", name: "Photogrammetry & 3D Reconstruction",      focus: "UAV photogrammetry, LiDAR, digital twin, 3D city modeling" },
  { icon: "🌍", name: "Remote Sensing & Earth Observation",       focus: "SAR, multispectral analysis, land change detection" },
  { icon: "🗺️", name: "Geospatial Intelligence & GIS",           focus: "Big data geospatial, web GIS, spatial decision support systems" },
  { icon: "⚓", name: "Hydrography & Marine Geodesy",             focus: "Coastal monitoring, seafloor mapping, tidal analysis" },
  { icon: "🌏", name: "Geodynamics & Crustal Deformation",        focus: "Tectonic monitoring, volcano deformation, InSAR" },
];

const labs = [
  { name: "Geodesy & Geodynamics Lab",           abbr: "GGD" },
  { name: "Photogrammetry & Remote Sensing Lab",  abbr: "FRS" },
  { name: "GIS & Spatial Modeling Lab",           abbr: "GIS" },
  { name: "GNSS & Navigation Lab",                abbr: "GNS" },
  { name: "Hydrography Lab",                      abbr: "HYD" },
  { name: "Cadastral & Land Information Lab",     abbr: "KAD" },
  { name: "Spatial Computing Lab",                abbr: "SPC" },
  { name: "Geospatial Intelligence Lab",          abbr: "GIN" },
  { name: "Cartography Lab",                      abbr: "KAR" },
  { name: "Remote Sensing Application Lab",       abbr: "RSA" },
  { name: "Geodetic Adjustment Lab",              abbr: "GDA" },
  { name: "Digital Terrain Lab",                  abbr: "DTL" },
];

export function ResearchPage({ onNavigate }: PageProps) {
  return (
    <div>
      <Breadcrumb items={[{ label: "Research", page: "research" }]} onNavigate={onNavigate} />
      <PageHero
        kicker="Research"
        title="Research & Innovation"
        subtitle="Advancing geospatial science through cutting-edge research, collaboration, and discovery."
      />

      <section className="gd-page-section">
        <div className="gd-container">
          <p className="gd-section-kicker">Research Groups</p>
          <h2 className="gd-section-title">Our Research Groups</h2>
          <div className="gd-section-divider" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "20px" }}>
            {groups.map((g) => (
              <div key={g.name} style={{ background: "var(--white)", border: "1px solid var(--gray-200)", padding: "28px", display: "flex", gap: "20px" }}>
                <span style={{ fontSize: "36px", flexShrink: 0 }}>{g.icon}</span>
                <div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "17px", fontWeight: 700, color: "var(--navy)", marginBottom: "8px" }}>{g.name}</h3>
                  <p style={{ fontSize: "14px", lineHeight: 1.65, color: "var(--gray-600)" }}>{g.focus}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="gd-page-section-alt">
        <div className="gd-container">
          <p className="gd-section-kicker">Laboratories</p>
          <h2 className="gd-section-title">Our 12 Laboratories</h2>
          <div className="gd-section-divider" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
            {labs.map((lab) => (
              <div key={lab.name} style={{ background: "var(--navy)", color: "var(--white)", padding: "24px" }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: 700, color: "var(--orange)", marginBottom: "8px" }}>{lab.abbr}</div>
                <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.75)", lineHeight: 1.55 }}>{lab.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}