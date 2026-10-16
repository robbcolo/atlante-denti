/* Atlante denti — service worker: everything is cached at install, so the app works offline. */
const CACHE = 'atlante-1.1.0';
const FILES = [
"./",
"fonts/archivo-latin-ext-wdth-normal.woff2",
"fonts/archivo-latin-wdth-normal.woff2",
"fonts/fonts.css",
"fonts/ibm-plex-mono-latin-400-normal.woff2",
"fonts/ibm-plex-mono-latin-500-normal.woff2",
"fonts/ibm-plex-mono-latin-600-normal.woff2",
"fonts/source-sans-3-latin-ext-wght-normal.woff2",
"fonts/source-sans-3-latin-wght-italic.woff2",
"fonts/source-sans-3-latin-wght-normal.woff2",
"icons/apple-touch-icon.png",
"icons/icon-192.png",
"icons/icon-512-maskable.png",
"icons/icon-512.png",
"img/11.webp",
"img/12.webp",
"img/13.webp",
"img/14.webp",
"img/15.webp",
"img/16.webp",
"img/17.webp",
"img/18.webp",
"img/21.webp",
"img/22.webp",
"img/23.webp",
"img/24.webp",
"img/25.webp",
"img/26.webp",
"img/27.webp",
"img/28.webp",
"img/31.webp",
"img/32.webp",
"img/33.webp",
"img/34.webp",
"img/35.webp",
"img/36.webp",
"img/37.webp",
"img/38.webp",
"img/41.webp",
"img/42.webp",
"img/43.webp",
"img/44.webp",
"img/45.webp",
"img/46.webp",
"img/47.webp",
"img/48.webp",
"img/arch_inf.webp",
"img/arch_sup.webp",
"img/f11.webp",
"img/f12.webp",
"img/f13.webp",
"img/f14.webp",
"img/f15.webp",
"img/f16.webp",
"img/f17.webp",
"img/f18.webp",
"img/f21.webp",
"img/f22.webp",
"img/f23.webp",
"img/f24.webp",
"img/f25.webp",
"img/f26.webp",
"img/f27.webp",
"img/f28.webp",
"img/f31.webp",
"img/f32.webp",
"img/f33.webp",
"img/f34.webp",
"img/f35.webp",
"img/f36.webp",
"img/f37.webp",
"img/f38.webp",
"img/f41.webp",
"img/f42.webp",
"img/f43.webp",
"img/f44.webp",
"img/f45.webp",
"img/f46.webp",
"img/f47.webp",
"img/f48.webp",
"index.html",
"m3d/Ci.bin",
"m3d/Cs.bin",
"m3d/I1i.bin",
"m3d/I1s.bin",
"m3d/I2i.bin",
"m3d/I2s.bin",
"m3d/M1i.bin",
"m3d/M1i_occ.webp",
"m3d/M1s.bin",
"m3d/M1s_occ.webp",
"m3d/M2i.bin",
"m3d/M2i_occ.webp",
"m3d/M2s.bin",
"m3d/M2s_occ.webp",
"m3d/M3i.bin",
"m3d/M3i_occ.webp",
"m3d/M3s.bin",
"m3d/M3s_occ.webp",
"m3d/P1i.bin",
"m3d/P1i_occ.webp",
"m3d/P1s.bin",
"m3d/P1s_occ.webp",
"m3d/P2i.bin",
"m3d/P2i_occ.webp",
"m3d/P2s.bin",
"m3d/P2s_occ.webp",
"manifest.webmanifest",
"vendor/three.min.js"
];

self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const c = await caches.open(CACHE);
    // one by one: a single slow file must not abort the whole install on a weak connection
    for (const f of FILES) {
      for (let t = 0; t < 3; t++) {
        try { await c.add(new Request(f, { cache: 'reload' })); break; } catch (err) { if (t === 2) throw err; }
      }
    }
    const cl = await self.clients.matchAll({ includeUncontrolled: true });
    cl.forEach(x => x.postMessage({ type: 'cached' }));
  })());
});

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k.startsWith('atlante-') && k !== CACHE).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('message', e => { if (e.data && e.data.type === 'skip') self.skipWaiting(); });

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  e.respondWith((async () => {
    const c = await caches.open(CACHE);
    const hit = await c.match(req, { ignoreSearch: true }) || (req.mode === 'navigate' ? await c.match('index.html') : null);
    if (hit) return hit;
    try {
      const res = await fetch(req);
      if (res.ok) c.put(req, res.clone());
      return res;
    } catch (err) {
      return new Response('Offline', { status: 503, statusText: 'Offline' });
    }
  })());
});
