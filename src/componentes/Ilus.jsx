// Ilustraciones propias para productos que todavía no tienen foto (se reemplazan poniendo `foto` en el producto)
const K = { M: '#E4007C', C: '#FF8CC6', R: '#FFD9EB', R2: '#FFEAF3', T: '#33091F', P: '#FFF7FA' };

export function estrella(cx, cy, ro, ri, n) {
  const p = [];
  for (let i = 0; i < n * 2; i++) {
    const r = i % 2 ? ri : ro, a = (Math.PI * i) / n - Math.PI / 2;
    p.push((cx + r * Math.cos(a)).toFixed(1) + ',' + (cy + r * Math.sin(a)).toFixed(1));
  }
  return p.join(' ');
}
export const asterisco = (cx, cy, l, w, c) =>
  [0, 45, 90, 135].map((g) => `<rect x="${cx - w / 2}" y="${cy - l / 2}" width="${w}" height="${l}" rx="${w / 2}" fill="${c}" transform="rotate(${g} ${cx} ${cy})"/>`).join('');
const corazon = (cx, cy, s, c) => `<path transform="translate(${cx - 20 * s} ${cy - 20 * s}) scale(${s})" d="M20 35C8 27 2 20 6 12c3-6 10-6 14 0 4-6 11-6 14 0 4 8-2 15-14 23Z" fill="${c}"/>`;
const base = (inner) => `<svg viewBox="0 0 300 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="300" height="300" fill="${K.R2}"/>${inner}</svg>`;

const ILUS = {
  invitacion: () => base(`<rect x="92" y="34" width="116" height="232" rx="20" fill="${K.T}"/><rect x="100" y="46" width="100" height="208" rx="12" fill="${K.P}"/><rect x="134" y="38" width="32" height="5" rx="2.5" fill="#5a2a44"/><circle cx="150" cy="102" r="30" fill="${K.C}"/>${corazon(150, 103, 1, K.P)}<text x="150" y="166" text-anchor="middle" font-family="Sacramento" font-size="30" fill="${K.M}">Mi cumple</text><rect x="118" y="180" width="64" height="7" rx="3.5" fill="${K.R}"/><rect x="128" y="194" width="44" height="7" rx="3.5" fill="${K.R}"/><rect x="116" y="216" width="68" height="22" rx="11" fill="${K.M}"/><rect x="40" y="70" width="12" height="6" rx="2" fill="${K.M}" transform="rotate(30 46 73)"/><rect x="236" y="58" width="12" height="6" rx="2" fill="${K.C}" transform="rotate(-25 242 61)"/><circle cx="56" cy="210" r="6" fill="${K.C}"/><circle cx="246" cy="196" r="5" fill="${K.M}"/><rect x="58" y="134" width="10" height="5" rx="2" fill="${K.T}" transform="rotate(60 63 136)"/><rect x="232" y="128" width="10" height="5" rx="2" fill="${K.M}" transform="rotate(-40 237 130)"/>`),
  topper: () => base(`<ellipse cx="150" cy="262" rx="112" ry="12" fill="${K.R}"/><rect x="62" y="186" width="176" height="70" rx="10" fill="${K.C}"/><path d="M62 196h176v10q-11 12-22 0t-22 0-22 0-22 0-22 0-22 0-22 0-22 0Z" fill="${K.P}"/><rect x="92" y="140" width="116" height="50" rx="8" fill="${K.R}"/><path d="M92 148h116v8q-9.7 10-19.3 0t-19.3 0-19.3 0-19.3 0-19.3 0-19.3 0Z" fill="${K.P}"/><line x1="118" y1="142" x2="118" y2="80" stroke="${K.T}" stroke-width="3"/><line x1="184" y1="142" x2="184" y2="92" stroke="${K.T}" stroke-width="3"/><polygon points="${estrella(118, 66, 22, 10, 5)}" fill="${K.M}"/><circle cx="184" cy="80" r="19" fill="${K.T}"/><text x="184" y="89" text-anchor="middle" font-family="Fraunces" font-weight="600" font-size="24" fill="${K.P}">5</text>`),
  banderin: () => {
    let s = `<path d="M20 70 Q150 130 280 70" fill="none" stroke="${K.T}" stroke-width="2.5"/>`;
    const L = ['F', 'E', 'L', 'I', 'Z', '!'], cs = [K.M, K.C, K.P, K.T, K.C, K.M];
    const y = (x) => 70 + 120 * ((x - 20) / 260) * (1 - (x - 20) / 260);
    L.forEach((l, i) => {
      const x = 46 + i * 42;
      s += `<polygon points="${x - 18},${y(x - 18).toFixed(1)} ${x + 18},${y(x + 18).toFixed(1)} ${x},${(y(x) + 58).toFixed(1)}" fill="${cs[i]}" stroke="${cs[i] === K.P ? K.R : cs[i]}" stroke-width="2" stroke-linejoin="round"/><text x="${x}" y="${(y(x) + 26).toFixed(1)}" text-anchor="middle" font-family="Fraunces" font-weight="600" font-size="20" fill="${cs[i] === K.P || cs[i] === K.C ? K.T : K.P}">${l}</text>`;
    });
    return base(s + `<circle cx="60" cy="220" r="6" fill="${K.C}"/><circle cx="236" cy="236" r="8" fill="${K.M}"/><rect x="140" y="226" width="12" height="6" rx="2" fill="${K.T}" transform="rotate(30 146 229)"/>`);
  },
  tarjetas: () => base(`<rect x="70" y="95" width="170" height="104" rx="8" fill="${K.C}" transform="rotate(-14 150 150)"/><rect x="66" y="100" width="170" height="104" rx="8" fill="${K.P}" stroke="${K.R}" stroke-width="2" transform="rotate(7 150 150)"/><g transform="rotate(-3 150 170)"><rect x="60" y="120" width="170" height="104" rx="8" fill="${K.M}"/>${asterisco(92, 154, 34, 7, '#fff')}<rect x="120" y="144" width="88" height="9" rx="4.5" fill="${K.P}"/><rect x="120" y="162" width="60" height="7" rx="3.5" fill="${K.R}"/><rect x="76" y="198" width="80" height="6" rx="3" fill="${K.R}"/></g>`),
  etiqueta: () => {
    let s = `<rect x="50" y="34" width="200" height="232" rx="10" fill="#fff" stroke="${K.R}" stroke-width="2"/>`;
    const n = ['Sofi', 'Benja', 'Mía', 'Tomi'], c = [K.C, K.R, K.R, K.C];
    [56, 108, 160, 212].forEach((y, i) => {
      s += `<rect x="66" y="${y}" width="168" height="40" rx="20" fill="${c[i]}"/><circle cx="87" cy="${y + 20}" r="12" fill="#fff"/>${i % 2 ? corazon(87, y + 20, 0.5, K.M) : `<polygon points="${estrella(87, y + 20, 9, 4, 5)}" fill="${K.M}"/>`}<text x="108" y="${y + 27}" font-family="Fraunces" font-weight="600" font-size="20" fill="${K.T}">${n[i]}</text>`;
    });
    return base(s);
  },
  fotos: () => base(`<g transform="rotate(-9 120 150)"><rect x="50" y="62" width="130" height="156" fill="#fff" stroke="#efe2e8"/><rect x="60" y="72" width="110" height="104" fill="url(#foto)"/><path d="M60 176 L95 134 L120 158 L138 142 L170 176Z" fill="${K.M}"/><circle cx="146" cy="96" r="10" fill="${K.P}"/></g><g transform="rotate(8 190 160)"><rect x="124" y="80" width="130" height="156" fill="#fff" stroke="#efe2e8"/><rect x="134" y="90" width="110" height="104" fill="${K.C}"/><circle cx="189" cy="142" r="26" fill="${K.R}"/>${corazon(189, 143, 0.7, K.M)}<text x="189" y="224" text-anchor="middle" font-family="Sacramento" font-size="24" fill="${K.T}">verano</text></g>`),
  cartel: () => base(`<path d="M110 252 L135 120 M190 252 L165 120 M150 252 L150 196" stroke="${K.T}" stroke-width="5" stroke-linecap="round"/><rect x="52" y="54" width="196" height="140" rx="10" fill="#fff" stroke="${K.T}" stroke-width="3"/><text x="150" y="120" text-anchor="middle" font-family="Sacramento" font-size="40" fill="${K.M}">Bienvenidos</text><rect x="96" y="140" width="108" height="8" rx="4" fill="${K.R}"/><rect x="116" y="156" width="68" height="8" rx="4" fill="${K.R}"/><path d="M38 96 q-6 30 4 62" stroke="${K.T}" stroke-width="1.5" fill="none"/><ellipse cx="38" cy="72" rx="21" ry="25" fill="${K.C}"/><path d="M264 104 q8 26-2 56" stroke="${K.T}" stroke-width="1.5" fill="none"/><ellipse cx="264" cy="82" rx="18" ry="22" fill="${K.M}"/>`),
  iman: () => base(`<rect x="40" y="16" width="220" height="300" rx="16" fill="#fff" stroke="${K.R}" stroke-width="2"/><rect x="224" y="80" width="10" height="96" rx="5" fill="${K.R}"/><circle cx="106" cy="96" r="36" fill="${K.M}"/>${corazon(106, 98, 1.1, K.P)}<g transform="rotate(8 182 172)"><rect x="148" y="138" width="68" height="68" rx="14" fill="${K.C}"/><polygon points="${estrella(182, 172, 22, 10, 5)}" fill="${K.P}"/></g><circle cx="190" cy="80" r="24" fill="url(#holo)" stroke="#fff" stroke-width="3"/><g transform="rotate(-8 98 214)"><rect x="62" y="190" width="74" height="50" rx="8" fill="${K.T}"/><text x="99" y="222" text-anchor="middle" font-family="Sacramento" font-size="24" fill="${K.P}">Mía</text></g>`),
  logo: () => base(`<rect x="40" y="40" width="220" height="220" rx="10" fill="#fff"/><path d="M150 40V260M40 150H260" stroke="${K.R}" stroke-dasharray="4 5"/>${asterisco(150, 140, 140, 24, K.M)}<path d="M70 232C110 172 200 262 236 198" fill="none" stroke="${K.T}" stroke-width="2.5"/><path d="M70 232L104 186M236 198L206 254" stroke="${K.T}" stroke-width="1.2"/><circle cx="104" cy="186" r="4" fill="${K.T}"/><circle cx="206" cy="254" r="4" fill="${K.T}"/><rect x="64" y="226" width="12" height="12" fill="#fff" stroke="${K.T}" stroke-width="2"/><rect x="230" y="192" width="12" height="12" fill="#fff" stroke="${K.T}" stroke-width="2"/>`),
  stickerlogo: () => base(`<circle cx="112" cy="112" r="70" fill="#fff"/><circle cx="112" cy="112" r="62" fill="${K.T}"/><text x="112" y="106" text-anchor="middle" font-family="Fraunces" font-style="italic" font-weight="600" font-size="28" fill="${K.P}">tu</text><text x="112" y="134" text-anchor="middle" font-family="Figtree" font-weight="800" font-size="22" fill="${K.C}">MARCA</text><polygon points="${estrella(206, 196, 58, 48, 14)}" fill="url(#holo)" stroke="#fff" stroke-width="10" stroke-linejoin="round" paint-order="stroke"/><text x="206" y="203" text-anchor="middle" font-family="Fraunces" font-style="italic" font-weight="600" font-size="20" fill="${K.T}">2027</text><g transform="rotate(-10 90 236)"><rect x="34" y="214" width="112" height="44" rx="22" fill="${K.M}" stroke="#fff" stroke-width="7" paint-order="stroke"/><text x="90" y="242" text-anchor="middle" font-family="Figtree" font-weight="800" font-size="15" fill="#fff">hecho a mano</text></g>`),
  calendario: () => {
    let s = `<rect x="56" y="56" width="188" height="200" rx="12" fill="#fff" stroke="${K.R}" stroke-width="2"/><path d="M56 68a12 12 0 0 1 12-12h164a12 12 0 0 1 12 12v40H56Z" fill="${K.M}"/>`;
    [96, 150, 204].forEach((x) => (s += `<rect x="${x - 4}" y="44" width="8" height="24" rx="4" fill="${K.T}"/>`));
    s += `<text x="150" y="95" text-anchor="middle" font-family="Fraunces" font-weight="600" font-size="28" fill="#fff">2027</text>`;
    for (let r = 0; r < 4; r++)
      for (let c = 0; c < 7; c++) {
        const on = r === 1 && c === 4, alt = r === 3 && c === 1;
        s += `<rect x="${70 + c * 23.5}" y="${124 + r * 30}" width="18" height="18" rx="4" fill="${on ? K.M : alt ? K.C : K.R}"/>`;
      }
    return base(s);
  },
};

// Las ilustraciones se generan una sola vez
const CACHE = {};
const svg = (tipo) => (CACHE[tipo] ??= (ILUS[tipo] || ILUS.etiqueta)());

export default function Ilus({ tipo }) {
  return <span className="ilus" dangerouslySetInnerHTML={{ __html: svg(tipo) }} />;
}
