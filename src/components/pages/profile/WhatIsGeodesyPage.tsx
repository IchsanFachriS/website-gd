// ============================================================
// profile/WhatIsGeodesyPage.tsx
// Redesign: Scientific-Editorial — precision meets magazine
// ============================================================
import { useState, useEffect, useRef } from "react";
import { Breadcrumb } from "../_shared/PageShell";
import type { PageProps } from "../_shared/PageShell";

// ── Scroll-triggered fade-up ──────────────────────────────
function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, on };
}

function Reveal({
  children,
  delay = 0,
  dir = "up",
  style: extStyle = {},
}: {
  children: React.ReactNode;
  delay?: number;
  dir?: "up" | "left" | "right";
  style?: React.CSSProperties;
}) {
  const { ref, on } = useReveal();
  const from =
    dir === "left" ? "translateX(-32px)"
    : dir === "right" ? "translateX(32px)"
    : "translateY(32px)";
  return (
    <div
      ref={ref}
      style={{
        opacity: on ? 1 : 0,
        transform: on ? "translate(0,0)" : from,
        transition: `opacity 0.75s ease ${delay}ms, transform 0.75s cubic-bezier(.16,1,.3,1) ${delay}ms`,
        ...extStyle,
      }}
    >
      {children}
    </div>
  );
}

// ── Data ──────────────────────────────────────────────────
const STATS = [
  { value: "1950", label: "Established" },
  { value: "3,000+", label: "Alumni" },
  { value: "4", label: "Research Groups" },
  { value: "ASIIN", label: "Accreditation" },
];

const PILLARS = [
  {
    num: "01",
    title: "Geodesy",
    sub: "The Shape of Earth",
    body: "Geodesy is the scientific discipline that measures and represents the Earth’s shape, orientation in space, gravity field, and temporal variations. It underpins global navigation, mapping, land surveying, and Earth observation. The field integrates physics, mathematics, and engineering to define precise spatial reference systems essential for science and infrastructure worldwide.",
    img: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1400&q=90",
    accent: "#FD5308",
  },
  {
    num: "02",
    title: "Geomatics",
    sub: "Spatial Data at Scale",
    body: "Geomatics is the discipline of gathering, storing, processing, analyzing, managing, and presenting geographic or spatially referenced information. It integrates the acquisition, modeling, analysis, and management of spatial data through technologies such as satellite positioning, remote sensing, geographic information systems, and digital mapping.",
    img: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=1400&q=90",
    accent: "#1A52A0",
  },
];

const APPLICATIONS = [
  {
    title: "National Mapping & Cadastre",
    desc: "Authoritative spatial frameworks for land administration and topographic mapping.",
    img: "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=900&q=85",
  },
  {
    title: "Smart City & Urban Planning",
    desc: "3D city models, urban growth monitoring, and spatial decision support.",
    img: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=900&q=85",
  },
  {
    title: "Disaster Risk Management",
    desc: "Volcanic hazard mapping, flood modeling, and landslide terrain monitoring.",
    img: "https://images.unsplash.com/photo-1615631648086-325025c9e51e?w=900&q=85",
  },
  {
    title: "Maritime & Hydrography",
    desc: "Bathymetric surveys, maritime boundary delimitation, and coastal zone management.",
    img: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=900&q=85",
  },
  {
    title: "Oil, Gas & Mining",
    desc: "Sub-centimeter positioning for offshore platforms and resource extraction.",
    img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=900&q=85",
  },
  {
    title: "Autonomous Navigation",
    desc: "HD mapping and real-time positioning for autonomous vehicles and drones.",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85",
  },
];

// ── Page ──────────────────────────────────────────────────
export function WhatIsGeodesyPage({ onNavigate }: PageProps) {
  const [hovTech, setHovTech] = useState<number | null>(null);
  const [hovApp, setHovApp]   = useState<number | null>(null);
  const [pillActive, setPillActive] = useState(0);

  return (
    <main id="main-content" style={{ fontFamily: "'Georgia', 'Times New Roman', serif", background: "#fff" }}>

      {/* ── BREADCRUMB ─────────────────────────────────── */}
      <Breadcrumb
        items={[
          { label: "Profile", page: "profile" },
          { label: "What is Geodesy & Geomatics?", page: "" },
        ]}
        onNavigate={onNavigate}
      />

      {/* ════════════════════════════════════════════════
          HERO — split: text left (top-aligned), 1 photo right
          Responsive: stacks on mobile
      ════════════════════════════════════════════════ */}
      <style>{`
        .wiq-hero {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: calc(100vh - 120px);
          position: relative;
        }
        .wiq-hero-text {
          background: var(--navy);
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          padding: 72px 64px 64px;
          position: relative;
          overflow: hidden;
        }
        .wiq-hero-photo {
          position: relative;
          overflow: hidden;
        }
        .wiq-hero-photo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
        }
        .wiq-stats {
          display: flex;
          gap: 0;
          border-top: 1px solid rgba(255,255,255,0.1);
          padding-top: 28px;
          margin-top: auto;
        }
        /* Tablet */
        @media (max-width: 1024px) {
          .wiq-hero {
            grid-template-columns: 1fr;
            min-height: auto;
          }
          .wiq-hero-text {
            padding: 56px 40px 48px;
          }
          .wiq-hero-photo {
            height: 400px;
            order: -1;
          }
        }
        /* Mobile */
        @media (max-width: 640px) {
          .wiq-hero-text {
            padding: 40px 24px 40px;
          }
          .wiq-hero-photo {
            height: 280px;
          }
          .wiq-stats {
            flex-wrap: wrap;
            gap: 16px;
          }
          .wiq-stat-item {
            flex: 1 1 40% !important;
          }
        }
      `}</style>

      <section className="wiq-hero">
        {/* Left: text — top-aligned */}
        <div className="wiq-hero-text">
          {/* Decorative ruled lines */}
          {[0,1,2,3,4].map(i => (
            <div key={i} style={{
              position: "absolute", top: 0, left: `${10 + i * 18}%`,
              width: "1px", height: "100%",
              background: "rgba(255,255,255,0.035)",
              pointerEvents: "none",
            }} />
          ))}

          {/* Kicker */}
          <div style={{
            fontFamily: "var(--font-display)",
            fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em",
            textTransform: "uppercase", color: "var(--orange)",
            display: "flex", alignItems: "center", gap: "12px",
            marginBottom: "36px",
            opacity: 0, animation: "wiq-fadein 0.7s ease 0.1s forwards",
          }}>
            <span style={{ display: "block", width: "32px", height: "1px", background: "var(--orange)", flexShrink: 0 }} />
            Profile
          </div>

          {/* Title */}
          <h1 style={{
            fontFamily: "var(--font-display)", fontWeight: 800,
            fontSize: "clamp(34px, 4.5vw, 62px)", lineHeight: 1.06,
            color: "#fff", marginBottom: "28px", letterSpacing: "-0.02em",
            opacity: 0, animation: "wiq-fadein 0.7s ease 0.25s forwards",
          }}>
            What is<br />
            <em style={{ fontStyle: "italic", fontWeight: 400, color: "rgba(255,255,255,0.7)" }}>Geodesy &</em><br />
            Geomatics?
          </h1>

          {/* Lead */}
          <p style={{
            fontSize: "clamp(14px, 1.5vw, 17px)", lineHeight: 1.8, color: "rgba(255,255,255,0.58)",
            maxWidth: "420px", marginBottom: "48px",
            opacity: 0, animation: "wiq-fadein 0.7s ease 0.4s forwards",
          }}>
            Two intertwined sciences that measure, model, and make sense of our planet.
          </p>

          {/* Stat row — pushed to bottom via margin-top: auto */}
          <div
            className="wiq-stats"
            style={{ opacity: 0, animation: "wiq-fadein 0.7s ease 0.55s forwards" }}
          >
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className="wiq-stat-item"
                style={{
                  flex: 1,
                  paddingRight: "16px",
                  borderRight: i < STATS.length - 1 ? "1px solid rgba(255,255,255,0.1)" : "none",
                  marginRight: i < STATS.length - 1 ? "16px" : "0",
                }}
              >
                <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(18px, 2vw, 24px)", fontWeight: 700, color: "var(--orange)", lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "10px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.32)", marginTop: "5px" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: single full-bleed photo */}
        <div className="wiq-hero-photo">
          <img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=90"
            alt="Satellite view of Earth at night"
          />
          {/* Subtle left fade to blend with navy */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to right, rgba(17,27,54,0.25) 0%, transparent 30%)",
            pointerEvents: "none",
          }} />
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          RESPONSIVE CSS FOR ALL SECTIONS
      ════════════════════════════════════════════════ */}
      <style>{`
        /* ─ Section wrapper ─ */
        .wiq-section-pad { padding: 88px 80px; }
        .wiq-inner       { max-width: 1200px; margin: 0 auto; }

        /* ─ Disciplines header ─ */
        .wiq-disc-header { padding: 72px 80px 48px; border-bottom: 1px solid #e8e8e8; }
        .wiq-disc-header-grid { display: grid; grid-template-columns: auto 1fr; gap: 48px; align-items: end; max-width: 1200px; }
        .wiq-disc-tabnav { display: flex; border-bottom: 1px solid #e8e8e8; padding: 0 80px; overflow-x: auto; }
        .wiq-disc-panel  { display: grid; grid-template-columns: 1fr 1fr; }
        .wiq-disc-img    { overflow: hidden; min-height: 480px; position: relative; }
        .wiq-disc-img img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .wiq-disc-text   { padding: 64px 72px; background: #fff; display: flex; flex-direction: column; justify-content: center; }

        /* ─ Tech grid ─ */
        .wiq-tech-header { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: end; margin-bottom: 56px; }
        .wiq-tech-grid   { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.07); }

        /* ─ Applications ─ */
        .wiq-app-header  { display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 48px; }
        .wiq-app-feat-text { position: absolute; top: 0; bottom: 0; left: 0; width: 50%; display: flex; flex-direction: column; justify-content: center; padding: 0 72px; }
        .wiq-app-grid    { display: grid; grid-template-columns: repeat(5, 1fr); gap: 2px; background: #ddd; }

        /* ─ Quote section ─ */
        .wiq-quote-pad { padding: 88px 80px; }

        /* ─ CTA ─ */
        .wiq-cta-grid { display: grid; grid-template-columns: 1fr auto; align-items: center; gap: 80px; }

        /* ══ TABLET (≤ 1024px) ══ */
        @media (max-width: 1024px) {
          .wiq-section-pad  { padding: 64px 40px; }
          .wiq-disc-header  { padding: 56px 40px 40px; }
          .wiq-disc-header-grid { grid-template-columns: 1fr; gap: 24px; }
          .wiq-disc-tabnav  { padding: 0 40px; }
          .wiq-disc-panel   { grid-template-columns: 1fr; }
          .wiq-disc-img     { min-height: 340px; order: 0 !important; }
          .wiq-disc-text    { padding: 48px 40px; order: 1 !important; }
          .wiq-tech-header  { grid-template-columns: 1fr; gap: 20px; }
          .wiq-tech-grid    { grid-template-columns: repeat(2, 1fr); }
          .wiq-inner        { padding: 0 40px; }
          .wiq-app-header   { flex-direction: column; gap: 12px; align-items: flex-start; }
          .wiq-app-feat-text { width: 65%; padding: 0 40px; }
          .wiq-app-grid     { grid-template-columns: repeat(3, 1fr); }
          .wiq-quote-pad    { padding: 64px 40px; }
          .wiq-cta-grid     { grid-template-columns: 1fr; gap: 40px; }
        }

        /* ══ MOBILE (≤ 640px) ══ */
        @media (max-width: 640px) {
          .wiq-section-pad  { padding: 48px 20px; }
          .wiq-disc-header  { padding: 40px 20px 32px; }
          .wiq-disc-tabnav  { padding: 0 20px; }
          .wiq-disc-text    { padding: 36px 20px; }
          .wiq-tech-grid    { grid-template-columns: 1fr 1fr; }
          .wiq-inner        { padding: 0 20px; }
          .wiq-app-feat-text { width: 90%; padding: 0 24px; }
          .wiq-app-grid     { grid-template-columns: 1fr 1fr; }
          .wiq-quote-pad    { padding: 48px 20px; }
        }

        /* ══ SMALL MOBILE (≤ 420px) ══ */
        @media (max-width: 420px) {
          .wiq-tech-grid  { grid-template-columns: 1fr; }
          .wiq-app-grid   { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* ════════════════════════════════════════════════
          TWO DISCIPLINES
      ════════════════════════════════════════════════ */}
      <section style={{ background: "#fff" }}>
        <div className="wiq-disc-header">
          <Reveal>
            <div className="wiq-disc-header-grid">
              <div>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--orange)", marginBottom: "10px" }}>The Two Disciplines</p>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px, 3.5vw, 48px)", fontWeight: 800, color: "var(--navy)", lineHeight: 1.1, letterSpacing: "-0.02em", margin: 0 }}>
                  Science &<br />Engineering, United
                </h2>
              </div>
              <p style={{ fontSize: "clamp(14px, 1.5vw, 16px)", lineHeight: 1.8, color: "#666", paddingLeft: "24px", borderLeft: "3px solid var(--orange)" }}>
                Geodesy and Geomatics Engineering are complementary disciplines spanning the entire chain from raw Earth measurement to actionable spatial intelligence.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Tab nav */}
        <div className="wiq-disc-tabnav">
          {PILLARS.map((p, i) => (
            <button
              key={p.num}
              onClick={() => setPillActive(i)}
              style={{
                fontFamily: "var(--font-display)", fontSize: "13px", fontWeight: 700,
                letterSpacing: "0.08em", textTransform: "uppercase", whiteSpace: "nowrap",
                padding: "20px 28px 18px",
                color: pillActive === i ? "var(--navy)" : "#aaa",
                borderBottom: pillActive === i ? "3px solid var(--orange)" : "3px solid transparent",
                borderTop: "none", borderLeft: "none", borderRight: "none",
                background: "none", cursor: "pointer", transition: "color 0.2s",
              }}
            >
              <span style={{ color: "var(--orange)", marginRight: "8px", fontSize: "11px" }}>{p.num}</span>
              {p.title}
            </button>
          ))}
        </div>

        {/* Panels */}
        {PILLARS.map((p, i) => (
          <div key={p.num} className="wiq-disc-panel" style={{ display: pillActive === i ? "grid" : "none" }}>
            <div className="wiq-disc-img" style={{ order: i % 2 === 0 ? 0 : 1 }}>
              <img src={p.img} alt={p.title} />
              <div style={{ position: "absolute", top: "20px", right: "24px", fontFamily: "var(--font-display)", fontSize: "clamp(60px, 8vw, 120px)", fontWeight: 800, color: "rgba(255,255,255,0.1)", lineHeight: 1, pointerEvents: "none", fontStyle: "italic" }}>{p.num}</div>
            </div>
            <div className="wiq-disc-text" style={{ order: i % 2 === 0 ? 1 : 0 }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--orange)", marginBottom: "12px" }}>Discipline {p.num}</div>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px, 3vw, 40px)", fontWeight: 800, color: "var(--navy)", lineHeight: 1.1, marginBottom: "6px", letterSpacing: "-0.02em" }}>{p.title}</h2>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "15px", fontWeight: 400, fontStyle: "italic", color: "#888", marginBottom: "24px" }}>{p.sub}</h3>
              <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "24px" }}>
                <div style={{ width: "36px", height: "2px", background: "var(--orange)", flexShrink: 0 }} />
                <div style={{ flex: 1, height: "1px", background: "#e8e8e8" }} />
              </div>
              <p style={{ fontSize: "clamp(14px, 1.5vw, 16px)", lineHeight: 1.85, color: "#444" }}>{p.body}</p>
            </div>
          </div>
        ))}
      </section>

      {/* ════════════════════════════════════════════════
          APPLICATIONS
      ════════════════════════════════════════════════ */}
      <section style={{ background: "#f5f4f1", paddingTop: "80px", paddingBottom: 0 }}>
        <div className="wiq-inner" style={{ paddingBottom: 0 }}>
          <div className="wiq-section-pad" style={{ padding: "0 0 48px" }}>
            <Reveal>
              <div className="wiq-app-header">
                <div>
                  <p style={{ fontFamily: "var(--font-display)", fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--orange)", marginBottom: "10px" }}>Real-World Impact</p>
                  <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px, 3vw, 42px)", fontWeight: 800, color: "var(--navy)", lineHeight: 1.1, letterSpacing: "-0.02em", margin: 0 }}>Where It Matters</h2>
                </div>
                <p style={{ fontSize: "14px", color: "#888", maxWidth: "360px", lineHeight: 1.7 }}>
                  Geodesy and Geomatics Engineering serve virtually every sector of modern civilization on land, sea, air, and orbit.
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Featured full-width */}
        <Reveal>
          <div style={{ position: "relative", height: "clamp(280px, 40vw, 440px)", overflow: "hidden", marginBottom: "2px" }}>
            <img src={APPLICATIONS[0].img} alt={APPLICATIONS[0].title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(17,27,54,0.93) 0%, rgba(17,27,54,0.4) 55%, transparent 100%)" }} />
            <div className="wiq-app-feat-text">
              <div style={{ fontFamily: "var(--font-display)", fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--orange)", marginBottom: "12px" }}>01</div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(20px, 3vw, 34px)", fontWeight: 800, color: "#fff", lineHeight: 1.1, marginBottom: "12px", letterSpacing: "-0.02em" }}>{APPLICATIONS[0].title}</h3>
              <p style={{ fontSize: "clamp(13px, 1.4vw, 15px)", lineHeight: 1.75, color: "rgba(255,255,255,0.65)" }}>{APPLICATIONS[0].desc}</p>
            </div>
          </div>
        </Reveal>

        {/* 5-column grid */}
        <div className="wiq-app-grid">
          {APPLICATIONS.slice(1).map((app, i) => (
            <div
              key={app.title}
              style={{ position: "relative", overflow: "hidden", cursor: "default" }}
              onMouseEnter={() => setHovApp(i)}
              onMouseLeave={() => setHovApp(null)}
            >
              <div style={{ height: "clamp(200px, 25vw, 300px)", overflow: "hidden" }}>
                <img
                  src={app.img} alt={app.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", transform: hovApp === i ? "scale(1.07)" : "scale(1)", transition: "transform 0.65s cubic-bezier(.16,1,.3,1)" }}
                />
              </div>
              <div style={{ position: "absolute", inset: 0, background: hovApp === i ? "linear-gradient(to top, rgba(17,27,54,0.96) 0%, rgba(17,27,54,0.5) 55%, transparent 100%)" : "linear-gradient(to top, rgba(17,27,54,0.85) 0%, rgba(17,27,54,0.2) 60%, transparent 100%)", transition: "background 0.4s" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, height: "3px", width: hovApp === i ? "100%" : "0%", background: "var(--orange)", transition: "width 0.5s cubic-bezier(.16,1,.3,1)" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "16px 16px 20px" }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "10px", fontWeight: 700, letterSpacing: "0.15em", color: "var(--orange)", marginBottom: "5px" }}>{String(i + 2).padStart(2, "0")}</div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "14px", fontWeight: 700, color: "#fff", lineHeight: 1.3 }}>{app.title}</h3>
                <p style={{ fontSize: "12px", lineHeight: 1.6, color: "rgba(255,255,255,0.65)", maxHeight: hovApp === i ? "60px" : "0", overflow: "hidden", transition: "max-height 0.4s ease", marginTop: hovApp === i ? "6px" : "0" }}>{app.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          PULL QUOTE
      ════════════════════════════════════════════════ */}
      {/* <section style={{ background: "#fff" }} className="wiq-quote-pad">
        <Reveal>
          <div style={{ maxWidth: "860px", margin: "0 auto", textAlign: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "36px" }}>
              <div style={{ height: "1px", flex: 1, background: "#e0e0e0" }} />
              <div style={{ fontFamily: "var(--font-display)", fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--orange)", flexShrink: 0 }}>In Perspective</div>
              <div style={{ height: "1px", flex: 1, background: "#e0e0e0" }} />
            </div>
            <blockquote style={{ fontFamily: "'Georgia', serif", fontSize: "clamp(17px, 2.2vw, 28px)", fontStyle: "italic", lineHeight: 1.7, color: "var(--navy)", margin: 0 }}>
              "Without geodesy, every map is a guess. Without geomatics, every measurement remains an abstraction. Together, they transform raw data about our planet into the spatial intelligence that modern civilization depends upon."
            </blockquote>
            <div style={{ marginTop: "28px", fontFamily: "var(--font-display)", fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#aaa" }}>
              Department of Geodesy & Geomatics Engineering — ITB
            </div>
          </div>
        </Reveal>
      </section> */}

      {/* ════════════════════════════════════════════════
          CTA
      ════════════════════════════════════════════════ */}
      <section style={{ position: "relative", overflow: "hidden", background: "var(--navy)" }} className="wiq-section-pad">
        <div style={{ position: "absolute", top: 0, right: "35%", width: "2px", height: "100%", background: "var(--orange)", transform: "skewX(-8deg)", opacity: 0.5, pointerEvents: "none" }} />
        <div className="wiq-inner">
          <div className="wiq-cta-grid">
            <Reveal dir="left">
              <p style={{ fontFamily: "var(--font-display)", fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--orange)", marginBottom: "14px" }}>Next Step</p>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(22px, 3vw, 38px)", fontWeight: 800, color: "#fff", lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "14px" }}>
                Begin Your Journey in<br />Precision Earth Science
              </h2>
              <p style={{ fontSize: "clamp(13px, 1.4vw, 15px)", color: "rgba(255,255,255,0.5)", lineHeight: 1.75, maxWidth: "480px" }}>
                Explore academic programs from undergraduate to doctoral level, and join a seven-decade tradition of rigorous spatial science at ITB.
              </p>
            </Reveal>
            <Reveal dir="right">
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", minWidth: "180px" }}>
                <button onClick={() => onNavigate("academics")} style={{ fontFamily: "var(--font-display)", fontSize: "13px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", background: "var(--orange)", color: "#fff", border: "none", padding: "15px 28px", cursor: "pointer", transition: "background 0.2s" }} onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "#e04800"; }} onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "var(--orange)"; }}>
                  Explore Programs
                </button>
                <button onClick={() => onNavigate("our-history")} style={{ fontFamily: "var(--font-display)", fontSize: "13px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", background: "transparent", color: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.2)", padding: "15px 28px", cursor: "pointer", transition: "color 0.2s, border-color 0.2s" }} onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.color = "#fff"; b.style.borderColor = "rgba(255,255,255,0.6)"; }} onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.color = "rgba(255,255,255,0.55)"; b.style.borderColor = "rgba(255,255,255,0.2)"; }}>
                  Our History
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Keyframes ── */}
      <style>{`
        @keyframes wiq-fadein {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
}