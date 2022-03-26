import { UserConfigExport, defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

export default (): UserConfigExport => defineConfig({
  plugins: [vue(), vueJsx()],
  build: {
    target: 'es2015',
    outDir: 'dist',
    terserOptions: {
      compress: {
        keep_infinity: true,
        drop_console: true,
        drop_debugger: true,
      },
    },
    brotliSize: false,
    chunkSizeWarningLimit: 2000,
  },
  server: {
    open: false,
    host: '0.0.0.0',
    https: false,
    hmr: true,
  },
})
