const path = require('path')
const RollupJson = require('@rollup/plugin-json')
const RollupCommonjs = require('@rollup/plugin-commonjs')
const RollupTypescript = require('rollup-plugin-typescript2')
const image = require('@rollup/plugin-image')
const postcss = require('rollup-plugin-postcss')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const simplevars = require('postcss-simple-vars')
const nested = require('postcss-nested')
const injectProcessEnv = require('rollup-plugin-inject-process-env')
const alias = require('@rollup/plugin-alias')
const RollupCopy = require('rollup-plugin-copy')
// const argv = require('minimist')(process.argv.slice(2))
import { posix } from 'path'
import { InputOptions, OutputOptions } from 'rollup'
import { getConfig, setResolveFile } from './utils'

const resolveFile = setResolveFile(process.cwd())

const customResolver = nodeResolve({
  extensions: [
    '.js',
    '.jsx',
    '.ts',
    '.tsx',
    '.json',
    '.sass',
    '.scss',
    '.less',
    '.css'
  ]
})

let {
  input = resolveFile('src/index.ts'),
  output = 'lib',
  cssModules,
  plugins = [],
  externalPackages = [],
  aliasEntries = {
    '~': resolveFile('src'),
    '@': resolveFile('src')
  },
  ENV = {
    WEB_ENV: process.env.WEB_ENV,
    NODE_ENV: process.env.NODE_ENV
  },
  tsconfig = resolveFile('tsconfig.json')
} = getConfig()

let defaultExternalPackages = [
  'react',
  'react-dom',
  '@tarojs/components',
  '@tarojs/runtime',
  '@tarojs/taro',
  '@tarojs/react'
]

const getInputOptions = argv => {
  let isBuidUI = argv.t && argv.t === 'ui'

  let inputOptions: InputOptions = {
    input,
    external: externalPackages.concat(defaultExternalPackages),
    plugins: [
      nodeResolve({
        customResolveOptions: {
          moduleDirectory: 'node_modules'
        }
      }),
      RollupCommonjs({
        include: /\/node_modules\//
      }),
      RollupJson(),
      RollupTypescript({
        tsconfig,
        abortOnError: false
      }),
      image({
        dom: false
      }),
      isBuidUI
        ? RollupCopy({
            targets: [
              {
                src: posix.join('src/style'),
                dest: posix.join(output)
              }
            ]
          })
        : postcss({
            plugins: [simplevars(), nested()],
            modules: cssModules,
            extract: resolveFile(output, 'index.css')
          }),
      injectProcessEnv(ENV),
      alias({
        entries: aliasEntries,
        customResolver
      })
    ].concat(plugins)
  }

  return inputOptions
}

const getOutputOptions = () => {
  let outputOptions: Array<OutputOptions> = [
    {
      file: resolveFile(output, 'index.js'),
      format: 'cjs',
      sourcemap: true
    },
    {
      file: resolveFile(output, 'index.esm.js'),
      format: 'es',
      sourcemap: true
    }
  ]

  return outputOptions
}

export { getInputOptions, getOutputOptions }
