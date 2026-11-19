import { API_URL } from '../lib/api.js';

export function Loading() {
  return <p className="status">Memuat data…</p>;
}

export function ErrorBox({ pesan, onCobaLagi }) {
  return (
    <div className="error-box">
      <b>Gagal memuat data</b>
      <p>{pesan}</p>
      <p>Pastikan API berjalan di {API_URL}</p>
      {onCobaLagi && <button onClick={onCobaLagi}>Coba lagi</button>}
    </div>
  );
}