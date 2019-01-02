import Vue from 'vue'
import Router from 'vue-router'
import Home from 'pages/Home'
import Category from 'pages/Category'
import ShoppingCart from 'pages/ShoppingCart'
import My from 'pages/My'
import Details from 'pages/Details'
import Login from 'pages/login'
import Address from 'pages/address'
import AddressEdit from 'pages/AddressEdit'
import Collection from 'pages/Collection'
import MyOrder from 'pages/MyOrder'
import City from 'pages/City'
import ShoppingPayMent from 'pages/ShoppingPayMent'
import Evaluate from 'pages/Evaluate'
import Aevaluated from 'pages/Aevaluated'
import Rate from 'pages/Rate'
import Browse from 'pages/Browse'
import store from '../store'
Vue.use(Router)

const router = new Router({
    // mode : 'history',
    routes: [
        { path: '/', redirect: '/home' },             //  首页
        { path: '/home', name: 'Home', component: Home},//  首页
        { path: '/category', name: 'Category', component: Category },// tab分类
        { path: '/shoppingCart', name: 'ShoppingCart', component: ShoppingCart },// tab购物车
        { path: '/details', name: 'Details', component: Details },      // 商品详情
        { path: '/my', name: 'My', component: My, children:[            // tab个人中心
            { path: 'order', component: MyOrder, name: 'MyOrder' },     // 我的订单
            { path: 'collection', name: 'Collection', component: Collection},// 我的收藏
            { path: 'browse', name: 'Browse', component: Browse },      // 我的浏览记录
            { path: 'evaluate', component: Evaluate, name: 'Evaluate'}, // 我的评价记录
            { path: 'aevaluated', component: Aevaluated, name: 'Aevaluated' },// 查看已经评价
            { path: 'rate', component: Rate, name: 'Rate' },            // 评价商品
        ]
        },
        { path: '/address', name: 'Address', component: Address }, // 地址
        { path: '/addressEdit', name: 'AddressEdit', component: AddressEdit }, // 新增和编辑地址
        { path: '/login', name: 'Login', component: Login }, // 登入
        { path: '/city', component: City, name: 'City' },   // 城市选择
        { path: '/shoppingPayMent', name: 'ShoppingPayMent', component: ShoppingPayMent }, // 支付页面
        { path: '*', redirect: '/home' },   // 首页

    ]
})

router.beforeEach((to, from, next) => {
    let active
    if (to.path === '/category') {
        active = 1
    } else if (to.path === '/shoppingCart') {
        active = 2
    } else if (to.path === '/my') {
        active = 3
    } else if (to.path === '/home') {
        active = 0
    }
    store.commit('ACTIVE', active)
    next()
})
export default router
