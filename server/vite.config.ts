import { defineConfig, loadEnv } from 'vite'
import { VitePluginNode } from 'vite-plugin-node'
import { resolve } from 'path'
import autoImport from 'unplugin-auto-import/vite'
import imports from './auto.import'

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
    autoImport({
      include: /\.ts$/,
      imports,
      dirs: ['./src/exceptions', './src/models', './src/utils', './src/enums'],
      dts: './typings/auto-imports.d.ts',
      eslintrc: { enabled: true, filepath: './typings/.eslintrc-auto-import.json', globalsPropValue: true }
    }),
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
  build: {
    target: 'node22',
    lib: {
      entry: resolve(import.meta.dirname, './src/main.ts'),
      formats: ['es']
    }
  }
})
