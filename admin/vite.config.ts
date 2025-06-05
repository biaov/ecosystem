import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import eslint from 'vite-plugin-eslint'
import autoImport from 'unplugin-auto-import/vite'
import components from 'unplugin-vue-components/vite'
import tailwindcss from '@tailwindcss/vite'

const env = loadEnv('development', './')

export default defineConfig({
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
        }
      ],
      ignore: ['types.ts'],
      dirs: ['./src/composables', './src/stores'],
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
    })
  ],
  server: {
    host: '0.0.0.0',
    port: 8090,
    proxy: {
      '/api': {
        target: env.VITE_PROXY_BASE_URL,
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '/api')
      }
    }
  },
  resolve: {
    // 路径别名
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
})
