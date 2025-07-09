export enum CaptchaEnum {
  /**
   * 图片验证码
   */
  Image = 'image',
  /**
   * 验证码
   */
  Code = 'code'
}

/**
 * 权限枚举
 */
export enum PermissionEnum {
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
 * 元数据枚举
 */
export enum MetaKeyEnum {
  /**
   * 权限
   */
  permission = 'permission',
  /**
   * 操作日志
   */
  log = 'log'
}

/**
 * 性别枚举
 */
export enum GenderEnum {
  /**
   * 女
   */
  woman = 0,
  /**
   * 男
   */
  man = 1,
  /**
   * 未知
   */
  unknown = 2
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

  // 礼品管理
  giftList = 'gift:list',
  giftCategory = 'gift:category',
  giftShopping = 'gift:shopping',

  // 订单管理
  orderList = 'order:list',
  orderCredit = 'order:credit',
  orderSales = 'order:sales',

  // 促销活动
  promotionList = 'promotion:coupon',
  promotionActivity = 'promotion:activity-coupon',
  promotionDistribute = 'promotion:distribute-coupon',

  // 用户管理
  userList = 'user:list',
  userBlacklist = 'user:blacklist',

  // 权限管理
  permissionMenu = 'permission:menu',
  permissionRole = 'permission:role',
  permissionAccount = 'permission:account',

  // 日志管理
  logOperation = 'log:operation',
  logMigration = 'log:migration',

  // 用户设置
  settingUser = 'setting:user',
  settingProtocol = 'setting:protocol',
  settingOrder = 'setting:order',
  settingHotkeyword = 'setting:hotkeyword'
}

/**
 * admin 模块枚举
 */
export enum ModuleLabelEnum {
  // 商品管理
  goodsList = '商品管理/全部商品',
  goodsCategory = '商品管理/商品分类',

  // 礼品管理
  giftList = '礼品管理/全部商品',
  giftCategory = '礼品管理/礼品分类',
  giftShopping = '礼品管理/积分商城',

  // 订单管理
  orderList = '订单管理/购物订单',
  orderCredit = '订单管理/积分订单',
  orderSales = '订单管理/售后退款',

  // 促销活动
  promotionList = '促销活动/优惠券',
  promotionActivity = '促销活动/活动发券',
  promotionDesignted = '促销活动/手动发券',

  // 用户管理
  userList = '用户管理/全部用户',
  userBlacklist = '用户管理/拉黑名单',

  // 权限管理
  permissionMenu = '权限管理/权限标识',
  permissionRole = '权限管理/角色权限',
  permissionAccount = '用户设置/账号设置',

  // 用户设置
  settingUser = '用户设置/用户设置',
  settingProtocol = '用户设置/隐私协议',
  settingOrder = '用户设置/订单设置',
  settingHotkeyword = '用户设置/热搜词设置'
}
