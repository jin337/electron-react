import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

import compressionPlugin from 'vite-plugin-compression'
import PkgConfig from 'vite-plugin-package-config'
import OptimizationPersist from 'vite-plugin-optimize-persist'

export default defineConfig({
  base: './',
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src'),
      assets: path.resolve(__dirname, 'src/assets'),
      components: path.resolve(__dirname, 'src/components'),
      service: path.resolve(__dirname, 'src/service'),
      store: path.resolve(__dirname, 'src/store'),
      views: path.resolve(__dirname, 'src/views'),
      pages: path.resolve(__dirname, 'src/pages')
    }
  },
  build: {
    outDir: 'app/build',
    emptyOutDir: false,
    chunkSizeWarningLimit: 10240,
    brotliSize: false,
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        chunkFileNames: 'assets/chunk/[name]-[hash].js',
        entryFileNames: 'assets/chunk/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
      }
    }
  },
  plugins: [
    react(),
    PkgConfig(),
    OptimizationPersist(),
    compressionPlugin({ threshold: 10240 })
  ]
})
