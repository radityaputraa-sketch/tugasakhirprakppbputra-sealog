import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFetch } from '../lib/api.js';
import { ErrorBox, Loading } from '../components/Status.jsx';

export default function PelabuhanList() {
  const [cari, setCari] = useState('');
  const [pulau, setPulau] = useState('');

  const params = new URLSearchParams();
  if (cari) params.set('q', cari);
  if (pulau) params.set('pulau', pulau);
  const { data, loading, error, muatUlang } = useFetch(`/api/pelabuhan?${params}`);

  const statistik = useFetch('/api/statistik');
  const daftarPulau = Object.keys(statistik.data?.data?.pulauPelabuhan ?? {});

  const pelabuhan = data?.data ?? [];

  return (
    <div className="page">
      <h1>Pelabuhan</h1>

      <input
        className="search"
        type="search"
        placeholder="Cari nama, kota, provinsi"
        value={cari}
        onChange={(e) => setCari(e.target.value)}
      />

      <div className="chips">
        <button className={pulau === '' ? 'chip on' : 'chip'} onClick={() => setPulau('')}>
          Semua
        </button>
        {daftarPulau.map((p) => (
          <button key={p} className={pulau === p ? 'chip on' : 'chip'} onClick={() => setPulau(p)}>
            {p}
          </button>
        ))}
      </div>

      {loading && !data && <Loading />}
      {error && <ErrorBox pesan={error} onCobaLagi={muatUlang} />}
      {data && pelabuhan.length === 0 && <p className="status">Tidak ada pelabuhan yang cocok.</p>}

      <ul className="list">
        {pelabuhan.map((p) => (
          <li key={p.id}>
            <Link to={`/pelabuhan/${p.id}`} className="list-item">
              <span className="list-title">{p.nama}</span>
              <span className="list-sub">{p.kota}, {p.provinsi} · {p.jenis}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}