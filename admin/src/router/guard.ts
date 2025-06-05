import NProgress from 'nprogress'
import type { RouteLocationNormalized } from 'vue-router'
import { useStore } from '@/stores'

const filterAuth = ['login', 'register']
/**
 * 全局前置守卫
 */
export const beforeEach = ({ name }: RouteLocationNormalized) => {
  NProgress.start()
  const store = useStore()
  if (store.state.token) {
    return !filterAuth.includes(name as string) || { name: 'dashboard' }
  } else {
    return filterAuth.includes(name as string) || { name: 'login' }
  }
}

/**
 * 全局后置守卫
 */
export const afterEach = () => {
  NProgress.done()
}
