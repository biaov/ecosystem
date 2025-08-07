/*
 * 验证码类型枚举
 */
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
