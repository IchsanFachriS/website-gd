import { useState, useEffect, useRef } from "react";
import { NAV_ITEMS } from "../../utils/data";

export function Topbar() {
  return (
    <div className="gd-topbar">
      <div className="gd-container">
        <nav className="gd-topbar-nav" aria-label="auxiliary navigation">
          <ul>
            <li><a href="https://www.itb.ac.id" target="_blank" rel="noreferrer">ITB Website</a></li>
            <li><a href="https://fitb.itb.ac.id" target="_blank" rel="noreferrer">FITB</a></li>
            <li><a href="#student-affairs">Mahasiswa</a></li>
            <li><a href="#contact">Alumni</a></li>
            <li><a href="https://digilib.itb.ac.id" target="_blank" rel="noreferrer">Library</a></li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const navRef = useRef<HTMLElement>(null);

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

  return (
    <header className={`gd-header ${scrolled ? "gd-header--scrolled" : ""}`} ref={navRef}>
      <div className="gd-header-inner">
        {/* Logo */}
        <a href="#profile" className="gd-logo" aria-label="GD ITB Home">
          <div className="gd-logo-mark">
            <img src="img/logo.png" alt="Logo ITB" />
          </div>
          <div className="gd-logo-text">
            <span className="gd-logo-dept">GEODESY &amp; GEOMATICS ENGINEERING</span>
            <span className="gd-logo-dept">INSTITUT TEKNOLOGI BANDUNG</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="gd-nav" aria-label="primary navigation">
          {NAV_ITEMS.map((item) => (
            <div
              key={item.label}
              className={`gd-nav-item ${item.children ? "has-dropdown" : ""} ${activeMenu === item.label ? "active" : ""}`}
              onMouseEnter={() => item.children && setActiveMenu(item.label)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <a
                href={item.href}
                className="gd-nav-link"
                onClick={(e) => { if (item.children) { e.preventDefault(); setActiveMenu(activeMenu === item.label ? null : item.label); } }}
              >
                {item.label}
                {item.children && (
                  <svg className="gd-nav-chevron" viewBox="0 0 12 8" fill="none" aria-hidden="true">
                    <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                )}
              </a>
              {item.children && (
                <div className="gd-dropdown" aria-hidden={activeMenu !== item.label}>
                  <ul>
                    {item.children.map((child) => (
                      <li key={child.label}>
                        <a href={child.href} onClick={() => setActiveMenu(null)}>{child.label}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Actions */}
        <div className="gd-header-actions">
          <button
            className="gd-search-btn"
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="Search"
            aria-expanded={searchOpen}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </button>
          <button
            className={`gd-burger ${mobileOpen ? "active" : ""}`}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* Search panel */}
      {searchOpen && (
        <div className="gd-search-panel">
          <div className="gd-container">
            <form className="gd-search-form" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="site-search">Search by keywords, subject or people</label>
              <div className="gd-search-row">
                <input
                  id="site-search"
                  type="text"
                  placeholder="Search..."
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  autoFocus
                />
                <button type="submit" aria-label="Submit search">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Mobile menu */}
      <div className={`gd-mobile-menu ${mobileOpen ? "open" : ""}`} aria-hidden={!mobileOpen}>
        <div className="gd-mobile-inner">
          <div className="gd-mobile-search">
            <input type="text" placeholder="Search..." aria-label="Mobile search" />
          </div>
          <nav aria-label="mobile navigation">
            {NAV_ITEMS.map((item) => (
              <div key={item.label} className="gd-mobile-item">
                <a href={item.href} onClick={() => setMobileOpen(false)} className="gd-mobile-link">
                  {item.label}
                </a>
                {item.children && (
                  <ul className="gd-mobile-sub">
                    {item.children.map((child) => (
                      <li key={child.label}>
                        <a href={child.href} onClick={() => setMobileOpen(false)}>{child.label}</a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </nav>
          <div className="gd-mobile-aux">
            <a href="https://www.itb.ac.id" target="_blank" rel="noreferrer">ITB Website</a>
            <a href="https://fitb.itb.ac.id" target="_blank" rel="noreferrer">FITB</a>
            <a href="#student-affairs">Mahasiswa</a>
          </div>
        </div>
      </div>
    </header>
  );
}
