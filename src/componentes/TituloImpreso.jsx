import { useEffect, useLayoutEffect, useRef } from 'react';
import { REDUCIR } from '../lib/util.js';

// El título se imprime pasada por pasada, con un cabezal de impresora que va y viene.
let yaImpreso = false; // solo la primera vez que se ve la portada

export default function TituloImpreso({ children, imprimir }) {
  const h = useRef(null);

  useLayoutEffect(() => {
    if (!yaImpreso && !REDUCIR) h.current.style.clipPath = 'inset(0 0 100% 0)';
  }, []);

  useEffect(() => {
    if (!imprimir || yaImpreso) return;
    yaImpreso = true;
    const el = h.current;
    if (REDUCIR) { el.style.clipPath = ''; return; }
    const W = el.offsetWidth, H = el.offsetHeight, pad = H * 0.12;
    const top = -pad, alto = H + pad * 2, bandas = Math.max(5, Math.round(alto / 46)), bh = alto / bandas, pasada = 150;
    const cab = document.createElement('span');
    cab.className = 'cabezal'; cab.setAttribute('aria-hidden', 'true');
    cab.innerHTML = '<span class="cabezal-riel"></span><span class="cabezal-carro"></span>';
    el.appendChild(cab);
    const riel = cab.firstChild, carro = cab.lastChild, X0 = -16, X1 = W + 16;
    const t0 = performance.now();
    let raf;
    const paso = (now) => {
      const t = (now - t0) / pasada, b = Math.floor(t);
      if (b >= bandas) {
        el.style.clipPath = '';
        cab.classList.add('fuera');
        setTimeout(() => cab.remove(), 400);
        return;
      }
      const fr = t - b, ida = b % 2 === 0;
      const x = ida ? X0 + fr * (X1 - X0) : X1 - fr * (X1 - X0);
      const y0 = top + b * bh, y1 = y0 + bh, ym = (y0 + y1) / 2;
      el.style.clipPath = ida
        ? `polygon(-40px -40px,${X1 + 40}px -40px,${X1 + 40}px ${y0}px,${x}px ${y0}px,${x}px ${y1}px,-40px ${y1}px)`
        : `polygon(-40px -40px,${X1 + 40}px -40px,${X1 + 40}px ${y1}px,${x}px ${y1}px,${x}px ${y0}px,-40px ${y0}px)`;
      riel.style.top = ym + 'px';
      carro.style.transform = `translate(${x}px,${ym}px)`;
      raf = requestAnimationFrame(paso);
    };
    raf = requestAnimationFrame(paso);
    return () => { cancelAnimationFrame(raf); el.style.clipPath = ''; cab.remove(); };
  }, [imprimir]);

  return <h1 className="titulo" ref={h}>{children}</h1>;
}
