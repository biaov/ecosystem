import { Model, DataTypes } from 'sequelize'
import { sequelize } from '@/config/database'

export class Role extends Model {}

Role.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    code: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },
    permissions: {
      type: DataTypes.TEXT,
      get() {
        const value = this.getDataValue('permissions')
        return value ? value.split(',') : []
      },
      set(value) {
        if (Array.isArray(value)) {
          this.setDataValue('permissions', value.join(','))
        } else {
          this.setDataValue('permissions', value)
        }
      }
    }
  },
  {
    sequelize,
    modelName: 'Role',
    tableName: 'role'
  }
)
