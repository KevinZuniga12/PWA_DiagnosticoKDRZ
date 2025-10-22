const CACHE_NAME = 'cocktail-pwa-v2';
const ASSETS_APP_SHELL = [
    './',
    './cocktail.html',
    './main.js',
    './styles.css',
    './fallback.html',
    './error.jpg',
];

// Instalación del Service Worker
self.addEventListener('install', (event) => {
    console.log('Service Worker: Instalando...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Service Worker: Cacheando App Shell');
                return cache.addAll(ASSETS_APP_SHELL);
            })
            .then(() => self.skipWaiting())
    );
});

// Activación del Service Worker
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activando...');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        console.log('Service Worker: Eliminando caché antigua', cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
    return self.clients.claim();
});

self.addEventListener('fetch', event => {
    const { request } = event;
    
    if (request.url.includes('.html') || 
        request.url.includes('.js') || 
        request.url.includes('.css')) {        
        event.respondWith(
            caches.match(request)
                .then(response => {
                    return response || fetch(request);
                })
        );
    } 
    else {
        event.respondWith(
            fetch(request)
                .then(response => {
                    const responseClone = response.clone();
                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(request, responseClone);
                    });
                    return response;
                })
                .catch(error => {
                    console.log('Fetch falló, retornando fallback:', error);
                    
                    if (request.destination === 'document') {
                        return caches.match('./fallback.html');
                    }
                    
                    if (request.destination === 'image') {
                        return caches.match(request);
                    }
                    
                    return new Response('No disponible offline', {
                        status: 503,
                        statusText: 'Service Unavailable',
                        headers: new Headers({
                            'Content-Type': 'text/plain'
                        })
                    });
                })
        );
    }
});