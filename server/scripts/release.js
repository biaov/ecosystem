import { execSync } from 'child_process'
import { writeFileSync, existsSync, unlinkSync, copyFileSync, mkdirSync } from 'fs'
import { resolve } from 'path'
import packageJson from '../package.json' with { type: 'json' }

packageJson.devDependencies = {} // 清理多余的依赖

/**
 * 外层目录
 */
const outDir = `../dist`
const workDir = resolve(import.meta.dirname, outDir)

/**
 * 修改文件
 * 新路径
 */
const prePackagePath = resolve(import.meta.dirname, `${outDir}/package.json`)
existsSync(prePackagePath) && unlinkSync(prePackagePath) // 删除旧的
writeFileSync(prePackagePath, JSON.stringify(packageJson, null, 2)) // 写入最新的

/**
 * 复制文件
 * 需要复制的文件
 */
const copyFiles = ['package-lock.json']
copyFiles.forEach(fileName => {
  const include = resolve(import.meta.dirname, `../${fileName}`)
  const output = resolve(import.meta.dirname, `${outDir}/${fileName}`)
  copyFileSync(include, output)
})

/**
 * 创建文件夹
 */
const uploadsDir = resolve(import.meta.dirname, `${outDir}/uploads`)
!existsSync(uploadsDir) && mkdirSync(uploadsDir)

/**
 * 安装依赖
 */
execSync('npm i', { cwd: workDir })
