import { plugin as analyze } from 'rollup-plugin-analyzer'
import uglify from 'rollup-plugin-uglify-es'
import pkg from './package.json'

export default {
  input: 'src/matchers.js',
  external: ['expect'],
  output: [
    { file: pkg.main, format: 'cjs' },
    { file: pkg.module, format: 'es' }
  ],
  plugins: [
    uglify(),
    analyze()
  ]
}
