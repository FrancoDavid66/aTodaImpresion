import { NEGOCIO, PASOS, PREGUNTAS, PUEBLOS, TARIFAS } from '../data/negocio.js';
import { Wa } from '../componentes/Generales.jsx';
import { Enlace } from '../lib/ruta.jsx';

export function Precios() {
  return (
    <section className="bloque" id="precios">
      <div className="wrap">
        <h2>Más cantidad, mejor precio</h2>
        <p className="intro">Hacemos precio por mayor en papelería, servicios digitales y deco para eventos.</p>
        <div className="precios-grid">
          {TARIFAS.map((t) => (
            <div key={t.titulo} className={'tarifa' + (t.rosa ? ' rosa' : '')}>
              <h3>{t.titulo}</h3><p className="chico">{t.sub}</p>
              <dl>{t.filas.map(([a, b, c]) => <div key={a}><dt>{a}</dt><dd>{b} {c && <small>{c}</small>}</dd></div>)}</dl>
            </div>
          ))}
        </div>
        <div className="precios-pie">
          <Enlace className="link" to="/lista">Ver la lista completa por mayor</Enlace>
          <span className="nota-ej">Precios de ejemplo. Los define Zule.</span>
        </div>
      </div>
    </section>
  );
}

export function Pasos() {
  return (
    <section className="bloque pasos-s" id="como">
      <div className="wrap">
        <h2>Cómo trabajamos</h2>
        <p className="intro">Trabajamos solo por pedidos, así cada cosa sale pensada para vos.</p>
        <ol className="pasos">{PASOS.map(([t, d]) => <li key={t}><h3>{t}</h3><p>{d}</p></li>)}</ol>
      </div>
    </section>
  );
}

// Lugares para las capturas reales de la destacada "Clientes" (no se inventan opiniones)
const BURBUJAS = [
  [['', 78], ['', 55], ['yo', 48], ['', 70]],
  [['yo', 60], ['', 82], ['', 64], ['', 40]],
  [['', 66], ['yo', 52], ['', 74], ['yo', 36]],
];
export function Clientas() {
  return (
    <section className="bloque" id="clientes">
      <div className="wrap">
        <h2>Lo que dicen las clientas</h2>
        <p className="intro">Mensajes reales de la destacada “Clientes 💕” de Instagram.</p>
        <div className="cel-grid">
          {BURBUJAS.map((b, i) => (
            <div className="cel" key={i}>
              {b.map(([q, w], j) => <span key={j} className={'burbuja ' + q} style={{ '--w': w + '%' }} />)}
              <p className="falta">Acá va una captura real de clienta</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Zule() {
  return (
    <section className="zule" id="zule">
      <div className="wrap">
        <div className="zule-card">
          <div className="polaroid"><div className="ph">Foto de Zule</div><div className="pie">Zule</div></div>
          <div>
            <p>Soy Zule, dueña y creadora de A Toda Impresión. Cada pedido lo diseño desde cero y nunca hago el mismo diseño dos veces. Trabajo con buenos papeles e impresión de calidad para que lo que encargás se luzca.</p>
            <div className="firma">Zule</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Preguntas() {
  return (
    <section className="bloque" id="preguntas">
      <div className="wrap faq-grid">
        <div><h2>Preguntas frecuentes</h2><p className="intro">Si te queda alguna duda, escribinos por WhatsApp.</p></div>
        <div className="faq">
          {PREGUNTAS.map(([q, r, pueblos], i) => (
            <details key={q} open={i === 0}>
              <summary>{q}</summary>
              <p>{r}</p>
              {pueblos && <div className="pueblos">{PUEBLOS.map((p, j) => <span key={p} className={j === 0 ? 'base' : ''}>{p}</span>)}</div>}
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Cierre() {
  return (
    <section className="bloque cierre">
      <div className="wrap cierre-grid">
        <div>
          <h2>Contanos qué tenés en mente</h2>
          <p className="intro">Una idea, una foto de referencia o solo la fecha. Con eso arrancamos.</p>
          <Wa className="btn">Escribir por WhatsApp</Wa>
        </div>
        <Wa className="tel">{NEGOCIO.whatsappVisible}</Wa>
      </div>
    </section>
  );
}
