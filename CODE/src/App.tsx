import "./styles/main.css";
import { Topbar, Navbar } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { BannerSlider } from "./components/sections/BannerSlider";
import { WhatIsSection } from "./components/sections/WhatIs";
import { HistorySection } from "./components/sections/History";
import { NewsSection } from "./components/sections/News";
import {
  AcademicsSection,
  ResearchSection,
  StudentAffairsSection,
  ContactSection,
} from "./components/sections/Placeholders";

export default function App() {
  return (
    <>
      {/* Skip to main */}
      <a
        href="#main-content"
        style={{
          position: "absolute",
          left: "-9999px",
          top: "auto",
          width: "1px",
          height: "1px",
          overflow: "hidden",
        }}
        onFocus={(e) => {
          (e.target as HTMLAnchorElement).style.cssText =
            "position:fixed;top:0;left:0;z-index:9999;padding:12px 24px;background:var(--gold);color:white;font-family:var(--font-display);font-weight:700;letter-spacing:0.08em;text-transform:uppercase;font-size:13px";
        }}
        onBlur={(e) => {
          (e.target as HTMLAnchorElement).style.cssText =
            "position:absolute;left:-9999px;top:auto;width:1px;height:1px;overflow:hidden";
        }}
      >
        Skip to main content
      </a>

      {/* Top auxiliary bar */}
      <Topbar />

      {/* Main sticky header */}
      <Navbar />

      {/* Push content below fixed header */}
      <div style={{ paddingTop: "109px" }}>
        <main id="main-content">
          {/* ── PROFILE ───────────────────────── */}
          {/* 1. Hero Slideshow */}
          <BannerSlider />

          {/* 2. What is Geodesy & Geomatics */}
          <WhatIsSection />

          {/* 3. Our History */}
          <HistorySection />

          {/* 4. News (Instagram) */}
          <NewsSection />

          {/* ── OTHER MENU SECTIONS (placeholders) ── */}
          <AcademicsSection />
          <ResearchSection />
          <StudentAffairsSection />
          <ContactSection />
        </main>

        <Footer />
      </div>
    </>
  );
}
