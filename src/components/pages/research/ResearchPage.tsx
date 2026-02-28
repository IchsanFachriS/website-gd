import { useState } from "react";
import { Breadcrumb, PageHero } from "../_shared/PageShell";
import type { PageProps } from "../_shared/PageShell";

const groups = [
  {
    id: "esgi",
    name: "Engineering Sciences and Geodesy Innovation",
    focus: "GNSS positioning, geodetic datum, Earth's gravity field modeling",
    image: "img/kk/srig.png",
  },
  {
    id: "gist",
    name: "Geographic Information Science and Technology",
    focus: "UAV photogrammetry, LiDAR, digital twin, 3D city modeling",
    image: "img/kk/stig.png",
  },
  {
    id: "hydro",
    name: "Hydrography",
    focus: "Bathymetric surveys, coastal monitoring, tidal analysis, seafloor mapping",
    image: "img/kk/hidro.png",
  },
  {
    id: "ssc",
    name: "Spatial System and Cadastre",
    focus: "Big data geospatial, web GIS, spatial decision support systems",
    image: "img/kk/siska.png",
  },
];

const labs = [
  { name: "Geodesy" },
  { name: "Survey and Cadastre" },
  { name: "Remote Sensing and Geographical Information Sciences" },
  { name: "Survey and Engineering Hydrography" },
  { name: "Computational Geodesy" },
];

const romanNumerals = ["I", "II", "III", "IV", "V"];

export function ResearchPage({ onNavigate }: PageProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div>
      <Breadcrumb items={[{ label: "Research", page: "research" }]} onNavigate={onNavigate} />
      <PageHero
        kicker="Research"
        title="Research & Innovation"
        subtitle="Advancing geospatial science through cutting-edge research, collaboration, and discovery."
      />

      {/* ── Research Groups ─────────────────────────────────── */}
      <section className="gd-page-section">
        <div className="gd-container">
          <p className="gd-section-kicker">Research Groups</p>
          <h2 className="gd-section-title">Our Research Groups</h2>
          <div className="gd-section-divider" />

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "2px",
            background: "var(--gray-200)",
            border: "1px solid var(--gray-200)",
            marginTop: "8px",
          }}>
            {groups.map((g) => {
              const isHovered = hovered === g.id;
              return (
                <div
                  key={g.id}
                  onMouseEnter={() => setHovered(g.id)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    position: "relative",
                    overflow: "hidden",
                    background: "var(--navy)",
                    minHeight: "340px",
                    cursor: "default",
                  }}
                >
                  {/* Background photo — full brightness by default */}
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `url(${g.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    transform: isHovered ? "scale(1.06)" : "scale(1)",
                    transition: "transform 0.65s cubic-bezier(0.4,0,0.2,1)",
                  }} />

                  {/* Subtle vignette always-on (top corners) */}
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(135deg, rgba(17,27,54,0.25) 0%, transparent 60%)",
                  }} />

                  {/* Hover overlay — dark gradient slides up from bottom */}
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(17,27,54,0.97) 0%, rgba(17,27,54,0.78) 40%, rgba(17,27,54,0.1) 100%)",
                    opacity: isHovered ? 1 : 0,
                    transition: "opacity 0.4s ease",
                  }} />

                  {/* Orange accent line — grows from left on hover */}
                  <div style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    height: "3px",
                    width: isHovered ? "100%" : "0%",
                    background: "var(--orange)",
                    transition: "width 0.55s cubic-bezier(0.4,0,0.2,1)",
                  }} />

                  {/* Text block — slides up and fades in on hover */}
                  <div style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "32px 28px 40px",
                    opacity: isHovered ? 1 : 0,
                    transform: isHovered ? "translateY(0)" : "translateY(20px)",
                    transition: "opacity 0.35s ease 0.05s, transform 0.4s cubic-bezier(0.4,0,0.2,1) 0.05s",
                  }}>
                    <h3 style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "21px",
                      fontWeight: 700,
                      color: "var(--white)",
                      lineHeight: 1.2,
                      marginBottom: "10px",
                      letterSpacing: "-0.01em",
                    }}>
                      {g.name}
                    </h3>

                    <p style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "13px",
                      lineHeight: 1.65,
                      color: "rgba(255,255,255,0.7)",
                      margin: 0,
                    }}>
                      {g.focus}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Laboratories ────────────────────────────────────── */}
      <section className="gd-page-section-alt">
        <div className="gd-container">
          <p className="gd-section-kicker">Laboratories</p>
          <h2 className="gd-section-title">Our Laboratories</h2>
          <div className="gd-section-divider" />

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "2px",
            background: "var(--gray-200)",
            border: "1px solid var(--gray-200)",
          }}>
            {labs.map((lab, i) => (
              <div
                key={lab.name}
                style={{
                  background: "var(--white)",
                  padding: "32px 28px",
                  borderLeft: "4px solid var(--navy)",
                  display: "flex",
                  flexDirection: "column" as const,
                  gap: "10px",
                  transition: "border-left-color 0.2s, background 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderLeftColor = "var(--orange)";
                  (e.currentTarget as HTMLDivElement).style.background = "var(--off-white)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderLeftColor = "var(--navy)";
                  (e.currentTarget as HTMLDivElement).style.background = "var(--white)";
                }}
              >
                <span style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase" as const,
                  color: "var(--orange)",
                }}>
                  Lab {romanNumerals[i]}
                </span>

                <p style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "15px",
                  fontWeight: 700,
                  color: "var(--navy)",
                  lineHeight: 1.4,
                  margin: 0,
                }}>
                  {lab.name}
                </p>

                <div style={{
                  width: "32px",
                  height: "2px",
                  background: "var(--gray-200)",
                  marginTop: "4px",
                }} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}