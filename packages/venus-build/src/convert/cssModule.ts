const fs = require('fs')
const path = require('path')
const { green, red } = require('chalk')

const rootPath = path.resolve(process.cwd(), 'src')

type StyleType = 'css' | 'less' | 'scss' | 'sass'

/**
 * 获取指定类型的文件list
 * @param fileRule 文件过滤规则函数
 * @return Array<string>
 */
const getFiles = (fileRule: Function): Array<string> => {
  let files: Array<string> = []

  const getFileNames = (dirPath: string) => {
    let names = fs.readdirSync(dirPath)

    names.forEach(item => {
      let file = path.resolve(rootPath, dirPath, item)
      // console.log('isDir', path.extname(file))
      if (fs.statSync(file).isDirectory()) {
        getFileNames(file)
      } else {
        if (fileRule(file)) {
          files.push(file)
        }
      }
    })
  }
  getFileNames(rootPath)

  return files
}

/**
 * 样式文件转换为 css module 文件格式
 * @param styleType
 */
export const toCssModuleFile = (styleType: StyleType) => {
  try {
    const files = getFiles(file => {
      return (
        path.extname(file) === `.${styleType}` &&
        file.indexOf('.module.') === -1
      )
    })

    files.forEach(file => {
      fs.rename(
        file,
        file.replace(`.${styleType}`, `.module.${styleType}`),
        err => {
          if (err) throw err
          else console.log(file, green('转换成功！'))
        }
      )
    })
  } catch (e) {
    console.log(red('css module 转换失败:', e))
    process.exit(1)
  }
}
