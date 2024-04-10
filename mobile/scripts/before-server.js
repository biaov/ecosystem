import { existsSync, cpSync } from 'fs'
import { resolve } from 'path'

const { dirname } = import.meta
const source = resolve(dirname, '../.env')
const output = resolve(dirname, '../.env.development')

!existsSync(output) && cpSync(source, output)
