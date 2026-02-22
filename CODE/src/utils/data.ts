import type { NavItem, SlideItem, TabItem, TimelineItem, NewsPost } from "../types";

export const NAV_ITEMS: NavItem[] = [
  {
    label: "Profile",
    href: "#profile",
    children: [
      { label: "What is Geodesy & Geomatics?", href: "#what-is" },
      { label: "Our History", href: "#history" },
      { label: "Vision & Mission", href: "#vision" },
      { label: "News", href: "#news" },
    ],
  },
  {
    label: "Academics",
    href: "#academics",
    children: [
      { label: "Undergraduate Program (S1)", href: "#s1" },
      { label: "Graduate Program (S2)", href: "#s2" },
      { label: "Doctoral Program (S3)", href: "#s3" },
      { label: "Curriculum", href: "#curriculum" },
      { label: "Academic Calendar", href: "#calendar" },
    ],
  },
  {
    label: "Research",
    href: "#research",
    children: [
      { label: "Research Groups", href: "#research-groups" },
      { label: "Publications", href: "#publications" },
      { label: "Laboratories", href: "#labs" },
      { label: "Collaboration", href: "#collaboration" },
    ],
  },
  {
    label: "Student Affairs",
    href: "#student-affairs",
    children: [
      { label: "Student Organizations", href: "#orgs" },
      { label: "Scholarships", href: "#scholarships" },
      { label: "Career & Alumni", href: "#career" },
      { label: "Student Facilities", href: "#facilities" },
    ],
  },
  { label: "Contact Us", href: "#contact" },
];

export const SLIDES: SlideItem[] = [
  {
    image: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=1920&q=80",
    title: "Mapping the World,\nShaping the Future",
    subtitle: "Department of Geodesy & Geomatics Engineering — FITB ITB",
    cta: { label: "Explore Our Programs", href: "#academics" },
  },
  {
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1920&q=80",
    title: "Precision in Every\nMeasurement",
    subtitle: "Leading research in geospatial technology since 1959",
    cta: { label: "Our Research", href: "#research" },
  },
  {
    image: "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=1920&q=80",
    title: "From Earth's Surface\nto the Stars",
    subtitle: "Geodesy, Remote Sensing, and Geographic Information Systems",
    cta: { label: "Discover More", href: "#what-is" },
  },
  {
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80",
    title: "Global Standards,\nLocal Impact",
    subtitle: "Collaborating with industry and government for Indonesia's geospatial future",
    cta: { label: "See Our Work", href: "#research" },
  },
  {
    image: "https://images.unsplash.com/photo-1605289982774-9a6fef564df8?w=1920&q=80",
    title: "60+ Years of\nAcademic Excellence",
    subtitle: "Educating Indonesia's finest geodesists and geomatics engineers",
    cta: { label: "Our History", href: "#history" },
  },
];

export const WHAT_IS_TABS: TabItem[] = [
  {
    label: "Geodesy",
    title: "What is Geodesy?",
    image: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=900&q=80",
    imageAlt: "Geodetic survey instrument on mountain",
    body: "Geodesy is the scientific discipline that deals with the measurement and representation of the Earth, including its gravitational field, in a three-dimensional time-varying space. Geodesists study the size and shape of the Earth, how it moves, and the nature of its gravity field. Modern geodesy uses satellite technology — particularly GPS and GNSS — to provide precise positioning that underpins navigation, mapping, and infrastructure development worldwide.",
    links: [
      { label: "Physical Geodesy Lab", href: "#labs" },
      { label: "GNSS Research Group", href: "#research-groups" },
    ],
  },
  {
    label: "Geomatics",
    title: "What is Geomatics Engineering?",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80",
    imageAlt: "Satellite imagery of Earth from orbit",
    body: "Geomatics Engineering is a modern discipline that encompasses the collection, management, analysis, and visualization of spatially referenced data. It integrates traditional surveying with modern technologies including remote sensing, geographic information systems (GIS), photogrammetry, and satellite navigation. Geomatics engineers are the architects of our digital world — they build the spatial data infrastructure that drives smart cities, disaster management, environmental monitoring, and autonomous vehicles.",
    links: [
      { label: "GIS Laboratory", href: "#labs" },
      { label: "Remote Sensing Group", href: "#research-groups" },
    ],
  },
  {
    label: "Career Paths",
    title: "Where Do Our Graduates Go?",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=900&q=80",
    imageAlt: "Engineers working with geospatial data on screens",
    body: "Graduates of Geodesy & Geomatics Engineering are among the most versatile engineers in Indonesia. They work across government agencies such as BIG (Badan Informasi Geospasial), BPN (National Land Agency), and LAPAN; in oil & gas companies like Pertamina and Schlumberger; in technology firms building geospatial applications; in civil engineering and infrastructure consulting; and in academia and research institutions worldwide. Many alumni have pioneered Indonesia's national geospatial infrastructure.",
    links: [
      { label: "Alumni Network", href: "#career" },
      { label: "Career Resources", href: "#career" },
    ],
  },
  {
    label: "Specializations",
    title: "Areas of Specialization",
    image: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=900&q=80",
    imageAlt: "Drone survey over landscape",
    body: "Our undergraduate and postgraduate programs offer specialization in six major areas: Physical Geodesy & GNSS, which covers satellite positioning and Earth's gravity field; Photogrammetry & Remote Sensing, applying aerial and satellite imagery for mapping; Geographic Information Systems, building digital spatial databases; Cadastral & Land Surveying, underpinning Indonesia's land registration system; Hydrography & Marine Geodesy, mapping seas and coastlines; and Cartography & Spatial Visualization, the art and science of map design.",
    links: [
      { label: "Academic Programs", href: "#academics" },
      { label: "Research Labs", href: "#labs" },
    ],
  },
];

export const HISTORY_TIMELINE: TimelineItem[] = [
  { year: "1959", event: "Department established as part of the Faculty of Civil Engineering at ITB, making it the first geodesy program in Indonesia." },
  { year: "1963", event: "First batch of geodesy engineers graduated, immediately contributing to national land surveying efforts." },
  { year: "1973", event: "Department expanded with the introduction of photogrammetry and remote sensing curriculum, one of the first in Southeast Asia." },
  { year: "1985", event: "Postgraduate (S2) program launched, strengthening research capacity in satellite geodesy." },
  { year: "1993", event: "Moved to the newly established Faculty of Earth Sciences and Technology (FITB), reflecting the broader earth sciences context of geodesy." },
  { year: "2001", event: "Doctoral (S3) program established. Department renamed to Geodesy & Geomatics Engineering to reflect modern scope." },
  { year: "2008", event: "Received highest accreditation (A) from BAN-PT. Major research partnerships established with BIG and BPN." },
  { year: "2015", event: "AUN-QA international accreditation achieved, recognizing teaching quality at the ASEAN university network standard." },
  { year: "2019", event: "60th anniversary. Launch of state-of-the-art Geospatial Intelligence Laboratory and expanded drone/UAV research programs." },
  { year: "2024", event: "Continued excellence with over 3,000 alumni across government, industry, and academia worldwide." },
];

// Instagram posts — in production these would come from Instagram Basic Display API
// Using placeholder data representative of @geodesigeomatika.itb style content
export const INSTAGRAM_POSTS: NewsPost[] = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&q=80",
    caption: "🌏 Praktikum Fotogrametri Semester Ganjil 2024/2025 — Mahasiswa GD ITB melakukan akuisisi data menggunakan drone UAV di kawasan Bandung Selatan. Pengolahan titik awan (point cloud) menggunakan software Agisoft Metashape. #geodesiitb #fotogrametri #uav #geomatika",
    timestamp: "2 hari lalu",
    likes: 284,
    permalink: "https://www.instagram.com/geodesigeomatika.itb/",
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=600&q=80",
    caption: "🛰️ Selamat kepada tim riset Geodesi ITB yang berhasil mempresentasikan hasil penelitian GPS-CORS di konferensi internasional ION GNSS+ 2024 di Baltimore, USA. Proud of you! 🎉 #gnss #gps #geodesiitb #risetinternasional",
    timestamp: "5 hari lalu",
    likes: 412,
    permalink: "https://www.instagram.com/geodesigeomatika.itb/",
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=600&q=80",
    caption: "📍 Kuliah Lapangan Pengukuran Geodetik di Gunung Tangkuban Perahu — Mahasiswa angkatan 2022 belajar langsung pengukuran dengan Total Station dan GNSS receiver di kondisi medan yang menantang. Great experience! #survei #geodesi #kuliahlapangan #itbbandung",
    timestamp: "1 minggu lalu",
    likes: 537,
    permalink: "https://www.instagram.com/geodesigeomatika.itb/",
  },
  {
    id: "4",
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=600&q=80",
    caption: "🏆 Selamat kepada wisudawan/wisudawati Geodesi & Geomatika ITB periode Oktober 2024! Semoga ilmu yang diperoleh dapat memberikan manfaat bagi Indonesia. Congratulations Class of 2024! 🎓 #wisuda #geodesiitb #geomatikaengineering #itb2024",
    timestamp: "2 minggu lalu",
    likes: 893,
    permalink: "https://www.instagram.com/geodesigeomatika.itb/",
  },
];
