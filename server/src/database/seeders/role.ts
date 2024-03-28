import { permissionCode } from '@/enums/role'
import type { importGlobResult } from '@/database/types'

export default {
  /**
   * 新增
   */
  async up(sequelize) {
    const { Role } = sequelize.models
    const data = await Role.findOne()
    !data && (await Role.bulkCreate(permissionCode.options()))
  },
  /**
   * 删除
   */
  async down(sequelize) {
    await sequelize.models.Role.destroy({ truncate: true })
  }
} as importGlobResult['default']
