import { useEffect, useRef } from 'react';
import { REDUCIR } from '../lib/util.js';
import { asterisco } from './Ilus.jsx';

// Cursor = sticker de la marca. Se balancea con la velocidad del mouse, sobre botones se vuelve un sticker
// redondo con texto (data-cursor="Ver") y al hacer clic en un lugar vacío deja pegado un stickercito.
// Solo en compu (mouse); en el celu no aparece.
export const cursor = { fijar: () => {} }; // lo usa la plancha del inicio ("Soltá" mientras arrastrás)

const SEL = 'a,button,label,summary,select,[data-cursor],input[type=range],input[type=checkbox],input[type=radio],input[type=file]';
const TEXTO = 'input:not([type=range]):not([type=checkbox]):not([type=radio]):not([type=file]),textarea';
const borde = 'fill="#fff" stroke="#fff" stroke-width="7" stroke-linejoin="round"';
const MINI = [
  `<svg viewBox="-5 -5 50 50"><g ${borde}>${asterisco(20, 20, 36, 7, '#fff')}</g>${asterisco(20, 20, 36, 7, '#E4007C')}</svg>`,
  `<svg viewBox="-5 -5 50 50"><path ${borde} d="M20 35C8 27 2 20 6 12c3-6 10-6 14 0 4-6 11-6 14 0 4 8-2 15-14 23Z"/><path fill="#FF8CC6" d="M20 35C8 27 2 20 6 12c3-6 10-6 14 0 4-6 11-6 14 0 4 8-2 15-14 23Z"/></svg>`,
  `<svg viewBox="-5 -5 50 50"><polygon ${borde} points="20,2 25,14 38,15 28,23 31,36 20,29 9,36 12,23 2,15 15,14"/><polygon fill="url(#holo)" points="20,2 25,14 38,15 28,23 31,36 20,29 9,36 12,23 2,15 15,14"/></svg>`,
];

export default function Cursor() {
  const c = useRef(null), tilt = useRef(null), txt = useRef(null);

  useEffect(() => {
    if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const html = document.documentElement;
    const BASE = -8;
    let lx = null, rot = BASE, obj = BASE, corriendo = false, fijo = null;
    const pegados = [];

    function pegar(e) {
      if (REDUCIR) return;
      const s = document.createElement('div');
      s.className = 'sello-click'; s.setAttribute('aria-hidden', 'true');
      s.style.left = e.pageX + 'px'; s.style.top = e.pageY + 'px';
      s.style.setProperty('--r', (Math.random() * 50 - 25).toFixed(0) + 'deg');
      s.innerHTML = MINI[Math.floor(Math.random() * MINI.length)];
      document.body.appendChild(s); pegados.push(s);
      if (pegados.length > 10) pegados.shift().remove();
      setTimeout(() => { s.remove(); const i = pegados.indexOf(s); if (i > -1) pegados.splice(i, 1); }, 1550);
    }
    function loop() { // se balancea según la velocidad y vuelve solo a su lugar
      rot += (obj - rot) * 0.2; obj += (BASE - obj) * 0.1;
      tilt.current.style.transform = `rotate(${rot.toFixed(2)}deg)`;
      if (Math.abs(obj - BASE) + Math.abs(rot - obj) > 0.08) requestAnimationFrame(loop); else corriendo = false;
    }
    function estado(t) {
      if (fijo || !t || !t.closest) return;
      const el = t.closest(SEL), escribe = t.closest(TEXTO);
      c.current.classList.toggle('oculto', !!escribe);
      const lab = el ? el.dataset.cursor || '' : '';
      c.current.classList.toggle('link', !!lab);
      c.current.classList.toggle('chico', !!el && !lab);
      if (lab) txt.current.textContent = lab;
    }
    cursor.fijar = (l) => {
      fijo = l;
      if (l) { c.current.classList.add('link'); c.current.classList.remove('chico', 'oculto'); txt.current.textContent = l; }
      else c.current.classList.remove('link');
    };

    tilt.current.style.transform = `rotate(${BASE}deg)`;
    const mover = (e) => {
      if (e.pointerType !== 'mouse') return;
      html.classList.add('con-cursor');
      c.current.style.transform = `translate3d(${e.clientX}px,${e.clientY}px,0)`;
      if (!REDUCIR) {
        const dx = lx == null ? 0 : e.clientX - lx; lx = e.clientX;
        obj = Math.max(-38, Math.min(26, BASE + dx * 1.5));
        if (!corriendo) { corriendo = true; requestAnimationFrame(loop); }
      }
    };
    const sobre = (e) => estado(e.target);
    const abajo = (e) => {
      if (e.pointerType !== 'mouse') return;
      c.current.classList.add('apretado');
      if (!html.classList.contains('dlg') && !e.target.closest(SEL + ',' + TEXTO + ',dialog,.peel')) pegar(e);
    };
    const arriba = () => c.current.classList.remove('apretado');
    const sale = () => c.current.classList.add('oculto');
    const entra = () => c.current.classList.remove('oculto');

    addEventListener('pointermove', mover, { passive: true });
    document.addEventListener('pointerover', sobre, { passive: true });
    document.addEventListener('pointerdown', abajo, { passive: true });
    document.addEventListener('pointerup', arriba, { passive: true });
    html.addEventListener('pointerleave', sale);
    html.addEventListener('pointerenter', entra);
    return () => {
      removeEventListener('pointermove', mover);
      document.removeEventListener('pointerover', sobre);
      document.removeEventListener('pointerdown', abajo);
      document.removeEventListener('pointerup', arriba);
      html.removeEventListener('pointerleave', sale);
      html.removeEventListener('pointerenter', entra);
      html.classList.remove('con-cursor');
      cursor.fijar = () => {};
    };
  }, []);

  return (
    <div className="cur" ref={c} aria-hidden="true">
      <div className="cur-tilt" ref={tilt}>
        <div className="cur-pres">
          <svg className="cur-ast" viewBox="-5 -5 50 50">
            <g fill="#fff" stroke="#fff" strokeWidth="7" strokeLinejoin="round">
              {[0, 45, 90, 135].map((g) => <rect key={g} x="16.5" y="2" width="7" height="36" rx="3.5" transform={`rotate(${g} 20 20)`} />)}
            </g>
            <g fill="#E4007C">
              {[0, 45, 90, 135].map((g) => <rect key={g} x="16.5" y="2" width="7" height="36" rx="3.5" transform={`rotate(${g} 20 20)`} />)}
            </g>
          </svg>
          <span className="cur-circ"><span className="cur-txt" ref={txt} /></span>
        </div>
      </div>
    </div>
  );
}
