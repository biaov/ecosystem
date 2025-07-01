/**
 * 权限菜单
 */
export const menuApi = useRestful('admin/menu')

/**
 * 角色权限
 */
export const roleApi = useRestful('admin/role')

/**
 * 角色权限-分配权限
 */
export const rolePermissionApi = (id: number) => useCommand(`admin/role/${id}/permission`)
