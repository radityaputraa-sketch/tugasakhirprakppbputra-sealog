import { NavLink, useLocation } from 'react-router-dom';
import { IconAnchor, IconBookmark, IconCompass, IconInfo, IconShip } from './Icons.jsx';
import { ambilSimpanan } from '../lib/simpanan.js';

// Daftar tab: alamat tujuan + tulisan + ikon
const TABS = [
  { to: '/', label: 'Beranda', Icon: IconCompass },
  { to: '/kapal', label: 'Kapal', Icon: IconShip },
  { to: '/pelabuhan', label: 'Pelabuhan', Icon: IconAnchor },
  { to: '/simpan', label: 'Simpan', Icon: IconBookmark },
  { to: '/tentang', label: 'Tentang', Icon: IconInfo },
];

export default function BottomNav() {
  useLocation(); // render ulang setiap pindah halaman, supaya angka simpanan selalu terbaru
  const jumlahSimpanan = ambilSimpanan().length;

  return (
    <nav className="bottom-nav" aria-label="Navigasi utama">
      {TABS.map(({ to, label, Icon }) => (
        <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => (isActive ? 'tab active' : 'tab')}>
          <span className="tab-icon">
            <Icon />
            {to === '/simpan' && jumlahSimpanan > 0 && <span className="badge">{jumlahSimpanan}</span>}
          </span>
          <span className="tab-label">{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
