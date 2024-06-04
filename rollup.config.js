import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import copy from 'rollup-plugin-copy';
import pkg from './package.json';
import image from '@rollup/plugin-image';

export default [
  {
    input: 'src/index.js',
    external: ['@mapbox/mapbox-gl-draw'],
    plugins: [
      resolve(),
      commonjs(),
      terser(),
      image(),
      copy({
        targets: [{ src: 'src/img/**', dest: 'dist/img' }],
      }),
    ],
    output: {
      file: pkg.main,
      format: 'umd',
      exports: 'named',
      name: 'ScaleRotateMode',
      sourcemap: process.env.NODE_ENV !== 'production',
      globals: {
        '@mapbox/mapbox-gl-draw': 'MapboxDraw'
      }
    },
  },
];
