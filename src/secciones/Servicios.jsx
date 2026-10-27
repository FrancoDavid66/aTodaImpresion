import { FOTOS } from '../data/fotos.js';
import { SERVICIOS } from '../data/negocio.js';
import { Icono } from '../componentes/SvgDefs.jsx';

export default function Servicios() {
  return (
    <section className="bloque" id="servicios">
      <div className="wrap serv">
        <div className="serv-izq">
          <h2>Lo que hacemos</h2>
          <p className="intro">Todo lo diseñamos a pedido: no repetimos el mismo diseño dos veces, siempre le sumamos un toque distinto.</p>
          <div className="serv-foto"><img src={FOTOS.etiquetas} alt="Planchas de etiquetas adhesivas impresas para un comercio de San Genaro" loading="lazy" decoding="async" /></div>
        </div>
        <ul className="lista-serv">
          {SERVICIOS.map(([t, d]) => (
            <li key={t}><Icono id="ast" /><div><h3>{t}</h3><p>{d}</p></div></li>
          ))}
        </ul>
      </div>
    </section>
  );
}
