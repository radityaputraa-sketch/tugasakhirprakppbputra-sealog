import { API_URL } from '../lib/api.js';

// Baris abu-abu berkedip selama data dimuat (skeleton)
export function Loading({ baris = 5 }) {
  return (
    <ul className="rows" aria-busy="true" aria-label="Memuat data">
      {Array.from({ length: baris }, (_, i) => (
        <li key={i} className="row skeleton">
          <span className="sk sk-num" />
          <span className="sk sk-line" />
        </li>
      ))}
    </ul>
  );
}

export function ErrorBox({ pesan, onCobaLagi }) {
  return (
    <div className="notice">
      <div className="notice-title">Gagal memuat data</div>
      <p>
        {pesan}. Pastikan SeaLog API berjalan di <code>{API_URL}</code>.
      </p>
      {onCobaLagi && (
        <button className="btn" onClick={onCobaLagi}>
          Coba lagi
        </button>
      )}
    </div>
  );
}
