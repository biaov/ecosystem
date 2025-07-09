import type { App } from 'vue'
import Antd from 'ant-design-vue'
import { router } from '@/router'
import formatter from '@/utils/formatter'
import config from '@/config'
import 'ant-design-vue/dist/reset.css'
import 'nprogress/nprogress.css'
import '@/styles/tailwindcss.css'
import * as directives from '@/directives'

const install = (app: App) => {
  app.config.globalProperties.$formatter = formatter
  app.config.globalProperties.$config = config
  app.use(Antd)
  app.use(router)
  Object.entries(directives).forEach(item => {
    app.directive(...item)
  })
}

export default { install }
