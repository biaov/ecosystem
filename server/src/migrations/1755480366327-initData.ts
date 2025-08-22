import { MigrationInterface, QueryRunner } from 'typeorm'
import { readFileSync } from 'fs'
import { resolve } from 'path'

const sqlName = ['menu', 'role']

export class InitData1755480366327 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await Promise.all(sqlName.map(name => queryRunner.manager.query(readFileSync(resolve(import.meta.dirname, `./sql/${name}.sql`)).toString())))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
