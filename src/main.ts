import { createApp } from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'
//less文件
import '@/styles/index.less'
//ant-design-vue
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
//vxe-table
import 'xe-utils'
import VXETable from 'vxe-table'


import 'vxe-table/lib/style.css'
const app = createApp(App)

//时间格式
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
app.config.globalProperties.$moment = moment
//引入echarts
import * as echarts from 'echarts'
app.config.globalProperties.$echarts = echarts
// app.provide<any>('echarts',echarts)
app.use(store)
app.use(router)
app.use(Antd)
app.use(VXETable)
app.mount('#app')
