import { DashboardOutlined, SettingOutlined } from '@ant-design/icons'
import { randomColors } from '@/utils/function'

const colors = randomColors(2)

export const items = () => [
  {
    label: '面板',
    key: '/',
    icon: <DashboardOutlined style={{ color: colors[0] }} />,
    children: [
      {
        label: '仪表盘',
        key: '/dashboard',
        permissions: [
          {
            label: '查看仪表盘',
            value: '/dashboard/list'
          }
        ]
      },
      {
        label: '颜色值',
        key: '/colors',
        permissions: [
          {
            label: '查看颜色值',
            value: '/colors/list'
          }
        ]
      }
    ]
  },
  {
    label: '设置',
    icon: <SettingOutlined style={{ color: colors[1] }} />,
    key: '/setting',
    children: [
      {
        label: '账号设置',
        key: '/setting/account',
        permissions: [
          {
            label: '查看账号',
            value: '/setting/account/list'
          },
          {
            label: '新增账号',
            value: '/setting/account/add'
          },
          {
            label: '重置密码',
            value: '/setting/account/reset-pwd'
          },
          {
            label: '编辑账号',
            value: '/setting/account/edit'
          },
          {
            label: '删除账号',
            value: '/setting/account/delete'
          },
          {
            label: '修改用户信息',
            value: '/setting/account/edit-user-info'
          },
          {
            label: '修改密码',
            value: '/setting/account/edit-pwd'
          }
        ]
      },
      {
        label: '角色权限',
        key: '/setting/role',
        permissions: [
          {
            label: '查看角色',
            value: '/setting/role/list'
          },
          {
            label: '新增角色',
            value: '/setting/role/add'
          },
          {
            label: '编辑角色',
            value: '/setting/role/edit'
          },
          {
            label: '删除角色',
            value: '/setting/role/delete'
          }
        ]
      },
      {
        label: '角色权限详情',
        key: '/setting/role-permission',
        permissions: [],
        hidden: true
      },
      {
        label: '操作日志',
        key: '/setting/log',
        permissions: [
          {
            label: '查看日志',
            value: '/setting/log/list'
          }
        ]
      }
    ]
  }
]

export const itemOptions = items().map(item => ({
  ...item,
  value: item.key,
  children: item.children?.map(child => ({ ...child, value: child.key }))
}))

export const allPermission = items().map(item => ({
  ...item,
  value: item.key,
  children: item.children.filter(chld => !chld.hidden).map(child => ({ ...child, value: child.key, children: child.permissions }))
}))
