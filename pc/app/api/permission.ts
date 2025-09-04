/**
 * 权限菜单
 */
export const menuApi = useRestful('pc/menu')

/**
 * 角色权限
 */
export const roleApi = useRestful('pc/role')

/**
 * 角色权限-分配权限
 */
export const rolePermissionApi = (id: number) => useCommand(`admin/role/${id}/permission`)

/**
 * 账号设置
 */
export const accountApi = useRestful('pc/account')

/**
 * 账号-重置密码
 */
export const accountResetPwdApi = (id: number) => useCommand(`admin/account/${id}/reset-pwd`)
