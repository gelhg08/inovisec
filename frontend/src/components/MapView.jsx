import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { getCases, getCase } from '../api/api';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function MapView({ token, user, onLogout }) {
  const [cases, setCases] = useState([]);
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    getCases(token)
      .then(setCases)
      .catch(() => setError('No se pudieron cargar los casos'));
  }, [token]);

  async function handleSelect(id) {
    try {
      setSelected(await getCase(id, token));
    } catch {
      setError('No se pudo cargar el detalle del caso');
    }
  }

  const center = [6.2442, -75.5812]; 

  return (
    <div className="app-shell">
      <header className="topbar">
        <span>Inovisec · Casos</span>
        <div>
          <span className="topbar-user">{user?.username}</span>
          <button className="logout-btn" onClick={onLogout}>Salir</button>
        </div>
      </header>

      <div className="split">
        <div className="map-pane">
          <MapContainer center={center} zoom={12} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              attribution='&copy; OpenStreetMap'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {cases.map((c) => (
              <Marker
                key={c.id}
                position={[c.latitude, c.longitude]}
                eventHandlers={{ click: () => handleSelect(c.id) }}
              />
            ))}
          </MapContainer>
        </div>

        <aside className="detail-pane">
          {error && <p className="login-error">{error}</p>}
          {!selected ? (
            <p className="detail-empty">Selecciona un caso en el mapa para ver su información.</p>
          ) : (
            <div>
              <span className={`badge ${selected.status === 'Abierto' ? 'badge-open' : ''}`}>
                {selected.status}
              </span>
              <h2>{selected.name}</h2>
              <p className="detail-date">{selected.date}</p>
              <p>{selected.description}</p>
              {selected.images?.map((src, i) => (
                <img key={i} src={src} alt={selected.name} className="detail-img" />
              ))}
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}