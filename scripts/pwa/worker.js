/* Own application-only worker. No runtime records, routes, cookies or API responses cached. */
const PREFIX = 'goudduo-static-';
const CACHE = PREFIX + BUILD.version;
const MAX_AGE = 7 * 24 * 60 * 60 * 1000;
const entries = new Map(BUILD.assets.map(asset => [new URL(asset.url, self.location.origin).href, asset]));
async function verified(asset) {
  const response = await fetch(asset.url, { cache: 'no-store', credentials: 'same-origin', redirect: 'error' });
  if (!response.ok || response.redirected || !response.headers.get('content-type')?.toLowerCase().startsWith(asset.type)) throw new Error('Static resource unavailable');
  const bytes = await response.arrayBuffer();
  const digest = Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', bytes)), byte => byte.toString(16).padStart(2,'0')).join('');
  if (digest !== asset.sha256) throw new Error('Static resource changed');
  const headers = new Headers();
  for (const name of ['Content-Type','Content-Security-Policy','X-Content-Type-Options','Referrer-Policy','X-Robots-Tag']) {
    const value = response.headers.get(name); if (value) headers.set(name,value);
  }
  headers.set('X-Goudduo-Cached-At', String(Date.now()));
  return new Response(bytes, { status: 200, headers });
}
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    try {
      // All-or-nothing install; Access redirects/login documents never enter the cache.
      for (const asset of BUILD.assets) await cache.put(asset.url, await verified(asset));
    } catch (error) { await caches.delete(CACHE); throw error; }
    // Intentionally wait for old clients to close: no forced reload of in-memory workouts.
  })());
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    for (const key of await caches.keys()) if (key.startsWith(PREFIX) && key !== CACHE) await caches.delete(key);
    await self.clients.claim();
  })());
});
async function cached(url) {
  const cache = await caches.open(CACHE), response = await cache.match(url);
  const at = Number(response?.headers.get('X-Goudduo-Cached-At'));
  if (response && at > 0 && Date.now() - at >= 0 && Date.now() - at < MAX_AGE) return response;
  if (response) await cache.delete(url);
  return undefined;
}
self.addEventListener('fetch', event => {
  const request = event.request, url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;
  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        // Network first. Never cache route URLs or auth responses, and never replace a 401/403/redirect with cached HTML.
        return await fetch(request, { cache: 'no-store', redirect: 'manual' });
      } catch {
        return await cached('/index.html') ?? new Response('Interface offline indisponível. Conecte-se e reabra o goudduo.', { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' } });
      }
    })());
  } else if (!url.search && entries.has(url.href) && url.pathname !== '/index.html') {
    event.respondWith((async () => {
      const hit = await cached(url.href);
      if (hit) return hit;
      // Expired entries are not renewed by runtime traffic; a verified new install refreshes the complete set.
      return fetch(request);
    })());
  }
});
