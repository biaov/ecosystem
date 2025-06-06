import { MigrationInterface, QueryRunner } from 'typeorm'
import { UserModel } from '@/models/user'

export class userRole implements MigrationInterface {
  constructor(private readonly userModel: UserModel) {}

  public async up(queryRunner: QueryRunner): Promise<void> {}

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
