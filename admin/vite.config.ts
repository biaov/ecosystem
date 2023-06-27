import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import eslint from 'vite-plugin-eslint'

export default defineConfig({
  base: './',
  plugins: [eslint(), react()],
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'global'
      }
    },
    entries: []
  },
  server: {
    host: '0.0.0.0',
    port: 8090
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  css: {
    // 配置预编译器
    preprocessorOptions: {
      less: {
        additionalData: `@import '@/styles/variable.less';`
      }
    }
  }
})
