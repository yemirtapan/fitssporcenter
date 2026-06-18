const CACHE_NAME = 'fitsspor-v3'; // Sürüm güncellendi, eski cache temizlenecek
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './logo.jpg'
];

// Yeni kodları zorla yükletme
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    }).then(() => self.skipWaiting()) // Beklemeden yeni sürüme geç
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key); // Eski sürümleri hafızadan sil
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
