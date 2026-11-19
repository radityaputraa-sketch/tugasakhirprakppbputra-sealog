import { useNavigate, useParams } from 'react-router-dom';

export default function KapalDetail() {
  const { id } = useParams();       // ambil :id dari alamat, contoh /kapal/tunda -> "tunda"
  const navigate = useNavigate();

  return (
    <div className="page">
      <button onClick={() => navigate(-1)}>← Kembali</button>
      <h1>Detail Kapal</h1>
      <p>id kapal: <b>{id}</b></p>
    </div>
  );
}