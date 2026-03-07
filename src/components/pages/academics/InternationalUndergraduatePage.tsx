// ============================================================
// academics/InternationalUndergraduate.tsx
// IUP — International Undergraduate Program
// Sub-tabs: Overview | Curriculum | Admission
// Consistent with site design system (--navy, --blue, --orange, Inter)
// ============================================================
import { useState } from "react";
import { Breadcrumb, PageHero } from "../_shared/PageShell";
import type { PageProps } from "../_shared/PageShell";

const SUB_TABS = [
  { id: "overview",   label: "Overview" },
  { id: "curriculum", label: "Curriculum" },
  { id: "admission",  label: "Admission" },
];

// ── IUP Core Courses (English-medium, per semester) ──────────
const iupCourses = [
  { code: "MA1101",  name: "Mathematics I",                              credits: 4, semester: 1 },
  { code: "FI1101",  name: "Basic Physics I",                            credits: 3, semester: 1 },
  { code: "KI1101",  name: "Basic Chemistry I",                          credits: 3, semester: 1 },
  { code: "WI1101",  name: "Pancasila",                                  credits: 2, semester: 1 },
  { code: "WI1102",  name: "Computational Thinking",                     credits: 2, semester: 1 },
  { code: "WI1103",  name: "Introduction to Sustainability Principles",  credits: 2, semester: 1 },
  { code: "WI1111",  name: "Basic Physics Laboratory",                   credits: 1, semester: 1 },
  { code: "WI1112",  name: "Basic Chemistry Laboratory",                 credits: 1, semester: 1 },
  { code: "GD1201",  name: "Applied Linear Algebra",                     credits: 3, semester: 2 },
  { code: "GD1202",  name: "Mechanics and Gravitation",                  credits: 3, semester: 2 },
  { code: "WI2001",  name: "Introduction to Engineering and Design",     credits: 3, semester: 2 },
  { code: "WI2002",  name: "Data Literacy and Artificial Intelligence",  credits: 2, semester: 2 },
  { code: "WI2004",  name: "English",                                    credits: 2, semester: 2 },
  { code: "WI2005",  name: "Indonesian Language",                        credits: 2, semester: 2 },
  { code: "WF1211",  name: "Earth Systems",                              credits: 3, semester: 2 },
  { code: "GD2101",  name: "Statistics and Probability",                 credits: 3, semester: 3 },
  { code: "GD2102",  name: "Positioning",                                credits: 3, semester: 3 },
  { code: "GD2103",  name: "Wave Physics",                               credits: 3, semester: 3 },
  { code: "GD2104",  name: "Geometric Geodesy",                          credits: 3, semester: 3 },
  { code: "GD2105",  name: "Geospatial Law and Regulation",              credits: 3, semester: 3 },
  { code: "GD2106",  name: "Geospatial Expedition",                      credits: 2, semester: 3 },
  { code: "WI2023",  name: "Sports",                                     credits: 1, semester: 3 },
  { code: "GD2201",  name: "Estimation and Approximation",               credits: 2, semester: 4 },
  { code: "GD2202",  name: "Geodetic Computation",                       credits: 3, semester: 4 },
  { code: "GD2203",  name: "Fundamentals of Physical Geodesy",           credits: 2, semester: 4 },
  { code: "GD2204",  name: "Geometric Reference Systems",                credits: 3, semester: 4 },
  { code: "GD2205",  name: "Terrestrial Mapping",                        credits: 3, semester: 4 },
  { code: "GD2206",  name: "Satellite Geodesy",                          credits: 2, semester: 4 },
  { code: "GD3101",  name: "Spatial Database",                           credits: 3, semester: 5 },
  { code: "GD3102",  name: "Cartography",                                credits: 3, semester: 5 },
  { code: "GD3103",  name: "Hydrography",                                credits: 3, semester: 5 },
  { code: "GD3104",  name: "Photogrammetry",                             credits: 3, semester: 5 },
  { code: "GD3105",  name: "GNSS Surveying",                             credits: 3, semester: 5 },
  { code: "WI2006",  name: "Civics",                                     credits: 2, semester: 6 },
  { code: "WI201X",  name: "Religion",                                   credits: 2, semester: 6 },
  { code: "GD3201",  name: "Construction Surveying",                     credits: 3, semester: 6 },
  { code: "GD3202",  name: "Remote Sensing",                             credits: 3, semester: 6 },
  { code: "GD3203",  name: "Thematic Mapping",                           credits: 3, semester: 6 },
  { code: "GD3204",  name: "Field Camp",                                 credits: 3, semester: 6 },
  { code: "GD4101",  name: "Internship",                                 credits: 2, semester: 7 },
  { code: "GD4102",  name: "Capstone Project Proposal",                  credits: 1, semester: 7 },
  { code: "GD4103",  name: "Geographic Information Systems",             credits: 3, semester: 7 },
  { code: "GD4104",  name: "Cadastral Systems",                          credits: 3, semester: 7 },
  { code: "GD4201",  name: "Capstone Project",                           credits: 3, semester: 8 },
  { code: "GD4202",  name: "Environmental Geography",                    credits: 3, semester: 8 },
  { code: "WI2024",  name: "Business Management and Entrepreneurship",   credits: 2, semester: 8 },
];

// ── IUP Elective courses ─────────────────────────────────────
const iupElectives = [
  { code: "GD3E01", name: "Advanced Hydrographic Surveying",            credits: 3 },
  { code: "GD3E02", name: "Maritime Boundary Delimitation",             credits: 3 },
  { code: "GD3E03", name: "Advanced Remote Sensing",                    credits: 3 },
  { code: "GD3E04", name: "UAV and Close-Range Photogrammetry",         credits: 3 },
  { code: "GD3E05", name: "Spatial Data Infrastructure",                credits: 3 },
  { code: "GD4E01", name: "Advanced Physical Geodesy",                  credits: 3 },
  { code: "GD4E02", name: "GNSS Precision and Applications",            credits: 3 },
  { code: "GD4E03", name: "3D Cadastre and Land Administration",        credits: 3 },
  { code: "GD4E04", name: "Web GIS and Geoportal",                      credits: 3 },
  { code: "GD4E05", name: "Special Topics in Geodesy",                  credits: 3 },
  { code: "GD4E06", name: "International Collaborative Research",       credits: 2 },
];

// ── Partner universities ─────────────────────────────────────
interface Partner {
  name: string;
  country: string;
  flag: string;
  type: "double-degree" | "exchange" | "joint-research";
  note?: string;
}

const partners: Partner[] = [
  { name: "Delft University of Technology",      country: "Netherlands",  flag: "🇳🇱", type: "double-degree",  note: "MSc Geomatics" },
  { name: "University of Melbourne",             country: "Australia",    flag: "🇦🇺", type: "double-degree",  note: "Geomatics" },
  { name: "Leibniz University Hannover",         country: "Germany",      flag: "🇩🇪", type: "double-degree",  note: "Geodesy & Geoinformatics" },
  { name: "University of Stuttgart",             country: "Germany",      flag: "🇩🇪", type: "exchange",       note: "Student exchange program" },
  { name: "Seoul National University",           country: "South Korea",  flag: "🇰🇷", type: "exchange",       note: "Semester exchange" },
  { name: "Chiba University",                    country: "Japan",        flag: "🇯🇵", type: "exchange",       note: "Semester exchange" },
  { name: "KU Leuven",                           country: "Belgium",      flag: "🇧🇪", type: "joint-research", note: "Smart cities & land admin" },
  { name: "ITC – University of Twente",          country: "Netherlands",  flag: "🇳🇱", type: "joint-research", note: "Geoinformation & EO" },
];

const typeLabel: Record<Partner["type"], string> = {
  "double-degree": "Double Degree",
  exchange:        "Exchange",
  "joint-research":"Joint Research",
};

const typeColor: Record<Partner["type"], string> = {
  "double-degree": "var(--navy)",
  exchange:        "var(--blue)",
  "joint-research":"var(--orange)",
};

// ── Semester accordion (same pattern as S1) ──────────────────
function SemesterRow({
  semester,
  courses,
}: {
  semester: number;
  courses: { code: string; name: string; credits: number }[];
}) {
  const [open, setOpen] = useState(semester <= 2);
  const total = courses.reduce((s, c) => s + c.credits, 0);
  const isFoundation = semester <= 2;

  return (
    <div
      style={{
        border: "1px solid var(--gray-200)",
        borderLeft: `4px solid ${isFoundation ? "var(--navy)" : "var(--blue)"}`,
        marginBottom: "2px",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          padding: "14px 20px",
          background: open ? "var(--white)" : "var(--off-white)",
          cursor: "pointer",
          gap: "14px",
          border: "none",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <div
          style={{
            flexShrink: 0,
            width: "36px",
            height: "36px",
            background: isFoundation ? "var(--navy)" : "var(--blue)",
            color: "var(--white)",
            fontFamily: "Inter, sans-serif",
            fontSize: "14px",
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {semester}
        </div>
        <div style={{ flex: 1, textAlign: "left" }}>
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "14px",
              fontWeight: 700,
              color: "var(--navy)",
            }}
          >
            Semester {semester}
          </span>
          {isFoundation && (
            <span
              style={{
                marginLeft: "10px",
                fontFamily: "Inter, sans-serif",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.08em",
                background: "var(--navy)",
                color: "var(--white)",
                padding: "2px 8px",
              }}
            >
              Foundation
            </span>
          )}
        </div>
        <span
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "13px",
            fontWeight: 600,
            color: "var(--blue)",
            marginRight: "12px",
          }}
        >
          {total} credits
        </span>
        <svg
          viewBox="0 0 12 8"
          fill="none"
          style={{
            width: "12px",
            height: "8px",
            color: "var(--gray-400)",
            transform: open ? "rotate(180deg)" : "none",
            transition: "transform 0.2s",
            flexShrink: 0,
          }}
        >
          <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <div style={{ borderTop: "1px solid var(--gray-200)" }}>
          {courses.map((c, i) => (
            <div
              key={c.code}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "11px 20px 11px 70px",
                borderBottom: i < courses.length - 1 ? "1px solid var(--gray-100)" : "none",
                background: i % 2 === 0 ? "var(--white)" : "var(--off-white)",
              }}
            >
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  color: "var(--orange)",
                  minWidth: "80px",
                }}
              >
                {c.code}
              </span>
              <span
                style={{
                  flex: 1,
                  fontFamily: "Inter, sans-serif",
                  fontSize: "14px",
                  color: "var(--navy)",
                }}
              >
                {c.name}
              </span>
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "var(--gray-400)",
                }}
              >
                {c.credits} cr
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Partner card ──────────────────────────────────────────────
function PartnerCard({ partner }: { partner: Partner }) {
  return (
    <div
      style={{
        background: "var(--white)",
        border: "1px solid var(--gray-200)",
        borderTop: `4px solid ${typeColor[partner.type]}`,
        padding: "20px",
        display: "flex",
        flexDirection: "column" as const,
        gap: "10px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px" }}>
        <span style={{ fontSize: "22px", lineHeight: 1 }}>{partner.flag}</span>
        <span
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase" as const,
            background: typeColor[partner.type],
            color: "#fff",
            padding: "3px 8px",
            whiteSpace: "nowrap" as const,
          }}
        >
          {typeLabel[partner.type]}
        </span>
      </div>
      <div>
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "14px",
            fontWeight: 700,
            color: "var(--navy)",
            marginBottom: "2px",
            lineHeight: 1.35,
          }}
        >
          {partner.name}
        </p>
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "12px",
            color: "var(--gray-400)",
            fontWeight: 600,
            letterSpacing: "0.04em",
          }}
        >
          {partner.country}
        </p>
      </div>
      {partner.note && (
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "12px",
            color: "var(--gray-600)",
            lineHeight: 1.5,
            borderTop: "1px solid var(--gray-100)",
            paddingTop: "10px",
          }}
        >
          {partner.note}
        </p>
      )}
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────
export function InternationalUndergraduatePage({ onNavigate }: PageProps) {
  const [activeTab, setActiveTab] = useState("overview");

  const scrollTo = (id: string) => {
    setActiveTab(id);
    const el = document.getElementById(`iup-${id}`);
    if (el) {
      const offset = el.getBoundingClientRect().top + window.scrollY - 130;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  };

  const bySemester = Array.from({ length: 8 }, (_, i) =>
    iupCourses.filter((c) => c.semester === i + 1)
  );

  const totalMandatory  = iupCourses.reduce((s, c) => s + c.credits, 0);

  const statItems = [
    { label: "Degree",       value: "B.Eng. (Hons)" },
    { label: "Duration",     value: "8 Semesters" },
    { label: "Total Credits",value: "144 SKS" },
    { label: "Language",     value: "English" },
    { label: "Accreditation",value: "ASIIN" },
  ];

  const features = [
    {
      title: "English-Medium Instruction",
      desc: "All core courses and examinations are conducted entirely in English, preparing graduates for global professional environments.",
    },
    {
      title: "International Partner Network",
      desc: "Access to double-degree programs, student exchanges, and joint research with 8 leading universities across 6 countries.",
    },
    {
      title: "Global Field Work",
      desc: "Geospatial expedition and field camp courses incorporate international collaboration and cross-border data acquisition.",
    },
    {
      title: "Research Exposure",
      desc: "IUP students are integrated into research groups alongside graduate students, with publication and conference opportunities.",
    },
  ];

  const admissionReqs = [
    "Indonesian or international high school graduate with strong mathematics and natural sciences record",
    "Minimum English proficiency: TOEFL iBT 80 / IELTS 6.0 (or equivalent)",
    "Pass ITB's international undergraduate selection test (English and Science)",
    "Interview conducted in English",
    "International applicants: additional document verification by ITB International Office",
  ];

  const doubleDegreePartners = partners.filter((p) => p.type === "double-degree");
  const exchangePartners     = partners.filter((p) => p.type === "exchange");
  const researchPartners     = partners.filter((p) => p.type === "joint-research");

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

      {/* ── Sticky sub-nav ─────────────────────────────────── */}
      <div
        style={{
          position: "sticky",
          top: "var(--header-h)",
          zIndex: 50,
          background: "var(--navy)",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div className="gd-container">
          <div
            style={{
              display: "flex",
              overflowX: "auto" as const,
              scrollbarWidth: "none" as const,
            }}
          >
            {SUB_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => scrollTo(tab.id)}
                style={{
                  flexShrink: 0,
                  fontFamily: "Inter, sans-serif",
                  fontSize: "13px",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase" as const,
                  color: activeTab === tab.id ? "var(--white)" : "rgba(255,255,255,0.6)",
                  padding: "16px 24px",
                  background: "none",
                  border: "none",
                  borderBottom:
                    activeTab === tab.id
                      ? "3px solid var(--orange)"
                      : "3px solid transparent",
                  cursor: "pointer",
                  transition: "color 0.2s, border-color 0.2s",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          OVERVIEW
      ══════════════════════════════════════════════════════ */}
      <section id="iup-overview" className="gd-page-section">
        <div className="gd-container">
          <p className="gd-section-kicker">Program Overview</p>
          <h2 className="gd-section-title">International Undergraduate Program (IUP)</h2>
          <div className="gd-section-divider" />

          {/* Stats strip */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
              gap: "1px",
              background: "var(--gray-200)",
              border: "1px solid var(--gray-200)",
              marginBottom: "48px",
            }}
          >
            {statItems.map((item) => (
              <div
                key={item.label}
                style={{
                  background: "var(--white)",
                  padding: "24px 16px",
                  textAlign: "center",
                }}
              >
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "17px",
                    fontWeight: 700,
                    color: "var(--blue)",
                    display: "block",
                    marginBottom: "5px",
                    lineHeight: 1.2,
                  }}
                >
                  {item.value}
                </span>
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase" as const,
                    color: "var(--gray-400)",
                  }}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          {/* Description + features */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "48px",
              marginBottom: "48px",
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "15px",
                  lineHeight: 1.8,
                  color: "var(--gray-600)",
                  marginBottom: "16px",
                }}
              >
                The <strong>International Undergraduate Program (IUP)</strong> in
                Geodesy and Geomatics offers a fully English-medium pathway leading
                to the degree of <strong>Bachelor of Engineering (Honours) — B.Eng.</strong>
              </p>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "15px",
                  lineHeight: 1.8,
                  color: "var(--gray-600)",
                  marginBottom: "16px",
                }}
              >
                The program spans <strong>8 semesters (4 years)</strong> and
                comprises <strong>144 credits</strong>. IUP students follow the
                same rigorous geodesy curriculum as the S1 program, taught
                entirely in English by faculty with international academic
                backgrounds, and benefit from a network of partner universities
                across Europe, Asia-Pacific, and beyond.
              </p>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "15px",
                  lineHeight: 1.8,
                  color: "var(--gray-600)",
                }}
              >
                Eligible students may pursue a <strong>double-degree</strong>{" "}
                arrangement with select partner universities, completing
                additional requirements to obtain two bachelor's degrees.
              </p>
            </div>

            <div>
              {features.map((item, i) => (
                <div
                  key={item.title}
                  style={{
                    display: "flex",
                    gap: "16px",
                    alignItems: "flex-start",
                    padding: "16px 0",
                    borderBottom: i < features.length - 1 ? "1px solid var(--gray-200)" : "none",
                  }}
                >
                  <div
                    style={{
                      flexShrink: 0,
                      width: "32px",
                      height: "32px",
                      background: "var(--orange)",
                      color: "#fff",
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      fontWeight: 700,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: "2px",
                    }}
                  >
                    {i + 1}
                  </div>
                  <div>
                    <strong
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "14px",
                        fontWeight: 700,
                        color: "var(--navy)",
                        display: "block",
                        marginBottom: "4px",
                      }}
                    >
                      {item.title}
                    </strong>
                    <p
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "13px",
                        lineHeight: 1.65,
                        color: "var(--gray-600)",
                      }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Partner universities section */}
          <div
            style={{
              background: "var(--off-white)",
              border: "1px solid var(--gray-200)",
              padding: "32px",
              marginTop: "8px",
            }}
          >
            <p className="gd-section-kicker">International Partnerships</p>
            <h3
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "20px",
                fontWeight: 700,
                color: "var(--navy)",
                marginBottom: "8px",
              }}
            >
              Partner Universities
            </h3>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "13px",
                color: "var(--gray-600)",
                lineHeight: 1.65,
                marginBottom: "24px",
                maxWidth: "640px",
              }}
            >
              IUP maintains formal agreements with leading geodesy and geomatics
              institutions worldwide across three categories of collaboration.
            </p>

            {/* Legend */}
            <div
              style={{ display: "flex", gap: "20px", flexWrap: "wrap" as const, marginBottom: "20px" }}
            >
              {(["double-degree", "exchange", "joint-research"] as Partner["type"][]).map((t) => (
                <div
                  key={t}
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <div
                    style={{
                      width: "12px",
                      height: "12px",
                      background: typeColor[t],
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "var(--gray-600)",
                    }}
                  >
                    {typeLabel[t]}
                  </span>
                </div>
              ))}
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: "12px",
              }}
            >
              {partners.map((p) => (
                <PartnerCard key={p.name} partner={p} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CURRICULUM
      ══════════════════════════════════════════════════════ */}
      <section id="iup-curriculum" className="gd-page-section-alt">
        <div className="gd-container">

          {/* Info note */}
          <div
            style={{
              background: "var(--blue-pale)",
              border: "1px solid rgba(0,90,171,0.2)",
              borderLeft: "4px solid var(--blue)",
              padding: "14px 20px",
              marginBottom: "32px",
              display: "flex",
              gap: "12px",
              alignItems: "flex-start",
            }}
          >
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              style={{ width: "18px", height: "18px", color: "var(--blue)", flexShrink: 0, marginTop: "1px" }}
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "13px",
                lineHeight: 1.65,
                color: "var(--navy)",
                margin: 0,
              }}
            >
              The IUP curriculum mirrors the S1 curriculum in content and structure, but all
              instruction, coursework, and examinations are conducted in <strong>English</strong>.
              The total program consists of <strong>{totalMandatory} mandatory credits</strong>{" "}
              plus a minimum of <strong>25 elective credits</strong>.
            </p>
          </div>

          <p className="gd-section-kicker">Mandatory Courses</p>
          <h2 className="gd-section-title">Curriculum by Semester</h2>
          <div className="gd-section-divider" />

          <div
            style={{
              display: "flex",
              flexDirection: "column" as const,
              gap: "0px",
              marginBottom: "64px",
            }}
          >
            {bySemester.map((courses, si) =>
              courses.length === 0 ? null : (
                <SemesterRow key={si} semester={si + 1} courses={courses} />
              )
            )}
          </div>

          {/* Electives */}
          <p className="gd-section-kicker">Elective Courses</p>
          <h2
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "clamp(22px, 2.5vw, 30px)",
              fontWeight: 700,
              color: "var(--navy)",
              lineHeight: 1.15,
            }}
          >
            IUP Elective Offerings
          </h2>
          <div className="gd-section-divider" />

          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "14px",
              lineHeight: 1.7,
              color: "var(--gray-600)",
              marginBottom: "20px",
              maxWidth: "680px",
            }}
          >
            IUP students select a minimum of <strong>25 elective credits</strong> from the
            offerings below, which correspond to the S1 specialization packages but are
            delivered in English with internationally-oriented content.
          </p>

          <div
            style={{
              border: "1px solid var(--gray-200)",
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "80px 1fr 80px",
                padding: "10px 20px",
                background: "var(--navy)",
                gap: "12px",
              }}
            >
              {["Code", "Course Name", "Credits"].map((h, i) => (
                <span
                  key={h}
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase" as const,
                    color: "rgba(255,255,255,0.7)",
                    textAlign: i === 2 ? "right" : "left",
                  }}
                >
                  {h}
                </span>
              ))}
            </div>
            {iupElectives.map((c, i) => (
              <div
                key={c.code}
                style={{
                  display: "grid",
                  gridTemplateColumns: "80px 1fr 80px",
                  alignItems: "center",
                  padding: "13px 20px",
                  gap: "12px",
                  borderBottom: i < iupElectives.length - 1 ? "1px solid var(--gray-100)" : "none",
                  background: i % 2 === 0 ? "var(--white)" : "var(--off-white)",
                }}
              >
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    color: "var(--orange)",
                  }}
                >
                  {c.code}
                </span>
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "14px",
                    color: "var(--navy)",
                  }}
                >
                  {c.name}
                </span>
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "var(--gray-400)",
                    textAlign: "right" as const,
                  }}
                >
                  {c.credits} cr
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          ADMISSION
      ══════════════════════════════════════════════════════ */}
      <section id="iup-admission" className="gd-page-section">
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
            {/* Left: requirements */}
            <div>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "15px",
                  lineHeight: 1.8,
                  color: "var(--gray-600)",
                  marginBottom: "24px",
                }}
              >
                IUP admission is managed through a dedicated selection process for both
                domestic and international applicants. Admission is competitive and
                limited to a small cohort per year.
              </p>

              <div>
                {admissionReqs.map((req, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      gap: "14px",
                      alignItems: "flex-start",
                      padding: "14px 0",
                      borderBottom: i < admissionReqs.length - 1 ? "1px solid var(--gray-200)" : "none",
                    }}
                  >
                    <div
                      style={{
                        flexShrink: 0,
                        width: "24px",
                        height: "24px",
                        background: "var(--blue)",
                        color: "#fff",
                        fontFamily: "Inter, sans-serif",
                        fontSize: "12px",
                        fontWeight: 700,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: "1px",
                      }}
                    >
                      {i + 1}
                    </div>
                    <p
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "14px",
                        lineHeight: 1.7,
                        color: "var(--gray-600)",
                        margin: 0,
                      }}
                    >
                      {req}
                    </p>
                  </div>
                ))}
              </div>

              {/* Double degree note */}
              <div
                style={{
                  marginTop: "24px",
                  background: "var(--off-white)",
                  border: "1px solid var(--gray-200)",
                  borderLeft: "4px solid var(--navy)",
                  padding: "16px 20px",
                }}
              >
                <strong
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "var(--navy)",
                    display: "block",
                    marginBottom: "5px",
                  }}
                >
                  Double-Degree Pathway
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
                  Students with a minimum GPA of 3.25 and English proficiency of
                  TOEFL iBT 90 / IELTS 6.5 may apply for double-degree arrangements
                  with TU Delft, University of Melbourne, or Leibniz Hannover.
                  Application is made in Semester 4–5 via the IUP office.
                </p>
              </div>
            </div>

            {/* Right: CTA + tuition note */}
            <div>
              <div
                style={{
                  background: "var(--navy)",
                  padding: "40px",
                  position: "relative",
                  overflow: "hidden",
                  marginBottom: "16px",
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
                    Apply Now
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
                    Full information on selection schedules, required documents,
                    tuition fees, and the application portal is available at the
                    ITB International Admissions website.
                  </p>
                  <a
                    href="https://admission.itb.ac.id/iup"
                    target="_blank"
                    rel="noreferrer"
                    className="gd-btn gd-btn--primary"
                    style={{ display: "inline-flex" }}
                  >
                    IUP Admissions Portal
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      style={{ width: "14px", height: "14px" }}
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Tuition note */}
              <div
                style={{
                  padding: "16px 20px",
                  background: "var(--off-white)",
                  border: "1px solid var(--gray-200)",
                  borderLeft: "4px solid var(--orange)",
                  marginBottom: "12px",
                }}
              >
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "12px",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase" as const,
                    color: "var(--gray-400)",
                    marginBottom: "3px",
                  }}
                >
                  Tuition
                </p>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "13px",
                    color: "var(--navy)",
                    lineHeight: 1.55,
                  }}
                >
                  IUP tuition differs from the regular S1 program. Indonesian students
                  are subject to <strong>UKT IUP</strong> rates. International applicants
                  should refer to ITB's international student fee schedule.
                </p>
              </div>

              {/* Accreditation */}
              <div
                style={{
                  padding: "16px 20px",
                  background: "var(--off-white)",
                  border: "1px solid var(--gray-200)",
                  borderLeft: "4px solid var(--blue)",
                }}
              >
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "12px",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase" as const,
                    color: "var(--gray-400)",
                    marginBottom: "3px",
                  }}
                >
                  Accreditation
                </p>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "13px",
                    color: "var(--navy)",
                    lineHeight: 1.55,
                  }}
                >
                  Accredited by <strong>ASIIN</strong> (international) and{" "}
                  <strong>BAN-PT Unggul</strong> (national). The IUP degree is
                  recognized internationally by partner institutions.
                </p>
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