/**
 * 权限类型
 * 菜单类型
 */
export const MenuTypeEnum = {
  module: 'module',
  page: 'page',
  action: 'action',
  options() {
    return [
      {
        label: '模块',
        value: this.module
      },
      {
        label: '页面',
        value: this.page
      },
      {
        label: '行为',
        value: this.action
      }
    ]
  },
  filter(value: string) {
    return this.options().find(item => item.value === value)
  }
}
