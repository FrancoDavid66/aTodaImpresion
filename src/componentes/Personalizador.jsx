import { useId } from 'react';

// Etiqueta escolar personalizada: vista previa en vivo + controles
export const COLORES = {
  rosa: ['Rosa', '#FFC2E0', '#33091F'],
  magenta: ['Magenta', '#E4007C', '#FFF7FA'],
  celeste: ['Celeste', '#BDE8FA', '#0B3550'],
  amarillo: ['Amarillo', '#FFE98A', '#33091F'],
  menta: ['Menta', '#C5F2DF', '#0F3B2A'],
  lila: ['Lila', '#DCCBFF', '#2A1659'],
};

const M = '#E4007C';
export const MOTIVOS = {
  estrella: ['Estrella', <polygon key="e" points="20,2 25,14 38,15 28,23 31,36 20,29 9,36 12,23 2,15 15,14" fill={M} />],
  corazon: ['Corazón', <path key="c" d="M20 35C8 27 2 20 6 12c3-6 10-6 14 0 4-6 11-6 14 0 4 8-2 15-14 23Z" fill={M} />],
  asterisco: ['Asterisco', [0, 45, 90, 135].map((g) => <rect key={g} x="16.5" y="2" width="7" height="36" rx="3.5" fill={M} transform={`rotate(${g} 20 20)`} />)],
  nube: ['Nube', <path key="n" d="M10 31a8 8 0 0 1 1-16 11 11 0 0 1 21 2 7 7 0 0 1-1 14Z" fill={M} />],
  rayo: ['Rayo', <polygon key="r" points="24,2 8,22 18,22 14,38 32,15 21,15" fill={M} />],
  flor: ['Flor', [...[0, 72, 144, 216, 288].map((g) => <circle key={g} cx="20" cy="10" r="7" fill={M} transform={`rotate(${g} 20 20)`} />), <circle key="c" cx="20" cy="20" r="6" fill="#FFE98A" />]],
};

export const ETIQUETA_INICIAL = { nombre: 'Sofi', linea2: 'Sala de 5', color: 'rosa', motivo: 'estrella' };
export const etiquetaTexto = (e) => `${e.nombre}${e.linea2 ? ', ' + e.linea2 : ''} (color ${COLORES[e.color][0].toLowerCase()}, dibujito ${MOTIVOS[e.motivo][0].toLowerCase()})`;

export function Etiqueta({ e, ancho = 400 }) {
  const [, bg, fg] = COLORES[e.color] || COLORES.rosa;
  const nombre = (e.nombre || '').trim() || 'Tu nombre';
  const l2 = (e.linea2 || '').trim();
  const fs = Math.min(46, Math.floor(250 / (Math.max(nombre.length, 3) * 0.56)));
  return (
    <svg viewBox="0 0 400 130" width={ancho} aria-hidden="true">
      <rect x="4" y="4" width="392" height="122" rx="30" fill={bg} stroke="#fff" strokeWidth="6" />
      <circle cx="66" cy="65" r="40" fill="#fff" />
      <g transform="translate(42 41) scale(1.2)">{MOTIVOS[e.motivo][1]}</g>
      <text x="124" y={l2 ? 66 : 80} fontFamily="Fraunces" fontWeight="600" fontSize={fs} fill={fg}>{nombre}</text>
      {l2 && <text x="126" y="99" fontFamily="Figtree" fontWeight="600" fontSize="20" fill={fg} opacity=".85">{l2}</text>}
    </svg>
  );
}

// Plancha con la etiqueta grande y dos chicas
export function VistaEtiqueta({ e }) {
  return (
    <div className="perso-prev">
      <Etiqueta e={e} />
      <Etiqueta e={e} ancho={200} />
      <Etiqueta e={e} ancho={200} />
    </div>
  );
}

export function ControlesEtiqueta({ e, onChange }) {
  const id = useId();
  const set = (k, v) => onChange({ ...e, [k]: v });
  return (
    <div className="perso-ctrl">
      <div className="inp-c"><label htmlFor={id + 'n'}>Nombre</label><input id={id + 'n'} maxLength={14} value={e.nombre} onChange={(ev) => set('nombre', ev.target.value)} /></div>
      <div className="inp-c"><label htmlFor={id + 'l'}>Segunda línea (opcional)</label><input id={id + 'l'} maxLength={22} value={e.linea2} placeholder="Ej: 3er grado" onChange={(ev) => set('linea2', ev.target.value)} /></div>
      <div>
        <span className="mini-l">Color</span>
        <div className="colores">
          {Object.entries(COLORES).map(([k, v]) => (
            <button key={k} type="button" aria-pressed={e.color === k} aria-label={v[0]} style={{ background: v[1] }} onClick={() => set('color', k)} />
          ))}
        </div>
      </div>
      <div>
        <span className="mini-l">Dibujito</span>
        <div className="chips">
          {Object.entries(MOTIVOS).map(([k, v]) => (
            <label key={k} className="chip"><input type="radio" name={id + 'm'} checked={e.motivo === k} onChange={() => set('motivo', k)} /><span>{v[0]}</span></label>
          ))}
        </div>
      </div>
    </div>
  );
}
