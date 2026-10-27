import Dialogo from './Dialogo.jsx';
import Media from './Media.jsx';
import { Icono } from './SvgDefs.jsx';
import { useTienda } from '../lib/tienda.jsx';
import { Enlace } from '../lib/ruta.jsx';
import { plata, waLink } from '../lib/util.js';

// Panel lateral con el pedido: cantidades, total estimado y envío de todo junto por WhatsApp
export default function Carrito() {
  const { carrito, cambiarCant, quitar, vaciar, carritoAbierto, cerrarCarrito } = useTienda();
  const total = carrito.reduce((a, x) => a + x.unit * x.cant, 0);
  const msg = ['Hola Zule! 👋 Te paso mi pedido desde la web:', ''];
  carrito.forEach((x, i) => msg.push(`${i + 1}) ${x.nombre} × ${x.cant}${x.op ? ' (' + x.op + ')' : ''}: ${plata(x.unit * x.cant)}`));
  msg.push('', 'Total estimado: ' + plata(total), '¿Me confirmás precio y para cuándo estaría?');

  return (
    <Dialogo abierto={carritoAbierto} onCerrar={cerrarCarrito} className="drawer" aria-labelledby="drTit">
      <div className="dr-cab">
        <h2 id="drTit">Tu pedido</h2>
        <button type="button" className="redondo" onClick={cerrarCarrito} aria-label="Cerrar">✕</button>
      </div>
      <div className="dr-items">
        {carrito.length ? carrito.map((x, i) => (
          <div className="dr-item" key={x.key}>
            <Media p={x} />
            <div>
              <h3>{x.nombre}</h3>
              {x.op && <p className="op">{x.op}</p>}
              <div className="dr-fila">
                <div className="stepper">
                  <button type="button" aria-label="Menos" onClick={() => cambiarCant(i, x.cant - 1)}>−</button>
                  <input type="number" min="1" value={x.cant} aria-label="Cantidad" onChange={(e) => cambiarCant(i, parseInt(e.target.value) || 1)} />
                  <button type="button" aria-label="Más" onClick={() => cambiarCant(i, x.cant + 1)}>+</button>
                </div>
                <b>{plata(x.unit * x.cant)}</b>
              </div>
              <button type="button" className="link" onClick={() => quitar(i)}>Quitar</button>
            </div>
          </div>
        )) : (
          <div className="dr-vacio">
            <p style={{ marginBottom: '1rem' }}>Todavía no sumaste nada.</p>
            <Enlace className="btn" to="/catalogo" onClick={cerrarCarrito}>Ver el catálogo</Enlace>
          </div>
        )}
      </div>
      {carrito.length > 0 && (
        <div className="dr-pie">
          <div className="dr-total"><span>Total estimado</span><b>{plata(total)}</b></div>
          <p className="chico">Precios de referencia. Zule te confirma el final, la seña y la fecha de entrega.</p>
          <a className="btn btn-wa" href={waLink(msg.join('\n'))} target="_blank" rel="noopener"><Icono id="wa" />Enviar pedido por WhatsApp</a>
          <button className="link" type="button" onClick={vaciar} style={{ justifySelf: 'center', color: 'var(--tinta-2)' }}>Vaciar pedido</button>
        </div>
      )}
    </Dialogo>
  );
}
