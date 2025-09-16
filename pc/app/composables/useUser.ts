/**
 * 用户中心侧边栏
 */
export const useUserSidebar = () => {
  const { logout } = useStore()

  return [
    {
      antIcon: 'UserOutlined',
      label: '我的账户',
      path: '/user'
    },
    {
      antIcon: 'UnorderedListOutlined',
      label: '订单中心',
      path: '/user/order'
    },
    {
      antIcon: 'CloudServerOutlined',
      label: '售后服务',
      path: '/user/after-sale'
    },
    {
      antIcon: 'AlignCenterOutlined',
      label: '收货地址',
      path: '/user/address'
    },
    {
      antIcon: 'LogoutOutlined',
      label: '退出登录',
      class: 'text-danger',
      action: logout
    }
  ]
}
