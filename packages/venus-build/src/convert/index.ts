const { red } = require('chalk')
import { toCssModuleFile } from './cssModule'

enum CONVERTTYPE {
  CSSMODULE = 'cssModule'
}

export default function (argv) {
  const { t, f } = argv

  switch (t) {
    case CONVERTTYPE.CSSMODULE:
      toCssModuleFile(f)
      break;
    default:
      console.log(red('未知转换类型.'))
      process.exit(1)
  }
}
