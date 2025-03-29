import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: "React Клікер",
        short_name: "Клікер",
        icons: [
          {
            src: "/icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icon-512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#007bff",
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /\/.*/,
            handler: "NetworkFirst",
            options: {
              cacheName: "offline-cache",
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 60 * 60 * 24,
              },
            },
          },
        ],
      },
    }),
  ],
});
// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import { VitePWA } from "vite-plugin-pwa";

// // Правильний конфіг БЕЗ @tailwindcss/vite (такий плагін не потрібен!)
// export default defineConfig({
//   plugins: [
//     react(),
//     VitePWA({
//       manifest: {
//         name: "React Клікер",
//         short_name: "Клікер",
//         icons: [
//           {
//             src: "/icon-192.png",
//             sizes: "192x192",
//             type: "image/png",
//           },
//           {
//             src: "/icon-512.png",
//             sizes: "512x512",
//             type: "image/png",
//           },
//         ],
//         start_url: "/",
//         display: "standalone",
//         background_color: "#ffffff",
//         theme_color: "#007bff",
//       },
//       workbox: {
//         runtimeCaching: [
//           {
//             urlPattern: /\/.*/,
//             handler: "NetworkFirst",
//             options: {
//               cacheName: "offline-cache",
//               expiration: {
//                 maxEntries: 20,
//                 maxAgeSeconds: 60 * 60 * 24,
//               },
//             },
//           },
//         ],
//       },
//     }),
//   ],
// });
