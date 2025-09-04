/**
 * 修改密码
 */
export const updatePasswordApi = useCommand('pc/user/update-password')

/**
 * 用户信息
 */
export const userAdminApi = useRestful('pc/user/admin')

/**
 * 用户列表
 */
export const userApi = useRestful('pc/user')

/**
 * 拉黑名单
 */
export const userBlocklistApi = useRestful('pc/user/blocklist')
