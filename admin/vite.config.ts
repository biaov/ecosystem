import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import eslint from 'vite-plugin-eslint'
import autoImport from 'unplugin-auto-import/vite'
import components from 'unplugin-vue-components/vite'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

const env = loadEnv('development', './')

export default defineConfig({
  base: './',
  plugins: [
    tailwindcss(),
    // eslint({
    //   lintOnStart: true,
    //   exclude: ["node_modules", "dist"],
    // }),
    vue(),
    autoImport({
      imports: [
        'vue',
        'vue-router',
        {
          dayjs: [['default', 'dayjs']]
        },
        {
          'ant-design-vue': ['message']
        }
      ],
      dirs: ['./src/composables', './src/stores', './src/enums'],
      dts: './types/auto-imports.d.ts',
      eslintrc: {
        enabled: true,
        filepath: './types/.eslintrc-auto-import.json',
        globalsPropValue: true
      }
    }),
    components({
      extensions: ['vue'],
      include: [/\.vue$/, /\.vue\?vue/],
      exclude: [/node_modules/, 'types.ts'],
      dts: './types/components.d.ts'
    }),
    VitePWA({
      registerType: 'prompt',
      includeAssets: ['logo.svg'],
      manifest: {
        id: `${env.VITE_ROUTER_BASEURL}/`,
        name: 'ecosystem-admin',
        short_name: 'PWA for ecosystem-admin',
        description: '关于 ecosystem-admin 的 PWA',
        theme_color: '#ffffff',
        icons: [180, 192, 512].map(key => ({
          src: `${env.VITE_ROUTER_BASEURL}/pwa-${key}x${key}.svg`,
          sizes: `${key}x${key}`,
          type: 'image/svg+xml',
          purpose: 'any'
        }))
      },
      workbox: {
        globDirectory: resolve(import.meta.dirname, '../dist'),
        skipWaiting: true,
        clientsClaim: true
      }
    })
  ],
  server: {
    host: '0.0.0.0',
    port: 8090,
    proxy: {
      '/api': env.VITE_PROXY_BASE_URL
    }
  },
  resolve: {
    // 路径别名
    alias: {
      '@': resolve(__dirname, './src')
    },
    extensions: ['.ts', '.vue', '.js', '.json']
  },
  css: {
    preprocessorOptions: {
      less: {
        additionalData: '@import "@/styles/vars.less";'
      }
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'ant-design-vue': ['ant-design-vue'],
          'ant-design-vue-icon': ['@ant-design/icons-vue'],
          'antv-g2': ['@antv/g2']
        }
      }
    },
    chunkSizeWarningLimit: 800
  }
})
