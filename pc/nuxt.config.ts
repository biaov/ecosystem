import tailwindcss from '@tailwindcss/vite'
import { formatDate } from 'compatx'
import { loadEnv } from 'vite'
import loadingTemplate from './scripts/loading-template'

const env = loadEnv('development', './')

export default defineNuxtConfig({
  compatibilityDate: formatDate(new Date()),
  devtools: {
    enabled: false
  },
  ssr: true,
  app: {
    head: {
      title: 'ECOSYSTEM-商城',
      htmlAttrs: {
        lang: 'zh-cn'
      },
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }]
    }
  },
  imports: {
    dirs: ['stores', 'enums'],
    presets: [
      {
        from: 'dayjs',
        imports: [['default', 'dayjs']]
      },
      {
        from: 'mine-h5-ui',
        imports: ['MeToast']
      }
    ]
  },
  devServer: {
    host: '0.0.0.0',
    loadingTemplate
  },
  vite: {
    plugins: [tailwindcss()],
    css: {
      preprocessorOptions: {
        less: {
          additionalData: '@import "@/styles/vars.less";'
        }
      }
    },
    server: {
      proxy: {
        '/api': env.VITE_PROXY_BASE_URL!
      }
    }
  },
  css: ['@/styles/reset.less', '@/styles/tailwindcss.css'],
  plugins: ['@/plugins/mine-h5-ui', '@/plugins/mixin']
})
