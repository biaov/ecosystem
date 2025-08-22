import type { InputPluginOption } from 'rollup'
import { cpSync, writeFileSync } from 'fs'
import { resolve } from 'path'
import pkg from '../package.json'

const output = resolve(import.meta.dirname, '../dist')

export default (): InputPluginOption => {
  return {
    name: 'rollup-plugin-build',
    writeBundle() {
      ;(pkg as Record<string, unknown>).devDependencies = {}
      cpSync(resolve(import.meta.dirname, '../.npmrc'), resolve(output, '.npmrc'))
      cpSync(resolve(import.meta.dirname, '../package-lock.json'), resolve(output, 'package-lock.json'))
      writeFileSync(resolve(output, 'package.json'), JSON.stringify(pkg, null, 2))
      cpSync(resolve(import.meta.dirname, '../src/migrations/sql'), resolve(output, 'migrations/sql'), { recursive: true })
      cpSync(resolve(import.meta.dirname, '../src/assets'), resolve(output, 'assets'), { recursive: true })
    }
  }
}
