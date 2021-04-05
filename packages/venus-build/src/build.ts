import { rollup } from 'rollup'
const { green, red } = require('chalk')
import { getInputOptions, getOutputOptions } from './config'
import validate from './validate'

async function _build(inputOption, outputOption) {
  try {
    const bundle = await rollup(inputOption)
    await bundle.write(outputOption)

    console.log(green(`${outputOption.format} 模块编译成功！`))
  } catch (e) {
    console.log(red(`${outputOption.format} 模块编译失败`, e))
    process.exit(1)
  }
}

async function build(argv) {
  if (!validate()) {
    console.log(red('工程结构不符合规范'))
    process.exit(1)
  }

  let isBuidUI = argv.t && argv.t === 'ui'
  if (isBuidUI) {
    console.log(green('开始编译UI库...'))
  } else {
    console.log(green('开始编译...'))
  }

  const inputOptions = getInputOptions(argv)
  const outputOptions = getOutputOptions()

  for (let i = 0; i < outputOptions.length; i++) {
    await _build(inputOptions, outputOptions[i])
  }

  console.log(green('编译结束'))
}

export default build
