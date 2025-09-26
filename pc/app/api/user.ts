/**
 * 修改密码
 */
export const updatePasswordApi = useCommand('pc/user/update-password')

/**
 * 用户列表
 */
export const userApi = useCommand('pc/user')

/**
 * 拉黑名单
 */
export const userBlocklistApi = useRestful('pc/user/blocklist')

/**
 * 绑定/更换手机号
 */
export const bindMobileApi = useCommand('pc/user/bind-mobile')

/**
 * 验证邮箱
 */
export const emailVerifyApi = useCommand('pc/user/verify-email')

/**
 * 更新邮箱
 */
export const updateEmailApi = useCommand('pc/user/update-email')
