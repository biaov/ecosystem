import type { App, Component } from 'vue'

/**
 * 全局注册公共组件
 */
const components: Record<string, Record<string, Component>> = import.meta.glob('./**/*.ts', { eager: true })

export const install = (app: App) => {
  Object.values(components).forEach(fileModule => {
    const component = fileModule.default
    component && app.component(component.name as string, component)
  })
}
