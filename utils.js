// Funciones de utilidad compartidas

function getImagePath(filename, isSubdir = false) {
  const base = isSubdir ? '../images/photos/' : 'images/photos/';
  return base + filename;
}

function getFullImagePaths(isSubdir = false) {
  return window.config.images.map(img => getImagePath(img, isSubdir));
}

function getWeddingDateTime() {
  const date = window.config.event.date;
  const time = window.config.event.time;
  return new Date(`${date}T${time}:00`).getTime();
}

function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function createCountdownUpdater() {
    const elements = {
        days: document.getElementById('days'),
        hours: document.getElementById('hours'),
        minutes: document.getElementById('minutes'),
        seconds: document.getElementById('seconds')
    };

    return function updateCountdown() {
        const weddingDate = getWeddingDateTime();
        const now = new Date().getTime();
        const difference = weddingDate - now;

        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            elements.days.textContent = days;
            elements.hours.textContent = hours;
            elements.minutes.textContent = minutes;
            elements.seconds.textContent = seconds;
        } else {
            elements.days.textContent = '0';
            elements.hours.textContent = '0';
            elements.minutes.textContent = '0';
            elements.seconds.textContent = '0';
        }
    };
}

function initMusicPlayer() {
    const audio = document.getElementById('bg-music');
    const button = document.getElementById('music-toggle');

    if (!audio || !button) return;

    audio.volume = window.config.ui.audioVolume;
    audio.play().catch(() => {
        console.log('Autoplay prevented, waiting for user interaction');
    });

    const updateButton = () => {
        button.textContent = audio.paused
            ? window.config.ui.musicPlaySymbol
            : window.config.ui.musicPauseSymbol;
    };

    button.addEventListener('click', function() {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    });

    audio.addEventListener('play', updateButton);
    audio.addEventListener('pause', updateButton);

    updateButton();
}

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
