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

export enum DefaultRoleCodeEnum {
  /**
   * 访客角色
   */
  Visitor = 'visitor',
  /**
   * 管理员角色
   */
  Admin = 'admin'
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
  permission = 'permission'
}
