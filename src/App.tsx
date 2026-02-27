import "./styles/main.css";
import { useState } from "react";
import { Navbar } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { BannerSlider } from "./components/sections/BannerSlider";
import { WhatIsSection } from "./components/sections/WhatIs";
import { HistorySection } from "./components/sections/History";
import { NewsSection } from "./components/sections/News";
import {
  AcademicsPage,
  ResearchPage,
  StudentAffairsPage,
  ContactPage,
  GenericPage,
  WhatIsGeodesyPage,
  OurHistoryPage,
  VisionMissionPage,
  NewsPage,
} from "./components/pages/Pages";

// Home page — all sections
function HomePage() {
  return (
    <main id="main-content">
      <BannerSlider />
      <WhatIsSection />
      <HistorySection />
      <NewsSection />
    </main>
  );
}

// Map page keys to components
function PageRouter({
  page,
  onNavigate,
}: {
  page: string;
  onNavigate: (page: string) => void;
}) {
  switch (page) {
    case "home":
      return <HomePage />;

    // Profile submenu — each has its own dedicated page
    case "what-is-geodesy-&-geomatics?":
    case "what-is-geodesy-geomatics":
    case "what-is-geodesy-&-geomatics":
      return <WhatIsGeodesyPage onNavigate={onNavigate} />;
    case "our-history":
      return <OurHistoryPage onNavigate={onNavigate} />;
    case "vision-&-mission":
    case "vision-mission":
      return <VisionMissionPage onNavigate={onNavigate} />;
    case "news":
      return <NewsPage onNavigate={onNavigate} />;

    // Profile top-level — show home with all sections
    case "profile":
      return <HomePage />;

    // Academics
    case "academics":
      return <AcademicsPage onNavigate={onNavigate} />;
    case "undergraduate-program-(s1)":
    case "undergraduate-program-s1":
      return <GenericPage title="Undergraduate Program (S1)" parent="Academics" onNavigate={onNavigate} />;
    case "graduate-program-(s2)":
    case "graduate-program-s2":
      return <GenericPage title="Graduate Program (S2)" parent="Academics" onNavigate={onNavigate} />;
    case "doctoral-program-(s3)":
    case "doctoral-program-s3":
      return <GenericPage title="Doctoral Program (S3)" parent="Academics" onNavigate={onNavigate} />;
    case "postgraduate-program-(s2-&-s3)":
    case "postgraduate-program-s2-s3":
      return <GenericPage title="Postgraduate Program (S2 & S3)" parent="Academics" onNavigate={onNavigate} />;
    case "professional-program":
      return <GenericPage title="Professional Program" parent="Academics" onNavigate={onNavigate} />;
    case "curriculum":
      return <GenericPage title="Curriculum" parent="Academics" onNavigate={onNavigate} />;
    case "academic-calendar":
      return <GenericPage title="Academic Calendar" parent="Academics" onNavigate={onNavigate} />;

    // Research
    case "research":
      return <ResearchPage onNavigate={onNavigate} />;
    case "research-groups":
      return <GenericPage title="Research Groups" parent="Research" onNavigate={onNavigate} />;
    case "publications":
      return <GenericPage title="Publications" parent="Research" onNavigate={onNavigate} />;
    case "laboratories":
      return <GenericPage title="Laboratories" parent="Research" onNavigate={onNavigate} />;
    case "collaboration":
      return <GenericPage title="Collaboration" parent="Research" onNavigate={onNavigate} />;

    // Student Affairs
    case "student-affairs":
      return <StudentAffairsPage onNavigate={onNavigate} />;
    case "student-organizations":
      return <GenericPage title="Student Organizations" parent="Student Affairs" onNavigate={onNavigate} />;
    case "scholarships":
      return <GenericPage title="Scholarships" parent="Student Affairs" onNavigate={onNavigate} />;
    case "career-&-alumni":
    case "career-alumni":
      return <GenericPage title="Career & Alumni" parent="Student Affairs" onNavigate={onNavigate} />;
    case "student-facilities":
      return <GenericPage title="Student Facilities" parent="Student Affairs" onNavigate={onNavigate} />;

    // Contact
    case "contact-us":
      return <ContactPage onNavigate={onNavigate} />;

    default:
      return <HomePage />;
  }
}

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
            "position:fixed;top:0;left:0;z-index:9999;padding:12px 24px;background:var(--orange);color:white;font-family:var(--font-display);font-weight:700;letter-spacing:0.08em;text-transform:uppercase;font-size:13px";
        }}
        onBlur={(e) => {
          (e.target as HTMLAnchorElement).style.cssText =
            "position:absolute;left:-9999px;top:auto;width:1px;height:1px;overflow:hidden";
        }}
      >
        Skip to main content
      </a>

      {/* Fixed header (topbar + navbar together) */}
      <Navbar onNavigate={handleNavigate} />

      {/* Push content below fixed header */}
      <div className="gd-page-offset">
        <PageRouter page={currentPage} onNavigate={handleNavigate} />
        <Footer onNavigate={handleNavigate} />
      </div>
    </>
  );
}