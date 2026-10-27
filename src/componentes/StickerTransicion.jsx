import { forwardRef, useImperativeHandle, useRef } from 'react';
import Logo from './Logo.jsx';
import { espera } from '../lib/util.js';

// Sticker gigante de la marca: al entrar se despega desde la esquina (se ve el dorso con la marca impresa);
// al cambiar de página se pega de golpe con el nombre de la página y se vuelve a despegar.
const StickerTransicion = forwardRef(function StickerTransicion(_, ref) {
  const el = useRef(null), front = useRef(null), back = useRef(null), dest = useRef(null);

  useImperativeHandle(ref, () => {
    const k = Math.SQRT1_2;
    let W = innerWidth, H = innerHeight;
    const poly = (pts) => (pts.length < 3 ? 'polygon(0 0,0 0,0 0)' : 'polygon(' + pts.map((p) => p[0].toFixed(1) + 'px ' + p[1].toFixed(1) + 'px').join(',') + ')');
    // recorta la pantalla con la línea del doblez (lado 1 = lo que sigue pegado, -1 = lo despegado)
    function cortar(s, lado) {
      const c = [[0, 0], [W, 0], [W, H], [0, H]], out = [];
      const f = (p) => (k * (W + H - p[0] - p[1]) - s) * lado;
      for (let i = 0; i < 4; i++) {
        const a = c[i], b = c[(i + 1) % 4], fa = f(a), fb = f(b);
        if (fa >= 0) out.push(a);
        if (fa >= 0 !== fb >= 0) { const t = fa / (fa - fb); out.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]); }
      }
      return out;
    }
    // s = cuánto se despegó desde la esquina de abajo a la derecha
    function pintar(s) {
      front.current.style.clipPath = poly(cortar(s, 1));
      back.current.style.clipPath = poly(cortar(s, -1));
      const e = W + H - Math.SQRT2 * s; // reflejo sobre la línea del doblez
      back.current.style.transform = `matrix(0,-1,-1,0,${e.toFixed(1)},${e.toFixed(1)})`;
      back.current.style.backgroundImage = `linear-gradient(315deg,rgba(255,255,255,.55) 0px,rgba(51,9,31,.04) ${(s * 0.55).toFixed(0)}px,rgba(51,9,31,.22) ${s.toFixed(0)}px,rgba(51,9,31,0) ${(s + 1).toFixed(0)}px),var(--liner)`;
    }
    const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    const animar = (dur, de, a) => {
      W = innerWidth; H = innerHeight;
      const L = (W + H) * k + 4;
      return new Promise((res) => {
        const t0 = performance.now();
        const paso = (now) => {
          const t = Math.min(1, (now - t0) / dur);
          pintar((de + (a - de) * ease(t)) * L);
          if (t < 1) requestAnimationFrame(paso); else res();
        };
        requestAnimationFrame(paso);
      });
    };
    return {
      async despegar(dur = 1050) {
        el.current.style.animation = 'none';
        el.current.classList.add('on');
        await animar(dur, 0, 1);
        el.current.classList.remove('on', 'inicio', 'slap');
      },
      async pegar(texto) {
        dest.current.textContent = texto || 'algo distinto';
        W = innerWidth; H = innerHeight;
        pintar(0);
        back.current.style.clipPath = 'polygon(0 0,0 0,0 0)';
        el.current.classList.remove('slap');
        void el.current.offsetWidth;
        el.current.classList.add('on', 'slap');
        await espera(430);
      },
      quitar() { el.current.style.animation = 'none'; el.current.classList.remove('on', 'inicio', 'slap'); },
    };
  }, []);

  return (
    <div className="peel inicio" ref={el} aria-hidden="true">
      <div className="peel-front" ref={front}>
        <div className="peel-cara">
          <svg className="peel-ast a1" viewBox="0 0 24 24"><use href="#astB" /></svg>
          <svg className="peel-ast a2" viewBox="0 0 24 24"><use href="#astB" /></svg>
          <Logo xl />
          <span className="peel-dest" ref={dest}>algo distinto</span>
        </div>
      </div>
      <div className="peel-sombra"><div className="peel-back" ref={back} /></div>
    </div>
  );
});

export default StickerTransicion;
