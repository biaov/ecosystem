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
 * admin 模块枚举
 */
export enum ModuleLabelEnum {
  // 商品管理
  goodsList = '商品管理/全部商品',
  goodsCategory = '商品管理/商品分类',
  goodsStock = '商品管理/商品库存',

  // 礼品管理
  giftList = '礼品管理/全部商品',
  giftCategory = '礼品管理/礼品分类',

  // 订单管理
  orderList = '订单管理/购物订单',
  orderCredit = '订单管理/积分订单',
  orderSale = '订单管理/售后退款',

  // 促销活动
  promotionList = '促销活动/优惠券',
  promotionActivity = '促销活动/活动发券',
  promotionDesignted = '促销活动/手动发券',

  // 用户管理
  userList = '用户管理/全部用户',
  userBlocklist = '用户管理/拉黑名单',

  // 权限管理
  permissionMenu = '权限管理/权限标识',
  permissionRole = '权限管理/角色权限',
  permissionAccount = '权限管理/账号设置',

  // 系统设置
  settingUser = '系统设置/用户设置',
  settingProtocol = '系统设置/隐私协议',
  settingOrder = '系统设置/订单设置',
  settingHotkeyword = '系统设置/热搜词设置',
  settingAdv = '系统设置/弹窗广告设置',
  settingExpress = '系统设置/物流设置'
}

/**
 * 订单状态枚举
 */
export enum OrderStatusEnum {
  /**
   * 待支付
   */
  pay = 'pay',

  /**
   * 已支付/待发货
   */
  paid = 'paid',

  /**
   * 已发货/待收货
   */
  shipped = 'shipped',

  /**
   * 已完成
   */
  completed = 'completed',

  /**
   * 已取消
   */
  cancelled = 'cancelled'
}

/**
 * 订单类型枚举
 */
export enum OrderTypeEnum {
  /**
   * 实物商品
   */
  entity = 'entity',

  /**
   * 虚拟商品
   */
  virtual = 'virtual'
}

/**
 * 订单来源/注册来源
 */
export enum SourceEnum {
  /**
   *  PC 官网
   */
  pc = 'pc',
  /**
   *  H5 端
   */
  h5 = 'h5',
  /**
   *  APP 端
   */
  app = 'app',
  /**
   *  后台管理
   */
  admin = 'admin',
  /**
   *  小程序端
   */
  miniprogram = 'miniprogram'
}

/**
 * 发票类型枚举
 */
export enum InvoiceTypeEnum {
  /**
   * 普通发票
   */
  normal = 'normal',
  /**
   * 增值税专用发票
   */
  vat = 'vat'
}

/**
 * 售后订单状态枚举
 */
export enum SaleOrderStatusEnum {
  /**
   * 申请中
   */
  normal = 'normal',

  /**
   * 已同意/待发货
   */
  agreed = 'agreed',

  /**
   * 待签收
   */
  receiving = 'receiving',

  /**
   * 待退款
   */
  refunding = 'refunding',

  /**
   * 已退款
   */
  refunded = 'refunded',

  /**
   * 已拒绝
   */
  rejected = 'rejected',

  /**
   * 已关闭
   */
  closed = 'closed'
}

/**
 * 售后订单类型枚举
 */
export enum SaleOrderTypeEnum {
  /**
   * 仅退款
   */
  refund = 'refund',

  /**
   * 退货退款
   */
  return = 'return'
}
