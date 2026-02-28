import { useState } from "react";

interface FooterProps {
  onNavigate?: (page: string) => void;
}

function LogoBrand() {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="gd-footer-logo">
      {!imgError ? (
        <img
          src="img/logo.png"
          alt="Logo Institut Teknologi Bandung"
          style={{
            width: "52px",
            height: "52px",
            objectFit: "contain",
            flexShrink: 0,
            // Aktifkan baris di bawah HANYA jika logo berwarna gelap dan perlu diputihkan:
            // filter: "brightness(0) invert(1)",
          }}
          onError={() => setImgError(true)}
        />
      ) : (
        /* Fallback SVG jika logo tidak ditemukan */
        <svg viewBox="0 0 44 44" fill="none" aria-hidden="true" style={{ width: "44px", height: "44px", color: "var(--orange)" }}>
          <circle cx="22" cy="22" r="19" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="22" cy="22" r="10" stroke="currentColor" strokeWidth="1" />
          <circle cx="22" cy="22" r="3" fill="currentColor" />
          <line x1="22" y1="3" x2="22" y2="41" stroke="currentColor" strokeWidth="1" />
          <line x1="3" y1="22" x2="41" y2="22" stroke="currentColor" strokeWidth="1" />
          <ellipse cx="22" cy="22" rx="19" ry="10" stroke="currentColor" strokeWidth="0.75" opacity="0.4" />
        </svg>
      )}
      <div>
        <div className="gd-footer-logo-dept">Teknik Geodesi dan Geomatika</div>
        <div className="gd-footer-logo-sub">Institut Teknologi Bandung</div>
      </div>
    </div>
  );
}

function AccredBadge({
  href,
  src,
  alt,
  fallbackGrade,
  fallbackLabel,
  title,
}: {
  href: string;
  src: string;
  alt: string;
  fallbackGrade: string;
  fallbackLabel: string;
  title: string;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="gd-accred-badge"
      title={title}
      style={{ textDecoration: "none" }}
    >
      {!imgError ? (
        <img
          src={src}
          alt={alt}
          style={{
            height: "40px",
            width: "auto",
            maxWidth: "80px",
            objectFit: "contain",
            opacity: 0.9,
            // Aktifkan jika logo berwarna gelap:
            // filter: "brightness(0) invert(1)",
          }}
          onError={() => setImgError(true)}
        />
      ) : (
        <>
          <span className="gd-accred-grade">{fallbackGrade}</span>
          <span className="gd-accred-label" dangerouslySetInnerHTML={{ __html: fallbackLabel }} />
        </>
      )}
    </a>
  );
}

export function Footer({ onNavigate }: FooterProps) {
  const year = new Date().getFullYear();

  const navigate = (page: string) => {
    onNavigate?.(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cols = [
    {
      title: "Profile",
      links: [
        { label: "What is Geodesy?", page: "what-is-geodesy-geomatics" },
        { label: "Our History", page: "our-history" },
        { label: "Vision & Mission", page: "vision-mission" },
      ],
    },
    {
      title: "Academics",
      links: [
        { label: "Undergraduate (S1)", page: "undergraduate-program-s1" },
        { label: "Graduate (S2)", page: "graduate-program-s2" },
        { label: "Doctoral (S3)", page: "doctoral-program-s3" },
        { label: "Curriculum", page: "curriculum" },
      ],
    },
    {
      title: "Research",
      links: [
        { label: "Research Groups", page: "research-groups" },
        { label: "Laboratories", page: "laboratories" },
        { label: "Publications", page: "publications" },
        { label: "Collaboration", page: "collaboration" },
      ],
    },
    {
      title: "Student Affairs",
      links: [
        { label: "Student Organizations", page: "student-organizations" },
        { label: "Scholarships", page: "scholarships" },
        { label: "Career & Alumni", page: "career-alumni" },
        { label: "Student Facilities", page: "student-facilities" },
      ],
    },
  ];

  return (
    <footer className="gd-footer" role="contentinfo">
      <div className="gd-container">
        {/* Main footer grid */}
        <div className="gd-footer-grid">
          {/* Brand column */}
          <div className="gd-footer-brand">
            <LogoBrand />
            <address className="gd-footer-address">
              Labtek IX-C<br />
              Jl. Ganesha No. 10<br />
              Bandung 40132, Jawa Barat<br />
              Indonesia
            </address>
            <div className="gd-footer-contact-info">
              <a href="tel:+622222502324">(022) 2502324</a>
              <a href="mailto:info@gd.fitb.itb.ac.id">info@gd.fitb.itb.ac.id</a>
            </div>
            {/* Social */}
            <div className="gd-footer-social">
              <a href="https://www.instagram.com/geodesigeomatika.itb/" target="_blank" rel="noreferrer" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
              </a>
              <a href="https://www.youtube.com/@geodesigeomatika" target="_blank" rel="noreferrer" aria-label="YouTube">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" /></svg>
              </a>
              <a href="https://www.linkedin.com/school/geodesy-and-geomatics-engineering-itb/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              </a>
            </div>
          </div>

          {/* Nav columns */}
          {cols.map((col) => (
            <nav key={col.title} className="gd-footer-col" aria-label={`${col.title} navigation`}>
              <div className="gd-footer-col-title">{col.title}</div>
              <ul>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <button onClick={() => navigate(link.page)}>{link.label}</button>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Contact CTA + Accreditation */}
          <div className="gd-footer-cta">
            <button className="gd-btn gd-btn--outline" onClick={() => navigate("contact-us")}>
              Contact Us
            </button>
            <div className="gd-footer-accreditation">
              <AccredBadge
                href="https://www.asiin.de"
                src="img/accreditation/asiin.png"
                alt="ASIIN Akkreditierungsagentur"
                fallbackGrade="✓"
                fallbackLabel="ASIIN<br/>Accredited"
                title="ASIIN Accredited"
              />
              <AccredBadge
                href="https://www.banpt.or.id"
                src="img/accreditation/ban-pt.png"
                alt="BAN-PT Terakreditasi"
                fallbackGrade="A"
                fallbackLabel="BAN-PT<br/>Accredited"
                title="BAN-PT Terakreditasi Unggul"
              />
            </div>
          </div>
        </div>

        {/* Base */}
        <div className="gd-footer-base">
          <p className="gd-footer-copy">
            © {year} Teknik Geodesi & Geomatika, FITB — Institut Teknologi Bandung
          </p>
          <button
            className="gd-scroll-top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}