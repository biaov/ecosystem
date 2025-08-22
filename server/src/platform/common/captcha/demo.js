import { join, resolve } from 'path'
import { readFileSync, readdirSync } from 'fs'

const captchDir = resolve(import.meta.dirname, '../../../assets/captch')
const files = readdirSync(captchDir)
