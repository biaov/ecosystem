import type { App } from 'vue'
import Antd from 'ant-design-vue'
import { router } from '@/router'
import formatter from '@/utils/formatter'
import config from '@/config'
import 'ant-design-vue/dist/reset.css'
import 'nprogress/nprogress.css'
import '@/styles/tailwindcss.css'
import * as directives from '@/directives'

interface UploadChangeOption {
  file: {
    status: string
    response?: { message: string }
  }
}

const install = (app: App) => {
  app.config.globalProperties.$formatter = formatter
  app.config.globalProperties.$config = config
  app.config.globalProperties.$onExport = ({ file: { status, response } }: UploadChangeOption, callback?: () => void) => {
    switch (status) {
      case 'error':
        message.error(response?.message || '操作失败')
        break
      case 'done':
        message.success('操作成功')
        break
    }
    callback && callback()
  }
  app.use(Antd)
  app.use(router)
  Object.entries(directives).forEach(item => {
    app.directive(...item)
  })
}

export default { install }
