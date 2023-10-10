import { Model, DataTypes } from 'sequelize'
import { sequelize } from '@/config/database'

/**
 * 案例
 */
export class Case extends Model {}

Case.init(
  {
    name: {
      type: DataTypes.STRING
    },
    desc: {
      type: DataTypes.STRING
    },
    pageUrl: {
      type: DataTypes.STRING
    },
    coverUrl: {
      type: DataTypes.STRING
    }
  },
  {
    sequelize,
    modelName: 'Case',
    tableName: 'case'
  }
)
