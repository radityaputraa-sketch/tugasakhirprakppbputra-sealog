import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useFetch } from '../lib/api.js';
import { pad2 } from '../lib/format.js';
import { sudahDisimpan, toggleSimpanan } from '../lib/simpanan.js';
import ShipSilhouette from '../components/ShipSilhouette.jsx';
import { ErrorBox } from '../components/Status.jsx';
import { DetailBar } from '../components/ui.jsx';
import { IconChevron } from '../components/Icons.jsx';

export default function KapalDetail() {
  const { id } = useParams();
  const { data, loading, error, muatUlang } = useFetch(`/api/kapal/${id}`);
  const pelabuhan = useFetch(`/api/pelabuhan?kapal=${id}`); // pelabuhan tempat kapal ini sering singgah
  const [disimpan, setDisimpan] = useState(() => sudahDisimpan('kapal', id));

  const k = data?.data;

  return (
    <div className="page">
      <DetailBar
        label="Catatan kapal"
        disimpan={disimpan}
        onSimpan={k ? () => setDisimpan(toggleSimpanan({ type: 'kapal', id, nama: k.nama, sub: k.kategori })) : null}
      />

      {loading && !k && <div className="detail-loading" />}
      {error && <ErrorBox pesan={error} onCobaLagi={muatUlang} />}

      {k && (
        <>
          <header className="detail-head">
            <span className="tag">{k.kategori}</span>
            <h1>{k.nama}</h1>
            <div className="mono muted">{k.namaInggris}</div>
          </header>

          {/* Siluet kapal di atas "kertas milimeter" dengan garis ukur panjang */}
          <figure className="drawing">
            <ShipSilhouette id={k.id} />
            <div className="dimension">
              <span className="dim-line" />
              <span className="dim-text mono">L ≈ {k.panjang}</span>
              <span className="dim-line" />
            </div>
          </figure>

          <p className="lead">{k.ringkas}</p>

          <dl className="spec">
            <div>
              <dt>Panjang</dt>
              <dd className="mono">{k.panjang}</dd>
            </div>
            <div>
              <dt>Kapasitas</dt>
              <dd className="mono">{k.kapasitas}</dd>
            </div>
            <div>
              <dt>Propulsi</dt>
              <dd>{k.propulsi}</dd>
            </div>
          </dl>

          <section className="block">
            <h2 className="block-title">
              <span>Sistem kontrol &amp; otomasi</span>
            </h2>
            <ol className="numbered">
              {k.sistemKontrol?.map((s, i) => (
                <li key={s}>
                  <span className="mono accent">{pad2(i + 1)}</span>
                  <span>{s}</span>
                </li>
              ))}
            </ol>
          </section>

          <section className="block">
            <h2 className="block-title">
              <span>Keterangan</span>
            </h2>
            <p className="prose">{k.deskripsi}</p>
          </section>

          {pelabuhan.data?.data?.length > 0 && (
            <section className="block">
              <h2 className="block-title">
                <span>Sering terlihat di</span>
                <span className="mono small muted">{pad2(pelabuhan.data.data.length)}</span>
              </h2>
              <ul className="link-list">
                {pelabuhan.data.data.map((p) => (
                  <li key={p.id}>
                    <Link to={`/pelabuhan/${p.id}`}>
                      <span>
                        {p.nama} <span className="muted">· {p.kota}</span>
                      </span>
                      <IconChevron />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </>
      )}
    </div>
  );
}
