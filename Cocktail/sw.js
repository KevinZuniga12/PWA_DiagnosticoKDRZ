// Service Worker para Cocktail Finder PWA
// Estrategia OnlyCache para App Shell

const CACHE_NAME = "cocktail-finder-v4-appshell";
const API_BASE_URL = "https://www.thecocktaildb.com";

// Recursos del App Shell que se cachearán
const APP_SHELL_RESOURCES = [
    "/",
    "/cocktail.html",
    "/main.js",
    "/sw.js",
    "/no-net.svg",
    "https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4",
];

// Instalación del Service Worker
self.addEventListener("install", (event) => {
    console.log("Service Worker: Instalando...");

    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then(async (cache) => {
                console.log("Service Worker: Cacheando App Shell");

                const cachePromises = APP_SHELL_RESOURCES.map(async (resource) => {
                    try {
                        console.log("Service Worker: Cacheando:", resource);
                        await cache.add(resource);
                        console.log("Service Worker: ✓ Cacheado:", resource);
                    } catch (error) {
                        console.error(
                            "Service Worker: ✗ Error cacheando:",
                            resource,
                            error
                        );
                    }
                });

                await Promise.allSettled(cachePromises);
                console.log("Service Worker: App Shell cacheado completamente");

                return self.skipWaiting();
            })
            .catch((error) => {
                console.error(
                    "Service Worker: Error general cacheando App Shell:",
                    error
                );
            })
    );
});

// Activación del Service Worker
self.addEventListener("activate", (event) => {
    console.log("Service Worker: Activando...");

    event.waitUntil(
        caches
            .keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheName !== CACHE_NAME) {
                            console.log(
                                "Service Worker: Eliminando cache antigua:",
                                cacheName
                            );
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log("Service Worker: Activado y tomando control");
                return self.clients.claim();
            })
    );
});

// Interceptar todas las peticiones (fetch)
self.addEventListener("fetch", (event) => {
    const requestUrl = new URL(event.request.url);

    console.log("Service Worker: Interceptando request a:", event.request.url);

    event.respondWith(handleRequest(event.request, requestUrl));
});

async function handleRequest(request, requestUrl) {
    // 1. Si es un recurso del App Shell, SIEMPRE responder desde caché (OnlyCache)
    if (isAppShellResource(request.url)) {
        console.log(
            "Service Worker: Recurso App Shell detectado (OnlyCache):",
            request.url
        );
        return await getCachedResponse(request);
    }

    // 2. Si es una petición a la API de cócteles
    if (requestUrl.origin === API_BASE_URL) {
        console.log("Service Worker: Petición API detectada:", request.url);
        return await handleApiRequest(request);
    }

    // 3. Para otras peticiones, intentar red primero
    try {
        console.log(
            "Service Worker: Petición externa, intentando red:",
            request.url
        );
        return await fetch(request);
    } catch (error) {
        console.log(
            "Service Worker: Petición externa falló, buscando en caché:",
            request.url
        );
        const cache = await caches.open(CACHE_NAME);
        const cachedResponse = await cache.match(request);

        if (cachedResponse) {
            return cachedResponse;
        }

        return new Response("Recurso no disponible offline", {
            status: 503,
            headers: { "Content-Type": "text/plain" },
        });
    }
}

function isAppShellResource(url) {
    const urlObj = new URL(url);

    console.log("Service Worker: Verificando si es App Shell:", url);

    const localResources = [
        "/",
        "/index.html",
        "/main.js",
        "/sw.js",
        "/no-net.svg",
    ];

    if (localResources.includes(urlObj.pathname)) {
        console.log("Service Worker: ✓ Es recurso local del App Shell");
        return true;
    }

    if (urlObj.hostname.includes("cdn.") && url.includes("tailwindcss")) {
        console.log("Service Worker: ✓ Es CDN de TailwindCSS");
        return true;
    }

    console.log("Service Worker: ✗ NO es recurso del App Shell");
    return false;
}

async function getCachedResponse(request) {
    const cache = await caches.open(CACHE_NAME);
    let cachedResponse = await cache.match(request);

    if (cachedResponse) {
        console.log("Service Worker: ✓ Respondiendo desde caché:", request.url);
        return cachedResponse;
    } else {
        console.log(
            "Service Worker: Recurso App Shell no encontrado en caché, fetcheando:",
            request.url
        );

        try {
            const networkResponse = await fetch(request);

            if (networkResponse.ok) {
                const responseClone = networkResponse.clone();
                await cache.put(request, responseClone);
                console.log(
                    "Service Worker: ✓ Recurso App Shell cacheado exitosamente:",
                    request.url
                );
            }

            return networkResponse;
        } catch (error) {
            console.error(
                "Service Worker: ✗ Error fetcheando recurso App Shell:",
                error
            );
            throw error;
        }
    }
}

async function handleApiRequest(request) {
    console.log("Service Worker: Procesando petición API:", request.url);

    try {
        // Intentar obtener datos frescos de la red
        const networkResponse = await fetch(request);
        console.log("Service Worker: Respuesta API exitosa desde red");
        return networkResponse;
    } catch (error) {
        console.log(
            "Service Worker: API falló, devolviendo respuesta offline:",
            error
        );
        return await handleOfflineApiResponse();
    }
}

async function handleOfflineApiResponse() {
    console.log("Service Worker: Generando respuesta API offline (fallback)");

    // Crear una respuesta JSON con datos de "sin conexión"
    const offlineData = {
        drinks: [
            {
                idDrink: "offline-001",
                strDrink: "Sin conexión",
                strDrinkThumb: "/no-net.svg",
            },
        ],
    };

    return new Response(JSON.stringify(offlineData), {
        status: 200,
        statusText: "OK",
        headers: {
            "Content-Type": "application/json",
            "X-Offline-Response": "true",
        },
    });
}