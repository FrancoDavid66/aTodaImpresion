import { FOTOS } from '../data/fotos.js';
import Ilus from './Ilus.jsx';

// Foto o ilustración de un producto/kit. `solo` = sin el marco .p-media (para las tarjetas de ocasión)
export default function Media({ p, solo = false, children, alt = '' }) {
  const src = p.fotoSubida || (p.foto && FOTOS[p.foto]);
  const contenido = src ? <img src={src} alt={alt} loading="lazy" decoding="async" /> : <Ilus tipo={p.ilus} />;
  if (solo) return contenido;
  return <div className="p-media">{children}{contenido}</div>;
}
