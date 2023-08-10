import { createSSRApp } from 'vue'
import App from '@/App.vue'
import * as plugins from '@/plugins'
import * as components from '@/components'

export function createApp() {
  const app = createSSRApp(App)
  app.use(plugins)
  app.use(components)

  return {
    app
  }
}
