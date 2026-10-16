/* Atlante denti - service worker.
   Page (index.html): network first, so a new version shows up as soon as it is online; cached copy offline.
   Images, 3D models, fonts, libraries: cached once per content hash and reused across versions. */
const VERSION = '1.2.0';
const SHELL = 'atlante-shell-' + VERSION;
const ASSETS = 'atlante-assets';
const SHELL_FILES = ["./", "index.html", "manifest.webmanifest"];
const ASSET_HASH = {
"fonts/archivo-latin-ext-wdth-normal.woff2": "837705d412",
"fonts/archivo-latin-wdth-normal.woff2": "258a93fe93",
"fonts/fonts.css": "745aaa7acc",
"fonts/ibm-plex-mono-latin-400-normal.woff2": "bb87500e32",
"fonts/ibm-plex-mono-latin-500-normal.woff2": "d32f0e0701",
"fonts/ibm-plex-mono-latin-600-normal.woff2": "ce9a5ca3a8",
"fonts/source-sans-3-latin-ext-wght-normal.woff2": "ea449cc66b",
"fonts/source-sans-3-latin-wght-italic.woff2": "2456d7ebfa",
"fonts/source-sans-3-latin-wght-normal.woff2": "114a0e5e16",
"icons/apple-touch-icon.png": "4e611cbdbf",
"icons/icon-192.png": "177b2fc544",
"icons/icon-512-maskable.png": "baf3280627",
"icons/icon-512.png": "3eb719a345",
"img/11.webp": "b913e93ece",
"img/12.webp": "9104726d9f",
"img/13.webp": "cd88b0680a",
"img/14.webp": "1f49aa1981",
"img/15.webp": "92ab0373f2",
"img/16.webp": "5c67ded997",
"img/17.webp": "4ab1720d33",
"img/18.webp": "80ffbf3c69",
"img/21.webp": "e79d869852",
"img/22.webp": "ae26330e5c",
"img/23.webp": "37791058a6",
"img/24.webp": "21af315515",
"img/25.webp": "7feeed28e3",
"img/26.webp": "46aac671e2",
"img/27.webp": "847522c2f1",
"img/28.webp": "fd4078c4dd",
"img/31.webp": "b5d3070a56",
"img/32.webp": "443428c318",
"img/33.webp": "42fb04322e",
"img/34.webp": "1f7dfde2b0",
"img/35.webp": "419fde84d2",
"img/36.webp": "8a91acb3ab",
"img/37.webp": "610bc0af7c",
"img/38.webp": "bf67a5a9b4",
"img/41.webp": "9c4dd95b3e",
"img/42.webp": "9060debebc",
"img/43.webp": "835da3d2a2",
"img/44.webp": "6d9d2e5209",
"img/45.webp": "77e4236d6b",
"img/46.webp": "91d8b03e3c",
"img/47.webp": "5298d03594",
"img/48.webp": "fa9882225a",
"img/arch_inf.webp": "295f41ac91",
"img/arch_sup.webp": "6462b0a0dc",
"img/f11.webp": "429118ca38",
"img/f12.webp": "d469abb2aa",
"img/f13.webp": "abb237f9bf",
"img/f14.webp": "4770103dde",
"img/f15.webp": "01f271cac6",
"img/f16.webp": "66464b28a1",
"img/f17.webp": "0aabeb9d4d",
"img/f18.webp": "fb5fb7f3e2",
"img/f21.webp": "9b549dd100",
"img/f22.webp": "65d5a225f8",
"img/f23.webp": "b2e2b63c05",
"img/f24.webp": "7abaad2a73",
"img/f25.webp": "3f1a6bad1f",
"img/f26.webp": "1fc03ace6f",
"img/f27.webp": "277e20cfff",
"img/f28.webp": "9af79046ae",
"img/f31.webp": "4d1bffc947",
"img/f32.webp": "db70e8211a",
"img/f33.webp": "8f393fedec",
"img/f34.webp": "b32b452f5a",
"img/f35.webp": "2db193cc29",
"img/f36.webp": "bce6a30620",
"img/f37.webp": "08c31a0de3",
"img/f38.webp": "968442607e",
"img/f41.webp": "ea8211b38b",
"img/f42.webp": "b08f222f16",
"img/f43.webp": "e58aec154f",
"img/f44.webp": "12fa036016",
"img/f45.webp": "5fbfacea8b",
"img/f46.webp": "22bfa80f12",
"img/f47.webp": "4b27f8987a",
"img/f48.webp": "815b3b7a87",
"m3d/Ci.bin": "2cf282c859",
"m3d/Cs.bin": "4e17200689",
"m3d/I1i.bin": "8698801e3b",
"m3d/I1s.bin": "2746b06b75",
"m3d/I2i.bin": "45f760b97c",
"m3d/I2s.bin": "09565b7ac2",
"m3d/M1i.bin": "ee78fdd21d",
"m3d/M1i_occ.webp": "841d3598c2",
"m3d/M1s.bin": "4486585720",
"m3d/M1s_occ.webp": "00019f632a",
"m3d/M2i.bin": "1cbe1e0e84",
"m3d/M2i_occ.webp": "e67cd9b194",
"m3d/M2s.bin": "81b495372c",
"m3d/M2s_occ.webp": "2178c99887",
"m3d/M3i.bin": "dcab64ae08",
"m3d/M3i_occ.webp": "732d88bef1",
"m3d/M3s.bin": "5477f1fd59",
"m3d/M3s_occ.webp": "9b5bf84ebc",
"m3d/P1i.bin": "a48dc49929",
"m3d/P1i_occ.webp": "3fd87b7422",
"m3d/P1s.bin": "094491a3ef",
"m3d/P1s_occ.webp": "1f43b691d9",
"m3d/P2i.bin": "3882c4e32c",
"m3d/P2i_occ.webp": "77f9b327ba",
"m3d/P2s.bin": "4db844fa72",
"m3d/P2s_occ.webp": "57492bdafa",
"vendor/three.min.js": "7a7802bf4f"
};
const key = p => new URL(p + '?h=' + ASSET_HASH[p], self.registration.scope).href;
const rel = url => decodeURIComponent(new URL(url).pathname.slice(new URL(self.registration.scope).pathname.length));

async function fill() {
  const ac = await caches.open(ASSETS);
  const have = new Set((await ac.keys()).map(r => r.url));
  for (const p of Object.keys(ASSET_HASH)) {
    const k = key(p);
    if (have.has(k)) continue;
    // reuse a copy already on the device from versions 1.0 and 1.1 (same files), otherwise download
    let res = null;
    for (const name of ['atlante-1.0.0', 'atlante-1.1.0']) {
      const old = await caches.open(name).then(c => c.match(new URL(p, self.registration.scope).href)).catch(() => null);
      if (old) { res = old; break; }
    }
    for (let t = 0; !res && t < 3; t++) {
      try { const r = await fetch(new Request(p, { cache: 'reload' })); if (r.ok) res = r; } catch (err) { if (t === 2) throw err; }
    }
    if (!res) throw new Error('download fallito: ' + p);
    await ac.put(k, res);
  }
  const sc = await caches.open(SHELL);
  for (const f of SHELL_FILES) await sc.add(new Request(f, { cache: 'reload' }));
}

self.addEventListener('install', e => {
  e.waitUntil(fill().then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    const ac = await caches.open(ASSETS);
    const wanted = new Set(Object.keys(ASSET_HASH).map(key));
    for (const r of await ac.keys()) if (!wanted.has(r.url)) await ac.delete(r);
    for (const k of await caches.keys()) if (k.startsWith('atlante-') && k !== SHELL && k !== ASSETS) await caches.delete(k);
    await self.clients.claim();
    (await self.clients.matchAll()).forEach(c => c.postMessage({ type: 'activated', version: VERSION }));
  })());
});

self.addEventListener('message', e => { if (e.data && e.data.type === 'skip') self.skipWaiting(); });

self.addEventListener('fetch', e => {
  const req = e.request;
  const url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== location.origin) return;
  const p = rel(req.url);
  const isPage = req.mode === 'navigate' || p === '' || p === 'index.html' || p === 'manifest.webmanifest';
  if (isPage) {
    e.respondWith((async () => {
      const sc = await caches.open(SHELL);
      try {
        const ctl = new AbortController();
        const timer = setTimeout(() => ctl.abort(), 4000);
        const res = await fetch(req.mode === 'navigate' ? new Request('index.html', { cache: 'no-cache' }) : new Request(req, { cache: 'no-cache' }), { signal: ctl.signal });
        clearTimeout(timer);
        if (res.ok) { sc.put(p === 'manifest.webmanifest' ? 'manifest.webmanifest' : 'index.html', res.clone()); return res; }
        throw new Error('http ' + res.status);
      } catch (err) {
        return (await sc.match(p === 'manifest.webmanifest' ? 'manifest.webmanifest' : 'index.html')) ||
               (await caches.match('index.html')) || new Response('Offline', { status: 503 });
      }
    })());
    return;
  }
  if (ASSET_HASH[p]) {
    e.respondWith((async () => {
      const ac = await caches.open(ASSETS);
      const hit = await ac.match(key(p));
      if (hit) return hit;
      try { const res = await fetch(req); if (res.ok) ac.put(key(p), res.clone()); return res; }
      catch (err) { return new Response('Offline', { status: 503 }); }
    })());
  }
});
