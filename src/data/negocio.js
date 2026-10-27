// =====================================================================
//  DATOS DE A TODA IMPRESIÓN — todo lo que se edita está acá
// =====================================================================

export const NEGOCIO = {
  nombre: 'A Toda Impresión',
  duena: 'Zule',
  whatsapp: '5493401649713',          // 3401 649713 (formato wa.me: 549 + característica + número)
  whatsappVisible: '3401 649713',
  instagram: 'https://www.instagram.com/atoda.impresion.sg/',
  instagramUsuario: '@atoda.impresion.sg',
  localidad: 'San Genaro, Santa Fe',
  slogan: 'Si buscás algo distinto, es por acá',
  dominio: 'https://TU-DOMINIO.com.ar',
  credito: 'Web hecha por Franco David',
};

// Pueblos a los que llegan los envíos (A CONFIRMAR con Zule)
export const PUEBLOS = ['San Genaro', 'Centeno', 'Díaz', 'Casas', 'Las Bandurrias', 'Cañada Rosquín', 'Gálvez', 'Totoras'];

// Días mínimos de anticipación: si piden para antes, la web avisa "escribinos igual y vemos si llegamos"
export const DIAS_MINIMOS = 7;

export const OCASIONES = {
  cumple: 'Cumpleaños',
  eventos: 'Eventos y revelaciones',
  escolar: 'Escolar',
  fechas: 'Fechas especiales',
  emprende: 'Emprendedores',
  regalos: 'Regalos',
  fotos: 'Fotos',
};

export const TIPOS = {
  stickers: 'Stickers y etiquetas',
  papeleria: 'Papelería',
  textil: 'Textil',
  deco: 'Deco y carteles',
  vinilos: 'Vinilos',
  diseno: 'Diseño',
  fotos: 'Fotos',
  regalos: 'Regalería',
};

// Temporadas: se activan solas según la fecha (mes-día). La primera que coincide gana.
// Los productos se suman a una temporada con  temporadas: ['fin']  en productos.js
export const TEMPORADAS = [
  { id: 'clases', desde: '01-15', hasta: '03-31', titulo: 'Vuelta al cole', texto: 'Etiquetas con nombre y stickers para útiles.' },
  { id: 'padre', desde: '05-25', hasta: '06-21', titulo: 'Día del Padre', texto: 'Remeras, imanes y tarjetas para regalar.' },
  { id: 'nino', desde: '07-15', hasta: '08-20', titulo: 'Día del Niño', texto: 'Bolsitas, stickers y remeras con su personaje.' },
  { id: 'madre', desde: '09-15', hasta: '10-20', titulo: 'Día de la Madre', texto: 'Stickers, flores de tela y tarjetas.' },
  { id: 'navidad', desde: '12-01', hasta: '12-24', titulo: 'Navidad', texto: 'Etiquetas para regalos, calendarios y flores.' },
  { id: 'fin', desde: '10-21', hasta: '12-15', titulo: 'Egresados y fin de año', texto: 'Stickers, banderines y calendarios 2027.' },
];

export const SERVICIOS = [
  ['Diseño digital y físico', 'Logos, invitaciones, flyers y piezas para redes, listas para publicar o imprimir.'],
  ['Decoración para eventos', 'Toppers, carteles, banderines y detalles con la temática que elijas.'],
  ['Cartelería', 'Carteles para tu local, vidrieras y precios.'],
  ['Regalería personalizada', 'Cajitas, flores de tela y regalos con nombre para cada ocasión.'],
  ['Papelería para emprendedores', 'Etiquetas, tarjetas y stickers con tu marca para que tu producto se luzca.'],
  ['Fotos', 'Impresión de fotos en máxima calidad. Nos compartís el álbum y listo.'],
  ['Adhesivos clásicos o vinílicos', 'Stickers troquelados, etiquetas y vinilo de corte, también holográfico.'],
  ['Estampados', 'Remeras, bolsitas y telas con tu diseño.'],
  ['Rotulaciones', 'Vinilos para vidrieras, autos y superficies.'],
];

// Galería "Algunos trabajos" (foto = clave de src/data/fotos.js)
export const TRABAJOS = [
  { foto: 'stickers', cat: 'stickers', tit: 'Stickers para el Día de la Madre', desc: 'Stickers troquelados con frases y dibujos, en varios modelos.' },
  { foto: 'remera', cat: 'eventos', tit: 'Remera de cumple con nombre', desc: 'Estampado a todo color con la temática y el nombre del cumpleañero.' },
  { foto: 'rediseno', cat: 'emprende', tit: 'Rediseño de etiquetas', desc: 'Antes y después de la etiqueta de un dulce casero de frutilla.' },
  { foto: 'bolsitas', cat: 'eventos', tit: 'Bolsitas de cumple', desc: 'Bolsitas de tela estampadas para las sorpresitas.' },
  { foto: 'flores', cat: 'regalos', tit: 'Ramo de flores de tela', desc: 'Flores hechas a mano que no se marchitan.' },
  { foto: 'etiquetas', cat: 'emprende', tit: 'Etiquetas para un comercio', desc: 'Planchas de etiquetas adhesivas con los datos del local.' },
  { foto: 'revelacion', cat: 'eventos', tit: 'Cajita para revelación de género', desc: 'Cajitas impresas para souvenirs y sorpresas.' },
  { foto: 'holo', cat: 'stickers', tit: 'Vinilo holográfico', desc: 'Vinilo de corte con efecto tornasolado.' },
  { foto: 'vinilo', cat: 'stickers', tit: 'Vinilo de corte', desc: 'Diseños calados en vinilo para pegar donde quieras.' },
];
export const FILTROS_TRABAJOS = [
  ['todos', 'Todos'], ['eventos', 'Cumples y eventos'], ['emprende', 'Emprendedores'], ['stickers', 'Stickers y vinilos'], ['regalos', 'Regalos'],
];

// "Armá tu pedido": para qué es → lo que se sugiere marcar
export const EVENTOS = {
  'Cumpleaños': ['Stickers', 'Bolsitas', 'Remera estampada', 'Toppers', 'Invitación digital'],
  'Revelación o baby shower': ['Cajitas', 'Stickers', 'Toppers', 'Cartel o banner', 'Invitación digital'],
  'Día de la madre o del padre': ['Stickers', 'Cajitas', 'Flores de tela', 'Tarjetas'],
  'Mi emprendimiento': ['Etiquetas', 'Stickers', 'Tarjetas', 'Cartel o banner'],
  'Un regalo': ['Flores de tela', 'Cajitas', 'Remera estampada', 'Fotos impresas'],
  'Otra cosa': [],
};
export const ITEMS = ['Stickers', 'Etiquetas', 'Bolsitas', 'Remera estampada', 'Toppers', 'Cajitas', 'Tarjetas', 'Invitación digital', 'Cartel o banner', 'Vinilo de corte', 'Flores de tela', 'Fotos impresas'];

export const PASOS = [
  ['Nos escribís', 'Contanos qué necesitás y para cuándo.'],
  ['Te mandamos un boceto', 'Diseñamos una propuesta con tu idea.'],
  ['Lo aprobás', 'Ajustamos lo que haga falta hasta que te guste.'],
  ['Imprimimos y armamos', 'Con buenos papeles y terminaciones prolijas.'],
  ['Retirás o te lo enviamos', 'En San Genaro o a toda la zona.'],
];

export const PREGUNTAS = [
  ['¿Hacen envíos?', 'Sí, a toda la zona. También podés retirar en San Genaro coordinando por WhatsApp.', true],
  ['¿Con cuánta anticipación tengo que pedir?', 'Depende del pedido. Para cumples y eventos, escribinos apenas tengas la fecha y te decimos si llegamos.'],
  ['¿Hacen precio por mayor?', 'Sí, en papelería, servicios digitales y deco para eventos. Cuanta más cantidad, mejor el precio por unidad. Mirá la lista completa en el catálogo.'],
  ['¿Puedo mandar mi propio diseño?', 'Sí. Mandalo por WhatsApp y te decimos si hay que ajustarlo para imprimir. Si no tenés, lo diseñamos desde cero.'],
  ['¿Tienen local?', 'Trabajamos solo por pedidos. Escribinos y coordinamos la entrega o el retiro.'],
];

// Tablas de la sección "Más cantidad, mejor precio" (PRECIOS DE EJEMPLO)
export const TARIFAS = [
  { titulo: 'Stickers troquelados', sub: 'Precio por unidad, hasta 6 cm', filas: [['10 a 49', '$ 350', 'c/u'], ['50 a 99', '$ 280', 'c/u'], ['100 a 299', '$ 220', 'c/u'], ['300 o más', 'Consultar', '']] },
  { titulo: 'Fotos impresas', sub: 'Papel fotográfico, máxima calidad', rosa: true, filas: [['10 × 15', '$ 500', ''], ['13 × 18', '$ 900', ''], ['15 × 21', '$ 1.300', ''], ['A4', '$ 2.500', '']] },
];
