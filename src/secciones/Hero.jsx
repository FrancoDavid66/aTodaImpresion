import { useEffect, useRef } from 'react';
import TituloImpreso from '../componentes/TituloImpreso.jsx';
import Plancha from '../componentes/Plancha.jsx';
import { Icono } from '../componentes/SvgDefs.jsx';
import { Wa } from '../componentes/Generales.jsx';
import { Enlace } from '../lib/ruta.jsx';
import { NEGOCIO } from '../data/negocio.js';

const BARRA = ['var(--cian)', 'var(--magenta)', 'var(--amarillo)', 'var(--tinta)', '#FF4FA8', 'var(--chicle)', '#FFB8DA', 'var(--rosa)', 'var(--rosa-2)', '#bfeeff', '#fff3a6', '#c3d1ff'];
const Registro = () => (
  <svg className="reg-m" viewBox="0 0 16 16"><circle cx="8" cy="8" r="5" fill="none" stroke="#33091F" /><path d="M8 0v16M0 8h16" stroke="#33091F" /></svg>
);

export default function Hero({ imprimir }) {
  const zona = useRef(null);

  // brillo holográfico que sigue al mouse (una vez por cuadro)
  useEffect(() => {
    const hero = zona.current, grad = document.getElementById('holo');
    let pend = null;
    const f = (e) => {
      if (pend) return;
      pend = requestAnimationFrame(() => {
        pend = null;
        const r = hero.getBoundingClientRect();
        const a = ((e.clientX - r.left) / r.width) * 120 - 60 + ((e.clientY - r.top) / r.height) * 40;
        grad && grad.setAttribute('gradientTransform', `rotate(${a.toFixed(1)} .5 .5)`);
      });
    };
    hero.addEventListener('pointermove', f, { passive: true });
    return () => { hero.removeEventListener('pointermove', f); if (pend) cancelAnimationFrame(pend); };
  }, []);

  return (
    <section className="hero" id="inicio" ref={zona}>
      <div className="wrap hero-grid">
        <div className="hero-txt">
          <TituloImpreso imprimir={imprimir}>{NEGOCIO.slogan}</TituloImpreso>
          <p className="intro">Diseño e impresión a pedido en San Genaro: stickers, etiquetas, deco para cumples, regalos personalizados, estampados y fotos. Hacemos precio por mayor y enviamos a toda la zona.</p>
          <div className="hero-cta">
            <Enlace className="btn btn-wa" to="/catalogo" data-cursor="Abrir">Ver el catálogo</Enlace>
            <Wa className="btn" msg="Hola Zule! Te escribo desde la web, quiero hacer un pedido 😊"><Icono id="wa" />Pedir por WhatsApp</Wa>
          </div>
        </div>
        <Plancha zona={zona} />
      </div>
      <div className="wrap">
        <div className="barra-color" aria-hidden="true">
          <Registro />
          {BARRA.map((c, i) => <i key={i} style={{ background: c }} />)}
          <Registro />
        </div>
      </div>
    </section>
  );
}
