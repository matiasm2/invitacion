const images = window.getFullImagePaths(true);

function getRandomImage() {
    return images[Math.floor(Math.random() * images.length)];
}

document.querySelectorAll('.snap-section.photo img').forEach(img => {
    img.src = getRandomImage();
});

function updateCountdown() {
    const weddingDate = window.getWeddingDateTime();
    const now = new Date().getTime();
    const difference = weddingDate - now;

    if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours;
        document.getElementById('minutes').textContent = minutes;
        document.getElementById('seconds').textContent = seconds;
    }
}

updateCountdown();
setInterval(updateCountdown, 1000);

const audio = document.getElementById('bg-music');

audio.volume = window.config.ui.audioVolume;
audio.play().catch(() => {
    console.log('Autoplay prevented, waiting for user interaction');
});

document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('music-toggle');
    if (button) {
        button.addEventListener('click', function() {
            if (audio.paused) {
                audio.play();
                button.textContent = window.config.ui.musicPauseSymbol;
            } else {
                audio.pause();
                button.textContent = window.config.ui.musicPlaySymbol;
            }
        });

        audio.addEventListener('play', function() {
            button.textContent = window.config.ui.musicPauseSymbol;
        });

        audio.addEventListener('pause', function() {
            button.textContent = window.config.ui.musicPlaySymbol;
        });

        if (!audio.paused) {
            button.textContent = window.config.ui.musicPauseSymbol;
        }
    }
});
