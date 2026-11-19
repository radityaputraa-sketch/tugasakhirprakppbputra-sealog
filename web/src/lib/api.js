import { useEffect, useState } from 'react';

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export function useFetch(path) {
  const [data, setData] = useState(null);       
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);     
  const [ulang, setUlang] = useState(0);        

  useEffect(() => {
    let batal = false; 

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
  }, [path, ulang]); 

  return { data, loading, error, muatUlang: () => setUlang((n) => n + 1) };
}