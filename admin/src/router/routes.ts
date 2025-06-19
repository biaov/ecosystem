import type { RouteRecordRaw } from 'vue-router'

export const menuRoutes: RouteRecordRaw[] = [
  {
    path: 'dashboard',
    name: 'dashboard',
    meta: {
      title: '仪表盘',
      antIcon: 'DashboardOutlined'
    },
    component: () => import(`@/views/dashboard/index.vue`)
  },
  {
    path: 'permission',
    redirect: {
      name: 'permission-menu'
    },
    meta: {
      title: '权限管理'
    },
    children: [
      {
        path: 'operation',
        name: 'log-operation',
        meta: {
          title: '操作日志',
          antIcon: 'FileSearchOutlined'
        },
        component: () => import('@/views/log/operation.vue')
      },
      {
        path: 'migration',
        name: 'log-migration',
        meta: {
          title: '迁移日志',
          antIcon: 'FileSearchOutlined'
        },
        component: () => import('@/views/log/migration.vue')
      }
    ]
  },
  {
    path: 'log',
    redirect: {
      name: 'log-operation'
    },
    meta: {
      title: '日志管理'
    },
    children: [
      {
        path: 'operation',
        name: 'log-operation',
        meta: {
          title: '操作日志',
          antIcon: 'FileSearchOutlined'
        },
        component: () => import('@/views/log/operation.vue')
      },
      {
        path: 'migration',
        name: 'log-migration',
        meta: {
          title: '迁移日志',
          antIcon: 'FileSearchOutlined'
        },
        component: () => import('@/views/log/migration.vue')
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
