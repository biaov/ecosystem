import { defineConfig, loadEnv } from 'vite'
import { VitePluginNode } from 'vite-plugin-node'
import { resolve } from 'path'

const env = loadEnv('development', './')

export default defineConfig({
  root: import.meta.dirname,
  resolve: {
    alias: {
      '@': resolve(import.meta.dirname, './src')
    }
  },
  esbuild: false,
  plugins: [
    ...VitePluginNode({
      adapter: 'nest',
      appPath: './src/main.ts',
      exportName: 'app',
      tsCompiler: 'swc'
    })
  ],
  server: {
    host: '0.0.0.0',
    port: +env.VITE_PORT
  },
  optimizeDeps: {
    exclude: []
  },
  build: {
    target: 'node22',
    lib: {
      entry: resolve(import.meta.dirname, './src/main.ts'),
      formats: ['es']
    }
  }
})
