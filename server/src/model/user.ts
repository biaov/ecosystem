import { Model, DataTypes } from 'sequelize'
import { sequelize } from '@/config/database'

export class User extends Model {}

export class UserInfo extends Model {}

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
    modelName: 'User',
    tableName: 'user'
  }
)

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
    modelName: 'UserInfo',
    tableName: 'user_detail'
  }
)

UserInfo.belongsTo(User, {
  foreignKey: 'userId'
})
