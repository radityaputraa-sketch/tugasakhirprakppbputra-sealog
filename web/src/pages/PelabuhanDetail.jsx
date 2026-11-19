import { useNavigate, useParams } from 'react-router-dom';

export default function PelabuhanDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="page">
      <button onClick={() => navigate(-1)}>← Kembali</button>
      <h1>Detail Pelabuhan</h1>
      <p>id pelabuhan: <b>{id}</b></p>
    </div>
  );
}