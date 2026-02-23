# GD ITB Website — Teknik Geodesi & Geomatika FITB ITB

Oxford-inspired institutional website untuk Departemen Teknik Geodesi dan Geomatika, FITB, Institut Teknologi Bandung.

## Struktur Proyek

```
gd-itb-website/
├── index.html                  # HTML entry point
├── vite.config.ts              # Vite + dev proxy config
├── tsconfig.json               # TypeScript config
├── package.json
│
└── src/
    ├── main.tsx                # React root render
    ├── App.tsx                 # Root component + page router
    │
    ├── components/
    │   ├── layout/
    │   │   ├── Header.tsx      # Topbar + Navbar (fixed)
    │   │   ├── Footer.tsx      # Footer dengan nav & social links
    │   │   └── index.ts        # Barrel exports
    │   │
    │   ├── sections/           # Home page sections
    │   │   ├── BannerSlider.tsx  # Hero slideshow
    │   │   ├── WhatIs.tsx        # Tab block — "What is Geodesy?"
    │   │   ├── History.tsx       # Timeline + stats
    │   │   ├── News.tsx          # Instagram / news grid
    │   │   └── index.ts          # Barrel exports
    │   │
    │   └── pages/              # Interior page components
    │       ├── Pages.tsx         # AcademicsPage, ResearchPage, dll.
    │       └── index.ts          # Barrel exports
    │
    ├── hooks/
    │   └── useWordPress.ts     # Data fetching hooks (WP REST API)
    │
    ├── styles/
    │   └── main.css            # Design system — satu-satunya stylesheet
    │
    ├── types/
    │   ├── index.ts            # App types (NavItem, SlideItem, dll.)
    │   └── wordpress.ts        # WordPress REST API types
    │
    └── utils/
        ├── api.ts              # API client — gd.fitb.itb.ac.id/wp-json
        └── data.ts             # Static data (nav, slides, timeline, dll.)
```

## Development

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # Production build ke /dist
npm run preview   # Preview production build
```

## Konfigurasi

Dev server di-proxy ke `https://gd.fitb.itb.ac.id` sehingga panggilan ke `/wp-json/...` langsung diteruskan ke WordPress tanpa CORS.

## Stack

- **React 18** + **TypeScript**
- **Vite 5** (bundler)
- **CSS custom properties** — tidak ada framework CSS eksternal
- **WordPress REST API** — endpoint utama untuk konten dinamis
- **The Events Calendar (Tribe)** — untuk agenda/events
- **Contact Form 7** — untuk form kontak

## File yang Dihapus (refactor)

File-file berikut telah dihapus karena duplikat atau tidak terpakai:

| File lama | Alasan dihapus |
|-----------|----------------|
| `src/styles.css` | Duplikat, digabung ke `src/styles/main.css` |
| `src/styles/globals.css` | File Tailwind dari iterasi lama, tidak terpakai |
| `src/components/layout/NavbarFooter.tsx` | Duplikat dari `Header.tsx` + `Footer.tsx` |
| `src/components/sections/Sections.tsx` | Iterasi lama dengan Tailwind, tidak terpakai |
| `src/components/sections/Placeholders.tsx` | Digabung ke `pages/Pages.tsx` |
| `src/components/ui/Components.tsx` | Hanya dipakai `Sections.tsx` yang sudah dihapus |
