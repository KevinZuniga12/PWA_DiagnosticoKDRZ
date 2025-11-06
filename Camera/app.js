// Registrar Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(registration => {
                console.log('✅ Service Worker registrado:', registration.scope);
            })
            .catch(error => {
                console.error('❌ Error al registrar Service Worker:', error);
            });
    });
}

// Referencias a elementos del DOM
const openCameraBtn = document.getElementById('openCamera');
const closeCameraBtn = document.getElementById('closeCamera');
const switchCameraBtn = document.getElementById('switchCamera');
const cameraContainer = document.getElementById('cameraContainer');
const video = document.getElementById('video');
const takePhotoBtn = document.getElementById('takePhoto');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const statusDiv = document.getElementById('status');
const galleryGrid = document.getElementById('galleryGrid');

let stream = null;
let currentFacingMode = 'environment'; // 'environment' para trasera, 'user' para frontal
let photos = []; // Array para almacenar las fotos

// Función para mostrar mensajes de estado
function showStatus(message, isError = false) {
    statusDiv.textContent = message;
    statusDiv.className = `status ${isError ? 'error' : 'success'}`;
    statusDiv.style.display = 'block';
    
    setTimeout(() => {
        statusDiv.style.display = 'none';
    }, 3000);
}

// Abrir la cámara
async function openCamera() {
    try {
        const constraints = {
            video: {
                facingMode: { ideal: currentFacingMode },
                width: { ideal: 640 },
                height: { ideal: 480 }
            }
        };

        stream = await navigator.mediaDevices.getUserMedia(constraints);
        video.srcObject = stream;

        cameraContainer.style.display = 'block';
        openCameraBtn.disabled = true;

        showStatus('✅ Cámara abierta exitosamente');
        console.log('📷 Cámara abierta');
    } catch (error) {
        console.error('❌ Error al acceder a la cámara:', error);
        showStatus('❌ No se pudo acceder a la cámara. Verifica los permisos.', true);
    }
}

// Tomar foto
function takePhoto() {
    if (!stream) {
        showStatus('⚠️ Primero debes abrir la cámara', true);
        return;
    }

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageDataURL = canvas.toDataURL('image/png');

    // Guardar foto en el array
    photos.push({
        id: Date.now(),
        data: imageDataURL,
        timestamp: new Date().toLocaleString()
    });

    // Actualizar la galería
    displayGallery();

    showStatus('📸 Foto capturada y guardada en galería');
    console.log('📸 Foto capturada, total de fotos:', photos.length);
}

// Mostrar galería de fotos
function displayGallery() {
    galleryGrid.innerHTML = '';

    if (photos.length === 0) {
        galleryGrid.innerHTML = '<div class="empty-gallery">No hay fotos aún. ¡Toma tu primera foto!</div>';
        return;
    }

    photos.forEach((photo, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        
        const img = document.createElement('img');
        img.src = photo.data;
        img.alt = `Foto ${index + 1}`;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = '×';
        deleteBtn.onclick = (e) => {
            e.stopPropagation();
            deletePhoto(photo.id);
        };

        galleryItem.appendChild(img);
        galleryItem.appendChild(deleteBtn);
        galleryGrid.appendChild(galleryItem);
    });
}

// Eliminar foto de la galería
function deletePhoto(photoId) {
    photos = photos.filter(photo => photo.id !== photoId);
    displayGallery();
    showStatus('🗑️ Foto eliminada');
    console.log('🗑️ Foto eliminada, fotos restantes:', photos.length);
}

// Cambiar entre cámara frontal y trasera
async function switchCamera() {
    if (!stream) {
        showStatus('⚠️ Primero debes abrir la cámara', true);
        return;
    }

    // Cambiar el modo de cámara
    currentFacingMode = currentFacingMode === 'environment' ? 'user' : 'environment';
    
    // Cerrar el stream actual
    stream.getTracks().forEach(track => track.stop());
    
    // Abrir la cámara con el nuevo modo
    try {
        const constraints = {
            video: {
                facingMode: { ideal: currentFacingMode },
                width: { ideal: 640 },
                height: { ideal: 480 }
            }
        };

        stream = await navigator.mediaDevices.getUserMedia(constraints);
        video.srcObject = stream;

        const cameraType = currentFacingMode === 'environment' ? 'trasera' : 'frontal';
        showStatus(`🔄 Cambiado a cámara ${cameraType}`);
        console.log('🔄 Cámara cambiada a:', cameraType);
    } catch (error) {
        console.error('❌ Error al cambiar la cámara:', error);
        showStatus('❌ No se pudo cambiar la cámara', true);
        
        // Intentar volver a la cámara anterior
        currentFacingMode = currentFacingMode === 'environment' ? 'user' : 'environment';
        openCamera();
    }
}

// Cerrar la cámara
function closeCamera() {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
        stream = null;

        video.srcObject = null;
        cameraContainer.style.display = 'none';

        openCameraBtn.disabled = false;

        showStatus('🔴 Cámara cerrada');
        console.log('🔴 Cámara cerrada');
    }
}

// Event Listeners
openCameraBtn.addEventListener('click', openCamera);
takePhotoBtn.addEventListener('click', takePhoto);
switchCameraBtn.addEventListener('click', switchCamera);
closeCameraBtn.addEventListener('click', closeCamera);

// Limpiar al salir de la página
window.addEventListener('beforeunload', () => {
    closeCamera();
});

// Inicializar la galería al cargar la página
window.addEventListener('load', () => {
    displayGallery();
});