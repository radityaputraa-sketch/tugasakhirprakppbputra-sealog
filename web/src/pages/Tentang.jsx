import { API_URL, useFetch } from '../lib/api.js';
import { PageHead } from '../components/ui.jsx';
import { IconExternal } from '../components/Icons.jsx';

const PROFIL = {
  nama: 'Thufail Bima Putra Raditya',
  nim: '21120124130049',
  prodi: 'Teknik Komputer',
  github: 'https://github.com/radityaputraa-sketch/tugasakhirprakppbputra-sealog',
};

export default function Tentang() {
  const api = useFetch('/'); 

  const inisial = PROFIL.nama
    .split(' ')
    .map((kata) => kata[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const status = api.loading ? 'memeriksa…' : api.error ? 'tidak tersambung' : 'tersambung';
  const warnaStatus = api.loading ? 'wait' : api.error ? 'off' : 'on';

  return (
    <div className="page">
      <PageHead kicker="Profil" judul="Tentang" />

      <section className="profile">
        <div className="avatar mono">{inisial}</div>
        <div>
          <div className="profile-name">{PROFIL.nama}</div>
          <div className="mono small">{PROFIL.nim}</div>
          <div className="muted small">{PROFIL.prodi}</div>
        </div>
      </section>

      <dl className="spec">
        <div>
          <dt>Tugas</dt>
          <dd>Tugas Akhir Praktikum Pemrograman Perangkat Bergerak 2026</dd>
        </div>
        <div>
          <dt>Repositori</dt>
          <dd>
            <a href={PROFIL.github} target="_blank" rel="noreferrer" className="ext-link inline">
              {PROFIL.github.replace('https://', '')} <IconExternal />
            </a>
          </dd>
        </div>
      </dl>

      <section className="block">
        <h2 className="block-title">
          <span>Tentang aplikasi</span>
          <span className="mono small muted">v1.0.0</span>
        </h2>
        <p className="prose">
          SeaLog adalah katalog saku tentang jenis-jenis kapal dan pelabuhan di Indonesia. Setiap jenis kapal dilengkapi
          siluet, ukuran umum, sistem propulsi, serta sistem kontrol dan otomasi yang dipakai di atasnya. Setiap
          pelabuhan dilengkapi posisi koordinat, pengelola, dan jenis kapal yang biasa singgah.
        </p>
        <p className="prose small muted">
          Ukuran kapal adalah rentang umum, bukan data satu kapal tertentu. Koordinat pelabuhan adalah perkiraan.
        </p>
      </section>

      <section className="block">
        <h2 className="block-title">
          <span>Sumber data</span>
        </h2>
        <div className="api-status">
          <span className={`dot ${warnaStatus}`} />
          <span>SeaLog API {status}</span>
        </div>
        <code className="api-url">{API_URL}</code>
        <ul className="stack mono small">
          <li>Frontend · React + Vite</li>
          <li>Backend · Node.js + Express</li>
          <li>Data · JSON, diakses lewat REST API</li>
        </ul>
      </section>
    </div>
  );
}
