import type { RouteRecordRaw } from 'vue-router'
export const menuRoutes: RouteRecordRaw[] = [
  {
    path: '403',
    name: '403',
    meta: {
      title: '权限不足',
      antIcon: 'DashboardOutlined',
      hidden: true
    },
    component: () => import(`@/views/403/index.vue`)
  },
  {
    path: 'dashboard',
    name: 'dashboard',
    meta: {
      title: '仪表面板',
      antIcon: 'DashboardOutlined'
    },
    component: () => import(`@/views/dashboard/index.vue`)
  },
  {
    path: 'goods',
    redirect: {
      name: 'goods-list'
    },
    meta: {
      title: '商品管理',
      antIcon: 'ShoppingOutlined'
    },
    children: [
      {
        path: 'category',
        name: 'goods-category',
        meta: {
          title: '商品分类'
        },
        component: () => import('@/views/goods/category.vue')
      },
      {
        path: 'list',
        name: 'goods-list',
        meta: {
          title: '全部商品'
        },
        component: () => import('@/views/goods/goods.vue')
      },
      {
        path: 'add',
        name: 'goods-add',
        meta: {
          title: '新增商品',
          hidden: true
        },
        component: () => import('@/views/goods/goods-detail.vue')
      },
      {
        path: 'edit/:id',
        name: 'goods-edit',
        meta: {
          title: '编辑商品',
          hidden: true
        },
        component: () => import('@/views/goods/goods-detail.vue')
      },
      {
        path: 'detail/:id',
        name: 'goods-detail',
        meta: {
          title: '商品详情',
          hidden: true
        },
        component: () => import('@/views/goods/goods-detail.vue')
      },
      {
        path: 'stock',
        name: 'goods-stock',
        meta: {
          title: '商品库存'
        },
        component: () => import('@/views/goods/stock.vue')
      }
    ]
  },
  {
    path: 'gift',
    redirect: {
      name: 'gift-list'
    },
    meta: {
      title: '礼品管理',
      antIcon: 'SlackOutlined'
    },
    children: [
      {
        path: 'list',
        name: 'gift-list',
        meta: {
          title: '全部礼品'
        },
        component: () => import('@/views/gift/list.vue')
      },
      {
        path: 'category',
        name: 'gift-category',
        meta: {
          title: '礼品分类'
        },
        component: () => import('@/views/gift/category.vue')
      },
      {
        path: 'shopping',
        name: 'gift-shopping',
        meta: {
          title: '积分商城'
        },
        component: () => import('@/views/gift/shopping.vue')
      }
    ]
  },
  {
    path: 'order',
    redirect: {
      name: 'order-buy'
    },
    meta: {
      title: '订单管理',
      antIcon: 'OrderedListOutlined'
    },
    children: [
      {
        path: 'list',
        name: 'order-list',
        meta: {
          title: '购物订单'
        },
        component: () => import('@/views/order/list.vue')
      },
      {
        path: 'credit',
        name: 'order-credit',
        meta: {
          title: '积分订单'
        },
        component: () => import('@/views/order/credit.vue')
      },
      {
        path: 'sales',
        name: 'order-sales',
        meta: {
          title: '售后退款'
        },
        component: () => import('@/views/order/sales.vue')
      }
    ]
  },
  {
    path: 'promotion',
    redirect: {
      name: 'promotion-coupon'
    },
    meta: {
      title: '促销活动',
      antIcon: 'BgColorsOutlined'
    },
    children: [
      {
        path: 'coupon',
        name: 'promotion-coupon',
        meta: {
          title: '优惠券'
        },
        component: () => import('@/views/promotion/coupon.vue')
      },
      {
        path: 'activity-coupon',
        name: 'promotion-activity-coupon',
        meta: {
          title: '活动发券'
        },
        component: () => import('@/views/promotion/activity-coupon.vue')
      },
      {
        path: 'distribute',
        name: 'promotion-distribute-coupon',
        meta: {
          title: '手动发券'
        },
        component: () => import('@/views/promotion/distribute-coupon.vue')
      }
    ]
  },
  {
    path: 'user',
    redirect: {
      name: 'user-list'
    },
    meta: {
      title: '用户管理',
      antIcon: 'UserOutlined'
    },
    children: [
      {
        path: 'list',
        name: 'user-list',
        meta: {
          title: '全部用户'
        },
        component: () => import('@/views/user/list.vue')
      },
      {
        path: 'blocklist',
        name: 'user-blocklist',
        meta: {
          title: '拉黑名单'
        },
        component: () => import('@/views/user/blocklist.vue')
      }
    ]
  },
  {
    path: 'permission',
    redirect: {
      name: 'permission-menu'
    },
    meta: {
      title: '权限管理',
      antIcon: 'AuditOutlined'
    },
    children: [
      {
        path: 'menu',
        name: 'permission-menu',
        meta: {
          title: '权限标识'
        },
        component: () => import('@/views/permission/menu.vue')
      },
      {
        path: 'role',
        name: 'permission-role',
        meta: {
          title: '角色权限'
        },
        component: () => import('@/views/permission/role.vue')
      },
      {
        path: 'role/:id',
        name: 'permission-role-permission',
        meta: {
          title: '分配权限',
          hidden: true
        },
        component: () => import('@/views/permission/role-permission.vue')
      },
      {
        path: 'account',
        name: 'permission-account',
        meta: {
          title: '账号设置'
        },
        component: () => import('@/views/permission/account.vue')
      }
    ]
  },
  {
    path: 'log',
    redirect: {
      name: 'log-operation'
    },
    meta: {
      title: '日志管理',
      antIcon: 'UnorderedListOutlined'
    },
    children: [
      {
        path: 'operation',
        name: 'log-operation',
        meta: {
          title: '操作日志'
        },
        component: () => import('@/views/log/operation.vue')
      },
      {
        path: 'migration',
        name: 'log-migration',
        meta: {
          title: '迁移日志'
        },
        component: () => import('@/views/log/migration.vue')
      }
    ]
  },

  {
    path: 'setting',
    redirect: {
      name: 'setting-user'
    },
    meta: {
      title: '系统设置',
      antIcon: 'SettingOutlined'
    },
    children: [
      {
        path: 'user',
        name: 'setting-user',
        meta: {
          title: '用户设置'
        },
        component: () => import('@/views/setting/user.vue')
      },
      {
        path: 'protocol',
        name: 'setting-protocol',
        meta: {
          title: '隐私协议'
        },
        component: () => import('@/views/setting/protocol.vue')
      },
      {
        path: 'order',
        name: 'setting-order',
        meta: {
          title: '订单设置'
        },
        component: () => import('@/views/setting/order.vue')
      },
      {
        path: 'hotkeyword',
        name: 'setting-hotkeyword',
        meta: {
          title: '热搜词设置'
        },
        component: () => import('@/views/setting/hotkeyword.vue')
      }
    ]
  }
]

export const routes: RouteRecordRaw[] = [
  {
    path: 'login',
    name: 'login',
    component: () => import(`@/views/auth/login.vue`)
  },
  {
    path: 'register',
    name: 'register',
    component: () => import(`@/views/auth/register.vue`)
  },
  {
    path: '/',
    redirect: {
      name: 'dashboard'
    },
    component: () => import('@/views/layout/index.vue'),
    children: menuRoutes
  }
]
