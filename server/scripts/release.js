import { execSync } from 'child_process'
import { writeFileSync, existsSync, unlinkSync, copyFileSync, mkdirSync } from 'fs'
import { resolve } from 'path'
import packageJson from '../package.json' assert { type: 'json' }

packageJson.devDependencies = {} // 清理多余的依赖

const { dirname } = import.meta

/**
 * 外层目录
 */
const outDir = `../dist`
const workDir = resolve(dirname, outDir)

/**
 * 修改文件
 * 新路径
 */
const prePackagePath = resolve(dirname, `${outDir}/package.json`)
existsSync(prePackagePath) && unlinkSync(prePackagePath) // 删除旧的
writeFileSync(prePackagePath, JSON.stringify(packageJson, null, 2)) // 写入最新的

/**
 * 复制文件
 * 需要复制的文件
 */
const copyFiles = ['package-lock.json']
copyFiles.forEach(fileName => {
  const include = resolve(dirname, `../${fileName}`)
  const output = resolve(dirname, `${outDir}/${fileName}`)
  copyFileSync(include, output)
})

/**
 * 创建文件夹
 */
const uploadsDir = resolve(dirname, `${outDir}/uploads`)
!existsSync(uploadsDir) && mkdirSync(uploadsDir)

/**
 * 安装依赖
 */
execSync('npm i', { cwd: workDir })
