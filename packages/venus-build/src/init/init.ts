const inquirer = require('inquirer')
const fse = require('fs-extra')
const download = require('download-git-repo')
const chalk = require('chalk')
const ora = require('ora')
const path = require('path')
const memFs = require('mem-fs')
const editor = require('mem-fs-editor')
const { exec } = require('child_process')
const { TEMPLATE_GIT_REPO, INJECT_FILES } = require('./const')

function getDirFileName(dir: string): string[] {
  try {
    const files = fse.readdirSync(dir)
    const filesToCopy: string[] = []
    files.forEach(file => {
      if (file.indexOf(INJECT_FILES) > -1) return
      filesToCopy.push(file)
    })
    return filesToCopy
  } catch (e) {
    return []
  }
}

class Init {
  config: any = null
  memFsEditor: any = null

  constructor(options) {
    this.config = Object.assign(
      {
        projectName: ''
      },
      options
    )
    const store = memFs.create()
    this.memFsEditor = editor.create(store)
  }

  create() {
    this.inquire().then(answer => {
      this.config = Object.assign(this.config, answer)
      this.generate()
    })
  }

  inquire() {
    const prompts: {}[] = []
    const { projectName } = this.config
    if (typeof projectName !== 'string') {
      prompts.push({
        type: 'input',
        name: 'projectName',
        message: '请输入项目名：',
        validate(input) {
          if (!input) {
            return '项目名不能为空'
          }
          if (fse.existsSync(input)) {
            return '当前目录已存在同名项目，请更换项目名'
          }
          return true
        }
      })
    } else if (fse.existsSync(projectName)) {
      prompts.push({
        type: 'input',
        name: 'projectName',
        message: '当前目录已存在同名项目，请更换项目名',
        validate(input) {
          if (!input) {
            return '项目名不能为空'
          }
          if (fse.existsSync(input)) {
            return '当前目录已存在同名项目，请更换项目名'
          }
          return true
        }
      })
    }

    return inquirer.prompt(prompts)
  }

  /**
   * 模板替换
   * @param {string} source 源文件路径
   * @param {string} dest 目标文件路径
   * @param {object} data 替换文本字段
   */
  injectTemplate(source, dest, data) {
    this.memFsEditor.copyTpl(source, dest, data)
  }

  generate() {
    const { projectName } = this.config
    const projectPath = path.join(process.cwd(), projectName)
    const downloadPath = path.join(projectPath, '__download__')

    const downloadSpinner = ora('正在下载模板，请稍等...')
    downloadSpinner.start()
    // 下载git repo
    download(TEMPLATE_GIT_REPO, downloadPath, { clone: true }, err => {
      console.log('err', err)
      if (err) {
        downloadSpinner.color = 'red'
        downloadSpinner.fail(err.message)
        return
      }

      downloadSpinner.color = 'green'
      downloadSpinner.succeed('下载成功')

      // 复制文件
      console.log()
      const copyFiles = getDirFileName(downloadPath)

      copyFiles.forEach(file => {
        fse.copySync(
          path.join(downloadPath, file),
          path.join(projectPath, file)
        )
        console.log(
          `${chalk.green('✔ ')}${chalk.grey(`创建: ${projectName}/${file}`)}`
        )
      })

      INJECT_FILES.forEach(file => {
        this.injectTemplate(
          path.join(downloadPath, file),
          path.join(projectName, file),
          {
            projectName
          }
        )
      })

      this.memFsEditor.commit(() => {
        INJECT_FILES.forEach(file => {
          console.log(
            `${chalk.green('✔ ')}${chalk.grey(`创建: ${projectName}/${file}`)}`
          )
        })

        fse.remove(downloadPath)

        process.chdir(projectPath)

        // git 初始化
        console.log()
        const gitInitSpinner = ora(
          `cd ${chalk.green.bold(projectName)}目录, 执行 ${chalk.green.bold(
            'git init'
          )}`
        )
        gitInitSpinner.start()

        const gitInit = exec('git init')
        gitInit.on('close', code => {
          if (code === 0) {
            gitInitSpinner.color = 'green'
            gitInitSpinner.succeed(gitInit.stdout.read())
          } else {
            gitInitSpinner.color = 'red'
            gitInitSpinner.fail(gitInit.stderr.read())
          }

          // 安装依赖
          console.log()
          const installSpinner = ora(
            `安装项目依赖 ${chalk.green.bold('npm install')}, 请稍后...`
          )
          installSpinner.start()
          exec('npm install', (error, stdout, stderr) => {
            if (error) {
              installSpinner.color = 'red'
              installSpinner.fail(
                chalk.red('安装项目依赖失败，请自行重新安装！')
              )
              console.log(error)
            } else {
              installSpinner.color = 'green'
              installSpinner.succeed('安装依赖成功')
              console.log(`${stderr}${stdout}`)

              console.log()
              console.log(chalk.green('创建项目成功！'))
            }
          })
        })
      })
    })
  }
}

export default Init
