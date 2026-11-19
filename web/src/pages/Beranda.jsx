import { Link } from 'react-router-dom';
import { useFetch } from '../lib/api.js';
import { dayOfYear, formatCoord, pad2, todayLabel } from '../lib/format.js';
import ShipSilhouette from '../components/ShipSilhouette.jsx';
import { ErrorBox } from '../components/Status.jsx';
import { SignalFlags } from '../components/ui.jsx';
import { IconChevron } from '../components/Icons.jsx';

export default function Beranda() {
  const statistik = useFetch('/api/statistik');
  const kapal = useFetch('/api/kapal');
  const pelabuhan = useFetch('/api/pelabuhan');

  const s = statistik.data?.data;
  const daftarKapal = kapal.data?.data ?? [];
  const daftarPelabuhan = pelabuhan.data?.data ?? [];

  // "Kapal hari ini" dan "Pelabuhan singgah" berganti setiap hari
  const hari = dayOfYear();
  const kapalHariIni = daftarKapal.length ? daftarKapal[hari % daftarKapal.length] : null;
  const pelabuhanHariIni = daftarPelabuhan.length ? daftarPelabuhan[(hari * 7) % daftarPelabuhan.length] : null;

  const maxPulau = s ? Math.max(...Object.values(s.pulauPelabuhan)) : 1;

  return (
    <div className="page home">
      <section className="masthead">
        <div className="masthead-top">
          <SignalFlags />
          <span className="mono small">LOG · {todayLabel()}</span>
        </div>
        <h1 className="wordmark">SeaLog</h1>
        <p className="masthead-sub">Catatan jenis kapal dan pelabuhan di perairan Indonesia.</p>
        <div className="tally">
          <Link to="/kapal" className="tally-cell">
            <span className="tally-num">{s ? pad2(s.totalKapal) : '--'}</span>
            <span className="tally-label">jenis kapal</span>
          </Link>
          <Link to="/pelabuhan" className="tally-cell">
            <span className="tally-num">{s ? pad2(s.totalPelabuhan) : '--'}</span>
            <span className="tally-label">pelabuhan</span>
          </Link>
          <div className="tally-cell">
            <span className="tally-num">{s ? pad2(Object.keys(s.pulauPelabuhan).length) : '--'}</span>
            <span className="tally-label">wilayah</span>
          </div>
        </div>
      </section>

      {statistik.error && <ErrorBox pesan={statistik.error} onCobaLagi={statistik.muatUlang} />}

      {kapalHariIni && (
        <section className="block">
          <h2 className="block-title">
            <span>Kapal hari ini</span>
          </h2>
          <Link to={`/kapal/${kapalHariIni.id}`} className="feature">
            <ShipSilhouette id={kapalHariIni.id} className="feature-ship" />
            <div className="feature-body">
              <span className="tag">{kapalHariIni.kategori}</span>
              <h3>{kapalHariIni.nama}</h3>
              <p>{kapalHariIni.ringkas}</p>
              <span className="link-more">
                Baca catatan <IconChevron />
              </span>
            </div>
          </Link>
        </section>
      )}

      {pelabuhanHariIni && (
        <section className="block">
          <h2 className="block-title">
            <span>Pelabuhan singgah</span>
          </h2>
          <Link to={`/pelabuhan/${pelabuhanHariIni.id}`} className="port-ticket">
            <div>
              <div className="port-ticket-name">{pelabuhanHariIni.nama}</div>
              <div className="muted small">
                {pelabuhanHariIni.kota}, {pelabuhanHariIni.provinsi}
              </div>
            </div>
            <div className="port-ticket-coord mono">{formatCoord(pelabuhanHariIni.lat, pelabuhanHariIni.lon)}</div>
          </Link>
        </section>
      )}

      {s && (
        <section className="block">
          <h2 className="block-title">
            <span>Kategori kapal</span>
          </h2>
          <div className="cat-grid">
            {Object.entries(s.kategoriKapal).map(([nama, jumlah]) => (
              <div key={nama} className="cat">
                <span>{nama}</span>
                <span className="mono muted">{pad2(jumlah)}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {s && (
        <section className="block">
          <h2 className="block-title">
            <span>Pelabuhan per wilayah</span>
          </h2>
          <ul className="bars">
            {Object.entries(s.pulauPelabuhan)
              .sort((a, b) => b[1] - a[1])
              .map(([nama, jumlah]) => (
                <li key={nama}>
                  <span className="bar-label">{nama}</span>
                  <span className="bar-track">
                    <span className="bar-fill" style={{ width: `${(jumlah / maxPulau) * 100}%` }} />
                  </span>
                  <span className="mono small">{jumlah}</span>
                </li>
              ))}
          </ul>
        </section>
      )}
    </div>
  );
}
