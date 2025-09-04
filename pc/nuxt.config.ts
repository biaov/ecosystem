import tailwindcss from '@tailwindcss/vite'
import { formatDate } from 'compatx'
import { loadEnv } from 'vite'

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
    loadingTemplate: () => {
      return `<!DOCTYPE html><html lang="zh-cn"><head><meta charset="utf-8"/><meta name="viewport"content="width=device-width, initial-scale=1.0, user-scalable=no"/><meta http-equiv="X-UA-Compatible"content="ie=edge"/><title>加载中...</title><meta name="keywords"content="加载中"/><meta name="description"content="加载中"/><style>*{margin:0;padding:0;box-sizing:border-box}.loading{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);display:block;overflow:hidden;color:#949494;font-size:48px}.loading::after{content:'';position:absolute;top:0;left:0;width:100%;height:100%;background:linear-gradient(-45deg,transparent 30%,color-mix(in srgb,rgba(255,255,255,1)50%,transparent)40%,transparent 50%);animation:skeleton-animation 0.6s ease infinite}@keyframes skeleton-animation{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}</style></head><body><div class="loading">加载中...</div></body></html>`
    }
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
