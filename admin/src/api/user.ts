/**
 * 修改密码
 */
export const updatePasswordApi = useCommand('admin/user/update-password')

/**
 * 用户信息
 */
export const userAdminApi = useRestful('admin/user/admin')

/**
 * 用户列表
 */
export const userApi = useRestful('admin/user')

/**
 * 拉黑名单
 */
export const userBlocklistApi = useRestful('admin/user/blocklist')

