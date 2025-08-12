/**
 * 注册来源
 */
export const sourceEnum = Object.freeze({
  pc: 'pc',
  h5: 'h5',
  app: 'app',
  admin: 'admin',
  miniprogram: 'miniprogram',
  options() {
    return [
      {
        label: '官网',
        value: this.pc
      },
      {
        label: 'H5',
        value: this.h5
      },
      {
        label: 'APP',
        value: this.app
      },
      // {
      //   label: '控制台',
      //   value: this.admin
      // },
      {
        label: '微信小程序',
        value: this.miniprogram
      }
    ]
  },
  filter(value: string) {
    return this.options().find(item => item.value === value)
  }
})

/**
 * 性别
 */
export const genderEnum = Object.freeze({
  woman: 0,
  man: 1,
  other: 2,
  options() {
    return [
      {
        label: '男',
        value: this.man
      },
      {
        label: '女',
        value: this.woman
      },
      {
        label: '保密',
        value: this.other
      }
    ]
  },
  filter(value: number) {
    return this.options().find(item => item.value === value)
  }
})

/**
 * 权限枚举
 */
export enum permissionEnum {
  /**
   * 浏览
   */
  list = 'list',
  /**
   * 创建
   */
  create = 'create',

  /**
   * 更新
   */
  update = 'update',

  /**
   * 删除
   */
  delete = 'delete'
}

/**
 * 权限类型
 * 菜单类型
 */
export const MenuTypeEnum = {
  module: 'module',
  page: 'page',
  action: 'action',
  options() {
    return [
      {
        label: '模块',
        value: this.module
      },
      {
        label: '页面',
        value: this.page
      },
      {
        label: '行为',
        value: this.action
      }
    ]
  },
  filterOptions(isFilter = false) {
    const options = this.options()
    return isFilter ? options.filter(item => item.value !== this.action) : options
  },
  filter(value: string) {
    return this.options().find(item => item.value === value)
  },
  transformToOptions(data: any[]) {
    const list = structuredClone(data)
    list.forEach(item => {
      if (item.type === MenuTypeEnum.page) {
        item.children && delete item.children
      } else if (item.children?.length) {
        item.children = this.transformToOptions(item.children)
      }
    })
    return list
  }
}

/**
 * admin 权限枚举
 */
export enum PermissionKeyEnum {
  // 仪表面板
  dashboard = 'dashboard:list',

  // 商品管理
  goodsList = 'goods:list',
  goodsCategory = 'goods:category',
  goodsStock = 'goods:stock',

  // 礼品管理
  giftList = 'gift:list',
  giftCategory = 'gift:category',

  // 订单管理
  orderList = 'order:list',
  orderCredit = 'order:credit',
  orderSale = 'order:sale',

  // 促销活动
  promotionList = 'promotion:coupon',
  promotionActivity = 'promotion:activity-coupon',
  promotionDistribute = 'promotion:distribute-coupon',

  // 用户管理
  userList = 'user:list',
  userBlocklist = 'user:blocklist',

  // 权限管理
  permissionMenu = 'permission:menu',
  permissionRole = 'permission:role',
  permissionAccount = 'permission:account',

  // 日志管理
  logOperation = 'log:operation',
  logMigration = 'log:migration',

  // 系统设置
  settingUser = 'setting:user',
  settingProtocol = 'setting:protocol',
  settingOrder = 'setting:order',
  settingHotkeyword = 'setting:hotkeyword',
  settingAdv = 'setting:adv',
  settingExpress = 'setting:express'
}

/**
 * 上下架
 */
export const onsaleEnum = Object.freeze({
  true: true,
  false: false,
  options() {
    return [
      {
        label: '上架',
        value: `${this.true}`
      },
      {
        label: '下架',
        value: `${this.false}`
      }
    ]
  }
})

/**
 * 活动状态
 */
export const activityStatusEnum = Object.freeze({
  notStart: 'notStart',
  normal: 'normal',
  ended: 'ended',
  options() {
    return [
      {
        label: '未开始',
        value: this.notStart
      },
      {
        label: '进行中',
        value: this.normal
      },
      {
        label: '已结束',
        value: this.ended
      }
    ]
  }
})
