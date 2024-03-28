import { Model, DataTypes } from 'sequelize'
import { sequelize } from '@/database'
import { defineArrayFormatProperty } from '@/utils/function'

/**
 * 角色表
 */
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
      ...defineArrayFormatProperty('permissions'),
      type: DataTypes.TEXT
    }
  },
  {
    sequelize,
    tableName: 'role'
  }
)
