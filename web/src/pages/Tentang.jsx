import { API_URL, useFetch } from '../lib/api.js';

// ===== GANTI DENGAN DATA DIRIMU =====
const PROFIL = {
  nama: 'Thufail Bima Putra Raditya',
  nim: '21120124130049',
  prodi: 'Teknik Komputer',
  github: 'https://github.com/radityaputraa-sketch/tugasakhirprakppbputra-sealog',
};

export default function Tentang() {
  const api = useFetch('/'); // cek apakah API menyala

  return (
    <div className="page">
      <h1>Tentang</h1>

      <h2>Pembuat</h2>
      <dl className="spec">
        <dt>Nama</dt>
        <dd>{PROFIL.nama}</dd>
        <dt>NIM</dt>
        <dd>{PROFIL.nim}</dd>
        <dt>Prodi</dt>
        <dd>{PROFIL.prodi}</dd>
        <dt>GitHub</dt>
        <dd>
          <a href={PROFIL.github} target="_blank" rel="noreferrer">
            {PROFIL.github.replace('https://', '')}
          </a>
        </dd>
      </dl>

      <h2>Aplikasi</h2>
      <p>
        SeaLog v1.0.0 — katalog jenis kapal dan pelabuhan Indonesia. Tugas Akhir Praktikum Pemrograman Perangkat
        Bergerak 2026.
      </p>

      <h2>Sumber data</h2>
      <p>
        SeaLog API: {api.loading ? 'memeriksa…' : api.error ? '🔴 tidak tersambung' : '🟢 tersambung'}
      </p>
      <p className="muted">{API_URL}</p>
      <p className="muted">React + Vite (frontend) · Node.js + Express (backend)</p>
    </div>
  );
}