// 用户操作商品相关
module.exports = app => {
    const { router, controller } = app;
    router.post('/collection', controller.operatingGoods.collection);               // 收藏商品
    router.post('/cancelCollection', controller.operatingGoods.cancelCollection);   // 取消收藏商品
    router.post('/addShop', controller.operatingGoods.addShop);                     // 加入购物车
    router.post('/editCart', controller.operatingGoods.editCart);                   // 购物车增加减少
    router.post('/deleteShop', controller.operatingGoods.deleteShop);               // 购物车删除
    router.post('/address', controller.operatingGoods.address);                     // 保存收货地址
    router.post('/deleteAddress', controller.operatingGoods.deleteAddress);         // 删除单条收货地址
    router.post('/order', controller.operatingGoods.order);                         // 接受订单
    router.post('/goodsOne/comment', controller.operatingGoods.comment);            // 商品评论


}