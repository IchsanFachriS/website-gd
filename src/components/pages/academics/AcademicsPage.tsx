// ============================================================
// academics/AcademicsPage.tsx
// Scientific-Editorial redesign — Nature/NatGeo meets precision engineering
// ============================================================
import { useState, useEffect, useRef } from "react";
import { Breadcrumb, PageHero } from "../_shared/PageShell";
import type { PageProps } from "../_shared/PageShell";

// ── Scroll-triggered reveal hook ──────────────────────────────
function useReveal(threshold = 0.1) {
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
  style: ext = {},
}: {
  children: React.ReactNode;
  delay?: number;
  dir?: "up" | "left" | "right" | "none";
  style?: React.CSSProperties;
}) {
  const { ref, on } = useReveal();
  const from =
    dir === "left" ? "translateX(-40px)" :
    dir === "right" ? "translateX(40px)" :
    dir === "none" ? "none" :
    "translateY(36px)";
  return (
    <div
      ref={ref}
      style={{
        opacity: on ? 1 : 0,
        transform: on ? "translate(0,0)" : from,
        transition: `opacity 0.8s ease ${delay}ms, transform 0.9s cubic-bezier(.16,1,.3,1) ${delay}ms`,
        ...ext,
      }}
    >
      {children}
    </div>
  );
}

// ── Data ─────────────────────────────────────────────────────
const programs = [
  {
    level: "S1",
    abbr: "Undergraduate",
    name: "Bachelor of Geodesy and Geomatics Engineering",
    subtitle: "Program Sarjana Teknik",
    duration: "4 Years",
    credits: "144 SKS",
    desc: "A rigorous four-year program spanning geodesy, cartography, photogrammetry, remote sensing, and geographic information systems. Graduates are equipped to serve government agencies, private industry, and research institutions.",
    image: "https://images.unsplash.com/photo-1620121692029-d088224ddc74?w=1400&q=90",
    accent: "var(--orange)",
    page: "undergraduate-program-s1",
    stat: "3,000+",
    statLabel: "Alumni",
  },
  {
    level: "S2",
    abbr: "Graduate",
    name: "Master of Geodesy and Geomatics Engineering",
    subtitle: "Program Magister Teknik",
    duration: "2 Years",
    credits: "36 SKS",
    desc: "An advanced research-oriented master's program. Students develop deep expertise in chosen specializations and conduct original research that contributes to Indonesia's spatial data infrastructure.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&q=90",
    accent: "var(--blue)",
    page: "graduate-program-s2",
    stat: "ASIIN",
    statLabel: "International Accred.",
  },
  {
    level: "S3",
    abbr: "Doctoral",
    name: "Doctor of Geodesy and Geomatics Engineering",
    subtitle: "Program Doktor",
    duration: "3–5 Years",
    credits: "48 SKS",
    desc: "A research-intensive doctoral program producing scholars who contribute original knowledge to geodesy and geomatics. Graduates pursue careers in academia, government research bodies, and international institutions.",
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1400&q=90",
    accent: "var(--navy)",
    page: "doctoral-program-s3",
    stat: "4",
    statLabel: "Research Groups",
  },
];

const specializations = [
  {
    title: "Physical Geodesy & GNSS",
    body: "Satellite positioning, Earth's gravity field modeling, geodetic datum realization, and deformation monitoring via continuous GNSS networks.",
    img: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=900&q=85",
  },
  {
    title: "Photogrammetry & Remote Sensing",
    body: "Aerial and UAV photogrammetry, LiDAR point clouds, multispectral and hyperspectral satellite imagery analysis, and land-use classification.",
    img: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=900&q=85",
  },
  {
    title: "Geographic Information Systems",
    body: "Spatial databases, web GIS architecture, spatial decision support systems, and digital twin urban modeling.",
    img: "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=900&q=85",
  },
  {
    title: "Cadastral & Land Surveying",
    body: "Land registration systems, boundary surveys, 3D cadastre infrastructure, and property rights administration.",
    img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&q=85",
  },
  {
    title: "Hydrography & Marine Geodesy",
    body: "Bathymetric surveys, maritime boundary delimitation, tidal analysis, coastal zone management, and seafloor mapping.",
    img: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=900&q=85",
  },
  {
    title: "Cartography & Visualization",
    body: "Thematic map design, spatial data visualization, atlas production, and interactive web cartography.",
    img: "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=900&q=85",
  },
];

// ── Page ─────────────────────────────────────────────────────
export function AcademicsPage({ onNavigate }: PageProps) {
  const [hovSpec, setHovSpec] = useState<number | null>(null);
  const [activeProgram, setActiveProgram] = useState(0);

  return (
    <main id="main-content" style={{ fontFamily: "'Inter', sans-serif", background: "#fff" }}>

      {/* Injected styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

        .acad-root { --easing: cubic-bezier(.16,1,.3,1); }

        /* ── HERO ── */
        .acad-hero {
          position: relative;
          min-height: calc(100vh - var(--header-h, 116px));
          background: var(--navy);
          overflow: hidden;
          display: grid;
          grid-template-columns: 1fr 1fr;
        }
        .acad-hero-left {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 80px 64px 80px 72px;
        }
        .acad-hero-right {
          position: relative;
          overflow: hidden;
        }
        .acad-hero-right img {
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
          filter: saturate(0.8) brightness(0.85);
        }
        .acad-hero-right::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, rgba(17,27,54,0.7) 0%, transparent 40%);
        }
        .acad-hero-rule {
          width: 48px; height: 2px;
          background: var(--orange);
          margin-bottom: 28px;
          animation: acad-rule-in 0.9s var(--easing, ease) 0.1s both;
        }
        @keyframes acad-rule-in { from { width: 0; opacity: 0; } to { width: 48px; opacity: 1; } }
        .acad-hero-kicker {
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--orange);
          margin-bottom: 16px;
          opacity: 0;
          animation: acad-fade-up 0.7s ease 0.2s both;
        }
        .acad-hero-title {
          font-family: 'Inter', sans-serif;
          font-size: clamp(40px, 5.5vw, 72px);
          font-weight: 800;
          color: #fff;
          line-height: 1.0;
          letter-spacing: -0.03em;
          margin-bottom: 28px;
          opacity: 0;
          animation: acad-fade-up 0.8s ease 0.35s both;
        }
        .acad-hero-title em {
          font-style: normal;
          color: rgba(255,255,255,0.45);
          font-weight: 300;
        }
        .acad-hero-body {
          font-family: 'Inter', sans-serif;
          font-size: 15px;
          line-height: 1.8;
          color: rgba(255,255,255,0.6);
          max-width: 420px;
          margin-bottom: 0;
          opacity: 0;
          animation: acad-fade-up 0.8s ease 0.5s both;
        }
        @keyframes acad-fade-up {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        /* grid overlay on hero bg */
        .acad-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 48px 48px;
          z-index: 1;
          pointer-events: none;
        }

        /* ── PROGRAM SELECTOR ── */
        .acad-prog-section {
          background: #f8f6f2;
          padding: 0;
        }
        .acad-prog-tabs {
          display: flex;
          background: var(--navy-dark, #111b36);
          border-bottom: 1px solid rgba(255,255,255,0.07);
          overflow-x: auto;
          scrollbar-width: none;
        }
        .acad-prog-tabs::-webkit-scrollbar { display: none; }
        .acad-prog-tab {
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          padding: 20px 32px 18px;
          cursor: pointer;
          background: none;
          border: none;
          border-bottom: 3px solid transparent;
          transition: border-color 0.2s, background 0.2s;
          position: relative;
        }
        .acad-prog-tab.active { border-bottom-color: var(--orange); background: rgba(255,255,255,0.04); }
        .acad-prog-tab:hover:not(.active) { background: rgba(255,255,255,0.03); }
        .acad-prog-tab-level {
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          margin-bottom: 4px;
          text-align: left;
        }
        .acad-prog-tab.active .acad-prog-tab-level { color: var(--orange); }
        .acad-prog-tab-name {
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.04em;
          color: rgba(255,255,255,0.6);
          text-align: left;
        }
        .acad-prog-tab.active .acad-prog-tab-name { color: #fff; }

        /* ── PROGRAM PANEL ── */
        .acad-prog-panel {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 560px;
        }
        .acad-prog-img {
          position: relative;
          overflow: hidden;
        }
        .acad-prog-img img {
          width: 100%; height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.9s cubic-bezier(.16,1,.3,1);
        }
        .acad-prog-img:hover img { transform: scale(1.04); }
        .acad-prog-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(17,27,54,0.3) 0%, transparent 60%);
        }
        .acad-prog-level-badge {
          position: absolute;
          top: 28px;
          left: 28px;
          font-family: 'Inter', sans-serif;
          font-size: 80px;
          font-weight: 800;
          font-style: normal;
          color: rgba(255,255,255,0.12);
          line-height: 1;
          pointer-events: none;
          user-select: none;
        }
        .acad-prog-content {
          background: #fff;
          padding: 64px 60px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          border-left: 4px solid var(--orange);
        }
        .acad-prog-abbr {
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--orange);
          margin-bottom: 10px;
        }
        .acad-prog-title {
          font-family: 'Inter', sans-serif;
          font-size: clamp(24px, 3vw, 36px);
          font-weight: 700;
          color: var(--navy);
          line-height: 1.15;
          margin-bottom: 6px;
        }
        .acad-prog-subtitle {
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 400;
          font-style: italic;
          color: rgba(26,40,77,0.5);
          margin-bottom: 28px;
        }
        .acad-prog-rule {
          width: 36px; height: 2px;
          background: var(--orange);
          margin-bottom: 24px;
        }
        .acad-prog-desc {
          font-family: 'Inter', sans-serif;
          font-size: 15px;
          line-height: 1.8;
          color: #5a5a5a;
          margin-bottom: 36px;
        }
        .acad-prog-meta {
          display: flex;
          gap: 32px;
          margin-bottom: 36px;
          padding: 20px 0;
          border-top: 1px solid #e8e8e8;
          border-bottom: 1px solid #e8e8e8;
        }
        .acad-prog-meta-item { display: flex; flex-direction: column; gap: 3px; }
        .acad-prog-meta-val {
          font-family: 'Inter', sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: var(--navy);
          letter-spacing: -0.01em;
        }
        .acad-prog-meta-lbl {
          font-family: 'Inter', sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #9a9a9a;
        }
        .acad-prog-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--navy);
          background: none;
          border: 2px solid var(--navy);
          padding: 12px 24px;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
          align-self: flex-start;
        }
        .acad-prog-cta:hover { background: var(--navy); color: #fff; }
        .acad-prog-cta svg { width: 14px; height: 14px; }

        /* ── SPECIALIZATIONS ── */
        .acad-spec-section {
          background: #f8f6f2;
          padding: 96px 0 0;
        }
        .acad-spec-header {
          padding: 0 80px 56px;
          max-width: 1200px;
          margin: 0 auto;
        }
        .acad-spec-header-grid {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 60px;
          align-items: end;
        }
        .acad-spec-section-num {
          font-family: 'Inter', sans-serif;
          font-size: 120px;
          font-weight: 800;
          font-style: normal;
          color: rgba(26,40,77,0.06);
          line-height: 0.85;
          user-select: none;
        }
        .acad-spec-kicker {
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--orange);
          margin-bottom: 10px;
        }
        .acad-spec-title {
          font-family: 'Inter', sans-serif;
          font-size: clamp(28px, 3.5vw, 44px);
          font-weight: 800;
          color: var(--navy);
          line-height: 1.05;
          letter-spacing: -0.01em;
          margin-bottom: 0;
        }
        .acad-spec-desc {
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          line-height: 1.8;
          color: #666;
          max-width: 400px;
          padding-left: 20px;
          border-left: 2px solid var(--orange);
        }
        /* masonry-ish: 3-col unequal grid */
        .acad-spec-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px;
          background: #e8e8e8;
          border-top: 2px solid #e8e8e8;
        }
        .acad-spec-card {
          position: relative;
          overflow: hidden;
          cursor: default;
        }
        /* tall cards for first row */
        .acad-spec-card:nth-child(1),
        .acad-spec-card:nth-child(2),
        .acad-spec-card:nth-child(3) { height: 360px; }
        .acad-spec-card:nth-child(4),
        .acad-spec-card:nth-child(5),
        .acad-spec-card:nth-child(6) { height: 300px; }
        .acad-spec-img {
          width: 100%; height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.9s cubic-bezier(.16,1,.3,1), filter 0.6s ease;
          filter: saturate(0.7) brightness(0.75);
        }
        .acad-spec-card:hover .acad-spec-img {
          transform: scale(1.06);
          filter: saturate(0.9) brightness(0.6);
        }
        .acad-spec-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(17,27,54,0.96) 0%, rgba(17,27,54,0.3) 55%, transparent 100%);
          transition: background 0.4s;
        }
        .acad-spec-card:hover .acad-spec-overlay {
          background: linear-gradient(to top, rgba(17,27,54,0.98) 0%, rgba(17,27,54,0.65) 65%, rgba(17,27,54,0.2) 100%);
        }
        .acad-spec-bar {
          position: absolute;
          bottom: 0; left: 0;
          height: 3px;
          width: 0;
          background: var(--orange);
          transition: width 0.55s cubic-bezier(.16,1,.3,1);
        }
        .acad-spec-card:hover .acad-spec-bar { width: 100%; }
        .acad-spec-text {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 20px 24px 28px;
        }
        .acad-spec-code {
          font-family: 'Inter', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--orange);
          display: block;
          margin-bottom: 6px;
        }
        .acad-spec-name {
          font-family: 'Inter', sans-serif;
          font-size: 16px;
          font-weight: 700;
          color: #fff;
          line-height: 1.25;
          margin-bottom: 0;
          display: block;
        }
        .acad-spec-body {
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          line-height: 1.65;
          color: rgba(255,255,255,0.65);
          margin-top: 8px;
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.45s ease;
        }
        .acad-spec-card:hover .acad-spec-body { max-height: 80px; }

        /* ── ADMISSION CTA ── */
        .acad-cta-section {
          position: relative;
          overflow: hidden;
          background: var(--navy);
          padding: 96px 0;
        }
        .acad-cta-bg {
          position: absolute;
          inset: 0;
          object-fit: cover;
          width: 100%; height: 100%;
          opacity: 0.08;
          filter: grayscale(1);
        }
        .acad-cta-accent {
          position: absolute;
          top: 0; bottom: 0;
          left: 42%;
          width: 2px;
          background: var(--orange);
          transform: skewX(-6deg);
          opacity: 0.4;
        }
        .acad-cta-inner {
          position: relative;
          z-index: 2;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 80px;
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 80px;
          align-items: center;
        }
        .acad-cta-kicker {
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--orange);
          margin-bottom: 14px;
        }
        .acad-cta-title {
          font-family: 'Inter', sans-serif;
          font-size: clamp(24px, 3vw, 40px);
          font-weight: 800;
          color: #fff;
          line-height: 1.15;
          letter-spacing: -0.01em;
          margin-bottom: 16px;
        }
        .acad-cta-body {
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          line-height: 1.8;
          color: rgba(255,255,255,0.5);
          max-width: 480px;
        }
        .acad-cta-btns {
          display: flex;
          flex-direction: column;
          gap: 12px;
          min-width: 200px;
        }
        .acad-cta-btn-primary {
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          background: var(--orange);
          color: #fff;
          border: none;
          padding: 16px 28px;
          cursor: pointer;
          transition: background 0.2s;
          text-align: center;
          text-decoration: none;
          display: block;
        }
        .acad-cta-btn-primary:hover { background: #e04500; }
        .acad-cta-btn-secondary {
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          background: transparent;
          color: rgba(255,255,255,0.5);
          border: 1px solid rgba(255,255,255,0.2);
          padding: 16px 28px;
          cursor: pointer;
          transition: color 0.2s, border-color 0.2s;
          text-align: center;
        }
        .acad-cta-btn-secondary:hover { color: #fff; border-color: rgba(255,255,255,0.6); }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) {
          .acad-hero { grid-template-columns: 1fr; }
          .acad-hero-right { display: none; }
          .acad-hero-left { padding: 64px 40px; }
          .acad-prog-panel { grid-template-columns: 1fr; }
          .acad-prog-img { height: 320px; }
          .acad-prog-content { padding: 48px 40px; border-left: none; border-top: 4px solid var(--orange); }
          .acad-accred-grid { grid-template-columns: repeat(3, 1fr); }
          .acad-spec-header { padding: 0 40px 48px; }
          .acad-spec-header-grid { grid-template-columns: 1fr; gap: 20px; }
          .acad-spec-section-num { display: none; }
          .acad-spec-grid { grid-template-columns: 1fr 1fr; }
          .acad-spec-card:nth-child(n) { height: 280px; }
          .acad-cta-inner { grid-template-columns: 1fr; gap: 40px; padding: 0 40px; }
        }
        @media (max-width: 640px) {
          .acad-hero-left { padding: 48px 24px; }
          .acad-prog-tab { padding: 16px 20px 14px; }
          .acad-prog-content { padding: 36px 24px; }
          .acad-accred-grid { grid-template-columns: repeat(2, 1fr); }
          .acad-spec-header { padding: 0 24px 40px; }
          .acad-spec-grid { grid-template-columns: 1fr; }
          .acad-spec-card:nth-child(n) { height: 260px; }
          .acad-cta-inner { padding: 0 24px; }
        }
      `}</style>

      <div className="acad-root">
        {/* ── BREADCRUMB ─────────────────────────────────────── */}
        <Breadcrumb items={[{ label: "Academics", page: "academics" }]} onNavigate={onNavigate} />

        {/* ════════════════════════════════════════════════════
            HERO
        ════════════════════════════════════════════════════ */}
        <section className="acad-hero">
          <div className="acad-hero-left">
            <div className="acad-hero-rule" />
            <div className="acad-hero-kicker">Faculty of Earth Sciences & Technology — FITB ITB</div>
            <h1 className="acad-hero-title">
              Academic<br />
              <em>Programs of</em><br />
              Study
            </h1>
            <p className="acad-hero-body">
              World-class geodesy and geomatics education at undergraduate,
              graduate, and doctoral levels. Internationally accredited,
              research-driven, industry-connected.
            </p>
          </div>
          <div className="acad-hero-right">
            <img
              src="https://images.unsplash.com/photo-1636207543865-acf3ad382295?w=1400&q=90"
              alt="Geodesy student working with precision instruments"
            />
          </div>
        </section>

        {/* ════════════════════════════════════════════════════
            PROGRAM SELECTOR
        ════════════════════════════════════════════════════ */}
        <section className="acad-prog-section">
          {/* Tab nav */}
          <div className="acad-prog-tabs">
            {programs.map((p, i) => (
              <button
                key={p.level}
                className={`acad-prog-tab${activeProgram === i ? " active" : ""}`}
                onClick={() => setActiveProgram(i)}
              >
                <span className="acad-prog-tab-level">{p.level} — {p.abbr}</span>
                <span className="acad-prog-tab-name">{p.name}</span>
              </button>
            ))}
          </div>

          {/* Panel */}
          {programs.map((p, i) => (
            <div
              key={p.level}
              className="acad-prog-panel"
              style={{ display: activeProgram === i ? "grid" : "none" }}
            >
              <div className="acad-prog-img">
                <img src={p.image} alt={p.name} />
                <div className="acad-prog-img-overlay" />
                <div className="acad-prog-level-badge">{p.level}</div>
              </div>
              <div className="acad-prog-content">
                <div className="acad-prog-abbr">{p.abbr} Program — {p.level}</div>
                <h2 className="acad-prog-title">{p.name}</h2>
                <div className="acad-prog-subtitle">{p.subtitle}</div>
                <div className="acad-prog-rule" />
                <p className="acad-prog-desc">{p.desc}</p>
                <div className="acad-prog-meta">
                  <div className="acad-prog-meta-item">
                    <span className="acad-prog-meta-val">{p.duration}</span>
                    <span className="acad-prog-meta-lbl">Duration</span>
                  </div>
                  <div className="acad-prog-meta-item">
                    <span className="acad-prog-meta-val">{p.credits}</span>
                    <span className="acad-prog-meta-lbl">Credit Hours</span>
                  </div>
                </div>
                <button className="acad-prog-cta" onClick={() => onNavigate(p.page)}>
                  Program Details
                  <svg viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                </button>
              </div>
            </div>
          ))}
        </section>

        {/* ════════════════════════════════════════════════════
            SPECIALIZATIONS
        ════════════════════════════════════════════════════ */}
        <section className="acad-spec-section">
          <div className="acad-spec-header">
            <Reveal>
              <div className="acad-spec-header-grid">
                <div className="acad-spec-section-num">02</div>
                <div>
                  <p className="acad-spec-kicker">Fields of Expertise</p>
                  <h2 className="acad-spec-title">
                    Areas of<br />Specialization
                  </h2>
                </div>
                <div /> {/* empty for grid alignment on tablet */}
                <p className="acad-spec-desc">
                  Our programs span the complete geospatial sciences spectrum —
                  from sub-centimeter satellite positioning to maritime hydrography
                  and urban 3D modeling.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="acad-spec-grid">
            {specializations.map((spec, i) => (
              <div
                className="acad-spec-card"
                onMouseEnter={() => setHovSpec(i)}
                onMouseLeave={() => setHovSpec(null)}
              >
                <img className="acad-spec-img" src={spec.img} alt={spec.title} />
                <div className="acad-spec-overlay" />
                <div className="acad-spec-bar" />
                <div className="acad-spec-text">
                  <span className="acad-spec-name">{spec.title}</span>
                  <p className="acad-spec-body">{spec.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════════════════════════
            ADMISSION CTA
        ════════════════════════════════════════════════════ */}
        <section className="acad-cta-section">
          <img
            className="acad-cta-bg"
            src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1600&q=80"
            alt=""
            aria-hidden="true"
          />
          <div className="acad-cta-accent" />
          <div className="acad-cta-inner">
            <Reveal dir="left">
              <p className="acad-cta-kicker">Next Step</p>
              <h2 className="acad-cta-title">
                Begin Your Journey<br />
                <em style={{ fontStyle: "italic", fontWeight: 300, color: "rgba(255,255,255,0.5)" }}>
                  in Precision Earth Science
                </em>
              </h2>
              <p className="acad-cta-body">
                Join a seven-decade tradition of rigorous spatial science at Institut Teknologi Bandung.
                Explore admission requirements and apply via the official ITB portal.
              </p>
            </Reveal>
            <Reveal dir="right">
              <div className="acad-cta-btns">
                <a
                  href="https://admission.itb.ac.id"
                  target="_blank"
                  rel="noreferrer"
                  className="acad-cta-btn-primary"
                >
                  Apply to ITB
                </a>
                <button
                  className="acad-cta-btn-secondary"
                  onClick={() => onNavigate("contact-us")}
                >
                  Contact
                </button>
              </div>
            </Reveal>
          </div>
        </section>

      </div>
    </main>
  );
}