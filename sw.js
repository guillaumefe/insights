/* sw.js — PWA (network-first) */
const CACHE = 'app-v1';
const ASSETS = [
  './',               // index.html
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-512-maskable.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('message', (e) => {
  if (e.data && e.data.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', (e) => {
  const req = e.request;

  // Network-first pour les navigations (HTML) et les requêtes same-origin
  if (req.mode === 'navigate' || (req.destination === 'document')) {
    e.respondWith(networkFirstWithFallbackToIndex(req));
    return;
  }

  // Pour autres requêtes same-origin : network-first aussi
  const url = new URL(req.url);
  if (url.origin === location.origin) {
    e.respondWith(networkFirst(req));
  }
});

async function networkFirstWithFallbackToIndex(req) {
  try {
    const fresh = await fetch(req, { cache: 'no-store' });
    const cache = await caches.open(CACHE);
    cache.put(req, fresh.clone());
    return fresh;
  } catch {
    // Fallback cache pour la route demandée, sinon retombe sur index.html (SPA)
    const cache = await caches.open(CACHE);
    return (await cache.match(req)) || (await cache.match('./index.html'));
  }
}

async function networkFirst(req) {
  try {
    const fresh = await fetch(req, { cache: 'no-store' });
    const cache = await caches.open(CACHE);
    cache.put(req, fresh.clone());
    return fresh;
  } catch {
    const cached = await caches.match(req);
    if (cached) return cached;
    throw new Error('offline and not cached');
  }
}
