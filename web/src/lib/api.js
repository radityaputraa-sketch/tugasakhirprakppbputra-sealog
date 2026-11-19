import { useEffect, useState } from 'react';

// Alamat API dari file .env. Kalau tidak ada, pakai localhost.
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

/**
 * Hook untuk mengambil data dari API.
 * Contoh pemakaian: const { data, loading, error } = useFetch('/api/kapal');
 */
export function useFetch(path) {
  const [data, setData] = useState(null);       // hasil dari API
  const [loading, setLoading] = useState(true); // sedang memuat?
  const [error, setError] = useState(null);     // pesan error (kalau gagal)
  const [ulang, setUlang] = useState(0);        // untuk tombol "Coba lagi"

  useEffect(() => {
    let batal = false; // supaya hasil request lama tidak menimpa yang baru

    setLoading(true);
    setError(null);

    fetch(API_URL + path)
      .then(async (res) => {
        const body = await res.json();
        if (!res.ok) throw new Error(body.error || 'Gagal memuat data');
        return body;
      })
      .then((body) => {
        if (!batal) setData(body);
      })
      .catch((err) => {
        if (!batal) setError(err.message);
      })
      .finally(() => {
        if (!batal) setLoading(false);
      });

    return () => {
      batal = true;
    };
  }, [path, ulang]); // jalankan ulang setiap path berubah atau tombol "Coba lagi" diklik

  return { data, loading, error, muatUlang: () => setUlang((n) => n + 1) };
}
