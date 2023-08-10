import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import { resolve } from 'path'
import eslint from 'vite-plugin-eslint'

export default defineConfig({
  base: './',
  plugins: [eslint(), uni()],
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
