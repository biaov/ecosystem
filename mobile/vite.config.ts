import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import { resolve } from 'path'
import eslint from 'vite-plugin-eslint'
import autoImport from 'unplugin-auto-import/vite'
import components from 'unplugin-vue-components/vite'

export default defineConfig({
  plugins: [
    eslint(),
    autoImport({
      imports: ['vue', { '@dcloudio/uni-app': ['onLaunch', 'onShow', 'onHide', 'onLoad', 'onReady', 'onReachBottom'] }],
      dirs: ['./src/composables'],
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
    uni()
  ],
  server: {
    host: '0.0.0.0',
    port: 8090,
    // #ifdef H5
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3600',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '/api')
      }
    }
    // #endif
  },
  resolve: {
    /**
     * 路径别名
     */
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  css: {
    /**
     * 配置预编译器
     */
    preprocessorOptions: {
      less: {
        additionalData: `@import '@/styles/variable.less';`
      }
    }
  }
})
