import Media from './Media.jsx';
import { useTienda } from '../lib/tienda.jsx';
import { desde, minimo, plata, unidad } from '../lib/util.js';

export function Badges({ p, todas = false }) {
  return (
    <div className="badges">
      {p.disponible && <span className="badge holo">Disponible ya</span>}
      {p.nuevo && <span className="badge nuevo">Nuevo</span>}
      {p.top && (todas || !p.nuevo) && <span className="badge top">Más pedido</span>}
    </div>
  );
}

export default function TarjetaProducto({ p }) {
  const { abrirFicha } = useTienda();
  const min = minimo(p);
  return (
    <button type="button" className="pcard" data-cursor="Ver" onClick={() => abrirFicha(p.id)}>
      <Media p={p}><Badges p={p} /></Media>
      <div className="p-txt">
        <h3>{p.nombre}</h3>
        <p className="p-desde">desde <b>{plata(desde(p))}</b> {unidad(p)}</p>
        {min > 1 && <p className="p-min">Mínimo {min} u.</p>}
      </div>
    </button>
  );
}
