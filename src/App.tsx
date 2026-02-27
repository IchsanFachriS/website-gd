import "./styles/main.css";
import { useState } from "react";
import { Navbar } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { BannerSlider } from "./components/sections/BannerSlider";
import { WhatIsSection } from "./components/sections/WhatIs";
import { HistorySection } from "./components/sections/History";

// ── Profile pages ──────────────────────────────────────────────
import {
  WhatIsGeodesyPage,
  OurHistoryPage,
  VisionMissionPage,
} from "./components/pages/profile";

// ── Academics pages ────────────────────────────────────────────
import { AcademicsPage, UndergraduatePage } from "./components/pages/academics";

// ── Other section pages ────────────────────────────────────────
import { ResearchPage }       from "./components/pages/research/ResearchPage";
import { StudentAffairsPage } from "./components/pages/student-affairs/StudentAffairsPage";
import { ContactPage }        from "./components/pages/contact/ContactPage";

// ── Shared primitives ──────────────────────────────────────────
import { GenericPage } from "./components/pages/_shared/GenericPage";

// ── Home page ──────────────────────────────────────────────────
function HomePage() {
  return (
    <main id="main-content">
      <BannerSlider />
      <WhatIsSection />
      <HistorySection />
      {/* <NewsSection /> */}
    </main>
  );
}

// ── Page Router ────────────────────────────────────────────────
function PageRouter({
  page,
  onNavigate,
}: {
  page: string;
  onNavigate: (page: string) => void;
}) {
  switch (page) {
    // ── Home ──
    case "home":
      return <HomePage />;

    // ── Profile ──
    case "profile":
      return <HomePage />;

    case "what-is-geodesy-&-geomatics":
    case "what-is-geodesy-geomatics":
    case "what-is-geodesy-&-geomatics?":
    case "what-is-geodesy":
      return <WhatIsGeodesyPage onNavigate={onNavigate} />;

    case "our-history":
      return <OurHistoryPage onNavigate={onNavigate} />;

    case "vision-&-mission":
    case "vision-mission":
      return <VisionMissionPage onNavigate={onNavigate} />;

    // ── Academics ──
    case "academics":
      return <AcademicsPage onNavigate={onNavigate} />;

    case "undergraduate-program-(s1)":
    case "undergraduate-program-s1":
    case "undergraduate-s1":
      return <UndergraduatePage onNavigate={onNavigate} />;

    case "master-program-(s2)":
    case "master-program-s2":
    case "master-s2":
      return (
        <GenericPage
          title="Master Program (S2)"
          parent="Academics"
          onNavigate={onNavigate}
        />
      );

    case "doctoral-program-(s3)":
    case "doctoral-program-s3":
    case "doctoral-s3":
      return (
        <GenericPage
          title="Doctoral Program (S3)"
          parent="Academics"
          onNavigate={onNavigate}
        />
      );

    case "professional-program":
    case "professional":
      return (
        <GenericPage
          title="Professional Program"
          parent="Academics"
          onNavigate={onNavigate}
        />
      );

    case "curriculum":
      return (
        <GenericPage
          title="Curriculum"
          parent="Academics"
          onNavigate={onNavigate}
        />
      );

    case "academic-calendar":
      return (
        <GenericPage
          title="Academic Calendar"
          parent="Academics"
          onNavigate={onNavigate}
        />
      );

    // ── Research ──
    case "research":
      return <ResearchPage onNavigate={onNavigate} />;

    case "research-groups":
      return (
        <GenericPage
          title="Research Groups"
          parent="Research"
          onNavigate={onNavigate}
        />
      );

    case "community-services":
      return (
        <GenericPage
          title="Community Services"
          parent="Research"
          onNavigate={onNavigate}
        />
      );

    case "publications":
      return (
        <GenericPage
          title="Publications"
          parent="Research"
          onNavigate={onNavigate}
        />
      );

    case "laboratories":
      return (
        <GenericPage
          title="Laboratories"
          parent="Research"
          onNavigate={onNavigate}
        />
      );

    case "collaboration":
      return (
        <GenericPage
          title="Collaboration"
          parent="Research"
          onNavigate={onNavigate}
        />
      );

    // ── Student Affairs ──
    case "student-affairs":
      return <StudentAffairsPage onNavigate={onNavigate} />;

    case "student-organizations":
      return (
        <GenericPage
          title="Student Organizations"
          parent="Student Affairs"
          onNavigate={onNavigate}
        />
      );

    case "scholarships":
      return (
        <GenericPage
          title="Scholarships"
          parent="Student Affairs"
          onNavigate={onNavigate}
        />
      );

    case "student-achievements":
    case "students-achievements":
      return (
        <GenericPage
          title="Student Achievements"
          parent="Student Affairs"
          onNavigate={onNavigate}
        />
      );

    case "student-activities":
    case "students-activities":
      return (
        <GenericPage
          title="Student Activities"
          parent="Student Affairs"
          onNavigate={onNavigate}
        />
      );

    case "student-data":
    case "students-data":
      return (
        <GenericPage
          title="Student Data"
          parent="Student Affairs"
          onNavigate={onNavigate}
        />
      );

    case "announcements":
      return (
        <GenericPage
          title="Announcements"
          parent="Student Affairs"
          onNavigate={onNavigate}
        />
      );

    case "career-&-alumni":
    case "career-alumni":
      return (
        <GenericPage
          title="Career & Alumni"
          parent="Student Affairs"
          onNavigate={onNavigate}
        />
      );

    case "student-facilities":
      return (
        <GenericPage
          title="Student Facilities"
          parent="Student Affairs"
          onNavigate={onNavigate}
        />
      );

    // ── Contact ──
    case "contact-us":
    case "contact":
      return <ContactPage onNavigate={onNavigate} />;

    // ── Fallback ──
    default:
      return <HomePage />;
  }
}

// ── App ────────────────────────────────────────────────────────
export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Skip to main content */}
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

      {/* Navbar reads URL on mount and calls onNavigate to restore state */}
      <Navbar onNavigate={handleNavigate} />

      <div className="gd-page-offset">
        <PageRouter page={currentPage} onNavigate={handleNavigate} />
        <Footer onNavigate={handleNavigate} />
      </div>
    </>
  );
}