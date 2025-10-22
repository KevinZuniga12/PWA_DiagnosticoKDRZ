const CACHE_VERSION = 'v1';

// Evento fetch
self.addEventListener('fetch', (event) => {
    // Log de la URL del recurso
    console.log('URL del recurso:', event.request.url);
    // Log de la versión actual
    console.log('Versión actual:', CACHE_VERSION);
});