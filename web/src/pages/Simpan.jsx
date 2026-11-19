import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ambilSimpanan, hapusSemuaSimpanan } from '../lib/simpanan.js';

export default function Simpan() {
  const [daftar, setDaftar] = useState(ambilSimpanan);

  const hapusSemua = () => {
    if (window.confirm('Hapus semua simpanan?')) {
      hapusSemuaSimpanan();
      setDaftar([]);
    }
  };

  return (
    <div className="page">
      <h1>Simpanan</h1>

      {daftar.length === 0 ? (
        <p className="status">
          Belum ada yang disimpan. Tekan tombol ☆ Simpan di halaman detail kapal atau pelabuhan.
        </p>
      ) : (
        <>
          <ul className="list">
            {daftar.map((it) => (
              <li key={`${it.type}-${it.id}`}>
                <Link to={`/${it.type}/${it.id}`} className="list-item">
                  <span className="list-title">{it.nama}</span>
                  <span className="list-sub">{it.type === 'kapal' ? 'Kapal' : 'Pelabuhan'} · {it.sub}</span>
                </Link>
              </li>
            ))}
          </ul>
          <button onClick={hapusSemua}>Hapus semua simpanan</button>
        </>
      )}
    </div>
  );
}