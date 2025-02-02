import pkg from './package.json' assert {type: 'json'};
import svgr from '@svgr/rollup';
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import filesize from 'rollup-plugin-filesize';
import includePaths from 'rollup-plugin-includepaths';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import autoprefixer from 'autoprefixer';
import postcssPresetEnv from 'postcss-preset-env';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import {dts} from 'rollup-plugin-dts';
import del from 'rollup-plugin-delete';
import url from '@rollup/plugin-url';

const outputs = [
  {
    file: process.env.REACT_APP_PKG_MAIN || pkg.main,
    format: 'umd',
  },
  {
    file: process.env.REACT_APP_PKG_MODULE || pkg.module,
    format: 'es',
  },
];

const postcssPlugins = [
  postcssPresetEnv({
    browsers: pkg.browserslist.production,
    stage: 3,
  }),
  autoprefixer(),
];

const config = outputs.map(({file, format}) => ({
  input: 'src/lib/index.js',
  output: {
    file,
    format,
    name: 'ReactCalendarToolkit',
    globals: {
      react: 'React',
      'react-dom': 'ReactDOM',
    },
    exports: 'named',
  },
  plugins: [
    url(),
    peerDepsExternal(),
    typescript({tsconfig: './tsconfig.json'}),
    includePaths({
      include: {},
      paths: ['src'],
      external: Object.keys(pkg.dependencies),
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.html'],
    }),
    svgr({exportType: 'named'}),
    postcss({
      extract: process.env.REACT_APP_PKG_STYLE || pkg.style,
      inline: false,
      plugins: postcssPlugins,
    }),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      configFile: './babel.config.rollup.js',
    }),
    resolve({
      browser: true,
    }),
    commonjs(),
    terser(),
    filesize(),
  ],
}));

const typeDefinitions = {
  input: 'lib/types/lib/index.d.ts',
  output: [{file: 'lib/index.d.ts', format: 'es'}],
  plugins: [dts(), del({hook: 'buildEnd', targets: 'lib/types'})],
};

config.push(typeDefinitions);

export default config;
