import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueSetupExtend from 'vite-plugin-vue-setup-extend'

const VITE_API_URL = 'http://192.168.1.203:18080' //线上
// const VITE_API_URL = 'http://192.168.2.32:8092/' //本地
export default defineConfig({
  plugins: [vue(), vueSetupExtend()],
  base: '/',
  server: {
    host: 'localhost',
    port: 8234,
    // 是否自动在浏览器打开
    open: true,
    // 是否开启 https
    https: false, //https
    hmr: {
      overlay: true //hot更新
    },
    proxy: {
      '/dss/api': {
        target: VITE_API_URL,
        changeOrigin: true,
        secure: true,
        rewrite: (path) => {
          return path.replace('/dss/api', '/dss/api')
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      public: path.resolve(__dirname, './public')
    }
  },
  optimizeDeps: {
    include: ['@ant-design/icons-vue']
  }
})
