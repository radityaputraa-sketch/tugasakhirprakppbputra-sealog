import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useFetch } from '../lib/api.js';
import { sudahDisimpan, toggleSimpanan } from '../lib/simpanan.js';
import { ErrorBox, Loading } from '../components/Status.jsx';

export default function KapalDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading, error, muatUlang } = useFetch(`/api/kapal/${id}`);
  const pelabuhan = useFetch(`/api/pelabuhan?kapal=${id}`); // pelabuhan tempat kapal ini sering singgah
  const [disimpan, setDisimpan] = useState(() => sudahDisimpan('kapal', id));

  const k = data?.data;

  return (
    <div className="page">
      <div className="detail-bar">
        <button onClick={() => navigate(-1)}>← Kembali</button>
        {k && (
          <button
            onClick={() => setDisimpan(toggleSimpanan({ type: 'kapal', id, nama: k.nama, sub: k.kategori }))}
          >
            {disimpan ? '★ Tersimpan' : '☆ Simpan'}
          </button>
        )}
      </div>

      {loading && <Loading />}
      {error && <ErrorBox pesan={error} onCobaLagi={muatUlang} />}

      {k && (
        <>
          <span className="tag">{k.kategori}</span>
          <h1>{k.nama}</h1>
          <p className="muted">{k.namaInggris}</p>
          <p className="lead">{k.ringkas}</p>

          <dl className="spec">
            <dt>Panjang</dt>
            <dd>{k.panjang}</dd>
            <dt>Kapasitas</dt>
            <dd>{k.kapasitas}</dd>
            <dt>Propulsi</dt>
            <dd>{k.propulsi}</dd>
          </dl>

          <h2>Sistem kontrol & otomasi</h2>
          <ol>
            {k.sistemKontrol?.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>

          <h2>Keterangan</h2>
          <p>{k.deskripsi}</p>

          {pelabuhan.data?.data?.length > 0 && (
            <>
              <h2>Sering terlihat di</h2>
              <ul className="list">
                {pelabuhan.data.data.map((p) => (
                  <li key={p.id}>
                    <Link to={`/pelabuhan/${p.id}`} className="list-item">
                      <span className="list-title">{p.nama}</span>
                      <span className="list-sub">{p.kota}</span>
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