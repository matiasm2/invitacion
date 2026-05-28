const images = [
    'images/photos/imagen-20260527-200844.jpeg',
    'images/photos/imagen-20260527-201024.jpeg',
    'images/photos/imagen-20260527-201047.jpeg',
    'images/photos/imagen-20260527-201202.jpeg',
    'images/photos/imagen-20260527-201256.jpeg',
    'images/photos/imagen-20260527-201345.jpeg',
    'images/photos/imagen-20260527-201359.jpeg',
    'images/photos/imagen-20260527-201523.jpeg',
    'images/photos/imagen-20260527-201540.jpeg',
    'images/photos/imagen-20260527-201555.jpeg',
    'images/photos/imagen-20260527-201636.jpeg',
    'images/photos/imagen-20260527-201651.jpeg',
    'images/photos/imagen-20260527-201712.jpeg',
    'images/photos/imagen-20260527-201736.jpeg',
    'images/photos/imagen-20260527-201751.jpeg',
    'images/photos/imagen-20260527-201806.jpeg',
    'images/photos/imagen-20260527-201921.jpeg',
    'images/photos/imagen-20260527-202101.jpeg',
    'images/photos/imagen-20260527-202422.jpeg'
];

let currentImageIndex = 0;

function rotatePhotos() {
    const photoElement = document.getElementById('mainPhoto');
    currentImageIndex = (currentImageIndex + 1) % images.length;
    photoElement.src = images[currentImageIndex];
}

setInterval(rotatePhotos, 8000);

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
        start: new Date('2026-11-29T11:00:00'),
        end: new Date('2026-11-29T17:00:00'),
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
