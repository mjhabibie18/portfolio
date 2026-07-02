# Portofolio Habibie - Frontend (Next.js)

Repositori ini berisi bagian Frontend dari sistem portofolio Habibie. 
Aplikasi ini dibangun dengan arsitektur terpisah (decoupled), berjalan independen dari backend CMS untuk memastikan skalabilitas, performa, dan pengiriman konten yang cepat.

## Teknologi Utama
* Framework: Next.js 14 (App Router)
* Bahasa Pemrograman: TypeScript / React
* Styling: Vanilla CSS Modern (Efek Glassmorphism, Animasi)
* Arsitektur: Decoupled Headless UI
* Multi-Bahasa (i18n): Routing dinamis kustom (Bahasa Inggris & Indonesia)

## Fitur Utama
* Full Dinamis: Seluruh konten (Hero, Tentang Saya, Pengalaman Kerja, Keahlian, Proyek) diambil secara real-time dari backend API ASP.NET Core.
* Dukungan Multi-Bahasa: Transisi mulus antara Bahasa Inggris (`/en`) dan Bahasa Indonesia (`/id`).
* Optimasi SEO: Memanfaatkan fitur Server-Side Rendering (SSR) bawaan Next.js.
* User Experience: Menggunakan smooth scrolling, navbar transparan, dan animasi berbasis Intersection Observer.

## Pengembangan Lokal

1. Instalasi Modul (Dependencies):
   ```bash
   npm install
   ```
2. Konfigurasi Backend:
   Pastikan backend ASP.NET Core sudah berjalan di `http://localhost:5131`. Aplikasi Next.js ini secara otomatis mencari endpoint di `/api/portfolio/...`.
3. Jalankan Server Pengembangan:
   ```bash
   npm run dev
   ```
4. Buka http://localhost:3000 di browser Anda.

## Panduan Deployment
Frontend ini dirancang untuk diluncurkan ke platform seperti Vercel tanpa konfigurasi rumit:
1. Push repositori ini ke GitHub.
2. Impor proyek dari dasbor Vercel Anda.
3. Deploy (Tidak membutuhkan pengaturan environment variables tambahan).
