import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default () => defineConfig({
  plugins: [vue()],
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
    minify: 'terser',
    brotliSize: false,
    chunkSizeWarningLimit: 2000,
  },
  server: {
    open: false,
    port: 3000,
    host: '0.0.0.0',
    https: false,
    hmr: {
      overlay: false
    }
  },
})

// @rollup/plugin-node-resolve @rollup/plugin-terser  @rollup/plugin-babel rimraf @rollup/plugin-commonjs