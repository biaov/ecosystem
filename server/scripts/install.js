import { existsSync, cpSync } from 'fs'
import { resolve } from 'path'

const devFile = resolve(import.meta.dirname, '../.env.development')
const prodFile = resolve(import.meta.dirname, '../.env.production')

existsSync(devFile) && !existsSync(prodFile) && cpSync(devFile, prodFile)
