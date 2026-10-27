import Hero from '../secciones/Hero.jsx';
import Servicios from '../secciones/Servicios.jsx';
import CatalogoInicio from '../secciones/CatalogoInicio.jsx';
import Trabajos from '../secciones/Trabajos.jsx';
import { AntesDespues, Disponibles } from '../secciones/Emprendedores.jsx';
import ArmaPedido from '../secciones/ArmaPedido.jsx';
import { Cierre, Clientas, Pasos, Precios, Preguntas, Zule } from '../secciones/Informacion.jsx';

export default function Inicio({ imprimir }) {
  return (
    <main>
      <Hero imprimir={imprimir} />
      <Servicios />
      <CatalogoInicio />
      <Trabajos />
      <AntesDespues />
      <Disponibles />
      <ArmaPedido />
      <Precios />
      <Pasos />
      <Clientas />
      <Zule />
      <Preguntas />
      <Cierre />
    </main>
  );
}
