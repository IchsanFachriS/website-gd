// ============================================================
// research/ResearchGroupsPage.tsx  — imgUrl fix
// ============================================================
import { useState } from "react";
import { Breadcrumb, PageHero } from "../_shared/PageShell";
import type { PageProps } from "../_shared/PageShell";
import { imgUrl } from "../../../utils/basePath";

// ── Types ─────────────────────────────────────────────────────
interface Lecturer { name: string; image: string; }
interface ResearchGroup {
  id: string; abbr: string; name: string; fullName: string;
  intro: string; focus: string[]; lecturers: Lecturer[];
}

// ── Data ──────────────────────────────────────────────────────
const RESEARCH_GROUPS: ResearchGroup[] = [
  {
    id: "srig", abbr: "SRIG",
    name: "Sains Rekayasa dan Inovasi Geodesi",
    fullName: "Kelompok Keahlian Sains Rekayasa dan Inovasi Geodesi",
    intro: "Kelompok Keahlian (KK) Geodesi adalah disiplin ilmu mengenai pengukuran di permukaan bumi dari pesawat dan pesawat ruang angkasa untuk mempelajari tentang bentuk dan ukuran Bumi, planet dan satelit, serta perubahannya. KK ini juga mempelajari tentang penentuan posisi dan kecepatan titik atau objek di permukaan bumi secara akurat atau yang mengorbit bumi dan planet dalam sistem referensi tertentu serta menerapkan pengetahuan tersebut ke berbagai aplikasi ilmiah dan teknik menggunakan matematika, fisika, astronomi, dan ilmu komputer. Menurut definisi terbaru mengenai Geodesi yang diberikan oleh IAG, bidang studi utama dalam Geodesi dibagi menjadi 3 bagian yaitu penentuan posisi, penentuan medan gravitasi, dan variasi temporal posisi dan medan gravitasi, dimana Bumi bersama dengan benda langit lainnya sebagai domain spasial. Setiap bidang kajian memiliki spektrum yang sangat luas, mulai dari teoritis hingga praktis, dari bumi hingga benda-benda angkasa lainnya, termasuk kekuatan darat, laut, udara, dan antariksa. Ilmu geodesi identik dengan penentuan posisi yang dapat diekspresikan baik secara kualitatif maupun kuantitatif dalam bentuk 1D, 2D, 3D, dan 4D.",
    focus: ["Sistem Refrerensi","Medan Gayaberat Bumi","Rotasi Bumi & Geokinematik","Penentuan Posisi dan Aplikasinya","Pemantauan Bencana secara Spasial dan Waktu","Sains Data Geodesi"],
    lecturers: [
      { name: "Prof. Ir. Hasanuddin Zainal Abidin, M.Sc., Ph.D.", image: "img/kk/dosen-srig/srig-1.png" },
      { name: "Dr. Ir. Wedyanto, M.Sc.", image: "img/kk/dosen-srig/srig-2.png" },
      { name: "Dr. techn. Dudy Darmawan Wijaya, S.T, M.Sc.", image: "img/kk/dosen-srig/srig-3.png" },
      { name: "Ir. Agustinus Bambang Setyadji, M.Si., D.Sc.", image: "img/kk/dosen-srig/srig-4.png" },
      { name: "Dr. Ir. Dina Anggreni Sarsito, S.T., M.Si", image: "img/kk/dosen-srig/srig-5.png" },
      { name: "Dr. Heri Andreas, S.T, M.T.", image: "img/kk/dosen-srig/srig-6.png" },
      { name: "Dr. Zamzam Akhmad Jamaluddin Tanuwijaya, M.Si.", image: "img/kk/dosen-srig/srig-7.png" },
      { name: "Dr. Irwan Gumilar, S.T., M.Si.", image: "img/kk/dosen-srig/srig-8.png" },
      { name: "Dr. Ir. Vera Sadarviana, M.T.", image: "img/kk/dosen-srig/srig-9.png" },
      { name: "Dr. Teguh Purnama Sidiq, S.T, M.T.", image: "img/kk/dosen-srig/srig-10.png" },
      { name: "Dr. Techn. Dhota Pradipta, S.T, M.T.", image: "img/kk/dosen-srig/srig-11.png" },
      { name: "Brian Bramanto, S.T., M.T., Ph.D.", image: "img/kk/dosen-srig/srig-12.png" },
    ],
  },
  {
    id: "stig", abbr: "STIG",
    name: "Sains dan Teknologi Informasi Geografis",
    fullName: "Kelompok Keahlian Sains dan Teknologi Informasi Geospasial",
    intro: "Kelompok Keilmuan Sains dan Teknologi Informasi Geografis secara aktif menyelenggarakan kegiatan akademik setiap tahunnya. Kegiatan yang dilakukan antara lain adalah workshop dan seminar tentang teknologi geospasial terkini, Unmanned Aerial Vehicle (UAV) dan Mobile Mapping System (MMS). Beberapa kuliah umum juga diadakan, melibatkan berbagai akademisi dan praktisi. KK ini juga bekerja sama dengan sektor swasta, pemerintah, dan lembaga pendidikan tinggi.",
    focus: ["Infrastruktur Data Spasial","Pengembangan Algoritma dan Pemodelan Perubahan Tata Guna Lahan (Land Use) dan Tutupan Lahan (Land Cover)","Close Range & Small Format Aerial Photogrammetry (SFAP)","Map Automation","Pengembangan Basis Data Perubahan Iklim (Geospatial Climate Change Database Development)","Ketahanan Pangan, Kemiskinan dan Kebencanaan Berbasis Geo-Spasial"],
    lecturers: [
      { name: "Prof. Ir. Ketut Wikantika, M.Eng., Ph.D.", image: "img/kk/dosen-stig/stig-1.png" },
      { name: "Prof. Dr. Albertus Deliar, S.T., M.T.", image: "img/kk/dosen-stig/stig-2.png" },
      { name: "Dr. Akhmad Riqqi, M.Si.", image: "img/kk/dosen-stig/stig-3.png" },
      { name: "Dr. Riantini Virtriana, S.T, M.T.", image: "img/kk/dosen-stig/stig-4.png" },
      { name: "Dr. Budhy Soeksmantono, S.T, M.T.", image: "img/kk/dosen-stig/stig-5.png" },
      { name: "Ir. Agung Budi Harto, M.Sc., Ph.D.", image: "img/kk/dosen-stig/stig-6.png" },
      { name: "Dr. Eng. Anjar Dimara Sakti, S.T., M.Sc.", image: "img/kk/dosen-stig/stig-7.png" },
      { name: "Dr. Rio Raharja, S.T., M.T.", image: "img/kk/dosen-stig/stig-8.jpg" },
    ],
  },
  {
    id: "hidro", abbr: "HIDROGRAFI",
    name: "Hidrografi",
    fullName: "Kelompok Keahlian Hidrografi",
    intro: "Kelompok Keahlian Hidrografi mengkhususkan diri pada survei dan pemetaan wilayah perairan, mencakup batimetri, pemantauan pesisir, navigasi maritim, serta pengelolaan sumber daya kelautan. Sebagai negara kepulauan terbesar di dunia, Indonesia membutuhkan tenaga ahli hidrografi yang kompeten, dan kelompok ini hadir untuk menjawab kebutuhan tersebut melalui riset dan pendidikan yang relevan dengan kondisi perairan Nusantara.",
    focus: ["Sains dan Rekayasa Penetapan Batas Laut","Tata Kelola Laut dan Pesisir, Kadaster Kelautan","Survei dan Pemetaan Hidrografi","Kerekayasaan dan Kriteria Desain Hidrografi","Pengelolaan Bencana Laut dan Pesisir","Pemodelan Spasial Sumber Daya dan Bencana Pesisir dan Laut","Pemodelan Daerah Aliran Sungai","Navigasi dan Robotika Kelautan","Eksplorasi Laut Dalam","Penetapan Datum Hidrografi"],
    lecturers: [
      { name: "Prof. Dr.rer.nat. Poerbandono, S.T., M.M.", image: "img/kk/dosen-hidro/hidro-1.png" },
      { name: "Prof. Dr. Ir. Eka Djunarsjah, M.T.", image: "img/kk/dosen-hidro/hidro-2.png" },
      { name: "Dr. rer. nat. Wiwin Windupranata, S.T., M.Si.", image: "img/kk/dosen-hidro/hidro-3.png" },
      { name: "Dr. Ir. Dwi Wisayantono, M.T.", image: "img/kk/dosen-hidro/hidro-4.png" },
      { name: "Gabriella Alodia, S.T., M.Sc., Ph.D.", image: "img/kk/dosen-hidro/hidro-5.png" },
      { name: "Dr. Fickrie Muhammad, S.T., M.Sc.", image: "img/kk/dosen-hidro/hidro-6.png" },
      { name: "Iyan Eka Mulia, S.Si., M.T., Ph.D.", image: "img/kk/dosen-hidro/hidro-7.jpg" },
      { name: "Miga Magenika Julian, S.T, M.T.", image: "img/kk/dosen-hidro/hidro-8.png" },
      { name: "Dr. Madam Taqiyya, S.Si., M.Sc.", image: "img/kk/dosen-hidro/hidro-9.jpg" },
    ],
  },
  {
    id: "siska", abbr: "SISKA",
    name: "Sistem Spasial dan Kadaster",
    fullName: "Kelompok Keahlian Sistem Spasial dan Kadaster",
    intro: "Sebelumnya, Kelompok Keilmuan (KK) Sistem Spasial dan Kadaster adalah bagian dari Fakultas Teknik Sipil dan Lingkungan. Pada 2007, KK ini berpindah ke Fakultas Ilmu dan Teknologi Kebumian. Penelitian KK ini berfokus pada kadaster. Kadaster adalah suatu sistem informasi pertanahan berbasis persil yang memberikan informasi terkini mengenai pertanahan, seperti hak atas tanah serta batasan dan tanggung jawab pemilikan serta pengelolaan tanah.",
    focus: ["Riset Kebencanaan","Riset Surveying","Riset Infrastruktur Kadaster 3D","Riset Kadaster"],
    lecturers: [
      { name: "Prof. Dr. Irwan Meilano, S.T., M.Sc.", image: "img/kk/dosen-siska/siska-1.png" },
      { name: "Dr. Andri Hernandi, S.T, M.T.", image: "img/kk/dosen-siska/siska-2.png" },
      { name: "Dr. Asep Yusup Saptari, S.T, M.Sc.", image: "img/kk/dosen-siska/siska-3.png" },
      { name: "Dr. Deni Suwardhi, S.T, M.T.", image: "img/kk/dosen-siska/siska-4.png" },
      { name: "Dr. Alfita Puspa Handayani, S.T, M.T.", image: "img/kk/dosen-siska/siska-5.png" },
      { name: "Dr.Techn. Nabila Sofia Eryan Putri, S.T., M.T.", image: "img/kk/dosen-siska/siska-6.jpg" },
      { name: "Dr. rer. pol. Rizqi Abdulharis, S.T, M.Sc.", image: "img/kk/dosen-siska/siska-7.png" },
      { name: "Dr. Ratri Widyastuti, S.T., M.T.", image: "img/kk/dosen-siska/siska-8.png" },
      { name: "Sella Lestari Nurmaulia, S.T, M.T.", image: "img/kk/dosen-siska/siska-9.png" },
    ],
  },
];

// ── Lecturer Card ─────────────────────────────────────────────
function LecturerCard({ lecturer }: { lecturer: Lecturer }) {
  const [imgError, setImgError] = useState(false);

  const stripped = lecturer.name
    .replace(/^(Prof\.|Dr\.|Ir\.|Dr\.techn\.|Dr\.Techn\.|Dr\.rer\.nat\.|Dr\.rer\.pol\.|Dr\.Eng\.|Dr\.techn\.)\s+/gi, "")
    .trim();
  const initials = stripped
    .split(" ")
    .filter((w) => w.match(/^[A-Z]/))
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

  return (
    <div className="rg-lecturer-card">
      <div className="rg-lecturer-photo">
        {!imgError ? (
          <img
            src={imgUrl(lecturer.image)}
            alt={lecturer.name}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="rg-lecturer-initials">{initials || "–"}</div>
        )}
      </div>
      <p className="rg-lecturer-name">{lecturer.name}</p>
    </div>
  );
}

// ── Accordion Item ────────────────────────────────────────────
function GroupAccordion({ group, index, defaultOpen }: { group: ResearchGroup; index: number; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen ?? false);

  return (
    <div className={`rg-accordion ${open ? "rg-accordion--open" : ""}`}>
      <button className="rg-accordion-trigger" onClick={() => setOpen(!open)} aria-expanded={open}>
        <span className="rg-accordion-num" aria-hidden="true">{String(index).padStart(2, "0")}</span>
        <span className="rg-accordion-labels">
          <span className="rg-accordion-abbr">{group.abbr}</span>
          <span className="rg-accordion-title">{group.name}</span>
        </span>
        <svg className="rg-accordion-chevron" viewBox="0 0 12 8" fill="none" aria-hidden="true">
          <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      <div className="rg-accordion-body">
        <div className="rg-accordion-content">
          <div className="rg-section">
            <p className="gd-section-kicker">Tentang Kelompok Keahlian</p>
            <h3 className="rg-group-heading">{group.fullName}</h3>
            <div className="gd-section-divider" />
            <p className="rg-group-intro">{group.intro}</p>
          </div>
          <div className="rg-section">
            <p className="gd-section-kicker">Bidang Penelitian</p>
            <ul className="rg-focus-list">
              {group.focus.map((f) => (
                <li key={f} className="rg-focus-item">
                  <span className="rg-focus-bullet" aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="rg-section">
            <p className="gd-section-kicker">Dosen</p>
            <div className="rg-lecturers-grid">
              {group.lecturers.map((lec) => (
                <LecturerCard key={lec.name} lecturer={lec} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────
export function ResearchGroupsPage({ onNavigate }: PageProps) {
  return (
    <div>
      <Breadcrumb items={[{ label: "Research", page: "research" }, { label: "Research Groups", page: "" }]} onNavigate={onNavigate} />
      <PageHero kicker="Research" title="Research Groups" subtitle="Empat Kelompok Keahlian yang mendorong riset geospasial kelas dunia di Teknik Geodesi dan Geomatika ITB." />
      <section className="gd-page-section">
        <div className="gd-container">
          <p className="gd-section-kicker">Kelompok Keahlian</p>
          <h2 className="gd-section-title">Our Research Groups</h2>
          <div className="gd-section-divider" />
          <div className="rg-accordion-list">
            {RESEARCH_GROUPS.map((group, i) => (
              <GroupAccordion key={group.id} group={group} index={i + 1} defaultOpen={i === 0} />
            ))}
          </div>
        </div>
      </section>
      <div style={{ paddingBottom: "56px" }}>
        <div className="gd-container">
          <button className="gd-btn gd-btn--outline" onClick={() => onNavigate("research")}>← Back to Research</button>
        </div>
      </div>
    </div>
  );
}