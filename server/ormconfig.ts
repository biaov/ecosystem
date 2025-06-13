import { DataSource } from 'typeorm'

export default new DataSource({
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: '123456',
  database: 'ecosystem',
  entities: ['dist/models/**/*.{ts,js}'],
  migrations: ['dist/migrations/*.{ts,js}']
})
