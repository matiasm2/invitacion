const images = window.getFullImagePaths();
let shuffledImages = [];
let currentImageIndex = 0;

function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

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
    } else {
        document.getElementById('days').textContent = '0';
        document.getElementById('hours').textContent = '0';
        document.getElementById('minutes').textContent = '0';
        document.getElementById('seconds').textContent = '0';
    }
}

updateCountdown();
setInterval(updateCountdown, 1000);

function downloadCalendarEvent() {
    const cfg = window.config;
    const event = {
        title: cfg.event.title,
        start: new Date(`${cfg.event.date}T${cfg.event.time}:00`),
        end: new Date(`${cfg.event.date}T${cfg.event.endTime}:00`),
        description: `Celebración del ${cfg.event.title}\nLugar: ${cfg.event.location}`,
        location: cfg.event.location
    };

    const icalContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Wedding Invitation//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:${cfg.event.title}
X-WR-TIMEZONE:${cfg.event.timezone}
BEGIN:VEVENT
UID:${Date.now()}@${cfg.event.domainForUID}
DTSTAMP:${formatIcalDate(new Date())}
DTSTART:${formatIcalDate(event.start)}
DTEND:${formatIcalDate(event.end)}
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/calendar;charset=utf-8,' + encodeURIComponent(icalContent));
    element.setAttribute('download', cfg.event.calendarFilename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

function formatIcalDate(date) {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}

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
