import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useFetch } from '../lib/api.js';
import { formatLat, formatLon } from '../lib/format.js';
import { sudahDisimpan, toggleSimpanan } from '../lib/simpanan.js';
import PortChart from '../components/PortChart.jsx';
import ShipSilhouette from '../components/ShipSilhouette.jsx';
import { ErrorBox } from '../components/Status.jsx';
import { DetailBar } from '../components/ui.jsx';
import { IconChevron, IconExternal } from '../components/Icons.jsx';

export default function PelabuhanDetail() {
  const { id } = useParams();
  const { data, loading, error, muatUlang } = useFetch(`/api/pelabuhan/${id}`);
  const semuaKapal = useFetch('/api/kapal');
  const semuaPelabuhan = useFetch('/api/pelabuhan'); // untuk plot posisi
  const [disimpan, setDisimpan] = useState(() => sudahDisimpan('pelabuhan', id));

  const p = data?.data;

  // Cocokkan id di kapalUmum dengan data kapal lengkap, supaya bisa menampilkan namanya
  const kapalSinggah = (semuaKapal.data?.data ?? []).filter((k) => p?.kapalUmum?.includes(k.id));

  return (
    <div className="page">
      <DetailBar
        label="Catatan pelabuhan"
        disimpan={disimpan}
        onSimpan={
          p
            ? () => setDisimpan(toggleSimpanan({ type: 'pelabuhan', id, nama: p.nama, sub: `${p.kota}, ${p.provinsi}` }))
            : null
        }
      />

      {loading && !p && <div className="detail-loading" />}
      {error && <ErrorBox pesan={error} onCobaLagi={muatUlang} />}

      {p && (
        <>
          <header className="detail-head">
            <span className="tag">{p.jenis}</span>
            <h1>{p.nama}</h1>
            <div className="muted">
              {p.kota}, {p.provinsi}
            </div>
          </header>

          <div className="coord-block">
            <div>
              <span className="coord-label">Lintang</span>
              <span className="coord-val mono">{formatLat(p.lat)}</span>
            </div>
            <div>
              <span className="coord-label">Bujur</span>
              <span className="coord-val mono">{formatLon(p.lon)}</span>
            </div>
          </div>

          {semuaPelabuhan.data && <PortChart ports={semuaPelabuhan.data.data} activeId={p.id} />}

          <dl className="spec">
            <div>
              <dt>Wilayah</dt>
              <dd>{p.pulau}</dd>
            </div>
            <div>
              <dt>Jenis</dt>
              <dd>{p.jenis}</dd>
            </div>
            <div>
              <dt>Pengelola</dt>
              <dd>{p.pengelola}</dd>
            </div>
          </dl>

          <section className="block">
            <h2 className="block-title">
              <span>Keterangan</span>
            </h2>
            <p className="prose">{p.deskripsi}</p>
            <a
              className="ext-link"
              href={`https://www.openstreetmap.org/?mlat=${p.lat}&mlon=${p.lon}#map=12/${p.lat}/${p.lon}`}
              target="_blank"
              rel="noreferrer"
            >
              Lihat di OpenStreetMap <IconExternal />
            </a>
          </section>

          {kapalSinggah.length > 0 && (
            <section className="block">
              <h2 className="block-title">
                <span>Kapal yang umum singgah</span>
              </h2>
              <ul className="ship-strip">
                {kapalSinggah.map((k) => (
                  <li key={k.id}>
                    <Link to={`/kapal/${k.id}`}>
                      <ShipSilhouette id={k.id} water={false} className="strip-ship" />
                      <span className="strip-name">{k.nama.replace(/^Kapal /, '')}</span>
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
