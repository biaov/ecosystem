import NProgress from 'nprogress'
// import type { RouteLocationNormalized } from 'vue-router'
// import { useStore } from '@/stores'

/**
 * 全局前置守卫
 */
// { name }: RouteLocationNormalized
export const beforeEach = () => {
  NProgress.start()
  // const store = useStore()
  // if (store.token) {
  //   return name !== 'login' || { name: 'dashboard' }
  // } else {
  //   return name === 'login' || { name: 'login' }
  // }
  return true
}

/**
 * 全局后置守卫
 */
export const afterEach = () => {
  NProgress.done()
}
