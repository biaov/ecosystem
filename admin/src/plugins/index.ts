import type { App } from 'vue'
import Antd from 'ant-design-vue'
import { router } from '@/router'
import 'ant-design-vue/dist/reset.css'
import 'nprogress/nprogress.css'
import '@/styles/tailwindcss.css'

const install = (app: App) => {
  app.use(Antd)
  app.use(router)
}

export default { install }
