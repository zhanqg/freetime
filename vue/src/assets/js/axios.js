import axios from 'axios'
import Vue from 'vue'
const ERR_OK = 200
const server = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? './api/' : '',
    timeout: 2000,  // 超时
    headers: {

    }
})
// respone拦截器
server.interceptors.response.use(
    response => {
        const res = response.data
        if (res.code === ERR_OK) {  // 统一处理
            return res // 直接返回数据
        } else {
            console.log(res);
            Vue.prototype.$toast(res.msg)
            return Promise.reject(res)
        }
    },
    error => {
        return Promise.reject(error)
    }
)
window.addEventListener('unhandledrejection', event => event.preventDefault())
export default server