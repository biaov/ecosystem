import type { AllRoute } from './types'

const allRoutes: Record<string, AllRoute> = import.meta.glob('../controller/**/route.ts', { eager: true })

/**
 * 路由配置项
 */
export const routes = Object.values(allRoutes)
  .map(item => item.default)
  .flat()
