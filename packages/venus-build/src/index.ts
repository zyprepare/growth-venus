const argv = require('minimist')(process.argv.slice(2))

import convert from './convert'
import build from './build'
import init from './init'

const action = argv._[0]

enum ACTION {
  INIT = 'init',
  BUILD = 'build',
  CONVERT = 'convert'
}

// console.log(argv)

switch (action) {
  case ACTION.INIT:
    init(argv)
    break
  case ACTION.BUILD:
    build(argv)
    break
  case ACTION.CONVERT:
    convert(argv)
    break
  default:
    if (!argv.v) {
      console.log('Usage: venus <command> [options]')
      console.log()
      console.log('Options:')
      console.log('  -t, --type          构建类型 空|ui|cssModule')
      console.log('  -f, --file          文件类型 css|less|scss|sass')
      console.log('  -v, --version       output the version number')
      console.log('  -h, --help          output usage information')
      console.log()
      console.log('Commands:')
      console.log('  init [projectName]  Init a project with default templete')
      console.log('  build               Build a project with options')
      console.log('  convert             convert filename')
      console.log('  help [cmd]          display help for [cmd]')
    }
}
