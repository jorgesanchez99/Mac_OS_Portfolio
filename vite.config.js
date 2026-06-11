import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const root = dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    // Mismo patrón que jsconfig.json: "#*" -> "src/*".
    // Una sola regla; agregar carpetas nuevas no requiere tocar este archivo.
    alias: [
      { find: /^#(.*)$/, replacement: resolve(root, 'src') + '/$1' },
    ],
  },
})
