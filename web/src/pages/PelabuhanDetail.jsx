import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useFetch } from '../lib/api.js';
import { sudahDisimpan, toggleSimpanan } from '../lib/simpanan.js';
import { ErrorBox, Loading } from '../components/Status.jsx';

export default function PelabuhanDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading, error, muatUlang } = useFetch(`/api/pelabuhan/${id}`);
  const semuaKapal = useFetch('/api/kapal');
  const [disimpan, setDisimpan] = useState(() => sudahDisimpan('pelabuhan', id));

  const p = data?.data;

  // Cocokkan id di kapalUmum dengan data kapal lengkap, supaya bisa menampilkan namanya
  const kapalSinggah = (semuaKapal.data?.data ?? []).filter((k) => p?.kapalUmum?.includes(k.id));

  return (
    <div className="page">
      <div className="detail-bar">
        <button onClick={() => navigate(-1)}>← Kembali</button>
        {p && (
          <button
            onClick={() =>
              setDisimpan(toggleSimpanan({ type: 'pelabuhan', id, nama: p.nama, sub: `${p.kota}, ${p.provinsi}` }))
            }
          >
            {disimpan ? '★ Tersimpan' : '☆ Simpan'}
          </button>
        )}
      </div>

      {loading && <Loading />}
      {error && <ErrorBox pesan={error} onCobaLagi={muatUlang} />}

      {p && (
        <>
          <span className="tag">{p.jenis}</span>
          <h1>{p.nama}</h1>
          <p className="muted">{p.kota}, {p.provinsi}</p>

          <dl className="spec">
            <dt>Koordinat</dt>
            <dd>{p.lat}, {p.lon}</dd>
            <dt>Wilayah</dt>
            <dd>{p.pulau}</dd>
            <dt>Pengelola</dt>
            <dd>{p.pengelola}</dd>
          </dl>

          <h2>Keterangan</h2>
          <p>{p.deskripsi}</p>
          <a
            href={`https://www.openstreetmap.org/?mlat=${p.lat}&mlon=${p.lon}#map=12/${p.lat}/${p.lon}`}
            target="_blank"
            rel="noreferrer"
          >
            Lihat di peta ↗
          </a>

          {kapalSinggah.length > 0 && (
            <>
              <h2>Kapal yang umum singgah</h2>
              <ul className="list">
                {kapalSinggah.map((k) => (
                  <li key={k.id}>
                    <Link to={`/kapal/${k.id}`} className="list-item">
                      <span className="list-title">{k.nama}</span>
                      <span className="list-sub">{k.kategori}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </>
      )}
    </div>
  );
}