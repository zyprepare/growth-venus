import { existsSync } from 'fs'
import { resolve } from 'path'
const { yellow, white } = require('chalk')
import { CustomConfig } from './types'
import { CONFIGNAMES } from './const'

export const setResolveFile = (basePath: string) => (
  ...pathSegments: string[]
): string => resolve(basePath, ...pathSegments)

export const getConfig = (): CustomConfig => {
  const resolveFile = setResolveFile(process.cwd())

  let filename = CONFIGNAMES.find(item => {
    return existsSync(resolveFile(item))
  })

  // const defaultConfig: CustomConfig = {
  //   input: resolveFile('src/index.ts'),
  //   output: resolveFile('lib'),
  //   // output: resolveFile('lib/index.js'),
  //   // cssOutput: resolveFile('lib/index.css'),
  //   tsconfig: resolveFile('tsconfig.json'),
  //   plugins: []
  // }

  if (!filename) {
    console.log(yellow('未发现配置文件，将采用默认配置.'))
    // console.log(white(JSON.stringify(defaultConfig, null, 2)))
    return {}
  }

  return require(resolveFile(filename))
}
