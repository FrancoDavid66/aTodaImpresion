import { useState } from 'react';
import Media from '../componentes/Media.jsx';
import { Icono } from '../componentes/SvgDefs.jsx';
import { OCASIONES, TIPOS } from '../data/negocio.js';
import { useTienda } from '../lib/tienda.jsx';
import { desde, plata, temporadaActual } from '../lib/util.js';

// Panel de Zule: carga productos desde el celu sin tocar código.
// DEMO: guarda en este navegador. Para la versión final se conecta a una base de datos (ver README).
const VACIO = { nombre: '', desc: '', ocasion: 'cumple', tipo: 'stickers', p1: '', p10: '', p50: '', min: 1, disp: false, tema: true };

async function achicarFoto(file) {
  const bmp = await createImageBitmap(file);
  const s = Math.min(1, 640 / Math.max(bmp.width, bmp.height));
  const c = document.createElement('canvas');
  c.width = Math.round(bmp.width * s); c.height = Math.round(bmp.height * s);
  c.getContext('2d').drawImage(bmp, 0, 0, c.width, c.height);
  return c.toDataURL('image/jpeg', 0.8);
}

export default function Panel({ irA }) {
  const { todos, publicar, marcarDisponible, ocultar, borrar, avisar } = useTienda();
  const [f, setF] = useState(VACIO);
  const [foto, setFoto] = useState(null);
  const [aviso, setAviso] = useState('');
  const set = (k) => (e) => setF((x) => ({ ...x, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));
  const t = temporadaActual();
  const visibles = todos.filter((p) => !p.oculto);

  const elegirFoto = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try { setFoto(await achicarFoto(file)); setAviso(''); } catch { setAviso('No pudimos leer esa foto. Probá con otra.'); }
  };

  const enviar = (e) => {
    e.preventDefault();
    const p1 = +f.p1, min = Math.max(1, +f.min || 1);
    if (!f.nombre.trim() || !p1) { setAviso('Poné al menos el nombre y el precio por unidad.'); return; }
    const precios = [[min, p1]];
    if (+f.p10 && min < 10) precios.push([10, +f.p10]);
    if (+f.p50 && min < 50) precios.push([50, +f.p50]);
    const nuevo = {
      id: 'z-' + Date.now(), nombre: f.nombre.trim(), desc: f.desc.trim(), ocasion: [f.ocasion], tipo: f.tipo,
      fotoSubida: foto, ilus: foto ? null : 'stickerlogo', precios, minimo: min, disponible: f.disp, tematica: f.tema, nuevo: true,
    };
    const ok = publicar(nuevo);
    setAviso(ok ? '' : 'Se publicó, pero este navegador no deja guardarlo: se va a borrar al recargar.');
    setF(VACIO); setFoto(null); e.target.reset();
    avisar(`Publicado: ${nuevo.nombre}`, 'Ver en el catálogo', '/catalogo');
  };

  return (
    <main>
      <div className="wrap panel-cab">
        <h1>Panel de Zule</h1>
        <div className="demo-nota">
          <Icono id="ast" width="22" height="22" style={{ flex: 'none', marginTop: 2 }} />
          <p>Así carga Zule sus productos desde el celu, sin tocar código. Lo que publiques acá aparece al toque en el catálogo. <b>Versión de muestra:</b> se guarda solo en este navegador.</p>
        </div>
      </div>
      <div className="wrap panel-grid">
        <form className="caja form-p" onSubmit={enviar}>
          <h2>Nuevo producto</h2>
          <label className="foto-in" data-cursor="Subir">
            <input type="file" accept="image/*" onChange={elegirFoto} />
            {foto ? <img src={foto} alt="" /> : <span>Subí una foto<br /><small className="chico">Desde la galería del celu</small></span>}
          </label>
          <div className="inp-c"><label htmlFor="pNombre">Nombre</label><input id="pNombre" required placeholder="Ej: Llaveros con nombre" value={f.nombre} onChange={set('nombre')} /></div>
          <div className="inp-c"><label htmlFor="pDesc">Descripción corta</label><textarea id="pDesc" rows="2" placeholder="Ej: Acrílico con nombre y dibujito." value={f.desc} onChange={set('desc')} /></div>
          <div className="dos" style={{ display: 'grid' }}>
            <div className="inp-c"><label htmlFor="pOc">Ocasión</label><select id="pOc" value={f.ocasion} onChange={set('ocasion')}>{Object.entries(OCASIONES).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select></div>
            <div className="inp-c"><label htmlFor="pTipo">Tipo</label><select id="pTipo" value={f.tipo} onChange={set('tipo')}>{Object.entries(TIPOS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select></div>
          </div>
          <div>
            <span className="mini-l">Precio por unidad según cantidad</span>
            <div className="tres">
              <div className="inp-c"><label htmlFor="p1">Desde {Math.max(1, +f.min || 1)} u.</label><input id="p1" type="number" min="0" inputMode="numeric" placeholder="$" value={f.p1} onChange={set('p1')} /></div>
              <div className="inp-c"><label htmlFor="p10">10 u. o más</label><input id="p10" type="number" min="0" inputMode="numeric" placeholder="$" value={f.p10} onChange={set('p10')} /></div>
              <div className="inp-c"><label htmlFor="p50">50 u. o más</label><input id="p50" type="number" min="0" inputMode="numeric" placeholder="$" value={f.p50} onChange={set('p50')} /></div>
            </div>
          </div>
          <div className="inp-c"><label htmlFor="pMin">Pedido mínimo (unidades)</label><input id="pMin" type="number" min="1" inputMode="numeric" value={f.min} onChange={set('min')} /></div>
          <div className="toggles">
            <label className="sw">Disponible ya <input type="checkbox" checked={f.disp} onChange={set('disp')} /></label>
            <label className="sw">Pedir temática al cliente <input type="checkbox" checked={f.tema} onChange={set('tema')} /></label>
          </div>
          <button className="btn btn-wa" type="submit">Publicar producto</button>
          {aviso && <p className="aviso" style={{ color: 'var(--magenta-osc)' }}>{aviso}</p>}
        </form>

        <div className="caja">
          <h2>Tus productos</h2>
          <p className="p-resumen">{visibles.length} publicados, {visibles.filter((p) => p.disponible).length} marcados como disponible ya.{t ? ` Temporada activa: ${t.titulo}.` : ''}</p>
          <div className="p-lista">
            {todos.map((p) => (
              <div key={p.id} className={'p-fila' + (p.oculto ? ' oculto' : '')}>
                <Media p={p} />
                <div><h3>{p.nombre}</h3><small>{OCASIONES[p.ocasion[0]]}, desde {plata(desde(p))}</small></div>
                <div className="ctr">
                  <label className="sw" title="Disponible ya"><span className="sr">Disponible ya</span><input type="checkbox" checked={p.disponible} onChange={(e) => marcarDisponible(p.id, e.target.checked)} /></label>
                  {p.id.startsWith('z-')
                    ? <button type="button" className="link" onClick={() => borrar(p.id)}>Borrar</button>
                    : <button type="button" className="link" onClick={() => ocultar(p.id)}>{p.oculto ? 'Mostrar' : 'Ocultar'}</button>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
