// Cocktail Finder PWA - Main JavaScript

// Registrar el Service Worker
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("/sw.js")
            .then((registration) => {
                console.log("Service Worker registrado con éxito:", registration.scope);
            })
            .catch((error) => {
                console.log("Fallo el registro del Service Worker:", error);
            });
    });
}

// Esperar a que el DOM esté cargado
document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    const resultsContainer = document.getElementById("resultsContainer");
    const loadingState = document.getElementById("loadingState");

    // Función para mostrar el estado de carga
    const showLoading = () => {
        loadingState.classList.remove("hidden");
        resultsContainer.classList.add("hidden");
    };

    // Función para ocultar el estado de carga
    const hideLoading = () => {
        loadingState.classList.add("hidden");
        resultsContainer.classList.remove("hidden");
    };

    // Función para crear una tarjeta de bebida
    const createDrinkCard = (drink) => {
        const card = document.createElement("div");
        card.className =
            "bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300";

        card.innerHTML = `
            <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}" class="w-full h-48 object-cover">
            <div class="p-4">
                <h3 class="text-lg font-semibold text-gray-800 truncate">${drink.strDrink}</h3>
            </div>
        `;
        return card;
    };

    // Función para mostrar los resultados
    const displayResults = (data) => {
        resultsContainer.innerHTML = "";

        if (data.drinks && data.drinks.length > 0) {
            data.drinks.forEach((drink) => {
                const card = createDrinkCard(drink);
                resultsContainer.appendChild(card);
            });
        } else {
            resultsContainer.innerHTML = `
                <div class="col-span-full text-center text-gray-600 py-8">
                    No se encontraron bebidas con ese nombre
                </div>
            `;
        }
        hideLoading();
    };

    // Función para realizar la búsqueda
    const performSearch = async (searchTerm) => {
        if (!searchTerm.trim()) return;

        try {
            showLoading();
            const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${encodeURIComponent(
                searchTerm
            )}`;

            // La petición pasará por el Service Worker automáticamente
            const response = await fetch(url);
            const data = await response.json();

            // Verificar si es una respuesta offline del service worker
            if (response.headers.get("X-Offline-Response") === "true") {
                console.log("Respuesta offline del Service Worker");
            }

            displayResults(data);
        } catch (error) {
            console.error("Error en la búsqueda:", error);
            hideLoading();
        }
    };

    // Manejador de evento para el botón de búsqueda
    searchButton.addEventListener("click", () => {
        performSearch(searchInput.value);
    });

    // Manejador de evento para la tecla Enter en el input
    searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            performSearch(searchInput.value);
        }
    });

    // Verificar si hay un Service Worker activo
    if (navigator.serviceWorker && navigator.serviceWorker.controller) {
        console.log("Service Worker está activo y controlando la página");
    }
});