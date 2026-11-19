import { Link } from 'react-router-dom';

export default function KapalList() {
  return (
    <div className="page">
      <h1>Jenis Kapal</h1>
      {/* Data percobaan, nanti diganti data dari API di Tahap 3 */}
      <ul>
        <li><Link to="/kapal/tunda">Kapal Tunda</Link></li>
        <li><Link to="/kapal/pinisi">Kapal Pinisi</Link></li>
      </ul>
    </div>
  );
}