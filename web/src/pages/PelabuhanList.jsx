import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFetch } from '../lib/api.js';
import { formatLat, formatLon, pad2 } from '../lib/format.js';
import { ErrorBox, Loading } from '../components/Status.jsx';
import { Chips, Empty, PageHead, SearchBox } from '../components/ui.jsx';

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
      <PageHead kicker="Katalog · 02" judul="Pelabuhan" meta={data ? `${pad2(pelabuhan.length)} entri` : error ? '—' : 'memuat…'} />

      <div className="toolbar">
        <SearchBox value={cari} onChange={setCari} placeholder="Cari nama, kota, provinsi" />
        <Chips pilihan={daftarPulau} value={pulau} onChange={setPulau} />
      </div>

      {loading && !data && <Loading />}
      {error && <ErrorBox pesan={error} onCobaLagi={muatUlang} />}
      {data && pelabuhan.length === 0 && (
        <Empty judul="Tidak ada yang cocok">Coba kata kunci lain atau pilih wilayah "Semua".</Empty>
      )}

      <ul className="rows">
        {pelabuhan.map((p, i) => (
          <li key={p.id}>
            <Link to={`/pelabuhan/${p.id}`} className="row">
              <span className="row-num mono">{pad2(i + 1)}</span>
              <span className="row-main">
                <span className="row-title">{p.nama}</span>
                <span className="row-sub">
                  {p.kota} · <span className="muted">{p.jenis}</span>
                </span>
              </span>
              <span className="row-coord mono">
                {formatLat(p.lat)}
                <br />
                {formatLon(p.lon)}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
