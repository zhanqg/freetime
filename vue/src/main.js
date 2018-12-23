import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import { Toast, Dialog } from 'vant'
import Api from './api'
Vue.prototype.Api = Api           // 请求接口类
Vue.prototype.Toast = Toast       // 全局提示
Vue.prototype.Dialog = Dialog     // 全局弹框
import './vant'                   // 有赞组件库
import FastClick from 'fastclick' // 解决300毫秒延时

FastClick.attach(document.body)
import 'babel-polyfill'
import 'vant/lib/index.css'
import 'css/reset.css'
import 'swiper/dist/css/swiper.css'
import 'css/border.css'
import 'css/index.css' 
import 'css/icon.styl'
import 'css/cropper.css' 
import './fn'
Vue.config.productionTip = false

new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
