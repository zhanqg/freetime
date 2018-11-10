import axios from 'axios'

// 所有接口的api封装
export default class Api {
    /**
     * 首页(Home)所有接口
     * recommend 首页的默认数据
     * search 搜索
     */
    static recommend() {
        return axios.get('/api/recommend')
    }

    static search(value) {  // value：搜索关键词
        return axios.post('/api/search',{
            value
        })
    }

// ===============================================================================================================
    /**
     * 分类页面(Category)所有接口
     * category 分类查询
     */
    static category(id) {  // id：默认分类的id
        return axios.get(`/api/classification?mallSubId=${id}`)
    }

// ===============================================================================================================
    /**
     * 购物车(ShoppingCart)所有接口
     * getCard 查询获取购物车数据
     * editCart 购物车加减商品
     * deleteShop  购物车商品删除
     */
    static getCard() {
        return axios.get(`/api/getCard`)
    }

    static editCart(count,id,mallPrice) {   // 数量  商品id 价格
        return axios.post('/api/editCart',{
            count,
            id,
            mallPrice
        })
    }

    static deleteShop(id) { // id：需要删除的商品id
        return axios.post('/api/deleteShop',id)
    }

// ===============================================================================================================
    /**
     * 商品详情页面(Details)所有接口
     * goodOne 请求单个商品详情,参数： id:商品的id
     * collection 收藏单个商品  参数：goods:商品的详情信息
     * cancelCollection 取消收藏单个商品  id:商品的id
     * isCollection     查询商品是否已收藏  id:商品的id
     * addShop      //加入购物车 参数： id:商品的id
     */
    static goodOne(id) {
        return axios.get(`/api/goods/one?id=${id}`)
    }

    static collection(goods) {
        return axios.post('/api/collection',goods)
    }

    static cancelCollection(id) {
        return axios.post('/api/cancelCollection',id)
    }

    static isCollection(id) {
        return axios.post(`/api/isCollection`,{id})
    }

    static addShop(id) {
        return axios.post(`/api/addShop`,{id})
    }

}