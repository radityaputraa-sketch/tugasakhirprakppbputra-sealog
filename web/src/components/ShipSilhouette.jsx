// Siluet samping tiap jenis kapal (haluan di kanan), digambar manual dengan path SVG.
// Garis air ada di y = 48. Bagian di bawahnya ditutup lapisan "air".

const stacks = (from, to, heights) =>
  heights.map((h, i) => {
    const x = from + i * 16;
    return x + 14 <= to ? <rect key={i} x={x} y={36 - h} width="14" height={h} /> : null;
  });

const SHAPES = {
  'peti-kemas': (
    <>
      <path d="M6 36H222l12-7-10 21H16L6 42z" />
      <rect x="20" y="10" width="20" height="26" />
      <rect x="16" y="10" width="28" height="3" />
      <rect x="44" y="18" width="6" height="18" />
      {stacks(54, 216, [14, 16, 16, 18, 18, 18, 16, 16, 14, 12])}
    </>
  ),
  'curah-kering': (
    <>
      <path d="M6 38H222l12-7-10 19H16L6 44z" />
      <rect x="18" y="14" width="20" height="24" />
      <rect x="14" y="14" width="28" height="3" />
      <rect x="40" y="22" width="6" height="16" />
      {[58, 88, 118, 148, 178].map((x) => (
        <rect key={x} x={x} y="33" width="24" height="5" />
      ))}
      <g fill="none" stroke="currentColor" strokeWidth="2">
        {[84, 114, 144, 174].map((x) => (
          <path key={x} d={`M${x} 33V14l16 10`} />
        ))}
      </g>
    </>
  ),
  tanker: (
    <>
      <path d="M6 38H220l14-6-10 18H16L6 44z" />
      <rect x="18" y="14" width="20" height="24" />
      <rect x="14" y="14" width="28" height="3" />
      <rect x="40" y="22" width="6" height="16" />
      <rect x="50" y="34" width="166" height="3" />
      <rect x="124" y="27" width="8" height="8" />
      <path d="M210 38v-7h14l-4 7z" />
    </>
  ),
  'lng-carrier': (
    <>
      <path d="M6 38H220l14-6-10 18H16L6 44z" />
      <rect x="16" y="12" width="20" height="26" />
      <rect x="12" y="12" width="28" height="3" />
      {[64, 104, 144, 184].map((cx) => (
        <path key={cx} d={`M${cx - 18} 38a18 18 0 0 1 36 0z`} />
      ))}
    </>
  ),
  'ro-ro': (
    <>
      <path d="M8 34H222l10-6-8 22H18L8 42z" />
      <path d="M14 34V14h196l10 20z" />
      <rect x="176" y="7" width="30" height="7" />
      <g fill="var(--paper)">
        {Array.from({ length: 16 }, (_, i) => (
          <rect key={i} x={24 + i * 11} y="18" width="7" height="4" />
        ))}
      </g>
      <path d="M8 38 0 48" stroke="currentColor" strokeWidth="2" />
    </>
  ),
  penumpang: (
    <>
      <path d="M6 34H222l12-7-10 23H18L6 42z" />
      <path d="M34 34V24h176l8 10z" />
      <path d="M56 24v-8h132l6 8z" />
      <rect x="150" y="10" width="38" height="6" />
      <path d="M86 16l2-12h12l-2 12z" />
      <g fill="var(--paper)">
        {Array.from({ length: 14 }, (_, i) => (
          <rect key={i} x={42 + i * 12} y="27" width="7" height="3" />
        ))}
      </g>
    </>
  ),
  ahts: (
    <>
      <path d="M6 38H146v-8h78l10-6-8 26H14L6 44z" />
      <path d="M156 30V12h40l6 18z" />
      <rect x="160" y="8" width="32" height="4" />
      <rect x="176" y="0" width="2" height="8" />
      <circle cx="10" cy="40" r="3" fill="var(--paper)" />
      <rect x="138" y="22" width="6" height="16" />
      <rect x="120" y="30" width="14" height="8" />
    </>
  ),
  psv: (
    <>
      <path d="M6 38H140v-10h84l10-6-8 28H14L6 44z" />
      <path d="M148 28V8h46l8 20z" />
      <rect x="164" y="2" width="2" height="6" />
      <g fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M10 32H136" />
        {Array.from({ length: 9 }, (_, i) => (
          <path key={i} d={`M${12 + i * 15} 32v6`} />
        ))}
      </g>
    </>
  ),
  fpso: (
    <>
      <path d="M4 36H226l8-6-6 20H10L4 42z" />
      <rect x="198" y="12" width="24" height="24" />
      <rect x="208" y="6" width="2" height="6" />
      {[
        [40, 14],
        [62, 20],
        [84, 12],
        [106, 22],
        [128, 16],
        [150, 20],
        [172, 12],
      ].map(([x, h]) => (
        <rect key={x} x={x} y={36 - h} width="20" height={h} />
      ))}
      <path d="M14 36 18 4h2l4 32z" />
      <path d="M19 4c-3-3 0-6 0-6s4 3 0 6z" fill="var(--accent)" />
    </>
  ),
  tunda: (
    <>
      <path d="M60 36H160l20-10-8 24H70L60 42z" />
      <rect x="98" y="26" width="52" height="10" />
      <path d="M116 26V14h30l4 12z" />
      <rect x="130" y="4" width="2" height="10" />
      <path d="M176 28c4 4 4 10 0 14" fill="none" stroke="currentColor" strokeWidth="3" />
      <rect x="72" y="30" width="8" height="6" />
    </>
  ),
  keruk: (
    <>
      <path d="M6 36H222l12-7-10 21H16L6 42z" />
      <path d="M188 36V14h26l6 22z" />
      <rect x="196" y="8" width="2" height="6" />
      <rect x="20" y="22" width="18" height="14" />
      <rect x="60" y="31" width="110" height="5" />
      <path d="M124 36V20l8-6 8 6v16" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M132 40 82 62" fill="none" stroke="currentColor" strokeWidth="3" />
    </>
  ),
  pinisi: (
    <>
      <path d="M30 30l20 4h146l18-8-10 18c-50 12-110 12-158 2z" />
      <path d="M90 34V4M150 34V8M212 28l26-6" fill="none" stroke="currentColor" strokeWidth="2" />
      <g fill="var(--sail)" stroke="currentColor" strokeWidth="1.2">
        <path d="M92 6l40 6v18H92z" />
        <path d="M152 10l30 4v16h-30z" />
        <path d="M150 8l86 14-70 6z" />
        <path d="M88 6l-36 22h36z" />
      </g>
    </>
  ),
  'pukat-cincin': (
    <>
      <path d="M40 36H186l16-8-8 22H52L40 42z" />
      <path d="M148 36V20h28l6 16z" />
      <rect x="160" y="4" width="2" height="16" />
      <path d="M160 8 98 28" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="104" cy="26" r="3.5" />
      <rect x="46" y="29" width="34" height="7" />
      <path d="M44 22h20l-3 6H47z" />
    </>
  ),
};

const FALLBACK = (
  <>
    <path d="M6 36H222l12-7-10 21H16L6 42z" />
    <rect x="20" y="14" width="24" height="22" />
  </>
);

export default function ShipSilhouette({ id, className = '', water = true, title }) {
  return (
    <svg
      className={`ship ${className}`}
      viewBox="0 0 240 64"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <g fill="currentColor">{SHAPES[id] ?? FALLBACK}</g>
      {water && (
        <>
          <rect x="0" y="48" width="240" height="16" fill="var(--water)" opacity="0.85" />
          <path d="M0 48H240" stroke="var(--sea)" strokeWidth="1" strokeDasharray="4 3" />
        </>
      )}
    </svg>
  );
}
