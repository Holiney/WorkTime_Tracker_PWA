const CACHE_NAME = "worktime-tracker-v2";
const OFFLINE_PAGE = "/offline.html";
const API_CACHE_NAME = "worktime-tracker-api-v1";

const iconPaths = Array.from(
  { length: 20 },
  (_, index) => `/userIcons/icon${index + 1}.png`
);

const ASSETS = [
  "/",
  "/index.html",
  "/static/js/bundle.js",
  "/static/css/main.css",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
  "/userIcons/icon2.png",
  OFFLINE_PAGE,
  ...iconPaths,
];

self.addEventListener("install", (event) => {
  console.log("Service Worker: Installing...");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Service Worker: Caching assets...");
      return cache.addAll(ASSETS).catch((error) => {
        console.error("Service Worker: Помилка при кешуванні ресурсів:", error);
      });
    })
  );
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker: Activating...");
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== API_CACHE_NAME) {
            console.log("Service Worker: Deleting old cache:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  console.log("Service Worker: Fetching:", event.request.url);

  if (event.request.url.includes("/api/")) {
    event.respondWith(
      caches.open(API_CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          return (
            response ||
            fetch(event.request).then((networkResponse) => {
              cache.put(event.request, networkResponse.clone());
              return networkResponse;
            })
          );
        });
      })
    );
  } else if (event.request.url.includes("/userIcons/")) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return (
          response ||
          fetch(event.request).then((networkResponse) => {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, networkResponse.clone());
            });
            return networkResponse;
          })
        );
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return (
          response ||
          fetch(event.request).catch(() => {
            return caches.match(OFFLINE_PAGE);
          })
        );
      })
    );
  }
});
