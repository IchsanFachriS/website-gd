import type { NavItem, SlideItem, TabItem, TimelineItem, NewsPost } from "../types";

export const NAV_ITEMS: NavItem[] = [
  {
    label: "Profile",
    href: "#profile",
    children: [
      { label: "What is Geodesy & Geomatics?", href: "#what-is" },
      { label: "Our History", href: "#history" },
      { label: "Vision & Mission", href: "#vision-mission" },
      { label: "News", href: "#news" },
    ],
  },
  {
    label: "Academics",
    href: "#academics",
    children: [
      { label: "Undergraduate Program (S1)", href: "#s1" },
      { label: "Master Program (S2)", href: "#s2" },
      { label: "Doctoral Program (S2 & S3)", href: "#s3" },
      { label: "Professional Program", href: "#professional" },
    ],
  },
  {
    label: "Research",
    href: "#research",
    children: [
      { label: "Research Groups", href: "#research-groups" },
      { label: "Community Services", href: "#community-services" },
      { label: "Laboratories", href: "#labs" },
      { label: "Collaboration", href: "#collaboration" },
    ],
  },
  {
    label: "Student Affairs",
    href: "#student-affairs",
    children: [
      { label: "Scholarships", href: "#scholarships" },
      { label: "Students Achievements", href: "#achievements" },
      { label: "Students Activities", href: "#activities" },
      { label: "Students Data", href: "#data" },
      { label: "Announcements", href: "#announcements" },
    ],
  },
  { label: "Contact Us", href: "#contact" },
];

export const SLIDES: SlideItem[] = [
  {
    image: "img/banner/banner-4.jpg",
    title: "Mapping the World,\nShaping the Future",
    subtitle: "Department of Geodesy & Geomatics Engineering — FITB ITB",
    cta: { label: "Explore Our Programs", href: "#academics" },
  },
  {
    image: "img/banner/banner-2.jpeg",
    title: "Precision in Every\nMeasurement",
    subtitle: "Leading research in geospatial technology since 1950",
    cta: { label: "Our Research", href: "#research" },
  },
  {
    image: "img/banner/banner-3.jpeg",
    title: "From Earth's Surface\nto the Stars",
    subtitle: "Geodesy, Cadastre, Remote Sensing, Hydrography and Geographic Information Systems",
    cta: { label: "Discover More", href: "#what-is" },
  },
  {
    image: "img/banner/banner-1.jpg",
    title: "Global Standards,\nLocal Impact",
    subtitle: "Collaborating with industry and government for Indonesia's geospatial future",
    cta: { label: "See Our Work", href: "#research" },
  },
  {
    image: "img/banner/banner-5.jpg",
    title: "60+ Years of\nAcademic Excellence",
    subtitle: "Educating Indonesia's finest geodesists and geomatics engineers",
    cta: { label: "Our History", href: "#history" },
  },
];

export const WHAT_IS_TABS: TabItem[] = [
  {
    label: "Geodesy",
    title: "What is Geodesy?",
    image: "img/what-is/what-is-1.jpg",
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
    image: "img/what-is/what-is-2.JPG",
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
    image: "img/what-is/what-is-3.JPG",
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
    image: "img/what-is/what-is-4.jpg",
    imageAlt: "Drone survey over landscape",
    body: "Our undergraduate and postgraduate programs offer specialization in six major areas: Physical Geodesy & GNSS, which covers satellite positioning and Earth's gravity field; Photogrammetry & Remote Sensing, applying aerial and satellite imagery for mapping; Geographic Information Systems, building digital spatial databases; Cadastral & Land Surveying, underpinning Indonesia's land registration system; Hydrography & Marine Geodesy, mapping seas and coastlines; and Cartography & Spatial Visualization, the art and science of map design.",
    links: [
      { label: "Academic Programs", href: "#academics" },
      { label: "Research Labs", href: "#labs" },
    ],
  },
];

export const HISTORY_TIMELINE: TimelineItem[] = [
  { year: "1950", event: "Geodesy education program established as Teknik Geodesi at Institut Teknologi Bandung (ITB), initially part of the Civil Engineering Department, later becoming an independent department. Primary focus on training human resources for cadastral work and land administration." },
  { year: "2003", event: "Program name changed to Teknik Geodesi dan Geomatika (Geodesy and Geomatics Engineering) to reflect the modern expansion into geospatial sciences and technologies." },
  { year: "2007", event: "Program transferred to the newly established Faculty of Earth Sciences and Technology (FITB), based on Rector's Decree No. 257/SK/K01/OT/2007, following the splitting of the former Faculty of Earth Sciences and Mineral Technology (FIKTM)." },
  { year: "2010s", event: "Achieved international accreditation (ASIIN) and national excellent accreditation (BAN-PT), recognizing high-quality education and research in geodesy and geomatics." },
  { year: "2022", event: "Launched international pathway programs in collaboration with renowned global universities; over 2,875 alumni graduated by October 2022, contributing to government, industry, and academia worldwide." },
  { year: "Present", event: "Continues as a leading program in Indonesia, integrating earth observation, geospatial technology, surveying, remote sensing, GIS, hydrography, and geodynamics, with strong emphasis on current technologies and applications." },
];

// Instagram posts — in production these would come from Instagram Basic Display API
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