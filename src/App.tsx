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
import { AcademicsPage, UndergraduatePage, InternationalUndergraduatePage } from "./components/pages/academics";
// ── Other section pages ────────────────────────────────────────
import { ResearchPage }       from "./components/pages/research/ResearchPage";
import { ResearchGroupsPage } from "./components/pages/research/ResearchGroupsPage";
import { StudentAffairsPage } from "./components/pages/student-affairs/StudentAffairsPage";
import { ContactPage }        from "./components/pages/contact/ContactPage";

// ── Shared primitives ──────────────────────────────────────────
import { GenericPage } from "./components/pages/_shared/GenericPage";
import { pageUrl } from "./utils/basePath";

// ── URL map: page key → URL path segment ─────────────────────
// Profile parent & children → root level (tanpa prefix "profile/")
// Semua menu lain → parent/child
const PAGE_URL_MAP: Record<string, string> = {
  // Home / Profile → root
  "home":                    "",
  "profile":                 "",

  // Profile children → langsung di root, tanpa prefix
  "what-is-geodesy":         "what-is-geodesy",
  "our-history":             "our-history",
  "vision-mission":          "vision-mission",
  "vision-&-mission":        "vision-mission",

  // Academics
  "academics":               "academics",
  "undergraduate-s1":        "academics/undergraduate-s1",
  "master-s2":               "academics/master-s2",
  "doctoral-s3":             "academics/doctoral-s3",
  "professional":            "academics/professional",
  "iup":                         "academics/iup",
  "international-undergraduate-program": "academics/iup",
  "international-undergraduate": "academics/iup",

  // Research
  "research":                "research",
  "research-groups":         "research/research-groups",
  "community-services":      "research/community-services",
  "publications":            "research/publications",
  "laboratories":            "research/laboratories",
  "collaboration":           "research/collaboration",

  // Student Affairs
  "student-affairs":         "student-affairs",
  "student-organizations":   "student-affairs/student-organizations",
  "scholarships":            "student-affairs/scholarships",
  "student-achievements":    "student-affairs/student-achievements",
  "students-achievements":   "student-affairs/student-achievements",
  "student-activities":      "student-affairs/student-activities",
  "students-activities":     "student-affairs/student-activities",
  "student-data":            "student-affairs/student-data",
  "students-data":           "student-affairs/student-data",
  "announcements":           "student-affairs/announcements",
  "career-alumni":           "student-affairs/career-alumni",
  "career-&-alumni":         "student-affairs/career-alumni",
  "student-facilities":      "student-affairs/student-facilities",

  // Contact
  "contact-us":              "contact-us",
  "contact":                 "contact-us",
};

function getUrlForPage(page: string): string {
  const path = PAGE_URL_MAP[page];
  if (path !== undefined) return pageUrl(path);
  return pageUrl(page);
}

// ── Home page ──────────────────────────────────────────────────
function HomePage({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <main id="main-content">
      <BannerSlider onNavigate={onNavigate} />
      <WhatIsSection onNavigate={onNavigate} />
      <HistorySection onNavigate={onNavigate} />
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
    case "home":
    case "profile":
      return <HomePage onNavigate={onNavigate} />;

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
        <GenericPage title="Master Program (S2)" parent="Academics" onNavigate={onNavigate} />
      );

    case "doctoral-program-(s3)":
    case "doctoral-program-s3":
    case "doctoral-s3":
      return (
        <GenericPage title="Doctoral Program (S3)" parent="Academics" onNavigate={onNavigate} />
      );

    case "professional-program":
    case "professional":
      return (
        <GenericPage title="Professional Program" parent="Academics" onNavigate={onNavigate} />
      );

    case "iup":
    case "international-undergraduate-program":
    case "international-undergraduate":
      return <InternationalUndergraduatePage onNavigate={onNavigate} />;

    case "research":
      return <ResearchPage onNavigate={onNavigate} />;

    case "research-groups":
      return <ResearchGroupsPage onNavigate={onNavigate} />;

    case "community-services":
      return (
        <GenericPage title="Community Services" parent="Research" onNavigate={onNavigate} />
      );

    case "publications":
      return (
        <GenericPage title="Publications" parent="Research" onNavigate={onNavigate} />
      );

    case "laboratories":
      return (
        <GenericPage title="Laboratories" parent="Research" onNavigate={onNavigate} />
      );

    case "collaboration":
      return (
        <GenericPage title="Collaboration" parent="Research" onNavigate={onNavigate} />
      );

    case "student-affairs":
      return <StudentAffairsPage onNavigate={onNavigate} />;

    case "student-organizations":
      return (
        <GenericPage title="Student Organizations" parent="Student Affairs" onNavigate={onNavigate} />
      );

    case "scholarships":
      return (
        <GenericPage title="Scholarships" parent="Student Affairs" onNavigate={onNavigate} />
      );

    case "student-achievements":
    case "students-achievements":
      return (
        <GenericPage title="Student Achievements" parent="Student Affairs" onNavigate={onNavigate} />
      );

    case "student-activities":
    case "students-activities":
      return (
        <GenericPage title="Student Activities" parent="Student Affairs" onNavigate={onNavigate} />
      );

    case "student-data":
    case "students-data":
      return (
        <GenericPage title="Student Data" parent="Student Affairs" onNavigate={onNavigate} />
      );

    case "announcements":
      return (
        <GenericPage title="Announcements" parent="Student Affairs" onNavigate={onNavigate} />
      );

    case "career-&-alumni":
    case "career-alumni":
      return (
        <GenericPage title="Career & Alumni" parent="Student Affairs" onNavigate={onNavigate} />
      );

    case "student-facilities":
      return (
        <GenericPage title="Student Facilities" parent="Student Affairs" onNavigate={onNavigate} />
      );

    case "contact-us":
    case "contact":
      return <ContactPage onNavigate={onNavigate} />;

    default:
      return <HomePage onNavigate={onNavigate} />;
  }
}

// ── App ────────────────────────────────────────────────────────
export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  /**
   * Single source of truth untuk navigasi.
   * Semua sumber (CTA, footer, breadcrumb, dll) memanggil ini.
   * Header.tsx sudah push URL sendiri — pushState duplikat tidak masalah
   * karena kita cek dulu apakah pathname sudah sama.
   */
  const handleNavigate = (page: string) => {
    const url = getUrlForPage(page);
    if (window.location.pathname !== url) {
      window.history.pushState(null, "", url);
    }
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

      <Navbar onNavigate={handleNavigate} />

      <div className="gd-page-offset">
        <PageRouter page={currentPage} onNavigate={handleNavigate} />
        <Footer onNavigate={handleNavigate} />
      </div>
    </>
  );
}