const { state } = useStore()

/**
 * 权限校验
 */
export const usePermission = (value: string) => {
  if (!state.userInfo?.role) return false
  const { permissions } = state.userInfo.role
  if (permissions.includes('*')) return true
  if (permissions.includes(value)) return true
  return false
}

type PermissionEnumType = typeof permissionEnum

/**
 * 定义权限
 */
export const definePermission = <T extends string, U extends Record<string, string> | null = null>(prefix: T, action?: U) => {
  const result = Object.entries({
    ...(action || {}),
    list: permissionEnum.list,
    create: permissionEnum.create,
    update: permissionEnum.update,
    delete: permissionEnum.delete
  }).reduce(
    (prev, [key, value]) => {
      prev[key] = `${prefix}:${value}`
      return prev
    },
    {} as Record<string, string>
  )

  return result as {
    readonly [K in U extends Record<string, string> ? keyof U | keyof PermissionEnumType : keyof PermissionEnumType]: K extends keyof PermissionEnumType
      ? `${T}:${PermissionEnumType[K]}`
      : U extends Record<string, string>
        ? K extends keyof U
          ? `${T}:${U[K]}`
          : never
        : never
  }
}
