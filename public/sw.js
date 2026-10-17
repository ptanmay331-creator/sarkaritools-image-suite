const CACHE_NAME = 'sarkaritools-shell-v2';
const APP_SCOPE = self.registration.scope;
const HOME_URL = new URL('index.html', APP_SCOPE).href;

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    const homeResponse = await fetch(HOME_URL, { cache: 'reload' });
    if (!homeResponse.ok) throw new Error(`Could not cache app shell: ${homeResponse.status}`);

    const html = await homeResponse.clone().text();
    await cache.put(HOME_URL, homeResponse);
    await cache.put(APP_SCOPE, new Response(html, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    }));
    await cache.addAll([
      new URL('manifest.json', APP_SCOPE).href,
      new URL('icon.svg', APP_SCOPE).href
    ]);

    const assets = [...html.matchAll(/(?:src|href)=["']([^"']+\.(?:js|css)(?:\?[^"']*)?)["']/g)]
      .map(([, path]) => new URL(path, APP_SCOPE).href);
    await cache.addAll([...new Set(assets)]);
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys
      .filter(key => key.startsWith('sarkaritools-shell-') && key !== CACHE_NAME)
      .map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== location.origin ||
      !url.pathname.startsWith(new URL(APP_SCOPE).pathname)) return;

  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const response = await fetch(request);
        if (response.ok) {
          const cache = await caches.open(CACHE_NAME);
          await cache.put(request, response.clone());
        }
        return response;
      } catch {
        return (await caches.match(request)) || (await caches.match(HOME_URL));
      }
    })());
    return;
  }

  event.respondWith((async () => {
    const cached = await caches.match(request);
    if (cached) return cached;
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      await cache.put(request, response.clone());
    }
    return response;
  })());
});
