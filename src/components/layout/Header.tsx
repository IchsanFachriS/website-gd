import { useState, useEffect, useRef } from "react";
import { NAV_ITEMS } from "../../utils/data";
import { imgUrl, pageUrl, BASE } from "../../utils/basePath";
import type { NavItem } from "../../types";

interface HeaderProps {
  onNavigate: (page: string) => void;
}

function labelToPageKey(label: string): string {
  return label
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[()]/g, "")
    .replace(/--+/g, "-")
    .replace(/-$/, "");
}

const PROFILE_CHILD_PATHS = [
  "what-is-geodesy",
  "our-history",
  "vision-mission",
];

function buildUrl(parentPath: string | undefined, childPath?: string): string {
  if (!parentPath || parentPath === "profile") {
    if (!childPath) return pageUrl("");
    return pageUrl(childPath);
  }
  if (childPath) {
    return pageUrl(`${parentPath}/${childPath}`);
  }
  return pageUrl(parentPath);
}

function resolvePageFromPathname(pathname: string): string {
  const base = BASE.endsWith("/") ? BASE.slice(0, -1) : BASE;
  let clean = pathname;
  if (base && clean.startsWith(base)) {
    clean = clean.slice(base.length);
  }
  clean = clean.replace(/^\//, "").replace(/\/$/, "");

  if (!clean) return "home";

  if (PROFILE_CHILD_PATHS.includes(clean)) {
    return clean;
  }

  for (const item of NAV_ITEMS) {
    if (item.path && item.path === clean) {
      return labelToPageKey(item.label);
    }
  }

  for (const item of NAV_ITEMS) {
    if (item.children) {
      for (const child of item.children) {
        if (child.path) {
          const fullPath = item.path === "profile"
            ? child.path
            : `${item.path}/${child.path}`;
          if (fullPath === clean) {
            return labelToPageKey(child.label);
          }
        }
      }
    }
  }

  const segments = clean.split("/");
  return segments[segments.length - 1];
}

// ── Flag SVGs ─────────────────────────────────────────────────

function FlagUK() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 60 30"
      style={{ width: "20px", height: "13px", display: "block", flexShrink: 0 }}
      aria-hidden="true"
    >
      <clipPath id="uk-clip">
        <path d="M0 0v30h60V0z" />
      </clipPath>
      <path d="M0 0v30h60V0z" fill="#012169" />
      <path d="M0 0l60 30m0-30L0 30" stroke="#fff" strokeWidth="6" />
      <path d="M0 0l60 30m0-30L0 30" stroke="#C8102E" strokeWidth="4" clipPath="url(#uk-clip)" />
      <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10" />
      <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  );
}

function FlagID() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 60 40"
      style={{ width: "20px", height: "13px", display: "block", flexShrink: 0 }}
      aria-hidden="true"
    >
      <rect width="60" height="20" fill="#CE1126" />
      <rect y="20" width="60" height="20" fill="#fff" />
    </svg>
  );
}

// ── Language Switcher ─────────────────────────────────────────
// Shows only the active flag + code. Click to toggle EN ↔ ID.

type Lang = "en" | "id";

function LangSwitcher() {
  const [lang, setLang] = useState<Lang>("id");
  const next: Lang = lang === "id" ? "en" : "id";

  return (
    <button
      onClick={() => setLang(next)}
      title={lang === "id" ? "Switch to English" : "Ganti ke Bahasa Indonesia"}
      aria-label={lang === "id" ? "Switch to English" : "Ganti ke Bahasa Indonesia"}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        padding: "3px 0",
        background: "transparent",
        border: "none",
        cursor: "pointer",
      }}
    >
      <span style={{
        display: "flex",
        alignItems: "center",
        border: "1px solid rgba(255,255,255,0.22)",
        lineHeight: 0,
        borderRadius: "1px",
        overflow: "hidden",
        flexShrink: 0,
      }}>
        {lang === "id" ? <FlagID /> : <FlagUK />}
      </span>
      <span style={{
        fontFamily: "var(--font-display)",
        fontSize: "12.5px",
        fontWeight: 700,
        letterSpacing: "0.08em",
        color: "rgba(255,255,255,0.65)",
        lineHeight: 1,
      }}>
        {lang.toUpperCase()}
      </span>
    </button>
  );
}

// ── Navbar inline lang switcher (mobile only) ────────────────
// Compact version: just flag + code, no extra chrome
function NavbarLangSwitcher() {
  const [lang, setLang] = useState<Lang>("id");
  const next: Lang = lang === "id" ? "en" : "id";

  return (
    <button
      onClick={() => setLang(next)}
      title={lang === "id" ? "Switch to English" : "Ganti ke Bahasa Indonesia"}
      aria-label={lang === "id" ? "Switch to English" : "Ganti ke Bahasa Indonesia"}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "5px",
        padding: "6px 8px",
        background: "rgba(255,255,255,0.1)",
        border: "1px solid rgba(255,255,255,0.2)",
        cursor: "pointer",
        borderRadius: "2px",
      }}
    >
      <span style={{
        display: "flex",
        alignItems: "center",
        border: "1px solid rgba(255,255,255,0.25)",
        lineHeight: 0,
        borderRadius: "1px",
        overflow: "hidden",
        flexShrink: 0,
      }}>
        {lang === "id" ? <FlagID /> : <FlagUK />}
      </span>
      <span style={{
        fontFamily: "var(--font-display)",
        fontSize: "11px",
        fontWeight: 700,
        letterSpacing: "0.08em",
        color: "rgba(255,255,255,0.85)",
        lineHeight: 1,
      }}>
        {lang.toUpperCase()}
      </span>
    </button>
  );
}

// ── Topbar ────────────────────────────────────────────────────

export function Topbar() {
  return (
    <div className="gd-topbar">
      <div className="gd-container">
        <nav className="gd-topbar-nav" aria-label="auxiliary navigation">
          <ul>
            {/* Language switcher — first, separated by right border */}
            <li style={{ paddingRight: "16px", marginRight: "8px", borderRight: "1px solid rgba(255,255,255,0.15)", display: "flex", alignItems: "center" }}>
              <LangSwitcher />
            </li>
            <li><a href="https://www.itb.ac.id" target="_blank" rel="noreferrer">ITB Website</a></li>
            <li><a href="https://fitb.itb.ac.id" target="_blank" rel="noreferrer">FITB</a></li>
            <li><a href={pageUrl("student-affairs")}>Mahasiswa</a></li>
            <li><a href="https://digilib.itb.ac.id" target="_blank" rel="noreferrer">Library</a></li>
            <li className="gd-topbar-admission">
              <a
                href="https://admission.itb.ac.id"
                target="_blank"
                rel="noreferrer"
                className="gd-topbar-admission-link"
              >
                Admission
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

// ── Navbar ────────────────────────────────────────────────────

export function Navbar({ onNavigate }: HeaderProps) {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const page = resolvePageFromPathname(window.location.pathname);
    if (page !== "home") {
      onNavigate(page);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const page = resolvePageFromPathname(window.location.pathname);
      onNavigate(page || "home");
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [onNavigate]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileOpen) setMobileOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [mobileOpen]);

  const handleNavClick = (item: NavItem) => {
    const url = buildUrl(item.path);
    window.history.pushState(null, "", url);

    if (!item.path || item.path === "profile" || item.label.toLowerCase() === "home") {
      onNavigate("home");
    } else {
      onNavigate(labelToPageKey(item.label));
    }
    setActiveMenu(null);
    setMobileOpen(false);
  };

  const handleChildClick = (child: NavItem, parent: NavItem) => {
    const url = buildUrl(parent.path, child.path);
    window.history.pushState(null, "", url);
    onNavigate(labelToPageKey(child.label));
    setActiveMenu(null);
    setMobileOpen(false);
  };

  const handleHomeClick = () => {
    window.history.pushState(null, "", pageUrl(""));
    onNavigate("home");
  };

  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <div className="gd-header-fixed" ref={navRef}>
      <Topbar />

      <header className={`gd-header ${scrolled ? "gd-header--scrolled" : ""}`}>
        <div className="gd-header-inner">

          {/* ── Logo ── */}
          <button
            className="gd-logo"
            onClick={handleHomeClick}
            aria-label="GD ITB Home"
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <div className="gd-logo-mark">
              <img
                src={imgUrl("img/logo.png")}
                alt="Logo ITB"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
            <div className="gd-logo-text" style={{ alignItems: "flex-start", textAlign: "left" }}>
              <span className="gd-logo-dept" style={{ fontWeight: 600 }}>
                GEODESY &amp; GEOMATICS ENGINEERING
              </span>
              <span className="gd-logo-dept" style={{ fontWeight: 600 }}>
                INSTITUT TEKNOLOGI BANDUNG
              </span>
            </div>
          </button>

          {/* ── Desktop Nav ── */}
          <nav className="gd-nav" aria-label="primary navigation">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.label}
                className={[
                  "gd-nav-item",
                  item.children ? "has-dropdown" : "",
                  activeMenu === item.label ? "active" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onMouseEnter={() => item.children && setActiveMenu(item.label)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <button
                  className="gd-nav-link"
                  onClick={() => {
                    handleNavClick(item);
                    if (item.children) {
                      setActiveMenu(activeMenu === item.label ? null : item.label);
                    }
                  }}
                >
                  {item.label}
                  {item.children && (
                    <svg
                      className="gd-nav-chevron"
                      viewBox="0 0 12 8"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M1 1l5 5 5-5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  )}
                </button>

                {item.children && (
                  <div
                    className="gd-dropdown"
                    aria-hidden={activeMenu !== item.label}
                  >
                    <ul>
                      {item.children.map((child) => (
                        <li key={child.label}>
                          <button onClick={() => handleChildClick(child, item)}>
                            {child.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* ── Actions ── */}
          <div className="gd-header-actions">
            {/* Lang switcher — visible only on mobile, sits left of burger */}
            <div className="gd-mobile-lang-btn">
              <NavbarLangSwitcher />
            </div>
            <button
              className={`gd-burger ${mobileOpen ? "active" : ""}`}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="gd-mobile-menu"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>

        {/* ── Mobile overlay ── */}
        {mobileOpen && (
          <div
            className="gd-mobile-overlay"
            aria-hidden="true"
            onClick={closeMobileMenu}
          />
        )}

        {/* ── Mobile menu ── */}
        <div
          id="gd-mobile-menu"
          className={`gd-mobile-menu ${mobileOpen ? "open" : ""}`}
          aria-hidden={!mobileOpen}
          role="dialog"
          aria-label="Mobile navigation"
        >
          <div className="gd-mobile-inner">

            {/* ── Close button ── */}
            <button
              className="gd-mobile-close"
              onClick={closeMobileMenu}
              aria-label="Close menu"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <nav aria-label="mobile navigation">
              {NAV_ITEMS.map((item) => (
                <div key={item.label} className="gd-mobile-item">
                  <button
                    className="gd-mobile-link"
                    onClick={() => handleNavClick(item)}
                  >
                    {item.label}
                  </button>

                  {item.children && (
                    <ul className="gd-mobile-sub">
                      {item.children.map((child) => (
                        <li key={child.label}>
                          <button onClick={() => handleChildClick(child, item)}>
                            {child.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </nav>

            <div className="gd-mobile-aux">
              <a href="https://www.itb.ac.id" target="_blank" rel="noreferrer">
                ITB Website
              </a>
              <a href="https://fitb.itb.ac.id" target="_blank" rel="noreferrer">
                FITB
              </a>
              <button
                onClick={() => {
                  window.history.pushState(null, "", pageUrl("student-affairs"));
                  onNavigate("student-affairs");
                  setMobileOpen(false);
                }}
              >
                Mahasiswa
              </button>
              <a
                href="https://admission.itb.ac.id"
                target="_blank"
                rel="noreferrer"
                className="gd-mobile-admission"
              >
                Admission
              </a>

              {/* Mobile language switcher */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                paddingTop: "4px",
              }}>
                <MobileLangSwitcher />
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

// ── Mobile-friendly lang switcher (used inside mobile menu) ───
function MobileLangSwitcher() {
  const [lang, setLang] = useState<Lang>("id");
  const next: Lang = lang === "id" ? "en" : "id";

  return (
    <button
      onClick={() => setLang(next)}
      title={lang === "id" ? "Switch to English" : "Ganti ke Bahasa Indonesia"}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        background: "rgba(255,255,255,0.07)",
        border: "1px solid rgba(255,255,255,0.15)",
        padding: "7px 12px",
        cursor: "pointer",
        borderRadius: "2px",
      }}
    >
      <span style={{
        display: "flex", alignItems: "center",
        border: "1px solid rgba(255,255,255,0.2)",
        lineHeight: 0, borderRadius: "1px", overflow: "hidden",
      }}>
        {lang === "id" ? <FlagID /> : <FlagUK />}
      </span>
      <span style={{
        fontFamily: "var(--font-display)", fontSize: "12px",
        fontWeight: 700, letterSpacing: "0.1em", color: "rgba(255,255,255,0.65)",
      }}>{lang.toUpperCase()}</span>
    </button>
  );
}