import { Link } from 'react-router-dom';
import { useFetch } from '../lib/api.js';
import { ErrorBox, Loading } from '../components/Status.jsx';

export default function Beranda() {
  const { data, loading, error, muatUlang } = useFetch('/api/statistik');
  const s = data?.data;

  return (
    <div className="page">
      <h1>SeaLog</h1>
      <p>Catatan jenis kapal dan pelabuhan di perairan Indonesia.</p>

      {loading && <Loading />}
      {error && <ErrorBox pesan={error} onCobaLagi={muatUlang} />}

      {s && (
        <>
          <div className="tally">
            <Link to="/kapal">
              <b>{s.totalKapal}</b> jenis kapal
            </Link>
            <Link to="/pelabuhan">
              <b>{s.totalPelabuhan}</b> pelabuhan
            </Link>
          </div>

          <h2>Kategori kapal</h2>
          <ul className="list">
            {Object.entries(s.kategoriKapal).map(([nama, jumlah]) => (
              <li key={nama} className="list-item">
                <span className="list-title">{nama}</span>
                <span className="list-sub">{jumlah} jenis</span>
              </li>
            ))}
          </ul>

          <h2>Pelabuhan per wilayah</h2>
          <ul className="list">
            {Object.entries(s.pulauPelabuhan).map(([nama, jumlah]) => (
              <li key={nama} className="list-item">
                <span className="list-title">{nama}</span>
                <span className="list-sub">{jumlah} pelabuhan</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}