import { useEffect, useRef, useState } from 'react';
import { estrella } from './Ilus.jsx';
import { cursor } from './Cursor.jsx';

// Plancha de stickers del inicio: se despegan, se arrastran y dejan la silueta en la plancha.
const STAR = estrella(110, 110, 100, 82, 14);
const barras = (sw) => [0, 45, 90, 135].map((g) => <rect key={g} x="68" y="12" width="24" height="136" rx="12" strokeWidth={sw} transform={`rotate(${g} 80 80)`} />);
const fr = { fontFamily: 'Fraunces', fontStyle: 'italic', fontWeight: 600 };

// x, y, w en % de la plancha · r = rotación · cut = contorno troquelado (blanco) · art = el dibujo
const STICKERS = [
  { x: 6, y: 4, w: 26, r: -8, vb: '0 0 160 160', cut: <g className="cut">{barras(20)}</g>, art: <g fill="#E4007C">{barras(0)}</g> },
  {
    x: 60, y: 3, w: 34, r: 9, vb: '0 0 180 180',
    cut: <circle className="cut" cx="90" cy="90" r="82" strokeWidth="8" />,
    art: (
      <>
        <circle cx="90" cy="90" r="80" fill="#E4007C" />
        <circle cx="90" cy="90" r="57" fill="none" stroke="#FFF7FA" strokeWidth="1.5" strokeDasharray="2 5" />
        <text fontFamily="Figtree" fontWeight="800" fontSize="15" letterSpacing="3.2" fill="#FFF7FA"><textPath href="#aro">HECHO A PEDIDO ✶ HECHO A PEDIDO ✶</textPath></text>
        <path d="M90 116 C 62 98 58 80 70 71 C 79 64 87 69 90 76 C 93 69 101 64 110 71 C 122 80 118 98 90 116 Z" fill="#FFF7FA" />
      </>
    ),
  },
  {
    x: 27, y: 24, w: 40, r: -4, vb: '0 0 220 220',
    cut: <polygon className="cut" strokeWidth="14" points={STAR} />,
    art: (
      <>
        <polygon fill="url(#holo)" points={STAR} />
        <text x="110" y="104" textAnchor="middle" {...fr} fontSize="30" fill="#33091F">algo</text>
        <text x="110" y="138" textAnchor="middle" {...fr} fontSize="30" fill="#33091F">distinto</text>
      </>
    ),
  },
  {
    x: 3, y: 58, w: 41, r: -10, vb: '0 0 240 120',
    cut: <path className="cut" strokeWidth="14" d="M42 10 H226 a10 10 0 0 1 10 10 V100 a10 10 0 0 1 -10 10 H42 L6 60 Z" />,
    art: (
      <>
        <path d="M42 10 H226 a10 10 0 0 1 10 10 V100 a10 10 0 0 1 -10 10 H42 L6 60 Z" fill="#FF8CC6" />
        <circle cx="36" cy="60" r="7" fill="#fff" />
        <text x="142" y="55" textAnchor="middle" {...fr} fontSize="30" fill="#33091F">precio</text>
        <text x="142" y="88" textAnchor="middle" fontFamily="Figtree" fontWeight="800" fontSize="23" fill="#33091F">por mayor</text>
      </>
    ),
  },
  {
    x: 56, y: 57, w: 39, r: 6, vb: '0 0 230 150',
    cut: <path className="cut" strokeWidth="14" d="M30 10 H200 a20 20 0 0 1 20 20 V90 a20 20 0 0 1 -20 20 H92 L56 140 L62 110 H30 a20 20 0 0 1 -20 -20 V30 a20 20 0 0 1 20 -20 Z" />,
    art: (
      <>
        <path d="M30 10 H200 a20 20 0 0 1 20 20 V90 a20 20 0 0 1 -20 20 H92 L56 140 L62 110 H30 a20 20 0 0 1 -20 -20 V30 a20 20 0 0 1 20 -20 Z" fill="#FFD9EB" />
        <text x="115" y="54" textAnchor="middle" {...fr} fontSize="24" fill="#33091F">¿Para cuándo</text>
        <text x="115" y="84" textAnchor="middle" {...fr} fontSize="24" fill="#33091F">lo necesitás?</text>
      </>
    ),
  },
  {
    x: 8, y: 77, w: 22, r: -7, vb: '0 0 150 175',
    cut: <rect className="cut" x="6" y="6" width="138" height="163" rx="5" strokeWidth="10" />,
    art: (
      <>
        <rect x="6" y="6" width="138" height="163" rx="3" fill="#fff" stroke="#F1E3EA" />
        <rect x="17" y="17" width="116" height="110" fill="url(#foto)" />
        <circle cx="102" cy="44" r="12" fill="#FFF7FA" />
        <path d="M17 127 L54 82 L80 108 L98 90 L133 127 Z" fill="#E4007C" />
        <text x="75" y="160" textAnchor="middle" fontFamily="Sacramento" fontSize="30" fill="#33091F">tus fotos</text>
      </>
    ),
  },
  {
    x: 43, y: 84, w: 48, r: -3, vb: '0 0 250 76',
    cut: <rect className="cut" x="6" y="6" width="238" height="64" rx="32" strokeWidth="12" />,
    art: (
      <>
        <rect x="6" y="6" width="238" height="64" rx="32" fill="#33091F" />
        <path d="M44 22a12 12 0 0 0-12 12c0 9 12 21 12 21s12-12 12-21a12 12 0 0 0-12-12Zm0 16.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9Z" fill="#FF8CC6" />
        <text x="66" y="47" fontFamily="Figtree" fontWeight="700" fontSize="24" fill="#FFF7FA">San Genaro, SF</text>
      </>
    ),
  },
];

function Sticker({ s, zona, onMovido, reset }) {
  const el = useRef(null);
  const st = useRef({ tx: 0, ty: 0, rot: 0 });
  const estilo = { '--x': s.x + '%', '--y': s.y + '%', '--w': s.w + '%', '--r': s.r + 'deg' };

  const mover = (x, y, esc) => { el.current.style.transform = `translate(${x}px,${y}px) rotate(calc(var(--r) + ${st.current.rot}deg)) scale(${esc})`; };

  useEffect(() => {
    if (!reset) return;
    const n = el.current;
    st.current = { tx: 0, ty: 0, rot: 0 };
    n.style.transition = 'transform .5s cubic-bezier(.3,1.3,.5,1)';
    n.style.transform = '';
    const t = setTimeout(() => (n.style.transition = ''), 520);
    return () => clearTimeout(t);
  }, [reset]);

  useEffect(() => {
    const n = el.current;
    let sx, sy, ox, oy, rect, bcx, bcy, activo = false;
    const lim = (v, a, b) => Math.min(Math.max(v, a), b);
    const down = (e) => {
      e.preventDefault(); n.setPointerCapture(e.pointerId); activo = true;
      sx = e.clientX; sy = e.clientY; ox = st.current.tx; oy = st.current.ty;
      rect = zona.current.getBoundingClientRect();
      const b = n.getBoundingClientRect(); bcx = b.left + b.width / 2 - ox; bcy = b.top + b.height / 2 - oy;
      st.current.rot = +(Math.random() * 16 - 8).toFixed(1);
      n.classList.add('alzado'); cursor.fijar('Soltá'); mover(ox, oy, 1.06);
    };
    const move = (e) => {
      if (!activo) return;
      const x = lim(ox + e.clientX - sx, rect.left + 24 - bcx, rect.right - 24 - bcx);
      const y = lim(oy + e.clientY - sy, rect.top + 24 - bcy, rect.bottom - 24 - bcy);
      st.current.tx = x; st.current.ty = y; mover(x, y, 1.06);
    };
    const up = () => {
      if (!activo) return; activo = false;
      n.classList.remove('alzado'); cursor.fijar(null); mover(st.current.tx, st.current.ty, 1);
      onMovido(Math.abs(st.current.tx) + Math.abs(st.current.ty) > 6);
    };
    n.addEventListener('pointerdown', down);
    n.addEventListener('pointermove', move);
    n.addEventListener('pointerup', up);
    n.addEventListener('pointercancel', up);
    return () => { n.removeEventListener('pointerdown', down); n.removeEventListener('pointermove', move); n.removeEventListener('pointerup', up); n.removeEventListener('pointercancel', up); };
  }, [zona, onMovido]);

  return (
    <>
      <div className="hueco" style={estilo}><svg viewBox={s.vb}>{s.cut}</svg></div>
      <div className="stk" style={estilo} ref={el} data-cursor="Despegá"><svg viewBox={s.vb}>{s.cut}{s.art}</svg></div>
    </>
  );
}

export default function Plancha({ zona }) {
  const [movidos, setMovidos] = useState(0);
  const [reset, setReset] = useState(0);
  const onMovido = useRef((m) => m && setMovidos((n) => n + 1)).current;
  return (
    <div className="plancha-wrap">
      <div className="plancha" aria-hidden="true">
        <span className="corte a" /><span className="corte b" /><span className="corte c" /><span className="corte d" />
        {STICKERS.map((s, i) => <Sticker key={i} s={s} zona={zona} onMovido={onMovido} reset={reset} />)}
      </div>
      <div className="plancha-pie">
        <span>Despegá los stickers y movelos</span>
        <button type="button" className={'link' + (movidos ? ' ver' : '')} onClick={() => { setReset((r) => r + 1); setMovidos(0); }}>Volver a pegarlos</button>
      </div>
    </div>
  );
}
