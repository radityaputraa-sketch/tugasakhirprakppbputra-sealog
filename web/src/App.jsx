import { Route, Routes } from 'react-router-dom';
import BottomNav from './components/BottomNav.jsx';
import Beranda from './pages/Beranda.jsx';
import KapalList from './pages/KapalList.jsx';
import KapalDetail from './pages/KapalDetail.jsx';
import PelabuhanList from './pages/PelabuhanList.jsx';
import PelabuhanDetail from './pages/PelabuhanDetail.jsx';
import Simpan from './pages/Simpan.jsx';
import Tentang from './pages/Tentang.jsx';

export default function App() {
  return (
    <div className="app">
      <main>
        <Routes>
          <Route path="/" element={<Beranda />} />
          <Route path="/kapal" element={<KapalList />} />
          <Route path="/kapal/:id" element={<KapalDetail />} />
          <Route path="/pelabuhan" element={<PelabuhanList />} />
          <Route path="/pelabuhan/:id" element={<PelabuhanDetail />} />
          <Route path="/simpan" element={<Simpan />} />
          <Route path="/tentang" element={<Tentang />} />
          <Route path="*" element={<div className="page"><h1>Halaman tidak ada</h1></div>} />
        </Routes>
      </main>
      <BottomNav />
    </div>
  );
}