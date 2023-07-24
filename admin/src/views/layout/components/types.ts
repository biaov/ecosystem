/**
 * Sidebar 组件 props 类型定义
 */
export interface SidebarProps {
  collapsed: boolean
}

/**
 * Header 组件 props 类型定义
 */
export interface HeaderProps {
  onCollapsed: () => void
  collapsed: boolean
}

/**
 * EditPwd 组件 props 类型定义
 */
export interface EditPwdProps {
  visible?: boolean
  onChange?: (visible: boolean) => void
}
