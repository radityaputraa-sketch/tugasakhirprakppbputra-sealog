import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFetch } from '../lib/api.js';
import { pad2 } from '../lib/format.js';
import ShipSilhouette from '../components/ShipSilhouette.jsx';
import { ErrorBox, Loading } from '../components/Status.jsx';
import { Chips, Empty, PageHead, SearchBox } from '../components/ui.jsx';
import { IconChevron } from '../components/Icons.jsx';

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
      <PageHead kicker="Katalog · 01" judul="Jenis Kapal" meta={data ? `${pad2(kapal.length)} entri` : error ? '—' : 'memuat…'} />

      <div className="toolbar">
        <SearchBox value={cari} onChange={setCari} placeholder="Cari kapal, mis. tanker" />
        <Chips pilihan={daftarKategori} value={kategori} onChange={setKategori} />
      </div>

      {loading && !data && <Loading />}
      {error && <ErrorBox pesan={error} onCobaLagi={muatUlang} />}
      {data && kapal.length === 0 && (
        <Empty judul="Tidak ada yang cocok">Coba kata kunci lain atau pilih kategori "Semua".</Empty>
      )}

      <ul className="rows">
        {kapal.map((k, i) => (
          <li key={k.id}>
            <Link to={`/kapal/${k.id}`} className="row">
              <span className="row-num mono">{pad2(i + 1)}</span>
              <ShipSilhouette id={k.id} className="row-ship" water={false} />
              <span className="row-main">
                <span className="row-title">{k.nama}</span>
                <span className="row-sub mono">{k.namaInggris}</span>
              </span>
              <span className="row-tag">{k.kategori}</span>
              <IconChevron className="row-chev" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
