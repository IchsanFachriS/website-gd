// ============================================================
// Layout Components — Navbar & Footer
// ============================================================

import { useState, useEffect } from "react";
import { useSearch } from "../../hooks/useWordPress";

// ---- NAVBAR ----
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { results, loading: searchLoading } = useSearch(searchQuery);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinks = [
    { label: "Beranda", href: "#beranda" },
    { label: "Tentang", href: "#tentang" },
    { label: "Akademik", href: "#akademik" },
    { label: "Penelitian", href: "#penelitian" },
    { label: "Berita", href: "#berita" },
    { label: "Agenda", href: "#agenda" },
    { label: "Galeri", href: "#galeri" },
    { label: "Kontak", href: "#kontak" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a1628] shadow-[0_4px_30px_rgba(0,0,0,0.4)] py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#beranda" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-[#c8922a] rounded-sm flex items-center justify-center flex-shrink-0">
            <svg viewBox="0 0 40 40" className="w-7 h-7" fill="none">
              <circle cx="20" cy="20" r="14" stroke="white" strokeWidth="1.5" />
              <circle cx="20" cy="20" r="7" stroke="white" strokeWidth="1" />
              <line x1="20" y1="6" x2="20" y2="34" stroke="white" strokeWidth="1" />
              <line x1="6" y1="20" x2="34" y2="20" stroke="white" strokeWidth="1" />
              <circle cx="20" cy="20" r="2" fill="white" />
            </svg>
          </div>
          <div>
            <div className="text-white font-bold text-sm leading-tight tracking-wide">
              Teknik Geodesi
            </div>
            <div className="text-[#c8922a] text-xs tracking-widest uppercase">
              & Geomatika ITB
            </div>
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-gray-300 hover:text-white text-xs font-medium uppercase tracking-widest px-3 py-2 rounded transition-colors hover:bg-white/5"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Search & Mobile Toggle */}
        <div className="flex items-center gap-2">
          {/* Search button */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="text-gray-300 hover:text-white p-2 rounded transition-colors"
            aria-label="Cari"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          {/* Hamburger */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span className={`block h-0.5 bg-white transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block h-0.5 bg-white transition-all ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 bg-white transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Search Dropdown */}
      {searchOpen && (
        <div className="border-t border-white/10 bg-[#0a1628] px-4 py-3">
          <div className="max-w-7xl mx-auto">
            <input
              autoFocus
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari berita, halaman, agenda…"
              className="w-full bg-white/10 text-white placeholder-gray-400 rounded px-4 py-2 text-sm outline-none border border-white/20 focus:border-[#c8922a] transition-colors"
            />
            {searchQuery.length > 1 && (
              <div className="mt-2 max-h-60 overflow-auto rounded border border-white/10">
                {searchLoading ? (
                  <div className="text-gray-400 text-sm px-4 py-3">Mencari…</div>
                ) : results.length === 0 ? (
                  <div className="text-gray-400 text-sm px-4 py-3">Tidak ada hasil</div>
                ) : (
                  results.map((r) => (
                    <a
                      key={r.id}
                      href={r.url}
                      target="_blank"
                      rel="noreferrer"
                      className="block px-4 py-2.5 text-sm text-gray-200 hover:bg-white/10 border-b border-white/5 last:border-0 transition-colors"
                    >
                      <span className="text-[#c8922a] text-xs uppercase mr-2">{r.subtype}</span>
                      {r.title}
                    </a>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-[#0a1628] border-t border-white/10 px-4 py-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block text-gray-300 hover:text-white text-sm uppercase tracking-widest py-3 border-b border-white/5 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

// ---- FOOTER ----
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#07101f] border-t border-white/10">
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#c8922a] rounded-sm flex items-center justify-center">
              <svg viewBox="0 0 40 40" className="w-7 h-7" fill="none">
                <circle cx="20" cy="20" r="14" stroke="white" strokeWidth="1.5" />
                <circle cx="20" cy="20" r="7" stroke="white" strokeWidth="1" />
                <line x1="20" y1="6" x2="20" y2="34" stroke="white" strokeWidth="1" />
                <line x1="6" y1="20" x2="34" y2="20" stroke="white" strokeWidth="1" />
                <circle cx="20" cy="20" r="2" fill="white" />
              </svg>
            </div>
            <div>
              <div className="text-white font-bold text-sm">Teknik Geodesi & Geomatika</div>
              <div className="text-[#c8922a] text-xs tracking-widest">FITB — ITB</div>
            </div>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
            Program studi unggulan di Fakultas Ilmu dan Teknologi Kebumian,
            Institut Teknologi Bandung. Mencetak ahli geodesi dan geomatika
            berkaliber internasional.
          </p>
          <div className="flex gap-3 mt-5">
            {["instagram", "youtube", "linkedin"].map((social) => (
              <a
                key={social}
                href="#"
                className="w-9 h-9 border border-white/20 rounded flex items-center justify-center text-gray-400 hover:text-white hover:border-[#c8922a] transition-colors"
              >
                <span className="text-xs capitalize">{social[0].toUpperCase()}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-white text-xs font-bold uppercase tracking-widest mb-4">
            Navigasi
          </h3>
          <ul className="space-y-2">
            {["Beranda", "Tentang Kami", "Akademik", "Penelitian", "Berita", "Agenda"].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#c8922a] text-sm transition-colors"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white text-xs font-bold uppercase tracking-widest mb-4">
            Kontak
          </h3>
          <ul className="space-y-3 text-sm text-gray-400">
            <li className="flex gap-2">
              <svg className="w-4 h-4 mt-0.5 text-[#c8922a] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Jl. Ganesha No. 10, Bandung 40132</span>
            </li>
            <li className="flex gap-2">
              <svg className="w-4 h-4 mt-0.5 text-[#c8922a] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>info@gd.fitb.itb.ac.id</span>
            </li>
            <li className="flex gap-2">
              <svg className="w-4 h-4 mt-0.5 text-[#c8922a] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>(022) 2502324</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 px-4 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <span>© {currentYear} Teknik Geodesi & Geomatika FITB ITB. Hak cipta dilindungi.</span>
          <span className="flex gap-4">
            <a href="#" className="hover:text-gray-300 transition-colors">Kebijakan Privasi</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Sitemap</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
