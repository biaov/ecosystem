import { Model, DataTypes } from 'sequelize'
import { sequelize } from '@/database'

/**
 * 活动
 */
export class ActivityDrawPrize extends Model {}

ActivityDrawPrize.init(
  {
    name: {
      type: DataTypes.STRING(128),
      comment: '活动名称'
    },
    desc: {
      type: DataTypes.TEXT,
      comment: '活动描述'
    },
    startTime: {
      type: DataTypes.DATE,
      comment: '开始时间'
    },
    endTime: {
      type: DataTypes.DATE,
      comment: '结束时间'
    }
  },
  {
    sequelize,
    tableName: 'activity_draw_prize'
  }
)

/**
 * 活动记录
 */
export class ActivityDrawPrizeRecord extends Model {}

ActivityDrawPrizeRecord.init(
  {
    activityId: {
      type: DataTypes.INTEGER,
      comment: '活动 ID'
    },
    username: {
      type: DataTypes.STRING(32),
      comment: '用户名'
    },
    phoneNumber: {
      type: DataTypes.STRING(12),
      comment: '手机号码'
    },
    deviceId: {
      type: DataTypes.STRING(64),
      allowNull: true,
      comment: '设备 ID'
    },
    holdName: {
      type: DataTypes.STRING(64),
      allowNull: true,
      comment: '奖项名称'
    }
  },
  {
    sequelize,
    tableName: 'activity_draw_prize_record'
  }
)

/**
 * 活动占用
 */
export class ActivityDrawPrizeHold extends Model {}

ActivityDrawPrizeHold.init(
  {
    activityId: {
      type: DataTypes.INTEGER,
      comment: '活动 ID'
    },
    name: {
      type: DataTypes.STRING(32),
      comment: '奖项名称'
    },
    prizeName: {
      type: DataTypes.STRING(32),
      comment: '奖品名称'
    },
    stock: {
      type: DataTypes.TINYINT,
      comment: '库存数量'
    },
    hold: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      comment: '占用数量'
    }
  },
  {
    sequelize,
    tableName: 'activity_draw_prize_hold'
  }
)
