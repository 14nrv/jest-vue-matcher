import { plugin as analyze } from 'rollup-plugin-analyzer'
import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'

export default {
  input: 'src/matchers.js',
  external: ['expect'],
  output: [
    { file: pkg.main, format: 'cjs', exports: 'default' },
    { file: pkg.module, format: 'es' }
  ],
  plugins: [
    terser(),
    analyze()
  ]
}
