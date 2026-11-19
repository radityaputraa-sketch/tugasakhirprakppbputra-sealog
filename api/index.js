import express from 'express';
import cors from 'cors';
import { readFileSync, writeFileSync } from 'node:fs';

const app = express();
app.use(cors());           
app.use(express.json()); 
const FILE_KAPAL = new URL('./data/kapal.json', import.meta.url);
const FILE_PELABUHAN = new URL('./data/pelabuhan.json', import.meta.url);

let kapal = JSON.parse(readFileSync(FILE_KAPAL, 'utf-8'));
let pelabuhan = JSON.parse(readFileSync(FILE_PELABUHAN, 'utf-8'));

function simpan(file, data) {
  try {
    writeFileSync(file, JSON.stringify(data, null, 2));
  } catch {
    console.log('File tidak bisa ditulis, perubahan hanya tersimpan sementara');
  }
}

function buatId(teks) {
  return String(teks)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

app.get('/', (req, res) => {
  res.json({ nama: 'SeaLog API', versi: '1.0.0' });
});

app.get('/api/kapal', (req, res) => {
  const { q, kategori } = req.query;
  let hasil = kapal;

  if (q) {
    const kata = q.toLowerCase();
    hasil = hasil.filter(
      (k) =>
        k.nama.toLowerCase().includes(kata) ||
        k.kategori.toLowerCase().includes(kata) ||
        (k.namaInggris ?? '').toLowerCase().includes(kata),
    );
  }

  if (kategori) {
    hasil = hasil.filter((k) => k.kategori.toLowerCase() === kategori.toLowerCase());
  }

  res.json({ total: hasil.length, data: hasil });
});

app.get('/api/kapal/:id', (req, res) => {
  const item = kapal.find((k) => k.id === req.params.id);
  if (!item) return res.status(404).json({ error: 'Kapal tidak ditemukan' });
  res.json({ data: item });
});

app.post('/api/kapal', (req, res) => {
  const { nama, kategori, ringkas } = req.body ?? {};
  if (!nama || !kategori || !ringkas) {
    return res.status(400).json({ error: 'nama, kategori, dan ringkas wajib diisi' });
  }

  const id = buatId(req.body.id || nama);
  if (kapal.some((k) => k.id === id)) {
    return res.status(409).json({ error: `id "${id}" sudah dipakai` });
  }

  const baru = { ...req.body, id };
  kapal.push(baru);
  simpan(FILE_KAPAL, kapal);
  res.status(201).json({ data: baru });
});

app.put('/api/kapal/:id', (req, res) => {
  const index = kapal.findIndex((k) => k.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Kapal tidak ditemukan' });

  kapal[index] = { ...kapal[index], ...req.body, id: req.params.id };
  simpan(FILE_KAPAL, kapal);
  res.json({ data: kapal[index] });
});

app.delete('/api/kapal/:id', (req, res) => {
  const ada = kapal.some((k) => k.id === req.params.id);
  if (!ada) return res.status(404).json({ error: 'Kapal tidak ditemukan' });

  kapal = kapal.filter((k) => k.id !== req.params.id);
  simpan(FILE_KAPAL, kapal);
  res.json({ pesan: 'Kapal berhasil dihapus' });
});

app.get('/api/pelabuhan', (req, res) => {
  const { q, pulau, kapal: idKapal } = req.query;
  let hasil = pelabuhan;

  if (q) {
    const kata = q.toLowerCase();
    hasil = hasil.filter(
      (p) =>
        p.nama.toLowerCase().includes(kata) ||
        p.kota.toLowerCase().includes(kata) ||
        p.provinsi.toLowerCase().includes(kata),
    );
  }

  if (pulau) {
    hasil = hasil.filter((p) => p.pulau.toLowerCase() === pulau.toLowerCase());
  }

  if (idKapal) {
    hasil = hasil.filter((p) => (p.kapalUmum ?? []).includes(idKapal));
  }

  res.json({ total: hasil.length, data: hasil });
});

app.get('/api/pelabuhan/:id', (req, res) => {
  const item = pelabuhan.find((p) => p.id === req.params.id);
  if (!item) return res.status(404).json({ error: 'Pelabuhan tidak ditemukan' });
  res.json({ data: item });
});

app.post('/api/pelabuhan', (req, res) => {
  const { nama, kota, provinsi, pulau } = req.body ?? {};
  if (!nama || !kota || !provinsi || !pulau) {
    return res.status(400).json({ error: 'nama, kota, provinsi, dan pulau wajib diisi' });
  }

  const id = buatId(req.body.id || nama);
  if (pelabuhan.some((p) => p.id === id)) {
    return res.status(409).json({ error: `id "${id}" sudah dipakai` });
  }

  const baru = { ...req.body, id };
  pelabuhan.push(baru);
  simpan(FILE_PELABUHAN, pelabuhan);
  res.status(201).json({ data: baru });
});

app.put('/api/pelabuhan/:id', (req, res) => {
  const index = pelabuhan.findIndex((p) => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Pelabuhan tidak ditemukan' });

  pelabuhan[index] = { ...pelabuhan[index], ...req.body, id: req.params.id };
  simpan(FILE_PELABUHAN, pelabuhan);
  res.json({ data: pelabuhan[index] });
});

app.delete('/api/pelabuhan/:id', (req, res) => {
  const ada = pelabuhan.some((p) => p.id === req.params.id);
  if (!ada) return res.status(404).json({ error: 'Pelabuhan tidak ditemukan' });

  pelabuhan = pelabuhan.filter((p) => p.id !== req.params.id);
  simpan(FILE_PELABUHAN, pelabuhan);
  res.json({ pesan: 'Pelabuhan berhasil dihapus' });
});

function hitung(daftar, field) {
  const hasil = {};
  for (const item of daftar) {
    hasil[item[field]] = (hasil[item[field]] ?? 0) + 1;
  }
  return hasil;
}

app.get('/api/statistik', (req, res) => {
  res.json({
    data: {
      totalKapal: kapal.length,
      totalPelabuhan: pelabuhan.length,
      kategoriKapal: hitung(kapal, 'kategori'),
      pulauPelabuhan: hitung(pelabuhan, 'pulau'),
    },
  });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint tidak ada' });
});

const PORT = process.env.PORT || 3000;
if (!process.env.VERCEL) {
  app.listen(PORT, () => console.log(`SeaLog API jalan di http://localhost:${PORT}`));
}

export default app;