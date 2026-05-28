const images = [
    '../images/photos/imagen-20260527-200844.jpeg',
    '../images/photos/imagen-20260527-201024.jpeg',
    '../images/photos/imagen-20260527-201047.jpeg',
    '../images/photos/imagen-20260527-201202.jpeg',
    '../images/photos/imagen-20260527-201256.jpeg',
    '../images/photos/imagen-20260527-201345.jpeg',
    '../images/photos/imagen-20260527-201359.jpeg',
    '../images/photos/imagen-20260527-201523.jpeg',
    '../images/photos/imagen-20260527-201540.jpeg',
    '../images/photos/imagen-20260527-201555.jpeg',
    '../images/photos/imagen-20260527-201636.jpeg',
    '../images/photos/imagen-20260527-201651.jpeg',
    '../images/photos/imagen-20260527-201712.jpeg',
    '../images/photos/imagen-20260527-201736.jpeg',
    '../images/photos/imagen-20260527-201751.jpeg',
    '../images/photos/imagen-20260527-201806.jpeg',
    '../images/photos/imagen-20260527-201921.jpeg',
    '../images/photos/imagen-20260527-202101.jpeg',
    '../images/photos/imagen-20260527-202422.jpeg'
];

function getRandomImage() {
    return images[Math.floor(Math.random() * images.length)];
}

document.querySelectorAll('.snap-section.photo img').forEach(img => {
    img.src = getRandomImage();
});

function updateCountdown() {
    const weddingDate = new Date('2026-11-29T11:00:00').getTime();
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
