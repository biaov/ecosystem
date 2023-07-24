import { useState } from 'react'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
import Style from './sidebar.module.less'
import { items } from '@/config/sidebar'
import type { SidebarProps } from './types'

const rootSubmenuKeys = items().map(item => item?.key as string)

export default function SidebarComponent({ collapsed }: SidebarProps) {
  const [openKeys, setOpenKeys] = useState<string[]>([...rootSubmenuKeys])
  const navigate = useNavigate()

  const onOpenChange: MenuProps['onOpenChange'] = keys => {
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1) as string
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys)
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
    }
  }
  const onClick: MenuProps['onClick'] = e => {
    navigate(e.key)
  }
  const defaultSelectedKeys = [useLocation().pathname]

  return (
    <Menu
      mode="inline"
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      theme="light"
      style={{ width: collapsed ? 80 : 256 }}
      items={items()}
      inlineCollapsed={collapsed}
      defaultSelectedKeys={defaultSelectedKeys}
      className={Style.menu}
      onClick={onClick}
    />
  )
}
