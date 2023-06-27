import { UserConfig } from 'vite'
import { resolve } from 'path'
import { VitePluginNode } from 'vite-plugin-node'
import { port } from './src/config'

const config: UserConfig = {
  root: __dirname,
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
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
    outDir: resolve(__dirname, './dist'),
    lib: {
      entry: resolve(__dirname, './src/index.ts'),
      formats: ['cjs']
    },
    rollupOptions: {
      external: ['path', 'child_process', 'fs', 'sequelize', 'express'],
      output: {
        entryFileNames: '[name].js'
      }
    },
    minify: 'terser'
  }
}

export default config
