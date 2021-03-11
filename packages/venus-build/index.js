const rollup = require('rollup');
const NodePath = require('path')
const RollupJson = require('@rollup/plugin-json')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const RollupCommonjs = require('@rollup/plugin-commonjs')
const RollupTypescript = require('rollup-plugin-typescript2')
const image = require('rollup-plugin-image');
const postcss = require('rollup-plugin-postcss');
const simplevars = require('postcss-simple-vars');
const nested = require('postcss-nested');
const Package = require('../package.json');
console.log(__dirname, process.cwd());
const resolveFile2 = path => NodePath.resolve(__dirname, path)
const resolveFile = path => NodePath.resolve(process.cwd(), path)

const externalPackages = [
  'react',
  'react-dom',
  '@tarojs/components',
  '@tarojs/runtime',
  '@tarojs/taro',
  '@tarojs/react'
]

const inputOptions = {
  input: resolveFile('src/index.ts'),
  // input: resolveFile(Package.source),
  // input: './src/index.ts',
  external: externalPackages,
  plugins: [
    nodeResolve({
      customResolveOptions: {
        moduleDirectories: ['node_modules']
      }
    }),
    RollupCommonjs({
      include: /\/node_modules\//
    }),
    RollupJson(),
    RollupTypescript({
      // tsconfigDefaults: resolveFile2('../tsconfig.rollup.json'),
      tsconfigDefaults: resolveFile('tsconfig.json'),
      // tsconfig: resolveFile2('../tsconfig.rollup.json'),
      // tsconfig: '../tsconfig.rollup.json',
      abortOnError: false
    }),
    image(),
    postcss({
      plugins: [
        simplevars(),
        nested()
      ],
      // extensions: ['.css', '.less', '.scss'],
      modules: true,
      extract: 'index.css'
    })
  ]
};
const outputOptions = {
  output: {
    file: resolveFile('dist/index.js'),
    // file: resolveFile(Package.module),
    format: 'es',
    sourcemap: true
  }
};

async function build() {
  // create a bundle
  const bundle = await rollup.rollup(inputOptions);

  // console.log(bundle.imports); // an array of external dependencies
  // console.log(bundle.exports); // an array of names exported by the entry point
  // console.log(bundle.modules); // an array of module objects

  // generate code and a sourcemap
  // const { code, map } = await bundle.generate({
  //     file: resolveFile(Package.module),
  //     format: 'es',
  //     sourcemap: true
  //   });

  // or write the bundle to disk
  await bundle.write(outputOptions);
}

build();
