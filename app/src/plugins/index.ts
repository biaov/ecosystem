import type { App } from 'vue'
import { createPinia } from 'pinia'
import '@/styles/index.less'

export const install = (app: App) => {
  app.use(createPinia())
}
