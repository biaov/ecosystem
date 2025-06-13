import type { RouteRecordRaw } from 'vue-router'

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
    path: '',
    component: () => import(`@/views/layout/index.vue`),
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import(`@/views/dashboard/index.vue`)
      }
    ]
  }
]
