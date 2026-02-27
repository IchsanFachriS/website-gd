// ============================================================
// profile/WhatIsGeodesyPage.tsx
// ============================================================
import { Breadcrumb, PageHero } from "../_shared/PageShell";
import type { PageProps } from "../_shared/PageShell";

const topics = [
  {
    icon: "🌍",
    title: "Geodesy",
    body: "Geodesy is the scientific discipline that deals with the measurement and representation of the Earth, including its gravitational field, in a three-dimensional time-varying space. Geodesists study the size and shape of the Earth, how it moves, and the nature of its gravity field. Modern geodesy uses satellite technology — particularly GPS and GNSS — to provide precise positioning that underpins navigation, mapping, and infrastructure development worldwide.",
  },
  {
    icon: "🗺️",
    title: "Geomatics Engineering",
    body: "Geomatics Engineering is a modern discipline that encompasses the collection, management, analysis, and visualization of spatially referenced data. It integrates traditional surveying with modern technologies including remote sensing, geographic information systems (GIS), photogrammetry, and satellite navigation. Geomatics engineers are the architects of our digital world — they build the spatial data infrastructure that drives smart cities, disaster management, environmental monitoring, and autonomous vehicles.",
  },
  {
    icon: "📸",
    title: "Photogrammetry & Remote Sensing",
    body: "Photogrammetry and Remote Sensing are key disciplines within geomatics. Photogrammetry uses images — from drones, aircraft, or satellites — to reconstruct 3D geometry of objects and terrain. Remote Sensing extends this to analysis of the Earth's surface using multispectral, hyperspectral, SAR, and LiDAR data, enabling land-use mapping, environmental monitoring, disaster assessment, and change detection at regional and global scales.",
  },
  {
    icon: "🛰️",
    title: "GNSS & Satellite Positioning",
    body: "Global Navigation Satellite Systems (GNSS) — including GPS, GLONASS, Galileo, and BeiDou — are fundamental tools in modern geodesy. Our department specializes in precise satellite positioning, atmospheric corrections, geodetic datum establishment, and the design of CORS (Continuously Operating Reference Station) networks that serve Indonesia's national spatial reference framework.",
  },
];

const applications = [
  { label: "National Mapping & Cadastre", icon: "📍" },
  { label: "Smart City & Urban Planning", icon: "🏙️" },
  { label: "Oil, Gas & Mining", icon: "⛏️" },
  { label: "Disaster Management", icon: "🌋" },
  { label: "Maritime & Hydrography", icon: "⚓" },
  { label: "Autonomous Navigation", icon: "🚗" },
  { label: "Environmental Monitoring", icon: "🌱" },
  { label: "Defence & Intelligence", icon: "🛡️" },
];

export function WhatIsGeodesyPage({ onNavigate }: PageProps) {
  return (
    <div>
      <Breadcrumb
        items={[
          { label: "Profile", page: "profile" },
          { label: "What is Geodesy & Geomatics?", page: "" },
        ]}
        onNavigate={onNavigate}
      />
      <PageHero
        kicker="Profile"
        title="What is Geodesy & Geomatics?"
        subtitle="Explore the sciences that measure and map our world — from Earth's gravity field to real-time satellite navigation."
      />

      <section className="gd-page-section">
        <div className="gd-container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "28px" }}>
            {topics.map((t) => (
              <div
                key={t.title}
                style={{ background: "var(--white)", border: "1px solid var(--gray-200)", padding: "32px", borderLeft: "4px solid var(--blue)" }}
              >
                <span style={{ fontSize: "36px", display: "block", marginBottom: "16px" }}>{t.icon}</span>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 700, color: "var(--navy)", marginBottom: "12px" }}>{t.title}</h2>
                <p style={{ fontSize: "15px", lineHeight: 1.75, color: "var(--gray-600)" }}>{t.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="gd-page-section-alt">
        <div className="gd-container">
          <p className="gd-section-kicker">Areas of Application</p>
          <h2 className="gd-section-title">Where Geodesy & Geomatics Matter</h2>
          <div className="gd-section-divider" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginTop: "8px" }}>
            {applications.map((app) => (
              <div key={app.label} style={{ background: "var(--navy)", color: "var(--white)", padding: "20px", textAlign: "center" }}>
                <span style={{ fontSize: "28px", display: "block", marginBottom: "10px" }}>{app.icon}</span>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "13px", fontWeight: 600, color: "rgba(255,255,255,0.85)", lineHeight: 1.4 }}>{app.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}