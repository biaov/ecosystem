const { exec, execSync } = require('child_process')
const { writeFileSync, existsSync, unlinkSync, copyFileSync } = require('fs')
const { resolve } = require('path')
const packageJson = require('../package.json')

packageJson.devDependencies = {} // 清理多余的依赖

/**
 * 外层目录
 */
const outDir = `../dist`
const workDir = resolve(__dirname, outDir)
/**
 * 修改文件
 * 新路径
 */
const prePackagePath = resolve(__dirname, `${outDir}/package.json`)
existsSync(prePackagePath) && unlinkSync(prePackagePath) // 删除旧的
writeFileSync(prePackagePath, JSON.stringify(packageJson, null, 2)) // 写入最新的

/**
 * 复制文件
 * 需要复制的文件
 */
const copyFiles = ['package-lock.json']
copyFiles.forEach(fileName => {
  const include = resolve(__dirname, `../${fileName}`)
  const output = resolve(__dirname, `${outDir}/${fileName}`)
  copyFileSync(include, output) // 复制文件
})

/**
 * 安装依赖
 */
execSync('npm i', { cwd: workDir })
