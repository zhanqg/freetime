import Vue from 'vue'
import Router from 'vue-router'
const Home = resolve => {
    import('./views/Home').then(res => {
        resolve(res)
    })
}
const Category = resolve => {
    import('./views/Category').then(res => {
        resolve(res)
    })
}
const ShoppingCart = resolve => {
    import('./views/ShoppingCart').then(res => {
        resolve(res) 
    })
}
const My = resolve => {
    import('./views/My').then(res => {
        resolve(res)
    })
}
const Details = resolve => {
    import('./views/Details').then(res => {
        resolve(res)
    })
}
const Login = resolve => {
    import('./views/Login').then(res => {
        resolve(res)
    })
}
const Address = resolve => {
    import('./views/Address').then(res => {
        resolve(res)
    })
}
const AddressEdit = resolve => {
    import('./views/AddressEdit').then(res => {
        resolve(res)
    })
}
const Collection = resolve => {
    import('./views/Collection').then(res => {
        resolve(res)
    })
}
const MyOrder = resolve => {
    import('./views/MyOrder').then(res => {
        resolve(res)
    })
}
const City = resolve => {
    import('./views/City').then(res => {
        resolve(res)
    })
}
const ShoppingPayMent = resolve => {
    import('./views/ShoppingPayMent').then(res => {
        resolve(res)
    })
}
const Evaluate = resolve => {
    import('./views/Evaluate').then(res => {
        resolve(res)
    })
}
const Aevaluated = resolve => {
    import('./views/Aevaluated').then(res => {
        resolve(res)
    })
}
const Rate = resolve => {
    import('./views/Rate').then(res => {
        resolve(res)
    })
}
const Browse = resolve => {
    import('./views/Browse').then(res => {
        resolve(res)
    })
}

import store from './store'
Vue.use(Router)

const router = new Router({
    // mode: 'history',
    routes: [
        { path: '/', redirect: '/home' },             //  首页
        { path: '/home', name: 'Home', component: Home, meta: { title: 'aaaaa' } },//  首页
        { path: '/category', name: 'Category', component: Category },// tab分类
        { path: '/shoppingCart', name: 'ShoppingCart', component: ShoppingCart },// tab购物车
        { path: '/details', name: 'Details', component: Details, props: (route) => ({ id: route.query.id }) },      // 商品详情
        { path: '/my', name: 'My', component: My },                   // 个人中心
        { path: '/order', component: MyOrder, name: 'MyOrder' },     // 我的订单
        { path: '/collection', name: 'Collection', component: Collection },// 我的收藏
        { path: '/browse', name: 'Browse', component: Browse },      // 我的浏览记录
        { path: '/evaluate', component: Evaluate, name: 'Evaluate' }, // 我的评价记录
        { path: '/aevaluated', component: Aevaluated, name: 'Aevaluated', props: (route) => ({ id: route.query.id }) },// 查看已经评价
        { path: '/rate', component: Rate, name: 'Rate', props: (route) => ({ id: route.query.id }) },            // 评价商品
        { path: '/address', name: 'Address', component: Address }, // 地址
        { path: '/addressEdit', name: 'AddressEdit', component: AddressEdit }, // 新增和编辑地址
        { path: '/login', name: 'Login', component: Login }, // 登入
        { path: '/city', component: City, name: 'City' },   // 城市选择
        { path: '/shoppingPayMent', name: 'ShoppingPayMent', component: ShoppingPayMent }, // 支付页面
        { path: '*', redirect: '/home' },   // 首页
    ],
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
