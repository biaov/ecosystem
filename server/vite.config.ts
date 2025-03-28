import { UserConfig } from 'vite'
import { resolve } from 'path'
import { VitePluginNode } from 'vite-plugin-node'
import { port } from './src/config/port'

const config: UserConfig = {
  root: import.meta.dirname,
  resolve: {
    alias: {
      '@': resolve(import.meta.dirname, './src')
    }
  },
  plugins: [
    ...VitePluginNode({
      adapter: 'express',
      appPath: './src/index.ts',
      exportName: 'app',
      tsCompiler: 'esbuild'
    })
  ],
  optimizeDeps: {
    exclude: ['sequelize']
  },
  server: {
    host: '0.0.0.0',
    port
  },
  build: {
    target: 'node18',
    outDir: resolve(import.meta.dirname, './dist/dist'),
    lib: {
      entry: resolve(import.meta.dirname, './src/index.ts'),
      formats: ['cjs']
    },
    rollupOptions: {
      external: ['path', 'child_process', 'fs', 'crypto', 'dayjs', 'express', 'jsonwebtoken', 'md5', 'multer', 'sequelize'],
      output: {
        entryFileNames: '[name].js'
      }
    },
    minify: 'terser'
  }
}

export default config
