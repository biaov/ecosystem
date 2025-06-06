import { MigrationInterface, QueryRunner } from 'typeorm'
import { UserModel } from '@/models/user'

export class userRole implements MigrationInterface {
  constructor(private readonly userModel: UserModel) {}

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create the user role if it doesn't exist
    const userRole = await queryRunner.manager.findOne(UserModel, {
      where: { role: 'user' },
    })

    if (!userRole) {
      const newUserRole = queryRunner.manager.create(UserModel, {
        role: 'user',
      })
      await queryRunner.manager.save(newUserRole)
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
