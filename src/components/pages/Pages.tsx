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
// WHAT IS GEODESY & GEOMATICS PAGE
// ============================================================
export function WhatIsGeodesyPage({ onNavigate }: PageProps) {
  const topics = [
    {
      icon: "🌍",
      title: "Geodesy",
      body: "Geodesy is the scientific discipline that deals with the measurement and representation of the Earth, including its gravitational field, in a three-dimensional time-varying space. Geodesists study the size and shape of the Earth, how it moves, and the nature of its gravity field. Modern geodesy uses satellite technology — particularly GPS and GNSS — to provide precise positioning that underpins navigation, mapping, and infrastructure development worldwide.",
    },
    {
      icon: "🗺️",
      title: "Geomatics Engineering",
      body: "Geomatics Engineering is a modern discipline that encompasses the collection, management, analysis, and visualization of spatially referenced data. It integrates traditional surveying with modern technologies including remote sensing, geographic information systems (GIS), photogrammetry, and satellite navigation. Geomatics engineers are the architects of our digital world — they build the spatial data infrastructure that drives smart cities, disaster management, environmental monitoring, and autonomous vehicles.",
    },
    {
      icon: "📸",
      title: "Photogrammetry & Remote Sensing",
      body: "Photogrammetry and Remote Sensing are key disciplines within geomatics. Photogrammetry uses images — from drones, aircraft, or satellites — to reconstruct 3D geometry of objects and terrain. Remote Sensing extends this to analysis of the Earth's surface using multispectral, hyperspectral, SAR, and LiDAR data, enabling land-use mapping, environmental monitoring, disaster assessment, and change detection at regional and global scales.",
    },
    {
      icon: "🛰️",
      title: "GNSS & Satellite Positioning",
      body: "Global Navigation Satellite Systems (GNSS) — including GPS, GLONASS, Galileo, and BeiDou — are fundamental tools in modern geodesy. Our department specializes in precise satellite positioning, atmospheric corrections, geodetic datum establishment, and the design of CORS (Continuously Operating Reference Station) networks that serve Indonesia's national spatial reference framework.",
    },
  ];

  return (
    <div>
      <Breadcrumb items={[{ label: "Profile", page: "profile" }, { label: "What is Geodesy & Geomatics?", page: "" }]} onNavigate={onNavigate} />
      <PageHero
        kicker="Profile"
        title="What is Geodesy & Geomatics?"
        subtitle="Explore the sciences that measure and map our world — from Earth's gravity field to real-time satellite navigation."
      />

      <section className="gd-page-section">
        <div className="gd-container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "28px" }}>
            {topics.map((t) => (
              <div key={t.title} style={{ background: "var(--white)", border: "1px solid var(--gray-200)", padding: "32px", borderLeft: "4px solid var(--blue)" }}>
                <span style={{ fontSize: "36px", display: "block", marginBottom: "16px" }}>{t.icon}</span>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 700, color: "var(--navy)", marginBottom: "12px" }}>{t.title}</h2>
                <p style={{ fontSize: "15px", lineHeight: 1.75, color: "var(--gray-600)" }}>{t.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="gd-page-section-alt">
        <div className="gd-container">
          <p className="gd-section-kicker">Areas of Application</p>
          <h2 className="gd-section-title">Where Geodesy & Geomatics Matter</h2>
          <div className="gd-section-divider" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginTop: "8px" }}>
            {[
              { label: "National Mapping & Cadastre", icon: "📍" },
              { label: "Smart City & Urban Planning", icon: "🏙️" },
              { label: "Oil, Gas & Mining", icon: "⛏️" },
              { label: "Disaster Management", icon: "🌋" },
              { label: "Maritime & Hydrography", icon: "⚓" },
              { label: "Autonomous Navigation", icon: "🚗" },
              { label: "Environmental Monitoring", icon: "🌱" },
              { label: "Defence & Intelligence", icon: "🛡️" },
            ].map((app) => (
              <div key={app.label} style={{ background: "var(--navy)", color: "var(--white)", padding: "20px", textAlign: "center" }}>
                <span style={{ fontSize: "28px", display: "block", marginBottom: "10px" }}>{app.icon}</span>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "13px", fontWeight: 600, color: "rgba(255,255,255,0.85)", lineHeight: 1.4 }}>{app.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ============================================================
// OUR HISTORY PAGE
// ============================================================
export function OurHistoryPage({ onNavigate }: PageProps) {
  const timeline = [
    { year: "1950", event: "Geodesy education program established as Teknik Geodesi at Institut Teknologi Bandung (ITB), initially part of the Civil Engineering Department. Primary focus on training human resources for cadastral work and land administration." },
    { year: "1959", event: "Formal establishment as an independent department within ITB. The department became the first and most prestigious geodesy program in Indonesia, producing the engineers who would map the newly independent nation." },
    { year: "1970s", event: "Expansion of curriculum to include photogrammetry, remote sensing, and early computer-based cartography. The department played a key role in Indonesia's first systematic topographic mapping programs." },
    { year: "1980s", event: "Introduction of satellite geodesy into the curriculum. Department faculty and alumni led the establishment of Indonesia's geodetic datum and national coordinate reference system." },
    { year: "1990s", event: "Rapid growth driven by GIS and remote sensing revolution. The department expanded its laboratory infrastructure, including new GIS, photogrammetry, and GNSS facilities." },
    { year: "2003", event: "Program name changed to Teknik Geodesi dan Geomatika to reflect the modern expansion into geospatial sciences and technologies, aligning with international nomenclature." },
    { year: "2007", event: "Program transferred to the newly established Faculty of Earth Sciences and Technology (FITB), based on Rector's Decree No. 257/SK/K01/OT/2007." },
    { year: "2010s", event: "Achieved international accreditation (ASIIN) and national excellent accreditation (BAN-PT). Launched doctoral program and expanded international research collaborations." },
    { year: "2022", event: "Over 2,875 alumni graduated, contributing to government agencies, private industry, and academia worldwide. Continued leadership in satellite geodesy, UAV mapping, and geospatial data science." },
    { year: "Present", event: "A leading geomatics program in Southeast Asia, integrating Earth observation, spatial data science, hydrography, and geodynamics with strong industry and government partnerships." },
  ];

  return (
    <div>
      <Breadcrumb items={[{ label: "Profile", page: "profile" }, { label: "Our History", page: "" }]} onNavigate={onNavigate} />
      <PageHero
        kicker="Profile"
        title="Our History"
        subtitle="75 years of geodesy education — shaping Indonesia's spatial data infrastructure since 1950."
      />

      <section className="gd-page-section">
        <div className="gd-container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }}>
            {/* Intro */}
            <div>
              <p className="gd-section-kicker">About the Department</p>
              <h2 className="gd-section-title">Oldest & Most Prestigious</h2>
              <div className="gd-section-divider" />
              <p style={{ fontSize: "15px", lineHeight: 1.75, color: "var(--gray-600)", marginBottom: "16px" }}>
                Established in 1950, the Department of Geodesy & Geomatics Engineering at ITB stands as the oldest and most prestigious geodesy program in Indonesia. For over seven decades, we have trained generations of engineers who have shaped the nation's spatial data infrastructure.
              </p>
              <p style={{ fontSize: "15px", lineHeight: 1.75, color: "var(--gray-600)", marginBottom: "32px" }}>
                Our journey reflects Indonesia's own development — from the foundational surveys of a newly independent nation, through the digital revolution in geographic information systems, to the cutting-edge era of drone mapping, autonomous navigation, and space geodesy.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", paddingTop: "28px", borderTop: "1px solid var(--gray-200)" }}>
                {[
                  { value: "1950", label: "Year Founded" },
                  { value: "75+", label: "Years of Excellence" },
                  { value: "3,000+", label: "Alumni Worldwide" },
                  { value: "12", label: "Laboratories" },
                ].map((s) => (
                  <div key={s.label}>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: "34px", fontWeight: 700, color: "var(--blue)", display: "block", lineHeight: 1 }}>{s.value}</span>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "var(--gray-400)", marginTop: "4px", display: "block" }}>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", left: "15px", top: 0, bottom: 0, width: "1px", background: "linear-gradient(to bottom, var(--orange), var(--gray-200))" }} />
              {timeline.map((item) => (
                <div key={item.year} style={{ position: "relative", paddingLeft: "48px", marginBottom: "4px" }}>
                  <div style={{ paddingTop: "14px", paddingBottom: "14px", borderBottom: "1px solid var(--gray-200)" }}>
                    <div style={{ position: "absolute", left: "-33px", top: "20px", width: "10px", height: "10px", borderRadius: "50%", background: "var(--orange)", border: "2px solid var(--orange)" }} />
                    <span style={{ fontFamily: "var(--font-display)", fontSize: "18px", fontWeight: 700, color: "var(--orange)", display: "block", marginBottom: "4px" }}>{item.year}</span>
                    <p style={{ fontSize: "14px", lineHeight: 1.65, color: "var(--gray-600)" }}>{item.event}</p>
                  </div>
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
// VISION & MISSION PAGE
// ============================================================
export function VisionMissionPage({ onNavigate }: PageProps) {
  const objectives = [
    "Memperoleh pengetahuan terintegrasi di bidang teknik geodesi dan geomatika seperti yang dituntut oleh industri, profesi, dan layanan publik",
    "Memiliki keterampilan dalam memanfaatkan pengetahuan dalam memecahkan masalah yang relevan di industri, profesi, dan layanan publik",
    "Mampu menangani masalah yang terbuka dan kompleks, terutama dengan mempertimbangkan solusi rekayasa, yang terdiri dari aspek teknis, desain, sosio-ekonomi, budaya, lingkungan, dan bisnis",
    "Menunjukkan kemampuan untuk beradaptasi, menyesuaikan diri, dan berkembang secara mandiri serta bersaing secara global",
    "Menunjukkan kepatuhan terhadap standar etika dan profesional",
  ];

  return (
    <div>
      <Breadcrumb items={[{ label: "Profile", page: "profile" }, { label: "Vision & Mission", page: "" }]} onNavigate={onNavigate} />
      <PageHero
        kicker="Profile"
        title="Vision & Mission"
        subtitle="Becoming a leading center of excellence in geospatial science and technology for Indonesia and the world."
      />

      <section className="gd-page-section">
        <div className="gd-container">
          {/* Vision */}
          <div style={{ marginBottom: "64px" }}>
            <p className="gd-section-kicker">Visi</p>
            <h2 className="gd-section-title">Vision</h2>
            <div className="gd-section-divider" />
            <div style={{ background: "var(--navy)", padding: "48px", borderLeft: "6px solid var(--orange)", maxWidth: "860px" }}>
              <svg viewBox="0 0 40 32" fill="none" style={{ width: "40px", height: "32px", color: "var(--orange)", marginBottom: "20px", opacity: 0.6 }} aria-hidden="true">
                <path d="M0 32V20C0 14.667 1.333 10.333 4 7 6.667 3.667 10.667 1.333 16 0l2 4C14 5.333 12.333 7 11 9c-1.333 2-2 4.333-2 7h7v16H0zm22 0V20c0-5.333 1.333-9.667 4-13 2.667-3.333 6.667-5.667 12-7l2 4c-4 1.333-5.667 3-5 5-.667 2-1 4.333-1 7h7v16H22z" fill="currentColor"/>
              </svg>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "17px", fontWeight: 500, lineHeight: 1.8, color: "rgba(255,255,255,0.88)", fontStyle: "italic" }}>
                Menjadi pemimpin, pusat pendidikan dan teknologi tinggi yang unggul, bermartabat untuk ilmu pengetahuan dan teknologi dalam survei dan pemetaan serta ilmu informasi geografis dalam perspektif aktivitas manusia yang unik dan perubahan lingkungan yang menjadi karakteristik Indonesia.
              </p>
            </div>
          </div>

          {/* Mission */}
          <div style={{ marginBottom: "64px" }}>
            <p className="gd-section-kicker">Misi</p>
            <h2 className="gd-section-title">Mission</h2>
            <div className="gd-section-divider" />
            <div style={{ background: "var(--off-white)", padding: "40px", borderLeft: "6px solid var(--blue)", maxWidth: "860px" }}>
              <p style={{ fontSize: "16px", lineHeight: 1.8, color: "var(--gray-600)" }}>
                Melaksanakan pendidikan tinggi yang inovatif dan unggul dalam survei, pemetaan dan ilmu informasi geografis berdasarkan penelitian dan berorientasi pada perubahan lingkungan dan hubungannya dengan kegiatan manusia untuk mendukung pembangunan nasional Indonesia.
              </p>
            </div>
          </div>

          {/* Program Objectives */}
          <div>
            <p className="gd-section-kicker">Tujuan Program</p>
            <h2 className="gd-section-title">Program Objectives</h2>
            <div className="gd-section-divider" />
            <p style={{ fontSize: "15px", lineHeight: 1.75, color: "var(--gray-600)", marginBottom: "28px", maxWidth: "700px" }}>
              Program Teknik Geodesi dan Geomatika bertujuan untuk menghasilkan lulusan yang:
            </p>
            <div style={{ display: "flex", flexDirection: "column" as const, gap: "16px", maxWidth: "860px" }}>
              {objectives.map((obj, i) => (
                <div key={i} style={{ display: "flex", gap: "20px", alignItems: "flex-start", background: "var(--white)", border: "1px solid var(--gray-200)", padding: "24px" }}>
                  <div style={{
                    flexShrink: 0,
                    width: "40px", height: "40px",
                    background: "var(--orange)",
                    color: "var(--white)",
                    fontFamily: "var(--font-display)",
                    fontSize: "18px",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    {i + 1}
                  </div>
                  <p style={{ fontSize: "15px", lineHeight: 1.7, color: "var(--gray-600)", paddingTop: "8px" }}>{obj}</p>
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
// NEWS PAGE (Profile > News)
// ============================================================
export function NewsPage({ onNavigate }: PageProps) {
  const posts = [
    {
      title: "Tim Geodesi ITB Raih Penghargaan di Konferensi ION GNSS+ 2024",
      date: "15 November 2024",
      category: "Research",
      excerpt: "Tim riset dari Departemen Teknik Geodesi dan Geomatika ITB berhasil mempresentasikan hasil penelitian terkait sistem GPS-CORS di konferensi internasional ION GNSS+ 2024 yang berlangsung di Baltimore, Amerika Serikat.",
      image: "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=600&q=80",
    },
    {
      title: "Wisuda Oktober 2024: Selamat kepada Lulusan Geodesi & Geomatika",
      date: "28 Oktober 2024",
      category: "Academic",
      excerpt: "Sebanyak 87 mahasiswa Teknik Geodesi dan Geomatika ITB diwisuda pada periode Oktober 2024. Upacara wisuda dihadiri oleh Rektor ITB, Dekan FITB, dan keluarga para wisudawan.",
      image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=600&q=80",
    },
    {
      title: "Kuliah Lapangan Fotogrametri UAV di Bandung Selatan",
      date: "10 Oktober 2024",
      category: "Academic",
      excerpt: "Mahasiswa semester 5 mengikuti praktikum fotogrametri menggunakan drone UAV di kawasan Bandung Selatan. Pengolahan data dilakukan menggunakan software Agisoft Metashape untuk menghasilkan model 3D kawasan.",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&q=80",
    },
    {
      title: "Departemen GD-ITB Tandatangani MoU dengan BIG untuk Riset Geospasial",
      date: "5 September 2024",
      category: "Collaboration",
      excerpt: "Departemen Teknik Geodesi dan Geomatika ITB resmi menandatangani Memorandum of Understanding dengan Badan Informasi Geospasial (BIG) untuk memperkuat kerja sama riset dan pengembangan infrastruktur data spasial nasional.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&q=80",
    },
    {
      title: "Seminar Nasional Geomatika 2024: Geospasial untuk Indonesia Emas",
      date: "20 Agustus 2024",
      category: "Event",
      excerpt: "Seminar Nasional Geomatika 2024 dengan tema 'Geospasial untuk Indonesia Emas 2045' berhasil diselenggarakan dengan sukses. Acara ini dihadiri oleh lebih dari 300 peserta dari berbagai universitas dan instansi pemerintah.",
      image: "https://images.unsplash.com/photo-1562774053-701939374585?w=600&q=80",
    },
    {
      title: "Beasiswa LPDP 2024: Mahasiswa GD-ITB Raih Pendanaan S2 Internasional",
      date: "1 Agustus 2024",
      category: "Student",
      excerpt: "Tiga mahasiswa Teknik Geodesi dan Geomatika ITB berhasil meraih beasiswa LPDP untuk melanjutkan studi S2 di universitas terkemuka di Belanda, Jerman, dan Australia pada tahun akademik 2024/2025.",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80",
    },
  ];

  const categoryColors: Record<string, string> = {
    Research: "var(--blue)",
    Academic: "var(--navy)",
    Collaboration: "var(--orange)",
    Event: "#6b7280",
    Student: "#059669",
  };

  return (
    <div>
      <Breadcrumb items={[{ label: "Profile", page: "profile" }, { label: "News", page: "" }]} onNavigate={onNavigate} />
      <PageHero
        kicker="Profile"
        title="News & Activities"
        subtitle="Latest news, events, and achievements from the Department of Geodesy & Geomatics Engineering."
      />

      <section className="gd-page-section">
        <div className="gd-container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "28px" }}>
            {posts.map((post) => (
              <article key={post.title} style={{ background: "var(--white)", border: "1px solid var(--gray-200)", overflow: "hidden", display: "flex", flexDirection: "column" as const }}>
                <div style={{ height: "200px", overflow: "hidden" }}>
                  <img src={post.image} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ padding: "24px", flex: 1, display: "flex", flexDirection: "column" as const }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                    <span style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase" as const,
                      padding: "3px 10px",
                      background: categoryColors[post.category] || "var(--navy)",
                      color: "var(--white)",
                    }}>{post.category}</span>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: "12px", color: "var(--gray-400)", marginLeft: "auto" }}>{post.date}</span>
                  </div>
                  <h2 style={{ fontFamily: "var(--font-display)", fontSize: "17px", fontWeight: 700, color: "var(--navy)", lineHeight: 1.35, marginBottom: "10px" }}>{post.title}</h2>
                  <p style={{ fontSize: "14px", lineHeight: 1.7, color: "var(--gray-600)", flex: 1 }}>{post.excerpt}</p>
                  <a href="#" style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    fontFamily: "var(--font-display)",
                    fontSize: "12px",
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase" as const,
                    color: "var(--navy)",
                    marginTop: "16px",
                  }}>
                    Read More →
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
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