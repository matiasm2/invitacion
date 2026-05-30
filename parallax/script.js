const images = getFullImagePaths(true);
const shuffledImages = shuffleArray(images);
const parallaxSections = document.querySelectorAll('.parallax-section');

parallaxSections.forEach((section, index) => {
    if (index < parallaxSections.length - 1) {
        section.style.backgroundImage = `url('${shuffledImages[index % shuffledImages.length]}')`;
    }
});

const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
if (isIOS) {
    parallaxSections.forEach(section => {
        section.style.backgroundAttachment = 'scroll';
    });
}

const updateCountdown = createCountdownUpdater();
updateCountdown();
setInterval(updateCountdown, 1000);

initMusicPlayer();
