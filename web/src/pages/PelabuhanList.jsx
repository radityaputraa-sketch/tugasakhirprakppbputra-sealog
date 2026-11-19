import { Link } from 'react-router-dom';

export default function PelabuhanList() {
  return (
    <div className="page">
      <h1>Pelabuhan</h1>
      <ul>
        <li><Link to="/pelabuhan/tanjung-priok">Tanjung Priok</Link></li>
        <li><Link to="/pelabuhan/bitung">Bitung</Link></li>
      </ul>
    </div>
  );
}