import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

// HTML único (todo embebido, abre con doble clic) para mostrarle la web a la clienta.
// Uso: npm run build:single  ->  dist-single/index.html   (páginas: #/catalogo, #/panel, #/links, #/lista)
export default defineConfig({
  base: './',
  plugins: [react(), viteSingleFile()],
  define: { __SINGLE__: 'true' },
  build: {
    outDir: 'dist-single',
    assetsInlineLimit: 100000000,
    copyPublicDir: false,
  },
});
