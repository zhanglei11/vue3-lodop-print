import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
// const VITE_API_URL = 'http://192.168.2.32:8092/' //本地
export default defineConfig({
  plugins: [vue(), vueSetupExtend()],
  base: '/',
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
