import { cpSync } from 'fs'

cpSync('./.env', './.env.production', { force: false, recursive: false })
