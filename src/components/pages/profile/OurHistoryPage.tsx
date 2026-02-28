// ============================================================
// profile/OurHistoryPage.tsx
// ============================================================
import { Breadcrumb, PageHero } from "../_shared/PageShell";
import type { PageProps } from "../_shared/PageShell";

const timeline = [
  { year: "1950", event: "Geodesy education program established as Teknik Geodesi at Institut Teknologi Bandung (ITB), initially part of the Civil Engineering Department. Primary focus on training human resources for cadastral work and land administration." },
  { year: "2003", event: "Program name changed to Teknik Geodesi dan Geomatika to reflect the modern expansion into geospatial sciences and technologies." },
  { year: "2007", event: "Program transferred to the newly established Faculty of Earth Sciences and Technology (FITB), based on Rector's Decree No. 257/SK/K01/OT/2007." },
  { year: "2010s", event: "Achieved international accreditation (ASIIN) and national excellent accreditation (BAN-PT)." },
  { year: "2022", event: "Over 2,875 alumni graduated, contributing to government, industry, and academia worldwide." },
  { year: "Present", event: "Continues as a leading program in Indonesia, integrating earth observation, geospatial technology, and GIS with strong industry and government partnerships." },
];

const stats = [
  { value: "1950", label: "Year Founded" },
  { value: "75+",  label: "Years of Excellence" },
  { value: "3,000+", label: "Alumni Worldwide" },
  { value: "4",   label: "Research Groups" },
];

export function OurHistoryPage({ onNavigate }: PageProps) {
  return (
    <div>
      <Breadcrumb
        items={[
          { label: "Profile", page: "profile" },
          { label: "Our History", page: "" },
        ]}
        onNavigate={onNavigate}
      />
      <PageHero
        kicker="Profile"
        title="Our History"
        subtitle="75 years of geodesy education — shaping Indonesia's spatial data infrastructure since 1950."
      />

      <section className="gd-page-section">
        <div className="gd-container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }}>
            {/* Intro */}
            <div>
              <p className="gd-section-kicker">About the Department</p>
              <h2 className="gd-section-title">Oldest & Most Prestigious</h2>
              <div className="gd-section-divider" />
              <p style={{ fontSize: "15px", lineHeight: 1.75, color: "var(--gray-600)", marginBottom: "16px" }}>
                Established in 1950, the Department of Geodesy & Geomatics Engineering at ITB stands as the oldest and most prestigious geodesy program in Indonesia. For over seven decades, we have trained generations of engineers who have shaped the nation's spatial data infrastructure.
              </p>
              <p style={{ fontSize: "15px", lineHeight: 1.75, color: "var(--gray-600)", marginBottom: "32px" }}>
                Our journey reflects Indonesia's own development — from the foundational surveys of a newly independent nation, through the digital revolution in geographic information systems, to the cutting-edge era of drone mapping, autonomous navigation, and space geodesy.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", paddingTop: "28px", borderTop: "1px solid var(--gray-200)" }}>
                {stats.map((s) => (
                  <div key={s.label}>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: "34px", fontWeight: 700, color: "var(--blue)", display: "block", lineHeight: 1 }}>{s.value}</span>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "var(--gray-400)", marginTop: "4px", display: "block" }}>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", left: "15px", top: 0, bottom: 0, width: "1px", background: "linear-gradient(to bottom, var(--orange), var(--gray-200))" }} />
              {timeline.map((item) => (
                <div key={item.year} style={{ position: "relative", paddingLeft: "48px", marginBottom: "4px" }}>
                  <div style={{ paddingTop: "14px", paddingBottom: "14px", borderBottom: "1px solid var(--gray-200)" }}>
                    <div style={{ position: "absolute", left: "-33px", top: "20px", width: "10px", height: "10px", borderRadius: "50%", background: "var(--orange)", border: "2px solid var(--orange)" }} />
                    <span style={{ fontFamily: "var(--font-display)", fontSize: "18px", fontWeight: 700, color: "var(--orange)", display: "block", marginBottom: "4px" }}>{item.year}</span>
                    <p style={{ fontSize: "14px", lineHeight: 1.65, color: "var(--gray-600)" }}>{item.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}