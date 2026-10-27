import { useEffect, useState } from 'react';
import Dialogo, { BotonCerrar } from '../componentes/Dialogo.jsx';
import { FOTOS } from '../data/fotos.js';
import { FILTROS_TRABAJOS, TRABAJOS } from '../data/negocio.js';
import { waLink } from '../lib/util.js';

// Galería con filtros + vista ampliada con "Quiero algo así" por WhatsApp
export default function Trabajos() {
  const [filtro, setFiltro] = useState('todos');
  const [abierto, setAbierto] = useState(null);
  const vis = TRABAJOS.map((t, i) => ({ ...t, i })).filter((t) => filtro === 'todos' || t.cat === filtro);
  const paso = (d) => { const k = vis.findIndex((t) => t.i === abierto); setAbierto(vis[(k + d + vis.length) % vis.length].i); };
  const t = abierto != null ? TRABAJOS[abierto] : null;

  useEffect(() => {
    if (abierto == null) return;
    const f = (e) => { if (e.key === 'ArrowLeft') paso(-1); if (e.key === 'ArrowRight') paso(1); };
    addEventListener('keydown', f);
    return () => removeEventListener('keydown', f);
  });

  return (
    <section className="bloque trabajos" id="trabajos">
      <div className="wrap">
        <div className="cab">
          <div>
            <h2>Algunos trabajos</h2>
            <p className="intro">Cada pedido sale distinto. Tocá uno para verlo más grande y pedir algo parecido.</p>
          </div>
          <div className="filtros" role="group" aria-label="Filtrar trabajos">
            {FILTROS_TRABAJOS.map(([k, v]) => (
              <button key={k} type="button" aria-pressed={filtro === k} onClick={() => setFiltro(k)}>{v}</button>
            ))}
          </div>
        </div>
        <div className="galeria">
          {vis.map((x, n) => (
            <figure key={x.i} className={'pieza' + (n === 0 ? ' destacada' : '')}>
              <button type="button" aria-label={'Ver ' + x.tit} data-cursor="Ver" onClick={() => setAbierto(x.i)}>
                <img src={FOTOS[x.foto]} alt={x.tit} loading="lazy" decoding="async" />
              </button>
              <figcaption>{x.tit}</figcaption>
            </figure>
          ))}
        </div>
      </div>

      <Dialogo abierto={!!t} onCerrar={() => setAbierto(null)} className="lb" aria-label="Trabajo ampliado">
        {t && (
          <>
            <div className="lb-in">
              <img src={FOTOS[t.foto]} alt={t.tit} />
              <div className="lb-txt">
                <h3>{t.tit}</h3>
                <p className="chico">{t.desc}</p>
                <a className="btn btn-wa" href={waLink(`Hola Zule! Vi en la web "${t.tit}" y quiero algo así para...`)} target="_blank" rel="noopener">Quiero algo así</a>
                <div className="lb-nav">
                  <button type="button" className="redondo" aria-label="Anterior" onClick={() => paso(-1)}>‹</button>
                  <button type="button" className="redondo" aria-label="Siguiente" onClick={() => paso(1)}>›</button>
                </div>
              </div>
            </div>
            <BotonCerrar onClick={() => setAbierto(null)} />
          </>
        )}
      </Dialogo>
    </section>
  );
}
