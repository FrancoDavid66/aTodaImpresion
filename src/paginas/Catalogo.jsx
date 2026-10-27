import { useDeferredValue, useEffect, useMemo, useState } from 'react';
import TarjetaProducto from '../componentes/TarjetaProducto.jsx';
import Media from '../componentes/Media.jsx';
import { Wa } from '../componentes/Generales.jsx';
import { ControlesEtiqueta, ETIQUETA_INICIAL, VistaEtiqueta, etiquetaTexto } from '../componentes/Personalizador.jsx';
import { OCASIONES, TEMPORADAS, TIPOS } from '../data/negocio.js';
import { KITS } from '../data/productos.js';
import { useTienda } from '../lib/tienda.jsx';
import { Enlace, ir } from '../lib/ruta.jsx';
import { desde, norm, plata, precioUnit, waLink } from '../lib/util.js';

// /catalogo  ·  /catalogo/cumple (ocasión)  ·  /catalogo/t-fin (temporada)  ·  /catalogo/disponible
export default function Catalogo({ param }) {
  const { productos, sumar, prod } = useTienda();
  const [q, setQ] = useState('');
  const [ocasion, setOcasion] = useState('todo');
  const [tipos, setTipos] = useState([]);
  const [disp, setDisp] = useState(false);
  const [temporada, setTemporada] = useState(null);
  const [orden, setOrden] = useState('top');
  const [abiertos, setAbiertos] = useState(() => innerWidth > 899);
  const [eti, setEti] = useState(ETIQUETA_INICIAL);
  const qDif = useDeferredValue(q);

  // cada vez que entran con un link distinto, arranca con ese filtro
  useEffect(() => {
    setQ(''); setTipos([]); setDisp(false); setTemporada(null); setOcasion('todo');
    if (param && param.startsWith('t-')) setTemporada(param.slice(2));
    else if (param === 'disponible') setDisp(true);
    else if (param && OCASIONES[param]) setOcasion(param);
  }, [param]);

  const lista = useMemo(() => {
    let L = productos;
    if (temporada) L = L.filter((p) => (p.temporadas || []).includes(temporada));
    if (ocasion !== 'todo') L = L.filter((p) => p.ocasion.includes(ocasion));
    if (tipos.length) L = L.filter((p) => tipos.includes(p.tipo));
    if (disp) L = L.filter((p) => p.disponible);
    const t = norm(qDif).trim();
    if (t) L = L.filter((p) => norm([p.nombre, p.desc, p.ocasion.map((o) => OCASIONES[o]).join(' '), TIPOS[p.tipo]].join(' ')).includes(t));
    const ord = {
      top: (a, b) => !!b.top - !!a.top || !!b.disponible - !!a.disponible,
      precio: (a, b) => desde(a) - desde(b),
      nuevos: (a, b) => !!b.nuevo - !!a.nuevo,
    };
    return [...L].sort(ord[orden]);
  }, [productos, temporada, ocasion, tipos, disp, qDif, orden]);

  const sinFiltros = !q && ocasion === 'todo' && !tipos.length && !disp && !temporada;
  const activos = (ocasion !== 'todo') + tipos.length + disp + !!q;
  const tmp = temporada && TEMPORADAS.find((x) => x.id === temporada);

  const sumarKit = (k) => sumar({ id: k.id, nombre: k.nombre, foto: k.foto, ilus: k.ilus, op: k.desc, cant: 1, unit: k.precio, kit: true });
  const sumarEtiquetas = () => {
    const p = prod('etiquetas-escolares');
    if (p) sumar({ id: p.id, nombre: p.nombre, ilus: p.ilus, sel: ['30 etiquetas'], op: 'Pack: 30 etiquetas. ' + etiquetaTexto(eti), cant: 1, unit: precioUnit(p, 1, ['30 etiquetas']) });
  };

  return (
    <main>
      <div className="wrap cat-cab">
        <h1>Catálogo</h1>
        <p className="intro">Todo lo que hacemos, con precios por cantidad. Elegí, sumá al pedido y mandalo por WhatsApp.</p>
      </div>
      <div className="wrap cat-wrap">
        <details className="cat-side" open={abiertos} onToggle={(e) => setAbiertos(e.currentTarget.open)}>
          <summary>Filtros {activos ? `(${activos})` : ''}</summary>
          <div className="f-in">
            <label className="buscar">
              <span className="sr">Buscar en el catálogo</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></svg>
              <input type="search" placeholder="Buscar: bolsitas, egresados…" autoComplete="off" value={q} onChange={(e) => setQ(e.target.value)} />
            </label>
            <div className="f-grupo">
              <h3>Ocasión</h3>
              <div className="f-lista">
                {[['todo', 'Todo', productos.length], ...Object.entries(OCASIONES).map(([k, v]) => [k, v, productos.filter((p) => p.ocasion.includes(k)).length])].map(([k, v, n]) => (
                  <label key={k}><input type="radio" name="fo" checked={ocasion === k} onChange={() => setOcasion(k)} />{v}<small>{n}</small></label>
                ))}
              </div>
            </div>
            <div className="f-grupo">
              <h3>Tipo</h3>
              <div className="f-lista">
                {Object.entries(TIPOS).map(([k, v]) => (
                  <label key={k}><input type="checkbox" checked={tipos.includes(k)} onChange={(e) => setTipos((t) => (e.target.checked ? [...t, k] : t.filter((x) => x !== k)))} />{v}<small>{productos.filter((p) => p.tipo === k).length}</small></label>
                ))}
              </div>
            </div>
            <label className="sw">Solo disponible ya <input type="checkbox" checked={disp} onChange={(e) => setDisp(e.target.checked)} /></label>
          </div>
        </details>

        <div>
          {sinFiltros && (
            <div className="kits">
              <h2>Kits armados</h2>
              <div className="kit-grid">
                {KITS.map((k) => (
                  <article className="kit" key={k.id}>
                    <Media p={k} />
                    <div className="kit-txt">
                      <h3>{k.nombre}</h3>
                      <p>{k.desc}</p>
                      <div className="kit-pie"><b>{plata(k.precio)}</b><button type="button" className="link" data-cursor="Sumar" onClick={() => sumarKit(k)}>Sumar al pedido</button></div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          <div className="res-cab">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.6rem', alignItems: 'center' }}>
              <span className="cuantos">{lista.length === 1 ? '1 producto' : `${lista.length} productos`}</span>
              {tmp && <span className="filtro-activo">Temporada: {tmp.titulo}<button type="button" aria-label="Quitar filtro de temporada" onClick={() => ir('/catalogo')}>✕</button></span>}
            </div>
            <label>Ordenar{' '}
              <select value={orden} onChange={(e) => setOrden(e.target.value)}>
                <option value="top">Más pedidos</option><option value="precio">Menor precio</option><option value="nuevos">Nuevos primero</option>
              </select>
            </label>
          </div>

          <div className="p-grid">
            {lista.length ? lista.map((p) => <TarjetaProducto key={p.id} p={p} />) : (
              <div className="vacio-cat" style={{ gridColumn: '1/-1' }}>
                <h3>No encontramos “{q || 'eso'}” en el catálogo</h3>
                <p className="chico" style={{ marginBottom: '1.2rem' }}>Igual lo podemos hacer: todo es a pedido.</p>
                <a className="btn btn-wa" href={waLink(`Hola Zule! Busqué en la web "${q}" y no lo encontré. ¿Lo hacés?`)} target="_blank" rel="noopener">Consultar por WhatsApp</a>
              </div>
            )}
          </div>

          <div className="perso">
            <VistaEtiqueta e={eti} />
            <div>
              <h2>Probá tu etiqueta</h2>
              <p className="chico" style={{ margin: '.5rem 0 1.2rem' }}>Escribí el nombre y mirá cómo queda. Ideal para útiles, viandas y mochilas.</p>
              <ControlesEtiqueta e={eti} onChange={setEti} />
              <button className="btn btn-wa" type="button" style={{ marginTop: '1.3rem' }} data-cursor="Sumar" onClick={sumarEtiquetas}>Sumar 30 etiquetas al pedido</button>
            </div>
          </div>

          <div className="mayor">
            <div><h2>¿Comprás para revender?</h2><p className="chico" style={{ marginTop: '.4rem' }}>Bajate la lista de precios por mayor. Se arma sola con el catálogo.</p></div>
            <div className="acc">
              <Enlace className="btn" to="/lista">Ver lista de precios</Enlace>
              <Wa className="btn btn-wa" msg="Hola Zule! Quiero revender tus productos, ¿me pasás info?">Quiero revender</Wa>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
