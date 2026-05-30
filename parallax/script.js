const images = getFullImagePaths(true);
const shuffledImages = shuffleArray(images);
const parallaxSections = document.querySelectorAll('.parallax-section');

parallaxSections.forEach((section, index) => {
    if (index < parallaxSections.length - 1) {
        section.style.backgroundImage = `url('${shuffledImages[index % shuffledImages.length]}')`;
    }
});

const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

if (isMobile) {
    let ticking = false;

    const updateParallax = () => {
        parallaxSections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const yOffset = -rect.top * 0.4;
            section.style.backgroundPosition = `center ${yOffset}px`;
        });
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }, { passive: true });

    parallaxSections.forEach(section => {
        section.style.backgroundAttachment = 'scroll';
    });
    updateParallax();
} else {
    parallaxSections.forEach(section => {
        section.style.backgroundAttachment = 'fixed';
    });
}

const updateCountdown = createCountdownUpdater();
updateCountdown();
setInterval(updateCountdown, 1000);

initMusicPlayer();
