const images = getFullImagePaths(true);
const photoElements = document.querySelectorAll('.snap-section.photo img');
const shuffledImages = shuffleArray(images);

photoElements.forEach((img, index) => {
    img.src = shuffledImages[index % shuffledImages.length];
});

const updateCountdown = createCountdownUpdater();
updateCountdown();
setInterval(updateCountdown, 1000);

initMusicPlayer();
