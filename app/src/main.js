import Vue from 'vue'
import App from './App.vue'
import router from '@/router/index' // 引入路由器
import store from '@/store' // 引入store
import '@/mock/mockServe' // 引入Mock 虚拟数据
import 'swiper/css/swiper.css' // 引入swiper轮播样式
import * as API from '@/api' // 统一引入api中的所有接口

// 引入Element-ui
import { Button, MessageBox } from 'element-ui'
Vue.component(Button.name, Button) // 注册UI组件
Vue.prototype.$msgbox = MessageBox; // 将UI组件添加到原型上
Vue.prototype.$alert = MessageBox.alert; // 将UI组件添加到原型上
//----------------------------------------------------
// // 引入qrcode-----随机生成二维码
// import QRCode from 'qrcode'

// 引入图片懒加载源
import gaisun from '@/assets/1.jpg'
// 引入图片懒加载插件
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  // 懒加载默认图片
  loading: gaisun
})

// 引入自定义插件
import zidingyichajian from '@/plugins'
Vue.use(zidingyichajian)

// 引入表单验证插件 vee-validate
import '@/plugins/validate.js'


Vue.config.productionTip = false

new Vue({
  router: router,// 注册路由
  store: store, // 注册Vuex
  // 全局时间总线 $bus配置
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  render: h => h(App),
}).$mount('#app')
