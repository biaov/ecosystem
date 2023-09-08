import type { App } from 'vue'
import { createPinia } from 'pinia'
import '@/styles/index.less'

/**
 * 安装插件
 */
export const install = (app: App) => {
  app.use(createPinia())
}
