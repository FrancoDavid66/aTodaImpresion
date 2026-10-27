import { useEffect, useRef } from 'react';

// <dialog> nativo (Esc cierra, foco atrapado). Mientras hay uno abierto el cursor sticker se apaga
// porque los diálogos van en otra capa de la pantalla.
export default function Dialogo({ abierto, onCerrar, className, children, ...rest }) {
  const ref = useRef(null);
  const cerrarRef = useRef(onCerrar);
  cerrarRef.current = onCerrar;

  useEffect(() => {
    const d = ref.current;
    if (abierto && !d.open) { d.showModal(); document.documentElement.classList.add('dlg'); }
    else if (!abierto && d.open) d.close();
  }, [abierto]);

  useEffect(() => {
    const d = ref.current;
    const f = () => {
      if (![...document.querySelectorAll('dialog')].some((x) => x.open)) document.documentElement.classList.remove('dlg');
      if (cerrarRef.current) cerrarRef.current();
    };
    d.addEventListener('close', f);
    return () => d.removeEventListener('close', f);
  }, []);

  return (
    <dialog ref={ref} className={className} onClick={(e) => { if (e.target === ref.current) ref.current.close(); }} {...rest}>
      {abierto && children}
    </dialog>
  );
}

export const BotonCerrar = ({ onClick, className = 'redondo cerrar' }) => (
  <button type="button" className={className} onClick={onClick} aria-label="Cerrar">✕</button>
);
