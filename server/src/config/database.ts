import { DataSource, DataSourceOptions } from 'typeorm'
import { resolve } from 'path'

/**
 * 数据库配置
 */
export const databaseOptions: DataSourceOptions = {
  type: 'mysql',
  host: import.meta.env.VITE_DB_HOST,
  port: 3306,
  username: import.meta.env.VITE_DB_USERNAME,
  password: import.meta.env.VITE_DB_PASSWORD,
  database: import.meta.env.VITE_DB_NAME,
  entityPrefix: import.meta.env.VITE_DB_PREFIX,
  connectorPackage: 'mysql2',
  timezone: '+08:00',
  dateStrings: true
}

export default new DataSource({
  ...databaseOptions,
  entities: [resolve(import.meta.dirname, '../models/**/*.js')],
  migrations: [resolve(import.meta.dirname, '../migrations/*.js')],
  migrationsTableName: 'eco_migrations'
})

