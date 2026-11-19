// 6.104 -> 06°06′
function dm(value, padDeg) {
  const abs = Math.abs(value);
  let deg = Math.floor(abs);
  let min = Math.round((abs - deg) * 60);
  if (min === 60) {
    deg += 1;
    min = 0;
  }
  return `${String(deg).padStart(padDeg, '0')}°${String(min).padStart(2, '0')}′`;
}

export function formatLat(lat) {
  return `${dm(lat, 2)}${lat < 0 ? 'S' : 'U'}`; // U = Utara, S = Selatan
}

export function formatLon(lon) {
  return `${dm(lon, 3)}${lon < 0 ? 'B' : 'T'}`; // T = Timur, B = Barat
}

export function formatCoord(lat, lon) {
  return `${formatLat(lat)} ${formatLon(lon)}`;
}

export function pad2(n) {
  return String(n).padStart(2, '0');
}

export function todayLabel() {
  return new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
}

export function dayOfYear(d = new Date()) {
  return Math.floor((d - new Date(d.getFullYear(), 0, 0)) / 86_400_000);
}
