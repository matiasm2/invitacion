// Configuración centralizada del sitio
window.config = {
  event: {
    title: 'Casamiento de Lili y Mati',
    date: '2026-11-22',
    time: '12:00',
    endTime: '17:00',
    location: '25 de Mayo de 1810 Nro. 1841, Florencio Varela, Buenos Aires',
    timezone: 'America/Argentina/Buenos_Aires',
    calendarFilename: 'Boda-Lili-Mati.ics',
    domainForUID: 'lilymatiboda.com'
  },
  images: [
    'aconcagua.jpeg',
    'arraialdocabo.jpeg',
    'bariloche.jpeg',
    'blume.jpeg',
    'casa.jpeg',
    'destello.jpeg',
    'elcalafate.jpeg',
    'iguazu.jpeg',
    'miramar.jpeg',
    'tartagal.jpeg',
    'ushuaia.jpeg',
    'viaje.jpeg'
  ],
  ui: {
    photoRotationInterval: 8000,
    audioVolume: 0.3,
    musicPlaySymbol: '♫',
    musicPauseSymbol: '⏸'
  }
};

window.getImagePath = function(filename, isSubdir = false) {
  const base = isSubdir ? '../images/photos/' : 'images/photos/';
  return base + filename;
};

window.getFullImagePaths = function(isSubdir = false) {
  return window.config.images.map(img => window.getImagePath(img, isSubdir));
};

window.getWeddingDateTime = function() {
  const date = window.config.event.date;
  const time = window.config.event.time;
  return new Date(`${date}T${time}:00`).getTime();
};
