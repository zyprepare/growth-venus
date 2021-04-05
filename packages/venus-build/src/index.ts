const { red } = require('chalk')
const argv = require('minimist')(process.argv.slice(2))

import convert from './convert'
import build from './build'

const action = argv._[0]

enum ACTION {
  BUILD = 'build',
  CONVERT = 'convert'
}

// console.log(argv)

switch (action) {
  case ACTION.BUILD:
    build(argv)
    break;
  case ACTION.CONVERT:
    convert(argv)
    break;
  default:
    console.log(red('未知指令.'))
    process.exit(1)
}
