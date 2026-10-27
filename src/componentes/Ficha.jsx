import { useState } from 'react';
import Dialogo, { BotonCerrar } from './Dialogo.jsx';
import Media from './Media.jsx';
import { Badges } from './TarjetaProducto.jsx';
import { ControlesEtiqueta, ETIQUETA_INICIAL, VistaEtiqueta, etiquetaTexto } from './Personalizador.jsx';
import { useTienda } from '../lib/tienda.jsx';
import { minimo, plata, precioPorOpcion, precioUnit, unidad, waLink } from '../lib/util.js';

// Ficha de producto: opciones, temática, cantidad, escalas de precio y total → suma al pedido
function Contenido({ p, onCerrar }) {
  const { sumar } = useTienda();
  const [sel, setSel] = useState(() => (p.opciones || []).map((o) => o[1][0]));
  const [cant, setCant] = useState(minimo(p));
  const [tema, setTema] = useState('');
  const [eti, setEti] = useState(ETIQUETA_INICIAL);

  const min = minimo(p);
  const u = precioUnit(p, cant, sel);
  const escalaActiva = Math.max(...p.precios.filter((x) => cant >= x[0]).map((x) => x[0]), p.precios[0][0]);
  const paso = cant >= 10 && min >= 10 ? 5 : 1;
  const opTexto = (p.opciones || []).map((o, i) => o[0] + ': ' + sel[i]).join(', ');
  const consulta = waLink(`Hola Zule! Vi en el catálogo "${p.nombre}"${opTexto ? ' (' + opTexto + ')' : ''}, cantidad ${cant}${tema ? ', temática: ' + tema : ''}. ¿Me pasás info?`);

  const agregar = () => {
    const c = Math.max(cant, min);
    const op = [opTexto, tema ? 'Temática: ' + tema : '', p.persona ? etiquetaTexto(eti) : ''].filter(Boolean).join('. ');
    sumar({ id: p.id, nombre: p.nombre, foto: p.foto, ilus: p.ilus, fotoSubida: p.fotoSubida, sel: [...sel], op, cant: c, unit: precioUnit(p, c, sel) });
    onCerrar();
  };

  return (
    <>
      <div className="f-grid">
        <div className="f-media">{p.persona ? <VistaEtiqueta e={eti} /> : <Media p={p} alt={p.nombre} />}</div>
        <div className="f-info">
          <Badges p={p} todas />
          <h2 id="fNombre">{p.nombre}</h2>
          {p.desc && <p className="chico" style={{ fontSize: '1rem' }}>{p.desc}</p>}

          {(p.opciones || []).map((o, i) => (
            <fieldset key={o[0]}>
              <legend>{o[0]}</legend>
              <div className="chips">
                {o[1].map((v) => (
                  <label key={v} className="chip">
                    <input type="radio" name={'op' + i} checked={sel[i] === v} onChange={() => setSel((s) => s.map((x, j) => (j === i ? v : x)))} />
                    <span>{v}{o[2] ? ` · ${plata(o[2][v])}` : ''}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          ))}

          {p.persona && <ControlesEtiqueta e={eti} onChange={setEti} />}

          {p.tematica && (
            <div className="inp-c">
              <label htmlFor="fTema">Temática, personaje o colores</label>
              <input id="fTema" value={tema} onChange={(e) => setTema(e.target.value)} placeholder="Ej: fútbol, tonos pastel, unicornios" />
            </div>
          )}

          <div>
            <span className="mini-l">Cantidad</span>
            <div className="cant-fila">
              <div className="stepper">
                <button type="button" aria-label="Menos" onClick={() => setCant((c) => Math.max(1, c - paso))}>−</button>
                <input type="number" inputMode="numeric" min="1" value={cant} aria-label="Cantidad" onChange={(e) => setCant(Math.max(1, parseInt(e.target.value) || 1))} />
                <button type="button" aria-label="Más" onClick={() => setCant((c) => c + paso)}>+</button>
              </div>
              {min > 1 && <span className="chico">Mínimo {min} u.</span>}
            </div>
          </div>

          {!precioPorOpcion(p) && p.precios.length > 1 && (
            <div className="tiers">
              {p.precios.map(([m, pr]) => (
                <div key={m} className={m === escalaActiva ? 'on' : ''}><span>{m} u. o más</span><span>{plata(pr)} {unidad(p)}</span></div>
              ))}
            </div>
          )}

          <div className="f-pie">
            <div className="f-total"><span>Total estimado</span><b>{plata(u * Math.max(cant, min))}</b></div>
            <div className="f-btns">
              <button type="button" className="btn btn-wa" data-cursor="Sumar" onClick={agregar}>Sumar al pedido</button>
              <a className="btn" href={consulta} target="_blank" rel="noopener" data-cursor="Escribir">Consultar</a>
            </div>
          </div>
        </div>
      </div>
      <BotonCerrar onClick={onCerrar} />
    </>
  );
}

export default function Ficha() {
  const { fichaId, prod, cerrarFicha } = useTienda();
  const p = fichaId ? prod(fichaId) : null;
  return (
    <Dialogo abierto={!!p} onCerrar={cerrarFicha} className="ficha" aria-labelledby="fNombre">
      {p && <Contenido key={p.id} p={p} onCerrar={cerrarFicha} />}
    </Dialogo>
  );
}
