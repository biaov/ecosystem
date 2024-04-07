import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import eslint from 'vite-plugin-eslint'

const { dirname } = import.meta
const env = loadEnv('development', resolve(dirname, './'))

export default defineConfig({
  base: '/admin',
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
    port: 8090,
    proxy: {
      '/api': {
        target: env['VITE_PROXY_BASE_URL'],
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '/api')
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(dirname, './src')
    }
  },
  css: {
    // 配置预编译器
    preprocessorOptions: {
      less: {
        additionalData: `@import '@/styles/variable.less';`
      }
    }
  },
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          antd: ['antd'],
          'ant-g2': ['@antv/g2']
        }
      }
    },
    chunkSizeWarningLimit: 1024
  }
})
