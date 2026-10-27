import { useMemo, useState } from 'react';
import Logo from '../componentes/Logo.jsx';
import { Icono } from '../componentes/SvgDefs.jsx';
import { DIAS_MINIMOS, EVENTOS, ITEMS } from '../data/negocio.js';
import { fechaCorta, waLink } from '../lib/util.js';

// "Armá tu pedido": para quien no sabe bien qué necesita. Arma una orden de trabajo y la manda por WhatsApp.
const hoy = () => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; };
const isoLocal = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

export default function ArmaPedido() {
  const [evento, setEvento] = useState('');
  const [items, setItems] = useState([]);
  const [cant, setCant] = useState('');
  const [tema, setTema] = useState('');
  const [nombre, setNombre] = useState('');
  const [fecha, setFecha] = useState('');
  const [envio, setEnvio] = useState(false);
  const [loc, setLoc] = useState('');
  const [ref, setRef] = useState(false);
  const numero = useMemo(() => 'N° ' + Math.floor(1000 + Math.random() * 9000), []);

  const elegirEvento = (ev) => { setEvento(ev); setItems(EVENTOS[ev]); };
  const toggleItem = (it) => setItems((l) => (l.includes(it) ? l.filter((x) => x !== it) : [...l, it]));

  const entrega = envio ? (loc.trim() ? 'Envío a ' + loc.trim() : 'Envío') : 'Retiro en San Genaro';
  let aviso = '';
  if (fecha) {
    const dias = Math.round((new Date(fecha + 'T00:00') - hoy()) / 864e5);
    if (dias < 0) aviso = 'Esa fecha ya pasó.';
    else if (dias < DIAS_MINIMOS) aviso = `Faltan ${dias} ${dias === 1 ? 'día' : 'días'}: escribinos igual y vemos si llegamos.`;
  }
  const listo = evento && items.length;
  const L = ['Hola Zule! 👋 Te paso mi pedido desde la web:'];
  if (evento) L.push('• Para: ' + evento);
  if (items.length) L.push('• Necesito: ' + items.join(', '));
  if (cant) L.push('• Cantidad aprox.: ' + cant);
  if (tema.trim()) L.push('• Temática/colores: ' + tema.trim());
  if (nombre.trim()) L.push('• Nombre: ' + nombre.trim());
  if (fecha) L.push('• Para el: ' + fechaCorta(fecha));
  L.push('• Entrega: ' + entrega);
  if (ref) L.push('', 'Te mando una imagen de referencia 👇');

  const Fila = ({ t, v }) => <div><dt>{t}</dt><dd className={v ? '' : 'vacio'}>{v || '—'}</dd></div>;
  const sugerencia = !evento ? 'Elegí una opción arriba y te sugerimos lo que más se pide.' : EVENTOS[evento].length ? 'Marcamos lo que más se pide para esto. Sacá o sumá lo que quieras.' : 'Marcá lo que necesites o contanos en el chat.';

  return (
    <section className="bloque pedido" id="pedido">
      <div className="wrap">
        <h2>Armá tu pedido</h2>
        <p className="intro">¿No sabés bien qué necesitás? Contanos para qué es y te sugerimos. Lo mandás por WhatsApp y te respondemos con un boceto y el precio.</p>
        <div className="ped-grid">
          <form onSubmit={(e) => e.preventDefault()}>
            <fieldset className="campo">
              <legend>¿Para qué es?</legend>
              <div className="chips">
                {Object.keys(EVENTOS).map((ev) => (
                  <label key={ev} className="chip"><input type="radio" name="evento" checked={evento === ev} onChange={() => elegirEvento(ev)} /><span>{ev}</span></label>
                ))}
              </div>
            </fieldset>
            <fieldset className="campo">
              <legend>¿Qué necesitás?</legend>
              <p className="ayuda">{sugerencia}</p>
              <div className="chips">
                {ITEMS.map((it) => (
                  <label key={it} className="chip cuadro"><input type="checkbox" checked={items.includes(it)} onChange={() => toggleItem(it)} /><span>{it}</span></label>
                ))}
              </div>
            </fieldset>
            <div className="campo dos">
              <div className="inp"><label htmlFor="cant">Cantidad aproximada</label><input id="cant" type="number" min="1" inputMode="numeric" placeholder="Ej: 20" value={cant} onChange={(e) => setCant(e.target.value)} /></div>
              <div className="inp"><label htmlFor="tema">Temática o colores</label><input id="tema" placeholder="Ej: tonos pastel, fútbol" value={tema} onChange={(e) => setTema(e.target.value)} /></div>
              <div className="inp"><label htmlFor="nombre">Nombre y edad (si es un cumple)</label><input id="nombre" placeholder="Ej: Jaiel, 2 años" value={nombre} onChange={(e) => setNombre(e.target.value)} /></div>
              <div className="inp">
                <label htmlFor="fecha">¿Para cuándo lo necesitás?</label>
                <input id="fecha" type="date" min={isoLocal(hoy())} value={fecha} onChange={(e) => setFecha(e.target.value)} />
                <p className="aviso" aria-live="polite">{aviso}</p>
              </div>
            </div>
            <fieldset className="campo">
              <legend>Entrega</legend>
              <div className="chips">
                <label className="chip"><input type="radio" name="entrega" checked={!envio} onChange={() => setEnvio(false)} /><span>Retiro en San Genaro</span></label>
                <label className="chip"><input type="radio" name="entrega" checked={envio} onChange={() => setEnvio(true)} /><span>Envío</span></label>
              </div>
              {envio && <div className="inp" style={{ marginTop: '1rem' }}><label htmlFor="loc">¿A qué localidad?</label><input id="loc" placeholder="Ej: Centeno" value={loc} onChange={(e) => setLoc(e.target.value)} /></div>}
            </fieldset>
            <label className="check-ref"><input type="checkbox" checked={ref} onChange={(e) => setRef(e.target.checked)} /> Tengo una imagen de referencia para mandar</label>
          </form>

          <div className="ticket-wrap">
            <div className="ticket" aria-live="polite">
              <div className="t-cab">
                <Logo aria-hidden="true" />
                <div className="t-num">Orden de trabajo<b>{numero}</b></div>
              </div>
              <dl className="t-filas">
                <Fila t="Para" v={evento} />
                <Fila t="Lleva" v={items.join(', ')} />
                <Fila t="Cantidad" v={cant ? cant + ' u.' : ''} />
                <Fila t="Temática" v={tema.trim()} />
                <Fila t="Nombre" v={nombre.trim()} />
                <Fila t="Para el" v={fecha ? fechaCorta(fecha) : ''} />
                <Fila t="Entrega" v={entrega} />
              </dl>
              <div className="t-pie">
                <p>{listo ? 'Revisalo y mandalo por WhatsApp.' : 'Elegí para qué es y qué necesitás.'}</p>
                <div className={'sello' + (listo ? ' puesto' : '')}>LISTO PARA<span>enviar</span></div>
              </div>
            </div>
            <a className="btn btn-wa" href={waLink(L.join('\n'))} target="_blank" rel="noopener" data-cursor="Enviar"><Icono id="wa" />Enviar pedido por WhatsApp</a>
            <p className="chico">Se abre WhatsApp con el pedido escrito. Lo revisás y lo mandás.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
