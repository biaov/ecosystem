import { items } from '@/config/sidebar'

const permissions: string[] = []
items().forEach(item => {
  item.children.forEach(child => {
    const hasItem = child.permissions.find(({ value }) => value.includes('/list') || value.includes('/role-permission/detail'))
    hasItem && permissions.push(hasItem.value)
  })
})

/**
 * 权限码
 */
export const permissionCode = {
  /**
   * 超级管理员
   */
  admin: 'admin',
  /**
   * 游客
   */
  visitor: 'visitor',

  options() {
    return [
      {
        name: '超级管理员',
        code: this.admin,
        permissions: ['*']
      },
      {
        name: '游客',
        code: this.visitor,
        permissions
      }
    ]
  }
}
