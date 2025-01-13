import path from 'path'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import pluginVue from 'rollup-plugin-vue'
import postcss from 'rollup-plugin-postcss'
import terser from '@rollup/plugin-terser'
import strip from '@rollup/plugin-strip'

module.exports = {
  input: path.resolve(__dirname, './packages/index.js'),
  output: [
    {
      file: path.resolve(__dirname, './dist/vue3-seamless-scroll.js'),
      format: 'umd',
      name: 'Vue3SeamlessScroll',
      globals: {
        vue: 'Vue'
      }
    },
    {
      file: path.resolve(__dirname, './dist/vue3-seamless-scroll.min.js'),
      format: 'umd',
      name: 'Vue3SeamlessScroll',
      globals: {
        vue: 'Vue'
      },
      plugins: [
        terser()
      ]
    },
    {
      file: path.resolve(__dirname, './dist/vue3-seamless-scroll.es.js'),
      format: 'es',
      globals: {
        vue: 'Vue'
      }
    }
  ],
  onwarn: (warning, warn) => {
    if (warning.code === 'MIXED_EXPORTS') return;
    warn(warning);
  },
  plugins: [
    strip({
      include: ['**/*.js'],
      functions: ['console.log', 'assert'],
    }),
    resolve(),
    pluginVue(),
    commonjs(),
    postcss(),
  ],
  external: [
    'vue'
  ]
}
