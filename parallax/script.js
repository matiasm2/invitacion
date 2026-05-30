const images = [
    '../images/photos/aconcagua.jpeg',
    '../images/photos/arraialdocabo.jpeg',
    '../images/photos/bariloche.jpeg',
    '../images/photos/blume.jpeg',
    '../images/photos/casa.jpeg',
    '../images/photos/destello.jpeg',
    '../images/photos/elcalafate.jpeg',
    '../images/photos/iguazu.jpeg',
    '../images/photos/miramar.jpeg',
    '../images/photos/tartagal.jpeg',
    '../images/photos/ushuaia.jpeg',
    '../images/photos/viaje.jpeg'
];

function getRandomImage() {
    return images[Math.floor(Math.random() * images.length)];
}

document.querySelectorAll('.parallax-section').forEach((section, index) => {
    if (index < document.querySelectorAll('.parallax-section').length - 1) {
        section.style.backgroundImage = `url('${getRandomImage()}')`;
    }
});

const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
if (isIOS) {
    document.querySelectorAll('.parallax-section').forEach(section => {
        section.style.backgroundAttachment = 'scroll';
    });
}

function updateCountdown() {
    const weddingDate = new Date('2026-11-22T12:00:00').getTime();
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

audio.volume = 0.3;
audio.play().catch(() => {
    console.log('Autoplay prevented, waiting for user interaction');
});

document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('music-toggle');
    if (button) {
        button.addEventListener('click', function() {
            if (audio.paused) {
                audio.play();
                button.textContent = '⏸';
            } else {
                audio.pause();
                button.textContent = '♫';
            }
        });

        audio.addEventListener('play', function() {
            button.textContent = '⏸';
        });

        audio.addEventListener('pause', function() {
            button.textContent = '♫';
        });

        if (!audio.paused) {
            button.textContent = '⏸';
        }
    }
});
