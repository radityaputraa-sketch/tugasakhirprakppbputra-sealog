// Plot posisi pelabuhan pada grid lintang/bujur wilayah Indonesia.
// Bukan peta garis pantai, melainkan posisi relatif antarpelabuhan di katalog.
const BOUNDS = { lonMin: 94, lonMax: 142, latMax: 7, latMin: -12 };
const W = 320;
const H = Math.round((W * (BOUNDS.latMax - BOUNDS.latMin)) / (BOUNDS.lonMax - BOUNDS.lonMin));

const x = (lon) => ((lon - BOUNDS.lonMin) / (BOUNDS.lonMax - BOUNDS.lonMin)) * W;
const y = (lat) => ((BOUNDS.latMax - lat) / (BOUNDS.latMax - BOUNDS.latMin)) * H;

export default function PortChart({ ports = [], activeId }) {
  const active = ports.find((p) => p.id === activeId);
  const lons = [95, 100, 105, 110, 115, 120, 125, 130, 135, 140];
  const lats = [5, 0, -5, -10];

  return (
    <figure className="chart">
      <svg viewBox={`-14 -4 ${W + 18} ${H + 18}`} role="img" aria-label="Posisi pelabuhan">
        <rect x="0" y="0" width={W} height={H} fill="var(--water)" />
        <g stroke="var(--sea)" strokeOpacity=".25" strokeWidth=".6">
          {lons.map((l) => (
            <line key={l} x1={x(l)} x2={x(l)} y1="0" y2={H} />
          ))}
          {lats.map((l) => (
            <line key={l} y1={y(l)} y2={y(l)} x1="0" x2={W} strokeDasharray={l === 0 ? '0' : '2 2'} />
          ))}
        </g>
        <g className="chart-label">
          {lons.filter((l) => l % 10 === 0).map((l) => (
            <text key={l} x={x(l)} y={H + 10} textAnchor="middle">
              {l}°
            </text>
          ))}
          {lats.map((l) => (
            <text key={l} x="-3" y={y(l) + 3} textAnchor="end">
              {l === 0 ? '0' : `${Math.abs(l)}${l < 0 ? 'S' : 'U'}`}
            </text>
          ))}
        </g>
        {ports
          .filter((p) => p.id !== activeId)
          .map((p) => (
            <circle key={p.id} cx={x(p.lon)} cy={y(p.lat)} r="2.2" fill="var(--ink)" opacity=".45" />
          ))}
        {active && (
          <g>
            <line x1={x(active.lon)} x2={x(active.lon)} y1="0" y2={H} stroke="var(--accent)" strokeWidth=".8" />
            <line y1={y(active.lat)} y2={y(active.lat)} x1="0" x2={W} stroke="var(--accent)" strokeWidth=".8" />
            <circle cx={x(active.lon)} cy={y(active.lat)} r="6" fill="none" stroke="var(--accent)" strokeWidth="1.4" />
            <circle cx={x(active.lon)} cy={y(active.lat)} r="2.6" fill="var(--accent)" />
          </g>
        )}
      </svg>
      <figcaption>
        Posisi relatif terhadap {ports.length - 1} pelabuhan lain di katalog. Koordinat perkiraan.
      </figcaption>
    </figure>
  );
}
