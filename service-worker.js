const CACHE_NAME = "gezondheid-app-v1";

const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/gezondheidinfo.html",
  "/mentaleGezondheid.html",
  "/crud.html",
  "/style.css",
  "/lokale-storage.js",
  "/manifest.json",
];

// Installatie: cache alle bestanden
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate: oude caches verwijderen
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// Fetch: eerst netwerk, anders cache
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
