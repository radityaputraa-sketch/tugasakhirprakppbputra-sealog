// Daftar simpanan disimpan di localStorage browser,
// jadi tetap ada walau aplikasi ditutup (tapi hanya di perangkat ini).
const KEY = 'sealog-simpanan';

export function ambilSimpanan() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) ?? [];
  } catch {
    return [];
  }
}

export function sudahDisimpan(type, id) {
  return ambilSimpanan().some((it) => it.type === type && it.id === id);
}

// Kalau belum disimpan -> simpan. Kalau sudah -> hapus.
// Mengembalikan status terbaru (true = tersimpan).
export function toggleSimpanan(item) {
  const daftar = ambilSimpanan();
  const ada = daftar.some((it) => it.type === item.type && it.id === item.id);

  const baru = ada
    ? daftar.filter((it) => !(it.type === item.type && it.id === item.id))
    : [item, ...daftar];

  localStorage.setItem(KEY, JSON.stringify(baru));
  return !ada;
}

export function hapusSemuaSimpanan() {
  localStorage.removeItem(KEY);
}
