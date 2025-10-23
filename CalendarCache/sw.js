const CACHE_NAME = 'pwa-calendar-v1';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/calendario.html',
    '/formulario.html',
    '/bootstrap.min.css',
    '/bootstrap.min.js',
    '/main.js',
    '/manifest.json',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
    'https://cdn.jsdelivr.net/npm/fullcalendar@6.1.8/index.global.min.js',
    'https://cdn.jsdelivr.net/npm/fullcalendar@6.1.8/index.global.min.css'
];

// Evento install para precachear assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(ASSETS_TO_CACHE);
            })
    );
});
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('dinamic-cache')
            .then((cache) => {
                return cache.addAll([]);
            })
    );
});

self.addEventListener('fetch', event => {
    console.log('Fetch event for:', event.request.url);

    event.respondWith(
        caches.match(event.request) 
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request)
                    .then(networkResponse => {
                        return caches.open('dinamic-cache').then(cache => {
                            cache.put(event.request, networkResponse.clone());
                            return networkResponse;
                        });
                    })
                    .catch(() => {
                        return new Response(JSON.stringify({
                            error: true,
                            message: 'Sin conexión y recurso no disponible en cache',
                          
                        }), {
                            headers: { 'Content-Type': 'application/json' }
                        });
                    });
            })
    );
});