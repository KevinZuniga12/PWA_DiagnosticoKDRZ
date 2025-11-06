const CACHE_NAME = 'camera-pwa-v1';
const urlsToCache = [
    './',
    './Camera.html',
    './app.js',
    './manifest.json'
];

self.addEventListener('install', (event) => {
    console.log('[SW] Installing...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[SW] Caching files');
                return cache.addAll(urlsToCache);
            })
            .then(() => {
                console.log('[SW] All files cached successfully');
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('[SW] Error caching files:', error);
            })
    );
});

self.addEventListener('activate', (event) => {
    console.log('[SW] Activating...');
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheName !== CACHE_NAME) {
                            console.log('[SW] Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('[SW] Activated successfully');
                return self.clients.claim();
            })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    console.log('[SW] Serving from cache:', event.request.url);
                    return response;
                }
                console.log('[SW] Fetching from network:', event.request.url);
                return fetch(event.request);
            })
    );
});