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
const cameraContainer = document.getElementById('cameraContainer');
const video = document.getElementById('video');
const takePhotoBtn = document.getElementById('takePhoto');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const photoPreview = document.getElementById('photoPreview');
const capturedImage = document.getElementById('capturedImage');
const statusDiv = document.getElementById('status');

let stream = null;

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
                facingMode: { ideal: 'environment' },
                width: { ideal: 640 },
                height: { ideal: 480 }
            }
        };

        stream = await navigator.mediaDevices.getUserMedia(constraints);
        video.srcObject = stream;

        cameraContainer.style.display = 'block';
        openCameraBtn.disabled = true;
        photoPreview.style.display = 'none';

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

    capturedImage.src = imageDataURL;
    photoPreview.style.display = 'block';

    showStatus('📸 Foto capturada exitosamente');
    console.log('📸 Foto capturada, tamaño:', imageDataURL.length, 'caracteres');

    // Opcional: descargar la foto
    downloadPhoto(imageDataURL);
}

// Descargar foto
function downloadPhoto(dataURL) {
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = `foto_${Date.now()}.png`;
    link.click();
    console.log('💾 Foto descargada');
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
closeCameraBtn.addEventListener('click', closeCamera);

// Limpiar al salir de la página
window.addEventListener('beforeunload', () => {
    closeCamera();
});