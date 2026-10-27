import { useEffect, useRef, useState } from 'react';
import SvgDefs from './componentes/SvgDefs.jsx';
import StickerTransicion from './componentes/StickerTransicion.jsx';
import Cursor, { cursor } from './componentes/Cursor.jsx';
import Ficha from './componentes/Ficha.jsx';
import Carrito from './componentes/Carrito.jsx';
import { Footer, Header, Temporada, Toast, WaFlota } from './componentes/Generales.jsx';
import Inicio from './paginas/Inicio.jsx';
import Catalogo from './paginas/Catalogo.jsx';
import Panel from './paginas/Panel.jsx';
import Links from './paginas/Links.jsx';
import Lista from './paginas/Lista.jsx';
import { analizar, ir, leerRuta, useRuta } from './lib/ruta.jsx';
import { useTienda } from './lib/tienda.jsx';
import { REDUCIR, espera } from './lib/util.js';

// Lo que dice el sticker cuando tapa la pantalla al cambiar de página
const NOMBRES = { inicio: 'algo distinto', catalogo: 'Catálogo', panel: 'Panel de Zule', links: 'Links', lista: 'Lista por mayor' };
const TITULOS = {
  inicio: 'A Toda Impresión · Diseño e impresión a pedido en San Genaro',
  catalogo: 'Catálogo · A Toda Impresión',
  panel: 'Panel · A Toda Impresión',
  links: 'A Toda Impresión · Links',
  lista: 'Lista de precios por mayor · A Toda Impresión',
};
const cuadro = () => new Promise((r) => requestAnimationFrame(() => r()));
function irSeccion(id, suave) {
  const el = id && document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: suave ? 'smooth' : 'auto' });
  else scrollTo({ top: 0, behavior: suave ? 'smooth' : 'auto' });
}

export default function App() {
  const ruta = useRuta();
  const [vista, setVista] = useState(() => analizar(leerRuta()).vista);
  const [param, setParam] = useState(() => analizar(leerRuta()).param);
  const [introListo, setIntroListo] = useState(false);
  const [moviendo, setMoviendo] = useState(false);
  const peel = useRef(null);
  const cola = useRef(Promise.resolve());
  const vistaRef = useRef(vista);
  const { cerrarFicha, cerrarCarrito } = useTienda();

  useEffect(() => { document.title = TITULOS[vista]; }, [vista]);

  // Intro: el sticker de la marca arranca pegado y se despega
  useEffect(() => {
    (async () => {
      const d = analizar(leerRuta());
      await cuadro();
      if (d.seccion) irSeccion(d.seccion, false);
      if (REDUCIR) { peel.current.quitar(); setIntroListo(true); return; }
      await Promise.race([document.fonts ? document.fonts.ready : espera(0), espera(1200)]);
      await espera(380);
      await peel.current.despegar(1150);
      setIntroListo(true);
    })();
  }, []);

  // Cambio de página: el sticker se pega, cambia la página y se despega
  useEffect(() => {
    if (ruta.n === 0) return;
    const d = analizar(ruta.path);
    cola.current = cola.current.then(async () => {
      if (d.vista === vistaRef.current) {
        setParam(d.param);
        if (d.vista === 'inicio') irSeccion(d.seccion, true);
        else scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      cerrarFicha(); cerrarCarrito(); cursor.fijar(null);
      setMoviendo(true);
      if (!REDUCIR) await peel.current.pegar(d.vista === 'inicio' && d.seccion ? 'por acá' : NOMBRES[d.vista]);
      vistaRef.current = d.vista;
      setVista(d.vista); setParam(d.param);
      await cuadro(); await cuadro();
      if (d.vista === 'inicio' && d.seccion) irSeccion(d.seccion, false); else scrollTo(0, 0);
      if (!REDUCIR) { await espera(140); await peel.current.despegar(950); }
      setMoviendo(false);
    });
  }, [ruta.n]); // eslint-disable-line react-hooks/exhaustive-deps

  const conMarco = vista !== 'links' && vista !== 'lista';

  return (
    <>
      <SvgDefs />
      <StickerTransicion ref={peel} />
      <Cursor />
      {conMarco && <Header vista={vista} />}
      {conMarco && vista !== 'panel' && <Temporada />}
      {vista === 'inicio' && <Inicio imprimir={introListo && !moviendo} />}
      {vista === 'catalogo' && <Catalogo param={param} />}
      {vista === 'panel' && <Panel />}
      {vista === 'links' && <Links />}
      {vista === 'lista' && <Lista />}
      {conMarco && <Footer />}
      {vista !== 'lista' && <WaFlota />}
      <Ficha />
      <Carrito />
      <Toast irA={ir} />
    </>
  );
}
