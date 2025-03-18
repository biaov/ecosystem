import { resolve } from 'path'
import { cpSync, rmSync, existsSync, mkdirSync, renameSync } from 'fs'
import { execSync } from 'child_process'
import { loadEnv } from 'vite'
import chalk from 'chalk'
import manifestJson from '../src/manifest.json' assert { type: 'json' }

/**
 * 转换路径
 */
const transformPath = path => path.replace(/\\/g, '/')

/**
 * 相对路径
 */

/**
 * 项目打包目录
 */
const output = resolve(import.meta.dirname, '../dist/build/app')

const outputUnpackage = resolve(output, 'unpackage')
const keystore = resolve(outputUnpackage, 'res/ecosystem.keystore')
const rmOption = { force: true, recursive: true }

/**
 * 复制资源
 */
const unpackagePath = resolve(import.meta.dirname, '../unpackage')

cpSync(unpackagePath, outputUnpackage, rmOption)

/**
 * 配置文件路径
 */
const configurePath = resolve(import.meta.dirname, './configure.json')

/**
 * 环境变量
 */
const env = loadEnv('development', resolve(import.meta.dirname, '../'))
const execOption = { encoding: 'utf-8' }

/**
 * 延迟器
 */
const delayer = (duration = 2000) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, duration)
  })

const release = async () => {
  execSync('cli open', execOption)

  console.log(chalk.yellow(`等待软件启动...`))

  await delayer()

  const userInfo = execSync('cli user info', execOption)

  if (!userInfo) {
    if (!(env.VITE_USERNAME && env.VITE_PASSWORD)) return console.log(chalk.red('请先配置 HbuilderX 或 DCloud 的账号和密码'))
    const loginInfo = execSync(`cli user login --username ${env.VITE_USERNAME}  --password ${env.VITE_PASSWORD}`, execOption)
    if (!loginInfo) return console.log(chalk.red('登录失败'))
    console.log(chalk.green('登录成功'))
  }

  const wgtDir = resolve(outputUnpackage, 'wgt')
  existsSync(wgtDir) && rmSync(wgtDir, rmOption)
  mkdirSync(wgtDir)
  console.log()
  console.log(chalk.yellow(`开始生成 wgt 包...`))
  console.log()
  execSync(`cli publish --platform APP --type wgt --project ${transformPath(output)} --path ${wgtDir} --name upgrade.wgt --confuse true`)
  console.log(chalk.green(`wgt 包生成完成，路径：${resolve(import.meta.dirname, '../dist/build/app/unpackage/wgt/upgrade.wgt')}`))
  console.log()
  /**
   * cli: HBuilderX 软件安装目录的 cli.exe
   * 由于配置了环境变量，因此此处可以直接可以使用 cli 命令
   */
  console.log(chalk.yellow(`开始生成 apk...`))
  try {
    const result = execSync(`cli pack --config ${transformPath(configurePath)} --project ${transformPath(output)} --android.certfile ${transformPath(keystore)}`, execOption)
    console.log(chalk.yellow(result))
    let pkgName = result.match(/(?<=dist\/build\/app\/unpackage\/release\/apk\/)(.+\.apk)/g)
    if (!pkgName) return console.log(chalk.red('打包失败'))
    pkgName = pkgName[0]
    const renameDest = resolve(outputUnpackage, `release/apk/ecosystem.${manifestJson.versionName}.apk`)
    renameSync(resolve(outputUnpackage, `release/apk/${pkgName}`), renameDest)
    console.log()
    console.log(chalk.green(`下载成功，APK 路径：${renameDest}`))
    execSync('cli app quit', execOption)
  } catch (error) {
    console.log(chalk.red(error))
  }
}

release()
