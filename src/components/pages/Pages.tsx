// Individual page components for each menu section

interface PageProps {
  onNavigate: (page: string) => void;
}

function PageHero({ kicker, title, subtitle }: { kicker: string; title: string; subtitle?: string }) {
  return (
    <section className="gd-page-hero">
      <div className="gd-container">
        <p className="gd-page-hero-kicker">{kicker}</p>
        <h1 className="gd-page-hero-title">{title}</h1>
        {subtitle && <p className="gd-page-hero-sub">{subtitle}</p>}
      </div>
    </section>
  );
}

function Breadcrumb({ items, onNavigate }: { items: { label: string; page: string }[]; onNavigate: (page: string) => void }) {
  return (
    <div className="gd-page-hero" style={{ paddingBottom: 0, paddingTop: "16px" }}>
      <div className="gd-container">
        <div className="gd-breadcrumb" style={{ marginBottom: 0 }}>
          <button onClick={() => onNavigate("home")}>Home</button>
          {items.map((item, i) => (
            <span key={item.label} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span>›</span>
              {i === items.length - 1 ? (
                <span style={{ color: "rgba(255,255,255,0.7)" }}>{item.label}</span>
              ) : (
                <button onClick={() => onNavigate(item.page)}>{item.label}</button>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// ACADEMICS PAGE
// ============================================================
export function AcademicsPage({ onNavigate }: PageProps) {
  const programs = [
    {
      level: "S1",
      name: "Undergraduate Program (S1)",
      duration: "4 Years",
      credits: "144 SKS",
      desc: "A comprehensive 4-year program covering geodesy, cartography, photogrammetry, remote sensing, and geographic information systems. Graduates are equipped to work in government, industry, and research.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&q=80",
    },
    {
      level: "S2",
      name: "Graduate Program (S2)",
      duration: "2 Years",
      credits: "36 SKS",
      desc: "An advanced master's program focused on research and specialized expertise in geomatics engineering. Students develop deep knowledge in chosen specializations and conduct original research.",
      image: "https://images.unsplash.com/photo-1562774053-701939374585?w=600&q=80",
    },
    {
      level: "S3",
      name: "Doctoral Program (S3)",
      duration: "3–5 Years",
      credits: "48 SKS",
      desc: "A research-intensive doctoral program producing scholars and researchers who contribute original knowledge to geodesy and geomatics. Graduates pursue careers in academia and high-level research institutions.",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80",
    },
  ];

  const specializations = [
    { icon: "🛰️", title: "Physical Geodesy & GNSS", desc: "Satellite positioning, Earth's gravity field, geodetic networks" },
    { icon: "📸", title: "Photogrammetry", desc: "Aerial and close-range photogrammetry, 3D reconstruction, LiDAR" },
    { icon: "🌍", title: "Remote Sensing", desc: "Satellite imagery analysis, land use classification, environmental monitoring" },
    { icon: "🗺️", title: "Geographic Information Systems", desc: "Spatial databases, GIS analysis, web mapping, spatial decision support" },
    { icon: "📐", title: "Cadastral & Land Surveying", desc: "Land registration, boundary surveys, property mapping" },
    { icon: "⚓", title: "Hydrography & Marine Geodesy", desc: "Bathymetric surveys, coastal mapping, maritime navigation" },
  ];

  return (
    <div>
      <Breadcrumb items={[{ label: "Academics", page: "academics" }]} onNavigate={onNavigate} />
      <PageHero
        kicker="Academics"
        title="Programs of Study"
        subtitle="World-class geodesy and geomatics education at undergraduate, graduate, and doctoral levels."
      />

      {/* Programs */}
      <section className="gd-page-section">
        <div className="gd-container">
          <p className="gd-section-kicker">Our Programs</p>
          <h2 className="gd-section-title">Academic Degrees</h2>
          <div className="gd-section-divider" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px", marginTop: "16px" }}>
            {programs.map((prog) => (
              <div key={prog.level} style={{ border: "1px solid var(--gray-200)", overflow: "hidden", background: "var(--white)" }}>
                <div style={{ position: "relative", height: "200px", overflow: "hidden" }}>
                  <img src={prog.image} alt={prog.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", top: "16px", left: "16px", background: "var(--orange)", color: "var(--white)", fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 700, width: "48px", height: "48px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {prog.level}
                  </div>
                </div>
                <div style={{ padding: "28px" }}>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 700, color: "var(--navy)", marginBottom: "8px" }}>{prog.name}</h3>
                  <div style={{ display: "flex", gap: "16px", fontFamily: "var(--font-display)", fontSize: "13px", fontWeight: 600, color: "var(--blue)", marginBottom: "12px" }}>
                    <span>⏱ {prog.duration}</span>
                    <span>📚 {prog.credits}</span>
                  </div>
                  <p style={{ fontSize: "14px", lineHeight: 1.7, color: "var(--gray-600)" }}>{prog.desc}</p>
                  <button
                    onClick={() => onNavigate(`undergraduate-program-${prog.level.toLowerCase()}`)}
                    className="gd-btn gd-btn--outline"
                    style={{ marginTop: "20px" }}
                  >
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specializations */}
      <section className="gd-page-section-alt">
        <div className="gd-container">
          <p className="gd-section-kicker">Fields of Study</p>
          <h2 className="gd-section-title">Areas of Specialization</h2>
          <div className="gd-section-divider" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
            {specializations.map((spec) => (
              <div key={spec.title} style={{ background: "var(--white)", padding: "28px", borderLeft: "4px solid var(--blue)", transition: "border-color 0.2s, box-shadow 0.2s" }}>
                <span style={{ fontSize: "32px", display: "block", marginBottom: "12px" }}>{spec.icon}</span>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "17px", fontWeight: 700, color: "var(--navy)", marginBottom: "8px" }}>{spec.title}</h3>
                <p style={{ fontSize: "14px", lineHeight: 1.65, color: "var(--gray-600)" }}>{spec.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ============================================================
// RESEARCH PAGE
// ============================================================
export function ResearchPage({ onNavigate }: PageProps) {
  const groups = [
    { icon: "🛰️", name: "Physical Geodesy & Satellite Navigation", focus: "GNSS positioning, geodetic datum, Earth's gravity field modeling" },
    { icon: "📸", name: "Photogrammetry & 3D Reconstruction", focus: "UAV photogrammetry, LiDAR, digital twin, 3D city modeling" },
    { icon: "🌍", name: "Remote Sensing & Earth Observation", focus: "SAR, multispectral analysis, land change detection" },
    { icon: "🗺️", name: "Geospatial Intelligence & GIS", focus: "Big data geospatial, web GIS, spatial decision support systems" },
    { icon: "⚓", name: "Hydrography & Marine Geodesy", focus: "Coastal monitoring, seafloor mapping, tidal analysis" },
    { icon: "🌏", name: "Geodynamics & Crustal Deformation", focus: "Tectonic monitoring, volcano deformation, InSAR" },
  ];

  const labs = [
    { name: "Geodesy & Geodynamics Lab", abbr: "GGD" },
    { name: "Photogrammetry & Remote Sensing Lab", abbr: "FRS" },
    { name: "GIS & Spatial Modeling Lab", abbr: "GIS" },
    { name: "GNSS & Navigation Lab", abbr: "GNS" },
    { name: "Hydrography Lab", abbr: "HYD" },
    { name: "Cadastral & Land Information Lab", abbr: "KAD" },
    { name: "Spatial Computing Lab", abbr: "SPC" },
    { name: "Geospatial Intelligence Lab", abbr: "GIN" },
    { name: "Cartography Lab", abbr: "KAR" },
    { name: "Remote Sensing Application Lab", abbr: "RSA" },
    { name: "Geodetic Adjustment Lab", abbr: "GDA" },
    { name: "Digital Terrain Lab", abbr: "DTL" },
  ];

  return (
    <div>
      <Breadcrumb items={[{ label: "Research", page: "research" }]} onNavigate={onNavigate} />
      <PageHero
        kicker="Research"
        title="Research & Innovation"
        subtitle="Advancing geospatial science through cutting-edge research, collaboration, and discovery."
      />

      {/* Research Groups */}
      <section className="gd-page-section">
        <div className="gd-container">
          <p className="gd-section-kicker">Research Groups</p>
          <h2 className="gd-section-title">Our Research Groups</h2>
          <div className="gd-section-divider" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "20px" }}>
            {groups.map((g) => (
              <div key={g.name} style={{ background: "var(--white)", border: "1px solid var(--gray-200)", padding: "28px", display: "flex", gap: "20px" }}>
                <span style={{ fontSize: "36px", flexShrink: 0 }}>{g.icon}</span>
                <div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "17px", fontWeight: 700, color: "var(--navy)", marginBottom: "8px" }}>{g.name}</h3>
                  <p style={{ fontSize: "14px", lineHeight: 1.65, color: "var(--gray-600)" }}>{g.focus}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Labs */}
      <section className="gd-page-section-alt">
        <div className="gd-container">
          <p className="gd-section-kicker">Laboratories</p>
          <h2 className="gd-section-title">Our 12 Laboratories</h2>
          <div className="gd-section-divider" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
            {labs.map((lab) => (
              <div key={lab.name} style={{ background: "var(--navy)", color: "var(--white)", padding: "24px", transition: "background 0.2s" }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: 700, color: "var(--orange)", marginBottom: "8px" }}>{lab.abbr}</div>
                <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.75)", lineHeight: 1.55 }}>{lab.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ============================================================
// STUDENT AFFAIRS PAGE
// ============================================================
export function StudentAffairsPage({ onNavigate }: PageProps) {
  const orgs = [
    { name: "HIMAGD ITB", full: "Himpunan Mahasiswa Geodesi ITB", desc: "The main student organization representing all geodesy and geomatics students at ITB.", icon: "🏛️" },
    { name: "GeoGIS Club", full: "Geographic Information Science Club", desc: "Student club focused on GIS applications, web mapping, and open-source geospatial tools.", icon: "🗺️" },
    { name: "GNSS Student Team", full: "Satellite Navigation Research Team", desc: "Student research team working on GNSS projects and competitions.", icon: "🛰️" },
    { name: "GD Photography Club", full: "Geodesy Photography & UAV Club", desc: "Club for aerial photography, drone piloting, and photogrammetric documentation.", icon: "📸" },
  ];

  return (
    <div>
      <Breadcrumb items={[{ label: "Student Affairs", page: "student-affairs" }]} onNavigate={onNavigate} />
      <PageHero
        kicker="Student Affairs"
        title="Student Life & Support"
        subtitle="Empowering students beyond the classroom through organizations, scholarships, and career development."
      />

      <section className="gd-page-section">
        <div className="gd-container">
          <p className="gd-section-kicker">Organizations</p>
          <h2 className="gd-section-title">Student Organizations</h2>
          <div className="gd-section-divider" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
            {orgs.map((org) => (
              <div key={org.name} style={{ background: "var(--white)", border: "1px solid var(--gray-200)", overflow: "hidden" }}>
                <div style={{ background: "var(--navy)", padding: "20px 24px", display: "flex", alignItems: "center", gap: "14px" }}>
                  <span style={{ fontSize: "28px" }}>{org.icon}</span>
                  <div>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: "17px", fontWeight: 700, color: "var(--white)" }}>{org.name}</h3>
                    <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)" }}>{org.full}</p>
                  </div>
                </div>
                <div style={{ padding: "20px 24px" }}>
                  <p style={{ fontSize: "14px", lineHeight: 1.7, color: "var(--gray-600)" }}>{org.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="gd-page-section-alt">
        <div className="gd-container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px" }}>
            <div>
              <p className="gd-section-kicker">Financial Aid</p>
              <h2 className="gd-section-title">Scholarships</h2>
              <div className="gd-section-divider" />
              <p style={{ fontSize: "15px", lineHeight: 1.75, color: "var(--gray-600)", marginBottom: "16px" }}>
                ITB and the Department of Geodesy & Geomatics Engineering offer various scholarship programs for both domestic and international students based on academic achievement and financial need.
              </p>
              {["Beasiswa KIP Kuliah (Kartu Indonesia Pintar)", "ITB Endowment Scholarship", "BRI Scholarship for Engineering Students", "Industry Partnership Scholarships (BIG, BPN, Pertamina)", "LPDP Government Scholarship (S2/S3)"].map((s) => (
                <div key={s} style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "8px" }}>
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--orange)", flexShrink: 0, marginTop: "8px" }} />
                  <span style={{ fontFamily: "var(--font-display)", fontSize: "13px", color: "var(--gray-600)" }}>{s}</span>
                </div>
              ))}
            </div>
            <div>
              <p className="gd-section-kicker">Career Development</p>
              <h2 className="gd-section-title">Career & Alumni</h2>
              <div className="gd-section-divider" />
              <p style={{ fontSize: "15px", lineHeight: 1.75, color: "var(--gray-600)", marginBottom: "16px" }}>
                With over 3,000 alumni worldwide, our graduates work across government agencies, private companies, and academic institutions throughout Indonesia and internationally.
              </p>
              {["Badan Informasi Geospasial (BIG)", "Badan Pertanahan Nasional (BPN)", "LAPAN / BRIN Space Agency", "Pertamina & Oil & Gas Industry", "Esri Indonesia & GIS Companies", "International Research Institutions"].map((s) => (
                <div key={s} style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "8px" }}>
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--blue)", flexShrink: 0, marginTop: "8px" }} />
                  <span style={{ fontFamily: "var(--font-display)", fontSize: "13px", color: "var(--gray-600)" }}>{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ============================================================
// CONTACT US PAGE
// ============================================================
export function ContactPage({ onNavigate }: PageProps) {
  return (
    <div>
      <Breadcrumb items={[{ label: "Contact Us", page: "contact-us" }]} onNavigate={onNavigate} />
      <PageHero
        kicker="Contact Us"
        title="Get in Touch"
        subtitle="We'd love to hear from you — whether you're a prospective student, researcher, or industry partner."
      />

      <section className="gd-contact">
        <div className="gd-container">
          <div className="gd-contact-layout">
            <div className="gd-contact-info">
              <p className="gd-section-kicker">Our Location</p>
              <h2 className="gd-section-title">Contact Information</h2>
              <div className="gd-section-divider" />
              <address className="gd-contact-address">
                <div className="gd-contact-row">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path strokeLinecap="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <strong>Gedung Teknik Geodesi</strong><br />
                    Jl. Ganesha No. 10, Bandung 40132<br />
                    Jawa Barat, Indonesia
                  </div>
                </div>
                <div className="gd-contact-row">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path strokeLinecap="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href="tel:+622222502324">(022) 2502324</a>
                </div>
                <div className="gd-contact-row">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path strokeLinecap="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:info@gd.fitb.itb.ac.id">info@gd.fitb.itb.ac.id</a>
                </div>
                <div className="gd-contact-row">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path strokeLinecap="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Senin – Jumat, 08:00 – 16:00 WIB</span>
                </div>
              </address>

              {/* Map placeholder */}
              <div style={{ marginTop: "24px", background: "var(--gray-100)", height: "240px", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid var(--gray-200)" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "14px", color: "var(--gray-400)", marginBottom: "8px" }}>📍 Gedung Teknik Geodesi, ITB</div>
                  <a
                    href="https://maps.google.com/?q=Gedung+Teknik+Geodesi+ITB+Bandung"
                    target="_blank"
                    rel="noreferrer"
                    className="gd-btn gd-btn--outline"
                    style={{ fontSize: "12px", padding: "8px 16px" }}
                  >
                    Open in Google Maps
                  </a>
                </div>
              </div>
            </div>

            {/* Contact form */}
            <div className="gd-contact-form-wrap">
              <form
                className="gd-contact-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Form submitted — integrate with CF7 API endpoint");
                }}
              >
                <h3 className="gd-form-title">Send a Message</h3>
                <div className="gd-form-row">
                  <div className="gd-form-group">
                    <label htmlFor="contact-name">Full Name</label>
                    <input type="text" id="contact-name" name="your-name" required placeholder="Your name" />
                  </div>
                  <div className="gd-form-group">
                    <label htmlFor="contact-email">Email Address</label>
                    <input type="email" id="contact-email" name="your-email" required placeholder="your@email.com" />
                  </div>
                </div>
                <div className="gd-form-group">
                  <label htmlFor="contact-subject">Subject</label>
                  <input type="text" id="contact-subject" name="your-subject" placeholder="What is your enquiry about?" />
                </div>
                <div className="gd-form-group">
                  <label htmlFor="contact-message">Message</label>
                  <textarea id="contact-message" name="your-message" rows={5} required placeholder="Write your message here…" />
                </div>
                <button type="submit" className="gd-btn gd-btn--primary gd-btn--full">
                  Send Message
                </button>
                <p className="gd-form-note">
                  Integrates with Contact Form 7 via{" "}
                  <code>POST /wp-json/contact-form-7/v1/contact-forms/&#123;id&#125;/feedback</code>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ============================================================
// GENERIC PLACEHOLDER PAGE
// ============================================================
export function GenericPage({ title, parent, onNavigate }: { title: string; parent?: string; onNavigate: (page: string) => void }) {
  const breadItems = parent
    ? [{ label: parent, page: parent.toLowerCase().replace(/\s+/g, "-") }, { label: title, page: "" }]
    : [{ label: title, page: "" }];

  return (
    <div>
      <Breadcrumb items={breadItems} onNavigate={onNavigate} />
      <PageHero kicker={parent || "Section"} title={title} />
      <section className="gd-coming-soon">
        <div className="gd-container">
          <div className="gd-coming-soon-inner">
            <div className="gd-coming-soon-icon" aria-hidden="true">
              <svg viewBox="0 0 44 44" fill="none">
                <circle cx="22" cy="22" r="19" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
                <circle cx="22" cy="22" r="10" stroke="currentColor" strokeWidth="1" opacity="0.3" />
                <circle cx="22" cy="22" r="3" fill="currentColor" opacity="0.4" />
                <line x1="22" y1="3" x2="22" y2="41" stroke="currentColor" strokeWidth="1" opacity="0.2" />
                <line x1="3" y1="22" x2="41" y2="22" stroke="currentColor" strokeWidth="1" opacity="0.2" />
              </svg>
            </div>
            <p className="gd-section-kicker">{parent || "Section"}</p>
            <h2 className="gd-coming-soon-title">{title}</h2>
            <p className="gd-coming-soon-body">
              This section is currently being developed. Content will be integrated from the WordPress REST API
              at <code>gd.fitb.itb.ac.id/wp-json/</code> in the next development phase.
            </p>
            <button className="gd-btn gd-btn--primary" onClick={() => onNavigate("home")}>Back to Home</button>
          </div>
        </div>
      </section>
    </div>
  );
}
