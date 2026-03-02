import L from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

const center = [29.5, 45.5];
const bounds = [
  [12.5, 25],
  [42, 64]
];

const colors = {
  سياسي: '#2563eb',
  عسكري: '#dc2626',
  اقتصادي: '#059669',
  عاجل: '#f59e0b'
};

function iconFor(category) {
  return new L.DivIcon({
    html: `<span style="display:block;width:14px;height:14px;border-radius:50%;background:${colors[category] || '#64748b'};border:2px solid white"></span>`,
    className: ''
  });
}

export default function NewsMap({ news }) {
  return (
    <MapContainer center={center} zoom={5} minZoom={4} maxBounds={bounds} style={{ height: '72vh', borderRadius: '16px' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
      {news.map((item) => (
        <Marker key={item.id} position={[item.latitude, item.longitude]} icon={iconFor(item.category)}>
          <Popup>
            <article className="popup-news">
              <h3>{item.title}</h3>
              {item.imageUrl && <img src={item.imageUrl} alt={item.title} />}
              <p>{item.summary}</p>
              <small>{new Date(item.publishedAt).toLocaleString('ar-EG')}</small>
              <div>المصدر: {item.sourceName}</div>
              <a href={item.url} target="_blank" rel="noreferrer">المقال الأصلي</a>
            </article>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
