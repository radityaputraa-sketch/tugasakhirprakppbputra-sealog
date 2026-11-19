import { Link, useNavigate } from 'react-router-dom';
import { IconBack, IconBookmark, IconBookmarkFill, IconClose, IconSearch } from './Icons.jsx';

/** Judul halaman: label kecil oranye + judul besar + keterangan di kanan */
export function PageHead({ kicker, judul, meta }) {
  return (
    <header className="page-head">
      <div className="kicker">{kicker}</div>
      <h1>{judul}</h1>
      {meta && <div className="page-meta">{meta}</div>}
    </header>
  );
}

/** Bar atas halaman detail: tombol kembali + tombol simpan */
export function DetailBar({ label, disimpan, onSimpan }) {
  const navigate = useNavigate();
  return (
    <div className="detail-bar">
      <button className="icon-btn" onClick={() => navigate(-1)} aria-label="Kembali">
        <IconBack />
      </button>
      <span className="detail-bar-label">{label}</span>
      {onSimpan ? (
        <button
          className={disimpan ? 'icon-btn is-on' : 'icon-btn'}
          onClick={onSimpan}
          aria-label={disimpan ? 'Hapus dari simpanan' : 'Simpan'}
        >
          {disimpan ? <IconBookmarkFill /> : <IconBookmark />}
        </button>
      ) : (
        <span className="icon-btn" />
      )}
    </div>
  );
}

export function SearchBox({ value, onChange, placeholder }) {
  return (
    <label className="search">
      <IconSearch />
      <input type="search" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
      {value && (
        <button type="button" onClick={() => onChange('')} aria-label="Hapus pencarian">
          <IconClose />
        </button>
      )}
    </label>
  );
}

/** Deretan tombol filter. value '' berarti "Semua". */
export function Chips({ pilihan, value, onChange }) {
  return (
    <div className="chips">
      <button className={value === '' ? 'chip on' : 'chip'} onClick={() => onChange('')}>
        Semua
      </button>
      {pilihan.map((p) => (
        <button key={p} className={value === p ? 'chip on' : 'chip'} onClick={() => onChange(p)}>
          {p}
        </button>
      ))}
    </div>
  );
}

export function Empty({ judul, children, to, tombol }) {
  return (
    <div className="empty">
      <div className="empty-title">{judul}</div>
      {children && <p>{children}</p>}
      {to && (
        <Link to={to} className="btn">
          {tombol}
        </Link>
      )}
    </div>
  );
}

/** Bendera isyarat laut internasional S, E, A — hiasan di Beranda */
export function SignalFlags() {
  return (
    <svg className="flags" viewBox="0 0 66 16" aria-hidden="true">
      <rect x="0" y="0" width="20" height="16" fill="#fff" stroke="#14212e" strokeWidth=".8" />
      <rect x="6" y="4" width="8" height="8" fill="#1d3f8a" />
      <rect x="23" y="0" width="20" height="8" fill="#1d3f8a" />
      <rect x="23" y="8" width="20" height="8" fill="#c8102e" />
      <rect x="46" y="0" width="10" height="16" fill="#fff" stroke="#14212e" strokeWidth=".8" />
      <path d="M56 0h10l-5 8 5 8H56z" fill="#1d3f8a" />
    </svg>
  );
}
