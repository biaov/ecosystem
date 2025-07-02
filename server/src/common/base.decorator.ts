/**
 * 自定义路由
 * 类修饰器
 */
export const CustomRoute =
  (modulesSyncValue: Record<string, unknown>, isRoute = true) =>
  <T extends { new (...args: any[]): {} }>(constructor: T) => {
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

/**
 * id 参数装饰器
 */
export const IdParam = () => {
  return Param(
    'id',
    new ParseIntPipe({
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      exceptionFactory: () => new BizException('ID 错误')
    })
  )
}

/**
 * 权限标识
 * 方法修饰器
 */
export const Permission = (permission: string) => applyDecorators(SetMetadata(MetaKeyEnum.permission, permission))
