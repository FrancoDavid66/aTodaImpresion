import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { PRODUCTOS } from '../data/productos.js';
import { guardar, leer, precioUnit } from './util.js';

// Estado de la tienda: catálogo (+ lo que carga Zule en el panel), pedido del cliente, ficha abierta y avisos.
// OJO: en esta versión el panel guarda en el navegador (demo). Para que lo que carga Zule lo vean todos,
// hay que conectar estas funciones (publicar, marcarDisponible, ocultar, borrar) a una base de datos.

const DEMO_KEY = 'atoda-demo-v1';
const PED_KEY = 'atoda-pedido-v1';
const Ctx = createContext(null);
export const useTienda = () => useContext(Ctx);

export function TiendaProvider({ children }) {
  const [demo, setDemo] = useState(() => leer(DEMO_KEY, { extra: [], disp: {}, oculto: {} }));
  const [carrito, setCarrito] = useState(() => leer(PED_KEY, []));
  const [fichaId, setFichaId] = useState(null);
  const [carritoAbierto, setCarritoAbierto] = useState(false);
  const [toast, setToast] = useState(null);
  const [salto, setSalto] = useState(0);

  const todos = useMemo(
    () => [...demo.extra, ...PRODUCTOS].map((p) => ({ ...p, disponible: demo.disp[p.id] ?? !!p.disponible, oculto: !!demo.oculto[p.id] })),
    [demo]
  );
  const productos = useMemo(() => todos.filter((p) => !p.oculto), [todos]);
  const prod = useCallback((id) => todos.find((p) => p.id === id), [todos]);

  useEffect(() => { guardar(PED_KEY, carrito.map(({ fotoSubida, ...r }) => r)); }, [carrito]); // la foto subida no se guarda en el pedido

  const avisar = useCallback((texto, boton = 'Ver pedido', accion = 'carrito') => setToast({ texto, boton, accion, id: Date.now() }), []);

  /* ---------- pedido ---------- */
  const sumar = useCallback((it) => {
    const key = it.id + '|' + (it.op || '');
    setCarrito((c) => {
      const i = c.findIndex((x) => x.key === key);
      if (i > -1) { const n = [...c]; n[i] = { ...n[i], cant: n[i].cant + it.cant }; return n; }
      return [...c, { ...it, key }];
    });
    setSalto((s) => s + 1);
    avisar(`Sumaste ${it.nombre.length > 26 ? it.nombre.slice(0, 26) + '…' : it.nombre}`);
  }, [avisar]);

  const cambiarCant = useCallback((i, cant) => {
    setCarrito((c) => c.map((x, j) => {
      if (j !== i) return x;
      const n = { ...x, cant: Math.max(1, cant || 1) };
      const p = todos.find((q) => q.id === x.id);
      if (p && !x.kit) n.unit = precioUnit(p, n.cant, x.sel || []);
      return n;
    }));
  }, [todos]);
  const quitar = useCallback((i) => setCarrito((c) => c.filter((_, j) => j !== i)), []);
  const vaciar = useCallback(() => setCarrito([]), []);

  /* ---------- panel de Zule ---------- */
  const demoRef = useRef(demo);
  const actualizarDemo = useCallback((fn) => {
    const n = fn(demoRef.current);
    demoRef.current = n;
    setDemo(n);
    return guardar(DEMO_KEY, n); // false = el navegador no deja guardar (se pierde al recargar)
  }, []);
  const publicar = useCallback((p) => actualizarDemo((d) => ({ ...d, extra: [p, ...d.extra] })), [actualizarDemo]);
  const marcarDisponible = useCallback((id, v) => actualizarDemo((d) => ({ ...d, disp: { ...d.disp, [id]: v } })), [actualizarDemo]);
  const ocultar = useCallback((id) => actualizarDemo((d) => ({ ...d, oculto: { ...d.oculto, [id]: !d.oculto[id] } })), [actualizarDemo]);
  const borrar = useCallback((id) => actualizarDemo((d) => ({ ...d, extra: d.extra.filter((p) => p.id !== id) })), [actualizarDemo]);

  const valor = useMemo(() => ({
    todos, productos, prod,
    carrito, sumar, cambiarCant, quitar, vaciar, salto,
    fichaId, abrirFicha: setFichaId, cerrarFicha: () => setFichaId(null),
    carritoAbierto, abrirCarrito: () => setCarritoAbierto(true), cerrarCarrito: () => setCarritoAbierto(false),
    toast, avisar, cerrarToast: () => setToast(null),
    publicar, marcarDisponible, ocultar, borrar,
  }), [todos, productos, prod, carrito, sumar, cambiarCant, quitar, vaciar, salto, fichaId, carritoAbierto, toast, avisar, publicar, marcarDisponible, ocultar, borrar]);

  return <Ctx.Provider value={valor}>{children}</Ctx.Provider>;
}
