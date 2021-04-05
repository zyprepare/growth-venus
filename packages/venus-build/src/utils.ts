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

  if (!filename) {
    console.log(yellow('未发现配置文件，将采用默认配置.'))
    return {}
  }

  return require(resolveFile(filename))
}
