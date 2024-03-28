import type { Sequelize } from 'sequelize'

/**
 * import.meta.glob 结果值
 */
export interface importGlobResult {
  default: {
    up: (value: Sequelize) => Promise<void>
    down: (value: Sequelize) => Promise<void>
  }
}
