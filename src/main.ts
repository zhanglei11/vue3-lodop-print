import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
//less文件
import '@/styles/index.less'
//ant-design-vue
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

const app = createApp(App)

app.use(router)
app.use(Antd)
app.mount('#app')
