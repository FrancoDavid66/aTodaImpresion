import Logo from '../componentes/Logo.jsx';
import { Wa } from '../componentes/Generales.jsx';
import { NEGOCIO } from '../data/negocio.js';
import { Enlace } from '../lib/ruta.jsx';

// /links → para la bio de Instagram (reemplaza el catálogo de Castock que está caído)
export default function Links() {
  return (
    <main className="links-pag">
      <div className="links-card">
        <Logo xl aria-hidden="true" />
        <p>{NEGOCIO.slogan}</p>
        <nav aria-label="Links">
          <Wa msg="Hola Zule! Vengo de Instagram, quiero hacer un pedido 😊">Pedir por WhatsApp</Wa>
          <Enlace to="/catalogo">Catálogo completo</Enlace>
          <Enlace to="/catalogo/disponible">Disponible ya</Enlace>
          <Enlace to="/pedido">Armá tu pedido</Enlace>
          <Enlace to="/trabajos">Ver trabajos</Enlace>
          <Enlace to="/lista">Lista de precios por mayor</Enlace>
        </nav>
        <small>{NEGOCIO.localidad}. Envíos a toda la zona.</small>
      </div>
    </main>
  );
}
