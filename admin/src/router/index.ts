import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
import { beforeEach, afterEach } from './guard'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      redirect: { name: 'dashboard' }
    },
    {
      path: '/',
      component: () => import(`@/views/layout/index.vue`),
      redirect: { name: 'dashboard' },
      children: routes
    },
    {
      path: '/auth',
      redirect: { name: 'login' },
      children: [
        {
          path: 'login',
          name: 'auth-login',
          component: () => import(`@/views/auth/login.vue`)
        },
        {
          path: 'register',
          name: 'auth-register',
          component: () => import(`@/views/auth/register.vue`)
        }
      ]
    }
  ]
})

router.beforeEach(beforeEach)
router.afterEach(afterEach)
