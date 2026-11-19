// Ikon garis sederhana, digambar manual supaya konsisten dengan gaya aplikasi
const base = {
  width: 22,
  height: 22,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'square',
  strokeLinejoin: 'miter',
  'aria-hidden': true,
};

export const IconCompass = (p) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M15.5 8.5 13 13l-4.5 2.5L11 11z" />
  </svg>
);

export const IconShip = (p) => (
  <svg {...base} {...p}>
    <path d="M3 15h18l-2.5 4h-13z" />
    <path d="M6 15v-4h12v4M9 11V7h4v4" />
  </svg>
);

export const IconAnchor = (p) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="5" r="2" />
    <path d="M12 7v14M8 10h8M4 13a8 8 0 0 0 16 0" />
  </svg>
);

export const IconBookmark = (p) => (
  <svg {...base} {...p}>
    <path d="M6 3h12v18l-6-4-6 4z" />
  </svg>
);

export const IconBookmarkFill = (p) => (
  <svg {...base} {...p} fill="currentColor">
    <path d="M6 3h12v18l-6-4-6 4z" />
  </svg>
);

export const IconInfo = (p) => (
  <svg {...base} {...p}>
    <rect x="3" y="3" width="18" height="18" />
    <path d="M12 10.5V17M12 7v.5" />
  </svg>
);

export const IconBack = (p) => (
  <svg {...base} {...p}>
    <path d="M15 5 8 12l7 7" />
  </svg>
);

export const IconChevron = (p) => (
  <svg {...base} width={16} height={16} {...p}>
    <path d="m9 5 7 7-7 7" />
  </svg>
);

export const IconSearch = (p) => (
  <svg {...base} width={18} height={18} {...p}>
    <circle cx="10.5" cy="10.5" r="6.5" />
    <path d="m15.5 15.5 5 5" />
  </svg>
);

export const IconClose = (p) => (
  <svg {...base} width={16} height={16} {...p}>
    <path d="m6 6 12 12M18 6 6 18" />
  </svg>
);

export const IconExternal = (p) => (
  <svg {...base} width={14} height={14} {...p}>
    <path d="M14 4h6v6M20 4l-9 9M18 14v6H4V6h6" />
  </svg>
);
