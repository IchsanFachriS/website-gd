import { useState, useEffect, useRef } from "react";
import { NAV_ITEMS } from "../../utils/data";
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

function resolvePageFromPathname(pathname: string): string {
  const clean = pathname.replace(/^\//, "").replace(/\/$/, "");
  if (!clean || clean === "") return "home";

  for (const item of NAV_ITEMS) {
    if (item.path && item.path === clean) {
      return labelToPageKey(item.label);
    }
    if (item.children) {
      for (const child of item.children) {
        if (child.path && child.path === clean) {
          return labelToPageKey(child.label);
        }
        if (child.path && item.path && `${item.path}/${child.path}` === clean) {
          return labelToPageKey(child.label);
        }
      }
    }
  }

  const segments = clean.split("/");
  return segments[segments.length - 1];
}

// ── Topbar ────────────────────────────────────────────────────

export function Topbar() {
  return (
    <div className="gd-topbar">
      <div className="gd-container">
        <nav className="gd-topbar-nav" aria-label="auxiliary navigation">
          <ul>
            <li><a href="https://www.itb.ac.id" target="_blank" rel="noreferrer">ITB Website</a></li>
            <li><a href="https://fitb.itb.ac.id" target="_blank" rel="noreferrer">FITB</a></li>
            <li><a href="#student-affairs">Mahasiswa</a></li>
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

  // ── On mount: restore page from current URL ──
  useEffect(() => {
    const page = resolvePageFromPathname(window.location.pathname);
    if (page !== "home") {
      onNavigate(page);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Scroll shadow ──
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Close desktop dropdown on outside click ──
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ── Lock body scroll when mobile menu is open ──
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // ── Close mobile menu on Escape key ──
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileOpen) setMobileOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [mobileOpen]);

  // ── URL builder ──
  const pushUrl = (parentPath: string | undefined, childPath?: string) => {
    if (!parentPath) {
      window.history.pushState(null, "", "/");
      return;
    }
    if (childPath) {
      const url = parentPath === "profile"
        ? `/${childPath}`
        : `/${parentPath}/${childPath}`;
      window.history.pushState(null, "", url);
    } else {
      window.history.pushState(null, "", `/${parentPath}`);
    }
  };

  // ── Navigation handlers ──
  const handleNavClick = (item: NavItem) => {
    if (!item.path || item.label.toLowerCase() === "home") {
      window.history.pushState(null, "", "/");
      onNavigate("home");
    } else {
      pushUrl(item.path);
      onNavigate(labelToPageKey(item.label));
    }
    setActiveMenu(null);
    setMobileOpen(false);
  };

  const handleChildClick = (child: NavItem, parent: NavItem) => {
    pushUrl(parent.path, child.path);
    onNavigate(labelToPageKey(child.label));
    setActiveMenu(null);
    setMobileOpen(false);
  };

  const handleHomeClick = () => {
    window.history.pushState(null, "", "/");
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
              <img src="img/logo.png" alt="Logo ITB" />
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

                {/* Dropdown */}
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

        {/* ── Mobile overlay (click-outside to close) ── */}
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

            {/* ── Close button (X) inside menu ── */}
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
                  pushUrl("student-affairs");
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
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}