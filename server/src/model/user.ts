import { Model, DataTypes } from 'sequelize'
import { sequelize } from '@/config/database'

/**
 * 用户表
 */
export class User extends Model {}

User.init(
  {
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: 'user'
  }
)

/**
 * 用户详情表
 */
export class UserInfo extends Model {}

UserInfo.init(
  {
    nickname: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true
    },
    gender: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    signature: {
      type: DataTypes.STRING(256),
      allowNull: true
    },
    roleCode: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: 'user_detail'
  }
)

UserInfo.belongsTo(User, {
  foreignKey: 'userId'
})
