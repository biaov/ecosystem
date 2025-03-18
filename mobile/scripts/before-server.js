import { existsSync, cpSync } from 'fs'
import { resolve } from 'path'

const source = resolve(import.meta.dirname, '../.env')
const output = resolve(import.meta.dirname, '../.env.development')

!existsSync(output) && cpSync(source, output)
