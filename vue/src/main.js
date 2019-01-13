import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Api from './Api'
Vue.prototype.Api = Api           // 请求接口类
import './vant'                   // 有赞组件库
import FastClick from 'fastclick' // 解决300毫秒延时
FastClick.attach(document.body)

import 'vant/lib/index.css'
import 'css/reset.css'
import 'swiper/dist/css/swiper.css'
import 'css/border.css'
import 'css/index.css' 
import 'css/icon.styl'
import 'css/cropper.css' 
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
