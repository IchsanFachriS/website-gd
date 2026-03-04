/**
 * basePath.ts
 * -----------
 * Vite menginjeksi import.meta.env.BASE_URL secara otomatis
 * berdasarkan nilai `base` di vite.config.ts.
 *
 * Nilai:
 *  - dev  : '/'
 *  - prod : '/website-gd/'   (atau sesuai VITE_BASE_URL)
 *
 * Contoh:
 *   imgUrl('img/logo.png')     → '/website-gd/img/logo.png'
 *   pageUrl('academics')       → '/website-gd/academics'
 *   pageUrl('')                → '/website-gd/'
 */

/** BASE_URL selalu diakhiri '/' oleh Vite */
export const BASE = import.meta.env.BASE_URL as string;

/**
 * Kembalikan URL absolut untuk file statis (gambar, dll.)
 * @param path - path relatif dari folder public, e.g. 'img/logo.png'
 */
export function imgUrl(path: string): string {
  // Hindari double-slash
  const p = path.startsWith('/') ? path.slice(1) : path;
  return `${BASE}${p}`;
}

/**
 * Kembalikan URL path untuk navigasi browser (pushState)
 * @param path - halaman, e.g. 'academics' atau '' untuk home
 */
export function pageUrl(path: string): string {
  if (!path) return BASE;
  const p = path.startsWith('/') ? path.slice(1) : path;
  // Hilangkan trailing slash kecuali root
  return `${BASE}${p}`.replace(/\/$/, '') || '/';
}