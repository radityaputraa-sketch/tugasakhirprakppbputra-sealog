import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import BottomNav from './components/BottomNav.jsx';
import { Empty } from './components/ui.jsx';
import Beranda from './pages/Beranda.jsx';
import KapalList from './pages/KapalList.jsx';
import KapalDetail from './pages/KapalDetail.jsx';
import PelabuhanList from './pages/PelabuhanList.jsx';
import PelabuhanDetail from './pages/PelabuhanDetail.jsx';
import Simpan from './pages/Simpan.jsx';
import Tentang from './pages/Tentang.jsx';

// Setiap pindah halaman, gulir kembali ke paling atas
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <div className="app">
      <ScrollToTop />
      <main className="content">
        <Routes>
          <Route path="/" element={<Beranda />} />
          <Route path="/kapal" element={<KapalList />} />
          <Route path="/kapal/:id" element={<KapalDetail />} />
          <Route path="/pelabuhan" element={<PelabuhanList />} />
          <Route path="/pelabuhan/:id" element={<PelabuhanDetail />} />
          <Route path="/simpan" element={<Simpan />} />
          <Route path="/tentang" element={<Tentang />} />
          <Route
            path="*"
            element={
              <div className="page">
                <Empty judul="Halaman tidak ada" to="/" tombol="Ke Beranda" />
              </div>
            }
          />
        </Routes>
      </main>
      <BottomNav />
    </div>
  );
}
