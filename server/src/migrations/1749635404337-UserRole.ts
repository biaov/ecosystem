import { MigrationInterface, QueryRunner } from 'typeorm'
import { UserRoleModel } from '@/models/user'

export class UserRole1749635404337 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const initRoles = [
      { code: DefaultRoleCodeEnum.Admin, name: '游客' },
      { code: DefaultRoleCodeEnum.Admin, name: '超级管理员' }
    ]
    const roleCodes = initRoles.map(({ code }) => ({ code }))
    const roles = await queryRunner.manager.find(UserRoleModel, { where: roleCodes, select: ['code'] })
    initRoles.forEach(async item => {
      if (roles.some(role => role.code === item.code)) return
      // queryRunner.manager.create(UserRoleModel, item)
      await queryRunner.manager.save(UserRoleModel, item)
    })
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
