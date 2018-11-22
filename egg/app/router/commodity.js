// 商品展示相关
module.exports = app => {
    const { router, controller } = app;
    router.get('/recommend', controller.commodity.recommend);               // 首页商品展示
    router.get('/classification', controller.commodity.classification);     // 商品分类查询
    router.get('/goods/one', controller.commodity.goodsOne);                // 单个商品查询
    router.post('/search', controller.commodity.search);                    // 搜索
}