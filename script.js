const images = getFullImagePaths();
let shuffledImages = [];
let currentImageIndex = 0;

function initializePhotos() {
    shuffledImages = shuffleArray(images);
    currentImageIndex = 0;
    const photoElement = document.getElementById('mainPhoto');
    photoElement.src = shuffledImages[currentImageIndex];
}

function rotatePhotos() {
    const photoElement = document.getElementById('mainPhoto');
    currentImageIndex = (currentImageIndex + 1) % shuffledImages.length;
    if (currentImageIndex === 0) {
        shuffledImages = shuffleArray(images);
    }
    photoElement.src = shuffledImages[currentImageIndex];
}

initializePhotos();
setInterval(rotatePhotos, window.config.ui.photoRotationInterval);

const updateCountdown = createCountdownUpdater();
updateCountdown();
setInterval(updateCountdown, 1000);

initMusicPlayer();
