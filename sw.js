const CACHE_NAME = 'fitsspor-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json'
];

// Sitenin dosyalarını telefonun hafızasına kaydetme (Kütüphaneye ekleme)
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// İnternet yoksa hafızadaki dosyaları ekrana getirme
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});