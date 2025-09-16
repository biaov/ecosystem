import NProgress from 'nprogress'
import type { RouteLocationNormalized } from 'vue-router'
import { useStore } from '@/stores'
import { routes } from './routes'

const filterAuth = routes.map(item => item.name).filter(Boolean)
/**
 * 全局前置守卫
 */
export const beforeEach = ({ name }: RouteLocationNormalized) => {
  NProgress.start()
  const store = useStore()
  const filterResult = filterAuth.includes(name as string)
  if (store.state.token) {
    return !filterResult || { name: 'dashboard' }
  } else {
    return filterResult || { name: 'login' }
  }
}

/**
 * 全局后置守卫
 */
export const afterEach = NProgress.done.bind(null, undefined)
