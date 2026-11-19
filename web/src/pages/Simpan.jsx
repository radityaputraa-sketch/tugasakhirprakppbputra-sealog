import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ambilSimpanan, hapusSemuaSimpanan } from '../lib/simpanan.js';
import { pad2 } from '../lib/format.js';
import ShipSilhouette from '../components/ShipSilhouette.jsx';
import { Empty, PageHead } from '../components/ui.jsx';
import { IconChevron } from '../components/Icons.jsx';

export default function Simpan() {
  const [daftar, setDaftar] = useState(ambilSimpanan);

  const kapal = daftar.filter((it) => it.type === 'kapal');
  const pelabuhan = daftar.filter((it) => it.type === 'pelabuhan');

  const hapusSemua = () => {
    if (window.confirm('Hapus semua simpanan?')) {
      hapusSemuaSimpanan();
      setDaftar([]);
    }
  };

  return (
    <div className="page">
      <PageHead kicker="Buku catatan" judul="Simpanan" meta={`${pad2(daftar.length)} tersimpan`} />

      {daftar.length === 0 ? (
        <Empty judul="Belum ada yang disimpan" to="/kapal" tombol="Jelajahi kapal">
          Tekan ikon penanda di halaman detail kapal atau pelabuhan untuk menyimpannya di sini.
        </Empty>
      ) : (
        <>
          {kapal.length > 0 && (
            <section className="block">
              <h2 className="block-title">
                <span>Kapal</span>
                <span className="mono small muted">{pad2(kapal.length)}</span>
              </h2>
              <ul className="rows">
                {kapal.map((it) => (
                  <li key={it.id}>
                    <Link to={`/kapal/${it.id}`} className="row">
                      <ShipSilhouette id={it.id} className="row-ship" water={false} />
                      <span className="row-main">
                        <span className="row-title">{it.nama}</span>
                        <span className="row-sub">{it.sub}</span>
                      </span>
                      <IconChevron className="row-chev" />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {pelabuhan.length > 0 && (
            <section className="block">
              <h2 className="block-title">
                <span>Pelabuhan</span>
                <span className="mono small muted">{pad2(pelabuhan.length)}</span>
              </h2>
              <ul className="rows">
                {pelabuhan.map((it) => (
                  <li key={it.id}>
                    <Link to={`/pelabuhan/${it.id}`} className="row">
                      <span className="row-pin" aria-hidden="true" />
                      <span className="row-main">
                        <span className="row-title">{it.nama}</span>
                        <span className="row-sub">{it.sub}</span>
                      </span>
                      <IconChevron className="row-chev" />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <button className="btn btn-ghost" onClick={hapusSemua}>
            Hapus semua simpanan
          </button>
        </>
      )}
    </div>
  );
}
