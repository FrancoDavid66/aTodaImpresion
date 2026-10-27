import { useEffect, useState } from 'react';

// En Hostinger usa rutas limpias (/catalogo). Abierto con doble clic (build:single) usa #/catalogo.
/* global __SINGLE__ */
export const HASH = (typeof __SINGLE__ !== 'undefined' && __SINGLE__) || location.protocol === 'file:';

export const VISTAS = ['catalogo', 'panel', 'links', 'lista'];
// Atajos que abren la portada directo en una sección: /trabajos, /pedido, etc.
export const SECCIONES = ['servicios', 'catalogo-inicio', 'trabajos', 'emprendedores', 'disponible', 'pedido', 'precios', 'como', 'clientes', 'zule', 'preguntas'];

export function leerRuta() {
  const raw = HASH ? location.hash.replace(/^#/, '') || '/' : location.pathname;
  return decodeURIComponent(raw.split('?')[0]).replace(/\/+$/, '') || '/';
}

export function analizar(path) {
  const seg = path.split('/').filter(Boolean);
  if (VISTAS.includes(seg[0])) return { vista: seg[0], param: seg[1] || null, seccion: null };
  if (SECCIONES.includes(seg[0])) return { vista: 'inicio', param: null, seccion: seg[0] };
  return { vista: 'inicio', param: null, seccion: null };
}

export const href = (path) => (HASH ? '#' + path : path);

export function ir(path) {
  if (HASH) {
    if (location.hash !== '#' + path) location.hash = path;
    else dispatchEvent(new Event('rutacambio'));
    return;
  }
  if (location.pathname !== path) history.pushState(null, '', path);
  dispatchEvent(new Event('rutacambio'));
}

// Devuelve la ruta actual y un contador que cambia en cada navegación (aunque se repita la ruta)
export function useRuta() {
  const [estado, setEstado] = useState(() => ({ path: leerRuta(), n: 0 }));
  useEffect(() => {
    const f = () => setEstado((e) => ({ path: leerRuta(), n: e.n + 1 }));
    const ev = HASH ? 'hashchange' : 'popstate';
    addEventListener(ev, f);
    addEventListener('rutacambio', f);
    return () => { removeEventListener(ev, f); removeEventListener('rutacambio', f); };
  }, []);
  return estado;
}

// <Enlace to="/catalogo">  →  link interno (sin recargar la página)
export function Enlace({ to, onClick, ...props }) {
  return (
    <a
      href={href(to)}
      onClick={(e) => {
        if (onClick) onClick(e);
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        ir(to);
      }}
      {...props}
    />
  );
}
