// ============================================================
// academics/InternationalUndergraduatePage.tsx
// IUP — Admission only
// ============================================================
import { Breadcrumb, PageHero } from "../_shared/PageShell";
import type { PageProps } from "../_shared/PageShell";

const admissionReqs = [
  "Indonesian or international high school graduate with strong mathematics and natural sciences record",
  "Minimum English proficiency: TOEFL iBT 80 / IELTS 6.0 (or equivalent)",
  "Pass ITB's international undergraduate selection test (English and Science)",
  "Interview conducted in English",
  "International applicants: additional document verification by ITB International Office",
];

const highlights = [
  {
    title: "International Exposure",
    desc: "Opportunities for outbound exchange, joint supervision, and engagement with visiting professors.",
    color: "var(--orange)",
  },
  {
    title: "Integrated Bachelor-Master Integration Program (IBMP)",
    desc: "A streamlined pathway that allows qualified students to continue into a master's program within an accelerated timeframe.",
    color: "var(--blue)",
  },
];

export function InternationalUndergraduatePage({ onNavigate }: PageProps) {
  return (
    <div style={{ fontFamily: "Inter, sans-serif" }}>
      <Breadcrumb
        items={[
          { label: "Academics", page: "academics" },
          { label: "International Undergraduate Program (IUP)", page: "" },
        ]}
        onNavigate={onNavigate}
      />
      <PageHero
        kicker="Academics"
        title="International Undergraduate Program (IUP)"
        subtitle="English-Medium B.Eng. in Geodesy and Geomatics — 144 Credits · 8 Semesters"
      />

      <section className="gd-page-section">
        <div className="gd-container">
          <p className="gd-section-kicker">Admissions</p>
          <h2 className="gd-section-title">Admission Requirements</h2>
          <div className="gd-section-divider" />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "48px",
            }}
          >
            {/* ── Left ── */}
            <div>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "15px",
                  lineHeight: 1.85,
                  color: "var(--gray-600)",
                  marginBottom: "16px",
                }}
              >
                The International Undergraduate Program (IUP) provides a
                competitive educational experience of international quality,
                fostering a global learning atmosphere for all students. As
                part of ITB's commitment to serving prospective students from
                non-national curriculum high schools, the program is open to
                both Indonesian and foreign nationals.
              </p>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "15px",
                  lineHeight: 1.85,
                  color: "var(--gray-600)",
                  marginBottom: "16px",
                }}
              >
                The curriculum is designed to prepare students for global
                competitiveness, requiring a minimum of one semester of outbound
                exchange to ITB's partner universities abroad. This provides
                exposure to world-class learning environments and opportunities
                to build a valuable global network. All academic activities in
                the International class are delivered entirely in{" "}
                <strong>English</strong>.
              </p>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "15px",
                  lineHeight: 1.85,
                  color: "var(--gray-600)",
                  marginBottom: "20px",
                }}
              >
                We offer a globally oriented learning environment that expands
                students' opportunities through international exposure and an
                integrated route to master's studies:
              </p>

              {/* Highlights */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column" as const,
                  gap: "2px",
                  marginBottom: "36px",
                }}
              >
                {highlights.map((h) => (
                  <div
                    key={h.title}
                    style={{
                      display: "flex",
                      gap: "14px",
                      alignItems: "flex-start",
                      background: "var(--off-white)",
                      border: "1px solid var(--gray-200)",
                      borderLeft: `4px solid ${h.color}`,
                      padding: "16px 18px",
                    }}
                  >
                    <div
                      style={{
                        flexShrink: 0,
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: h.color,
                        marginTop: "6px",
                      }}
                    />
                    <div>
                      <strong
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "13px",
                          fontWeight: 700,
                          color: "var(--navy)",
                          display: "block",
                          marginBottom: "4px",
                        }}
                      >
                        {h.title}
                      </strong>
                      <p
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "13px",
                          lineHeight: 1.65,
                          color: "var(--gray-600)",
                          margin: 0,
                        }}
                      >
                        {h.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right: CTA box only ── */}
            <div>
              <div
                style={{
                  background: "var(--navy)",
                  padding: "40px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* grid overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                    pointerEvents: "none",
                  }}
                />
                <div style={{ position: "relative", zIndex: 1 }}>
                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase" as const,
                      color: "var(--orange)",
                      marginBottom: "12px",
                    }}
                  >
                    Learn More
                  </p>
                  <h3
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "20px",
                      fontWeight: 700,
                      color: "var(--white)",
                      marginBottom: "12px",
                      lineHeight: 1.3,
                    }}
                  >
                    IUP Geodesy and Geomatics — ITB
                  </h3>
                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      lineHeight: 1.75,
                      color: "rgba(255,255,255,0.7)",
                      marginBottom: "28px",
                    }}
                  >
                    Find complete information about the IUP program (admission
                    schedules, required documents, tuition fees, and more) on
                    the official ITB and FITB websites.
                  </p>

                  {/* Two CTA buttons */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column" as const,
                      gap: "10px",
                    }}
                  >
                    <a
                      href="https://admission.itb.ac.id/en/program/undergraduate-program/international-undergraduate-program"
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        background: "var(--orange)",
                        color: "#fff",
                        fontFamily: "Inter, sans-serif",
                        fontSize: "13px",
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase" as const,
                        padding: "14px 20px",
                        textDecoration: "none",
                        transition: "background 0.2s",
                      }}
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLAnchorElement).style.background =
                          "var(--orange-dark)")
                      }
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLAnchorElement).style.background =
                          "var(--orange)")
                      }
                    >
                      IUP Info — ITB Website
                      <svg viewBox="0 0 20 20" fill="currentColor" style={{ width: "14px", height: "14px", flexShrink: 0 }}>
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </a>

                    <a
                      href="https://fitb.itb.ac.id/iup-geodesi-dan-geomatika/"
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        background: "transparent",
                        color: "rgba(255,255,255,0.85)",
                        fontFamily: "Inter, sans-serif",
                        fontSize: "13px",
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase" as const,
                        padding: "14px 20px",
                        border: "1px solid rgba(255,255,255,0.25)",
                        textDecoration: "none",
                        transition: "border-color 0.2s, color 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLAnchorElement;
                        el.style.borderColor = "rgba(255,255,255,0.7)";
                        el.style.color = "#fff";
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLAnchorElement;
                        el.style.borderColor = "rgba(255,255,255,0.25)";
                        el.style.color = "rgba(255,255,255,0.85)";
                      }}
                    >
                      IUP Geodesi — FITB Website
                      <svg viewBox="0 0 20 20" fill="currentColor" style={{ width: "14px", height: "14px", flexShrink: 0 }}>
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Back button */}
      <div
        className="gd-page-section"
        style={{ paddingTop: "32px", paddingBottom: "40px" }}
      >
        <div className="gd-container">
          <button
            className="gd-btn gd-btn--outline"
            onClick={() => onNavigate("academics")}
          >
            Back to Academics
          </button>
        </div>
      </div>
    </div>
  );
}