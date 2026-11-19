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