// Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log('Service Worker registered', reg))
            .catch(err => console.log('Service Worker not registered', err))
    })
}

// API
const API_URL = 'https://www.thecocktaildb.com/api/json/v1/1';

// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const cocktailsGrid = document.getElementById('cocktailsGrid');
const loading = document.getElementById('loading');
const errorMessage = document.getElementById('errorMessage');

// Event Listeners
searchBtn.addEventListener('click', searchCocktails);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchCocktails();
});

// Buscar cócteles
async function searchCocktails() {
    const searchTerm = searchInput.value.trim();
    if (!searchTerm) {
        alert('Ingresa un término de búsqueda');
        return;
    }

    loading.classList.remove('d-none');
    errorMessage.classList.add('d-none');
    cocktailsGrid.innerHTML = '';

    try {
        const response = await fetch(`${API_URL}/search.php?s=${searchTerm}`);

        // Verificar si la respuesta es válida
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        loading.classList.add('d-none');

        if (data.drinks) {
            displayCocktails(data.drinks);
        } else {
            showFallbackMessage('No se encontraron cócteles con ese nombre');
        }
    } catch (error) {
        console.error('Error:', error);
        loading.classList.add('d-none');
        // Mostrar cards de error en lugar de mensaje simple
        displayErrorCards();
    }
}

// Mostrar mensaje de fallback
function showFallbackMessage(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('d-none');
}

// Mostrar cards de error cuando no hay conexión
function displayErrorCards() {
    cocktailsGrid.innerHTML = '';
    
    // Crear 3 cards de error para mantener el diseño
    for (let i = 0; i < 1; i++) {
        const errorCard = createErrorCard();
        cocktailsGrid.appendChild(errorCard);
    }
}

// Mostrar cócteles
function displayCocktails(drinks) {
    cocktailsGrid.innerHTML = '';
    drinks.forEach(drink => {
        const card = createCard(drink);
        cocktailsGrid.appendChild(card);
    });
}

// Crear card
function createCard(drink) {
    const col = document.createElement('div');
    col.className = 'col-md-4 mb-4';

    const ingredients = getIngredients(drink);

    col.innerHTML = `
        <div class="card h-100">
            <img src="${drink.strDrinkThumb}" class="card-img-top" alt="${drink.strDrink}">
            <div class="card-body">
                <h5 class="card-title">${drink.strDrink}</h5>
                <p class="card-text">
                    <span class="badge bg-info">${drink.strCategory}</span>
                    <span class="badge bg-secondary">${drink.strAlcoholic}</span>
                </p>
                <p><strong>Copa:</strong> ${drink.strGlass}</p>
                <p><strong>Ingredientes:</strong><br>${ingredients.join(', ')}</p>
            </div>
        </div>
    `;

    return col;
}

// Crear card de error (sin conexión)
function createErrorCard() {
    const col = document.createElement('div');
    col.className = 'col-md-4 mb-4';

    col.innerHTML = `
        <div class="card h-100 border-danger">
            <img src="error.jpg" 
                 class="card-img-top" 
                 alt="Error de conexión"
                 style="background-color: #f8f9fa; height: 250px; object-fit: cover;">
            <div class="card-body text-center">
                <h5 class="card-title text-danger">
                    📡❌
                    <br>Sin Conexión a Internet
                </h5>
                <p class="card-text">
                    <span class="badge bg-danger">Offline</span>
                </p>
                <p class="mt-3">
                    <strong>No se puede cargar el contenido</strong>
                    <br>
                    <small class="text-muted">
                        Verifica tu conexión a internet e intenta nuevamente
                    </small>
                </p>
            </div>
        </div>
    `;

    return col;
}

// Obtener ingredientes
function getIngredients(drink) {
    const ingredients = [];
    for (let i = 1; i <= 15; i++) {
        const ingredient = drink[`strIngredient${i}`];
        const measure = drink[`strMeasure${i}`];
        if (ingredient) {
            ingredients.push(measure ? `${measure} ${ingredient}` : ingredient);
        }
    }
    return ingredients;
}

// Cargar cócteles iniciales
window.addEventListener('load', async () => {
    loading.classList.remove('d-none');
    try {
        const response = await fetch(`${API_URL}/search.php?s=margarita`);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        loading.classList.add('d-none');

        if (data.drinks) {
            displayCocktails(data.drinks);
        } else {
            showFallbackMessage('No se pudieron cargar los cócteles iniciales');
        }
    } catch (error) {
        console.error('Error:', error);
        loading.classList.add('d-none');
        // Mostrar cards de error en lugar de mensaje
        displayErrorCards();
    }
});