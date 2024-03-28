import { sequelize } from '@/database'
import type { importGlobResult } from '@/database/types'

/**
 * 所有 seeders
 */
const seeders = Object.values(import.meta.glob('@/database/seeders/*', { eager: true })) as importGlobResult[]

sequelize.sync().then(data => {
  seeders.forEach(seed => {
    seed.default.up(data)
  })
})
