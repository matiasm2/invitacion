const images = [
    'images/photos/aconcagua.jpeg',
    'images/photos/arraialdocabo.jpeg',
    'images/photos/bariloche.jpeg',
    'images/photos/blume.jpeg',
    'images/photos/casa.jpeg',
    'images/photos/destello.jpeg',
    'images/photos/elcalafate.jpeg',
    'images/photos/iguazu.jpeg',
    'images/photos/miramar.jpeg',
    'images/photos/tartagal.jpeg',
    'images/photos/ushuaia.jpeg',
    'images/photos/viaje.jpeg'
];

let currentImageIndex = 0;

function rotatePhotos() {
    const photoElement = document.getElementById('mainPhoto');
    currentImageIndex = (currentImageIndex + 1) % images.length;
    photoElement.src = images[currentImageIndex];
}

setInterval(rotatePhotos, 8000);

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
    const event = {
        title: 'Casamiento de Lili y Mati',
        start: new Date('2026-11-22T12:00:00'),
        end: new Date('2026-11-22T17:00:00'),
        description: 'Celebración del casamiento de Lili y Mati\nLugar: 25 de Mayo de 1810 Nro. 1841, Florencio Varela',
        location: '25 de Mayo de 1810 Nro. 1841, Florencio Varela, Buenos Aires'
    };

    const icalContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Wedding Invitation//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:Casamiento Lili y Mati
X-WR-TIMEZONE:America/Argentina/Buenos_Aires
BEGIN:VEVENT
UID:${Date.now()}@lilymatiboda.com
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
    element.setAttribute('download', 'Boda-Lili-Mati.ics');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

function formatIcalDate(date) {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}

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
