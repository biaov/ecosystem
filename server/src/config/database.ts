import { Sequelize } from 'sequelize'

/**
 * 连接数据库
 */
export const sequelize = new Sequelize('ecosystem', 'root', import.meta.env.VITE_DATABASE_PASSWORD, {
  host: import.meta.env.VITE_DATABASE_HOST,
  dialect: 'mysql',
  port: 3306,
  timezone: '+08:00',
  dialectOptions: {
    dateStrings: true,
    typeCast: true
  }
})
