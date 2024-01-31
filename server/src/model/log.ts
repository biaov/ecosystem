import { Model, DataTypes } from 'sequelize'
import { sequelize } from '@/config/database'

/**
 * 日志表
 */
export class Log extends Model {}

Log.init(
  {
    nickname: {
      type: DataTypes.STRING
    },
    pageKey: {
      type: DataTypes.STRING,
      allowNull: true
    },
    content: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    sequelize,
    tableName: 'log'
  }
)
