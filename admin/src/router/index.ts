import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
import { beforeEach, afterEach } from './guard'

export const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_ROUTER_BASEURL),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      redirect: { name: 'dashboard' }
    },
    {
      path: '/',
      redirect: { name: 'dashboard' },
      children: routes
    }
  ]
})

router.beforeEach(beforeEach)
router.afterEach(afterEach)
