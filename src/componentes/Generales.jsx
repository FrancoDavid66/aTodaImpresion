import { useEffect, useRef, useState } from 'react';
import Logo from './Logo.jsx';
import { Icono } from './SvgDefs.jsx';
import { NEGOCIO } from '../data/negocio.js';
import { useTienda } from '../lib/tienda.jsx';
import { Enlace } from '../lib/ruta.jsx';
import { temporadaActual, waLink } from '../lib/util.js';

/* ---------- link de WhatsApp ---------- */
export const Wa = ({ msg = 'Hola Zule! Te escribo desde la web 😊', children, ...props }) => (
  <a href={waLink(msg)} target="_blank" rel="noopener" data-cursor="Escribir" {...props}>{children}</a>
);

/* ---------- header ---------- */
export function Header({ vista }) {
  const { carrito, abrirCarrito, salto } = useTienda();
  const [abierto, setAbierto] = useState(false);
  const btn = useRef(null);
  useEffect(() => {
    if (!salto) return;
    const b = btn.current; b.classList.remove('salta'); void b.offsetWidth; b.classList.add('salta');
  }, [salto]);
  const cerrar = () => setAbierto(false);
  return (
    <header className="top">
      <div className="wrap">
        <Enlace className="logo-link" to="/" aria-label="A Toda Impresión, inicio" onClick={cerrar}><Logo /></Enlace>
        <nav className={'nav' + (abierto ? ' abierto' : '')} id="nav">
          <Enlace to="/catalogo" aria-current={vista === 'catalogo' ? 'page' : undefined} onClick={cerrar}>Catálogo</Enlace>
          <Enlace to="/trabajos" onClick={cerrar}>Trabajos</Enlace>
          <Enlace to="/pedido" onClick={cerrar}>Armá tu pedido</Enlace>
          <Enlace to="/preguntas" onClick={cerrar}>Preguntas</Enlace>
          <Wa className="btn btn-wa"><Icono id="wa" />WhatsApp</Wa>
        </nav>
        <div className="acciones">
          <button ref={btn} className="btn-pedido" type="button" data-cursor="Ver" onClick={abrirCarrito}>
            <Icono id="bolsa" /><span className="txt">Pedido</span>
            {carrito.length > 0 && <span className="cuenta">{carrito.length}</span>}
          </button>
          <button className="burger" aria-expanded={abierto} aria-controls="nav" aria-label="Abrir menú" onClick={() => setAbierto((a) => !a)}>
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>
  );
}

/* ---------- barra de temporada (cambia sola según la fecha) ---------- */
export function Temporada() {
  const t = temporadaActual();
  if (!t) return null;
  return (
    <Enlace className="temporada" to={'/catalogo/t-' + t.id}>
      <span className="wrap"><span className="holo">Temporada</span><b>{t.titulo}</b><span>{t.texto}</span><span className="ver">Ver productos</span></span>
    </Enlace>
  );
}

/* ---------- footer ---------- */
export function Footer() {
  return (
    <footer className="pie-web">
      <div className="wrap">
        <div>
          <Logo aria-hidden="true" />
          <p className="chico" style={{ marginTop: '1.2rem', maxWidth: '32ch' }}>Diseño gráfico e impresión a pedido. {NEGOCIO.localidad}.</p>
        </div>
        <ul>
          <li><Enlace to="/catalogo">Catálogo</Enlace></li>
          <li><Enlace to="/lista">Lista de precios por mayor</Enlace></li>
          <li><Wa>WhatsApp {NEGOCIO.whatsappVisible}</Wa></li>
          <li><a href={NEGOCIO.instagram} target="_blank" rel="noopener">Instagram {NEGOCIO.instagramUsuario}</a></li>
        </ul>
        <ul>
          <li><Enlace to="/links">Página de links</Enlace></li>
          <li><Enlace to="/panel">Panel de Zule</Enlace></li>
          <li className="credito">{NEGOCIO.credito}</li>
        </ul>
      </div>
    </footer>
  );
}

/* ---------- botón flotante de WhatsApp ---------- */
export const WaFlota = () => (
  <Wa className="wa-flota" aria-label="Escribir por WhatsApp"><Icono id="wa" /></Wa>
);

/* ---------- aviso de abajo ("Sumaste…  Ver pedido") ---------- */
export function Toast({ irA }) {
  const { toast, cerrarToast, abrirCarrito } = useTienda();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!toast) return;
    setVisible(true);
    const t = setTimeout(() => setVisible(false), 3400);
    return () => clearTimeout(t);
  }, [toast]);
  const accion = () => {
    setVisible(false);
    if (toast.accion === 'carrito') abrirCarrito(); else irA(toast.accion);
    cerrarToast();
  };
  return (
    <div className={'toast' + (visible ? ' ver' : '')} role="status">
      <span>{toast?.texto}</span>
      {toast && <button type="button" onClick={accion}>{toast.boton}</button>}
    </div>
  );
}
