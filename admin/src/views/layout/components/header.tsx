import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { MenuProps } from 'antd'
import { Button, Tooltip, Space, Avatar, Dropdown } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined, FullscreenOutlined, FullscreenExitOutlined, PoweroffOutlined, EditOutlined, UserSwitchOutlined } from '@ant-design/icons'
import store, { authSlice } from '@/store'
import { checkPermission } from '@/utils/function'
import type { UserInfo } from '@/types'
import Styles from './header.module.less'
import EditPwd from './edit-pwd'
import UserInfoComponent from './user-info'
import BreadcrumbComponent from './breadcrumb-reset'
import type { HeaderProps } from './types'

export default function HeaderComponent({ onCollapsed, collapsed }: HeaderProps) {
  const [isFullScreen, setFullScreen] = useState(false)

  const navigate = useNavigate()
  const [isModalOpen, setModalOpen] = useState(false)
  const [isUserOpen, setUserOpen] = useState(false)
  const userInfo = (store.getState().userInfo ?? {}) as Partial<UserInfo>
  const onScreen = () => {
    if (isFullScreen) {
      document.exitFullscreen()
    } else {
      document.documentElement.requestFullscreen()
    }
    setFullScreen(!isFullScreen)
  }

  const menuItems: MenuProps['items'] = [
    {
      key: 'userInfo',
      icon: <UserSwitchOutlined />,
      label: '修改信息',
      disabled: !checkPermission('/setting/account/edit-user-info')
    },
    {
      key: 'editPwd',
      icon: <EditOutlined />,
      label: '修改密码',
      disabled: !checkPermission('/setting/account/edit-pwd')
    },
    {
      key: 'exit',
      danger: true,
      icon: <PoweroffOutlined />,
      label: '退出登录'
    }
  ]

  const onClickItem = (item: NonNullable<MenuProps['items']>[number]) => {
    switch (item!.key) {
      case 'userInfo':
        setUserOpen(true)
        break
      case 'editPwd':
        setModalOpen(true)
        break
      case 'exit':
        store.dispatch(authSlice.actions.logout())
        navigate('/login')
        break
    }
  }

  const onChangeModal = (visible: boolean) => {
    setModalOpen(visible)
  }

  const onChangeUser = (visible: boolean) => {
    setUserOpen(visible)
  }

  return (
    <>
      <div className={`w-fill flex flex-sb flex-ac p-r-15 ${Styles.header}`}>
        <Space size={0}>
          <Tooltip title={collapsed ? '展开' : '收缩'}>
            <Button type="link" className="p-r-0" onClick={onCollapsed}>
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>
          </Tooltip>
          <Tooltip title={isFullScreen ? '非全屏' : '全屏'}>
            <Button type="link" onClick={onScreen}>
              {isFullScreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
            </Button>
          </Tooltip>
          <BreadcrumbComponent />
        </Space>
        <Space>
          <span className="color-65 fs-14">欢迎您，{userInfo.nickname}</span>
          <Dropdown menu={{ items: menuItems, onClick: onClickItem }} trigger={['click']}>
            <Avatar src={userInfo.avatar} className="cursor-pointer" />
          </Dropdown>
        </Space>
      </div>
      <EditPwd visible={isModalOpen} onChange={onChangeModal} />
      <UserInfoComponent visible={isUserOpen} onChange={onChangeUser} />
    </>
  )
}
