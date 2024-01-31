export const items = () => [
  {
    label: '面板',
    key: '/',
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
    label: '管理',
    key: '/manage',
    children: [
      {
        label: '轮播管理',
        key: '/manage/swiper',
        permissions: [
          {
            label: '查看轮播',
            value: '/manage/swiper/list'
          },
          {
            label: '新增轮播',
            value: '/manage/swiper/add'
          },
          {
            label: '编辑轮播',
            value: '/manage/swiper/edit'
          },
          {
            label: '删除轮播',
            value: '/manage/swiper/delete'
          }
        ]
      },
      {
        label: '公告管理',
        key: '/manage/notice',
        permissions: [
          {
            label: '查看公告',
            value: '/manage/notice/list'
          },
          {
            label: '新增公告',
            value: '/manage/notice/add'
          },
          {
            label: '编辑公告',
            value: '/manage/notice/edit'
          },
          {
            label: '删除公告',
            value: '/manage/notice/delete'
          }
        ]
      },
      {
        label: '热点推荐',
        key: '/manage/recommend',
        permissions: [
          {
            label: '查看推荐',
            value: '/manage/recommend/list'
          },
          {
            label: '新增推荐',
            value: '/manage/recommend/add'
          },
          {
            label: '编辑推荐',
            value: '/manage/recommend/edit'
          },
          {
            label: '删除推荐',
            value: '/manage/recommend/delete'
          }
        ]
      },
      {
        label: '功能列表',
        key: '/manage/feature',
        permissions: [
          {
            label: '查看功能',
            value: '/manage/feature/list'
          },
          {
            label: '新增功能',
            value: '/manage/feature/add'
          },
          {
            label: '编辑功能',
            value: '/manage/feature/edit'
          },
          {
            label: '删除功能',
            value: '/manage/feature/delete'
          }
        ]
      }
    ]
  },
  {
    label: '设置',
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
        permissions: [
          {
            label: '查看权限详情',
            value: '/setting/role-permission/detail'
          }
        ],
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
  },
  {
    label: '案例',
    key: '/case',
    children: [
      {
        label: '更多案例',
        key: '/case/more',
        permissions: [
          {
            label: '查看案例',
            value: '/case/more/list'
          },
          {
            label: '新增案例',
            value: '/case/more/add'
          },
          {
            label: '编辑案例',
            value: '/case/more/edit'
          },
          {
            label: '删除案例',
            value: '/case/more/delete'
          }
        ]
      }
    ]
  },
  {
    label: '活动',
    key: '/activity',
    children: [
      {
        label: '抽奖活动',
        key: '/activity/draw-prize',
        permissions: [
          {
            label: '查看活动',
            value: '/activity/draw-prize/list'
          },
          {
            label: '新增活动',
            value: '/activity/draw-prize/add'
          },
          {
            label: '编辑活动',
            value: '/activity/draw-prize/edit'
          },
          {
            label: '删除活动',
            value: '/activity/draw-prize/delete'
          },
          {
            label: '生成二维码',
            value: '/activity/draw-prize/qrcode'
          },
          {
            label: '活动数据',
            value: '/activity/draw-prize/data'
          }
        ]
      }
    ]
  }
]
