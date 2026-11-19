import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFetch } from '../lib/api.js';
import { ErrorBox, Loading } from '../components/Status.jsx';

export default function KapalList() {
  const [cari, setCari] = useState('');
  const [kategori, setKategori] = useState('');

  // Susun alamat API sesuai isi kotak cari dan kategori yang dipilih
  const params = new URLSearchParams();
  if (cari) params.set('q', cari);
  if (kategori) params.set('kategori', kategori);
  const { data, loading, error, muatUlang } = useFetch(`/api/kapal?${params}`);

  // Daftar kategori diambil dari endpoint statistik
  const statistik = useFetch('/api/statistik');
  const daftarKategori = Object.keys(statistik.data?.data?.kategoriKapal ?? {});

  const kapal = data?.data ?? [];

  return (
    <div className="page">
      <h1>Jenis Kapal</h1>

      <input
        className="search"
        type="search"
        placeholder="Cari kapal, mis. tanker"
        value={cari}
        onChange={(e) => setCari(e.target.value)}
      />

      <div className="chips">
        <button className={kategori === '' ? 'chip on' : 'chip'} onClick={() => setKategori('')}>
          Semua
        </button>
        {daftarKategori.map((k) => (
          <button key={k} className={kategori === k ? 'chip on' : 'chip'} onClick={() => setKategori(k)}>
            {k}
          </button>
        ))}
      </div>

      {loading && !data && <Loading />}
      {error && <ErrorBox pesan={error} onCobaLagi={muatUlang} />}
      {data && kapal.length === 0 && <p className="status">Tidak ada kapal yang cocok.</p>}

      <ul className="list">
        {kapal.map((k) => (
          <li key={k.id}>
            <Link to={`/kapal/${k.id}`} className="list-item">
              <span className="list-title">{k.nama}</span>
              <span className="list-sub">{k.namaInggris} · {k.kategori}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}