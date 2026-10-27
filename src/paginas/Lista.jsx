import Logo from '../componentes/Logo.jsx';
import { NEGOCIO, TIPOS } from '../data/negocio.js';
import { KITS } from '../data/productos.js';
import { useTienda } from '../lib/tienda.jsx';
import { Enlace } from '../lib/ruta.jsx';
import { minimo, plata, precioPorOpcion, unidad } from '../lib/util.js';

// /lista → lista de precios por mayor. Se arma sola con el catálogo y se baja en PDF (imprimir → guardar como PDF)
const precios = (p) =>
  precioPorOpcion(p)
    ? p.opciones.filter((o) => o[2]).map((o) => Object.entries(o[2]).map(([k, v]) => `${k}: ${plata(v)}`).join(' / ')).join(' / ')
    : p.precios.map(([m, v]) => `${m} u. o más: ${plata(v)}`).join(' / ') + (unidad(p) ? ' ' + unidad(p) : '');

export default function Lista() {
  const { productos } = useTienda();
  return (
    <main>
      <div className="lista-barra">
        <Enlace className="btn" to="/catalogo">Volver al catálogo</Enlace>
        <button className="btn btn-wa" type="button" onClick={() => print()}>Descargar PDF</button>
      </div>
      <article className="hoja">
        <div className="hoja-cab">
          <Logo />
          <p className="chico" style={{ textAlign: 'right' }}>{NEGOCIO.localidad}<br />WhatsApp {NEGOCIO.whatsappVisible}<br />{NEGOCIO.instagramUsuario}</p>
        </div>
        <h1>Lista de precios por mayor</h1>
        <p className="chico" style={{ marginTop: '.4rem' }}>Actualizada el {new Date().toLocaleDateString('es-AR')}. Precios por unidad salvo aclaración. Pedidos por WhatsApp.</p>
        {Object.entries(TIPOS).map(([k, v]) => {
          const ps = productos.filter((p) => p.tipo === k);
          if (!ps.length) return null;
          return (
            <section key={k}>
              <h2>{v}</h2>
              <table>
                <thead><tr><th>Producto</th><th>Mínimo</th><th>Precio según cantidad</th></tr></thead>
                <tbody>{ps.map((p) => <tr key={p.id}><td>{p.nombre}</td><td>{minimo(p)} u.</td><td>{precios(p)}</td></tr>)}</tbody>
              </table>
            </section>
          );
        })}
        <h2>Kits armados</h2>
        <table><tbody>{KITS.map((k) => <tr key={k.id}><td>{k.nombre}</td><td>{k.desc}</td><td>{plata(k.precio)}</td></tr>)}</tbody></table>
        <p className="pie-hoja">Precios de ejemplo. Los define Zule.</p>
      </article>
    </main>
  );
}
