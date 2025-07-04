import { MigrationInterface, QueryRunner } from 'typeorm'
import { UserRoleModel } from '@/models/user'

export class UserRole1750059785812 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    /* ;[{ name: '游客' }, { name: '超级管理员' }]
    await queryRunner.manager.find(UserRoleModel, { where, select: ['id'] })
    await queryRunner.manager.save(UserRoleModel, item) */
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
