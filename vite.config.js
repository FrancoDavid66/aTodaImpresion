import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Build para subir a Hostinger (public_html). Rutas limpias: /catalogo, /panel, /links, /lista
export default defineConfig({
  plugins: [react()],
  define: { __SINGLE__: 'false' },
});
