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
      antIcon: 'OrderedListOutlined',
      label: '售后订单',
      path: '/user/aftersale'
    },
    {
      antIcon: 'HeatMapOutlined',
      label: '收货地址',
      path: '/user/address'
    },
    {
      antIcon: 'LogoutOutlined',
      label: '退出',
      action: logout
    }
  ]
}
