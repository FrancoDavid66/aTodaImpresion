import { useState } from 'react';
import { FOTOS } from '../data/fotos.js';
import TarjetaProducto from '../componentes/TarjetaProducto.jsx';
import { useTienda } from '../lib/tienda.jsx';

// Antes / después del rediseño de etiqueta
export function AntesDespues() {
  const [pos, setPos] = useState(50);
  return (
    <section className="bloque" id="emprendedores">
      <div className="wrap ad">
        <div>
          <h2>Tu marca, mejor impresa</h2>
          <p className="intro">Rediseñamos las etiquetas de un dulce casero de frutilla. Mismo producto, otra presencia en la góndola. Mové la línea para comparar.</p>
          <ul className="puntos">
            <li>Etiquetas adhesivas para frascos, cajas y bolsas</li>
            <li>Stickers con tu logo para el packaging</li>
            <li>Tarjetas, listas de precios y carteles</li>
            <li>Precio por mayor para tu emprendimiento</li>
          </ul>
        </div>
        <div className="comp" style={{ '--pos': pos + '%' }}>
          <img src={FOTOS.antes} alt="Etiqueta anterior del dulce de frutilla" loading="lazy" />
          <img className="desp" src={FOTOS.despues} alt="Etiqueta rediseñada del dulce de frutilla" loading="lazy" />
          <span className="linea" />
          <span className="et a">Antes</span><span className="et d">Después</span>
          <input type="range" min="0" max="100" value={pos} onChange={(e) => setPos(+e.target.value)} aria-label="Comparar antes y después" data-cursor="Deslizá" />
        </div>
      </div>
    </section>
  );
}

// Lo que Zule marca como "disponible ya" en su panel
export function Disponibles() {
  const { productos } = useTienda();
  const D = productos.filter((p) => p.disponible).slice(0, 3);
  if (!D.length) return null;
  return (
    <section className="bloque disp" id="disponible">
      <div className="wrap">
        <h2>Disponible ya</h2>
        <p className="intro">Cosas que ya están hechas y salen sin esperar. Zule las marca desde su panel.</p>
        <div className="p-grid">{D.map((p) => <TarjetaProducto key={p.id} p={p} />)}</div>
      </div>
    </section>
  );
}
