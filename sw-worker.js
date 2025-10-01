const CACHE_VERSION = 'v4';

console.log(`Service Worker: ${CACHE_VERSION}`);

self.addEventListener('fetch', (event) => {
    console.log(`[${CACHE_VERSION}] Fetching:`, event.request.url);
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
}); 