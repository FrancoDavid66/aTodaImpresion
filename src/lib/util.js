import { NEGOCIO, TEMPORADAS } from '../data/negocio.js';

export const waLink = (txt) => `https://wa.me/${NEGOCIO.whatsapp}?text=${encodeURIComponent(txt)}`;
export const plata = (n) => '$ ' + Math.round(n).toLocaleString('es-AR');
export const norm = (s) => (s || '').toString().normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
export const espera = (ms) => new Promise((r) => setTimeout(r, ms));
export const REDUCIR = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

// localStorage con red de seguridad (modo incógnito, almacenamiento bloqueado, etc.)
export const leer = (k, def) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : def; } catch { return def; } };
export const guardar = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch { return false; } };

/* ---------- precios ---------- */
export const precioPorOpcion = (p) => (p.opciones || []).some((o) => o[2]);
export const minimo = (p) => p.minimo || (precioPorOpcion(p) ? 1 : p.precios[0][0]);
export const unidad = (p) => p.unidad ?? 'c/u';

export function precioUnit(p, cant, sel = []) {
  for (let i = 0; i < (p.opciones || []).length; i++) {
    const o = p.opciones[i];
    if (o[2]) { const v = sel[i] ?? o[1][0]; if (o[2][v] != null) return o[2][v]; }
  }
  let u = p.precios[0][1];
  for (const [min, pr] of p.precios) if (cant >= min) u = pr;
  return u;
}

export function desde(p) {
  let m = Infinity;
  (p.opciones || []).forEach((o) => { if (o[2]) Object.values(o[2]).forEach((v) => (m = Math.min(m, v))); });
  return m === Infinity ? Math.min(...p.precios.map((x) => x[1])) : m;
}

/* ---------- temporada activa según la fecha ---------- */
export function temporadaActual(d = new Date()) {
  const md = String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  return TEMPORADAS.find((t) => md >= t.desde && md <= t.hasta) || null;
}

export const fechaCorta = (iso) => { const [a, m, d] = iso.split('-'); return `${d}/${m}/${a}`; };
