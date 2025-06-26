import type { ModuleMetadata } from '@nestjs/common'
/**
 * 自定义路由
 * 类修饰器
 */
export const CustomRoute = (modulesSyncValue: Record<string, unknown>, isRoute = true) => {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    // 路由路径
    const path = constructor.name.split('Module')[0].replace(/[A-Z]/g, (val: string, i: number) => `${i ? '-' : ''}${val.toLowerCase()}`)
    // 基础路由模块
    const modulesSync = modulesSyncValue as Record<string, Record<string, new () => unknown>>
    // 获取所有模块
    const modules = Object.values(modulesSync).map(value => Object.values(value)[0])
    @Module({
      imports: [
        ...modules,
        ...(isRoute
          ? [
              RouterModule.register([
                {
                  path,
                  module: baseRouteModule,
                  children: [...modules]
                }
              ])
            ]
          : [])
      ]
    })
    class baseRouteModule extends constructor {}

    return baseRouteModule
  }
}
