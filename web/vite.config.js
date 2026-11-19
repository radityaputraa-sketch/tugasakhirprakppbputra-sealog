import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate', // service worker memperbarui diri sendiri kalau ada versi baru
      includeAssets: ['favicon.svg', 'apple-touch-icon.png'],

      // ===== MANIFEST: identitas aplikasi =====
      manifest: {
        name: 'SeaLog — Katalog Kapal & Pelabuhan',
        short_name: 'SeaLog',                 // nama di bawah ikon layar utama
        description: 'Katalog jenis kapal dan pelabuhan Indonesia.',
        lang: 'id',
        start_url: '/',                       // halaman pertama saat aplikasi dibuka
        display: 'standalone',                // tampil tanpa address bar, seperti aplikasi biasa
        orientation: 'portrait',
        background_color: '#f2efe6',          // warna splash screen
        theme_color: '#14212e',               // warna status bar HP
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icon-512-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },

      // ===== SERVICE WORKER: aturan cache =====
      workbox: {
        // File aplikasi yang disimpan saat pertama kali dibuka (precache)
        globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
        navigateFallback: '/index.html',

        // Data dari API disimpan saat diakses (runtime cache)
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname.startsWith('/api/'),
            handler: 'NetworkFirst', // coba internet dulu; kalau gagal, ambil dari cache
            options: {
              cacheName: 'sealog-api',
              networkTimeoutSeconds: 5,
              expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 * 7 }, // simpan maksimal 7 hari
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
  ],
});