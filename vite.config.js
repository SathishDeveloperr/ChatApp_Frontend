import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://chatapp-backend-uibs.onrender.com',
        secure: false,
        changeOrigin: true,
      },
    },
  },
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: 'ChatPlus',
        short_name: 'ChatPlus',
        description: 'A messaging and file-sharing platform',
        icons: [
          { src: '/images/logo144.png', sizes: '144x144', type: 'image/png' },
          { src: '/images/logo192.png', sizes: '192x192', type: 'image/png' },
          { src: '/images/logo256.png', sizes: '256x256', type: 'image/png' },
          { src: '/images/logo384.png', sizes: '384x384', type: 'image/png' },
          { src: '/images/logo512.png', sizes: '512x512', type: 'image/png' },
        ],
        start_url: '/',
        scope: '/',
        display: 'standalone',
        orientation: 'portrait',
        theme_color: '#ffffff',
        background_color: '#ffffff',
      },
      registerType: 'autoUpdate',
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60,
              },
            },
          },
        ],
      },
    }),
  ],
  build: {
    chunkSizeWarningLimit: 500,
  },
});
