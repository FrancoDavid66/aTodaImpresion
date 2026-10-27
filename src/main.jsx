import { createRoot } from 'react-dom/client';
import './estilos/fuentes.css';
import './estilos/global.css';
import App from './App.jsx';
import { TiendaProvider } from './lib/tienda.jsx';

document.documentElement.classList.add('js');

createRoot(document.getElementById('root')).render(
  <TiendaProvider>
    <App />
  </TiendaProvider>
);
