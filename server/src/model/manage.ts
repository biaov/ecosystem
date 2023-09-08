import { Model, DataTypes } from 'sequelize'
import { sequelize } from '@/config/database'
import { defineArrayFormatProperty } from '@/utils/function'

/**
 * 轮播图表
 */
export class Swiper extends Model {}

Swiper.init(
  {
    url: {
      type: DataTypes.STRING
    },
    pageUrl: {
      type: DataTypes.STRING
    },
    isShow: {
      type: DataTypes.BOOLEAN
    }
  },
  {
    sequelize,
    modelName: 'Swiper',
    tableName: 'swiper'
  }
)

/**
 * 公告表
 */
export class Notice extends Model {}

Notice.init(
  {
    title: {
      type: DataTypes.STRING
    },
    isShow: {
      type: DataTypes.BOOLEAN
    },
    content: {
      type: DataTypes.TEXT
    }
  },
  {
    sequelize,
    modelName: 'Notice',
    tableName: 'notice'
  }
)

/**
 * 推荐表
 */
export class Recommend extends Model {}

Recommend.init(
  {
    title: {
      type: DataTypes.STRING
    },
    coverUrl: {
      type: DataTypes.STRING
    },
    pageUrl: {
      type: DataTypes.STRING
    },
    content: {
      type: DataTypes.TEXT
    }
  },
  {
    sequelize,
    modelName: 'Recommend',
    tableName: 'recommend'
  }
)

/**
 * 功能表
 */
export class Feature extends Model {}

Feature.init(
  {
    name: {
      type: DataTypes.STRING
    },
    iconName: {
      type: DataTypes.STRING
    },
    pageUrl: {
      type: DataTypes.STRING
    },
    platforms: {
      type: DataTypes.TEXT,
      ...defineArrayFormatProperty('platforms')
    }
  },
  {
    sequelize,
    modelName: 'Feature',
    tableName: 'feature'
  }
)
