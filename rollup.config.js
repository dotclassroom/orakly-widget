import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/main.js',
  output: {
    file: 'dist/oraklywidget.js',
    format: 'iife',
    name: 'OraklyWidget',
    globals: {
      svelte: 'Svelte'
    },
    sourcemap: true,
  },
  plugins: [
    svelte({
      compilerOptions: {
        dev: true,
        runes: true
      },
      emitCss: false
    }),
    resolve({
      browser: true,
      exportConditions: ['svelte'],
      dedupe: ['svelte']
    }),
    commonjs(),
    terser({
      format: {
        comments: false,
      }
    })
  ]
};