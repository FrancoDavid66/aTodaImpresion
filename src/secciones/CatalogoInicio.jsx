import Media from '../componentes/Media.jsx';
import { OCASIONES } from '../data/negocio.js';
import { KITS } from '../data/productos.js';
import { useTienda } from '../lib/tienda.jsx';
import { Enlace } from '../lib/ruta.jsx';

// Tarjetas por ocasión que llevan al catálogo filtrado
export default function CatalogoInicio() {
  const { productos } = useTienda();
  return (
    <section className="bloque" id="catalogo-inicio" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <h2>Todo el catálogo, ordenado</h2>
        <p className="intro">Buscá por ocasión, elegí cantidad y armá tu pedido. Lo mandás por WhatsApp y te confirmamos precio y fecha.</p>
        <div className="oc-grid">
          {Object.entries(OCASIONES).map(([k, v]) => {
            const ps = productos.filter((p) => p.ocasion.includes(k));
            if (!ps.length) return null;
            return (
              <Enlace key={k} className="oc" to={'/catalogo/' + k} data-cursor="Ver">
                <div className="oc-media"><Media p={ps.find((p) => p.foto || p.fotoSubida) || ps[0]} solo /></div>
                <div className="oc-txt"><h3>{v}</h3><span>{ps.length} productos</span></div>
              </Enlace>
            );
          })}
          <Enlace className="oc todo" to="/catalogo" data-cursor="Abrir">
            <h3>Ver el catálogo completo</h3>
            <span>{productos.length} productos y {KITS.length} kits armados</span>
          </Enlace>
        </div>
      </div>
    </section>
  );
}
