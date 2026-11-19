import { NavLink } from 'react-router-dom';

// Daftar tab: alamat tujuan + tulisan yang tampil
const TABS = [
  { to: '/', label: 'Beranda' },
  { to: '/kapal', label: 'Kapal' },
  { to: '/pelabuhan', label: 'Pelabuhan' },
  { to: '/simpan', label: 'Simpan' },
  { to: '/tentang', label: 'Tentang' },
];

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      {TABS.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={tab.to === '/'}
          className={({ isActive }) => (isActive ? 'tab active' : 'tab')}
        >
          {tab.label}
        </NavLink>
      ))}
    </nav>
  );
}