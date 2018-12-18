// 前端api接口相关路由
module.exports = app => {
    const { router, controller } = app;
    router.get('/verify', app.controller.base.verify);//验证码
    router.post('/register', controller.api.user.register);     // 用户注册
    router.post('/login', controller.api.user.login);           // 用户登录
    router.post('/queryUser', controller.api.user.queryUser);   // 查询单个用户
    router.post('/saveUser', controller.api.user.saveUser);     // 单个用户资料修改保存
    router.post('/keeplogin', controller.api.user.keepLogin);   // 保持登录
    router.post('/loginOut', controller.api.user.loginOut);     // 退出登录
    router.get('/getAddress', controller.api.user.getAddress);  // 查询收货地址
    router.get('/getDefaultAddress', controller.api.user.getDefaultAddress);     // 查询默认收货地址
    router.post('/setDefaultAddress', controller.api.user.setDefaultAddress);     // 设置默认收货地址
    router.post('/isCollection', controller.api.user.isCollection);        // 查询是否已收藏
    router.post('/getCard', controller.api.user.getCard);                  // 查询是购物车
    router.get('/myOrder', controller.api.user.myOrder);                   // 查询用户订单
    router.get('/myOrder/orderNum', controller.api.user.orderNum);         // 查询用户订单数量
    router.get('/collection/list', controller.api.user.collectionList);    // 查询收藏的商品
    router.get('/alreadyEvaluated', controller.api.user.alreadyEvaluated);     // 查询已评价的商品商品列表
    router.get('/tobeEvaluated', controller.api.user.tobeEvaluated);     // 查询待评价的商品商品列表
    router.post('/evaluateOne',controller.api.user.evaluateOne)             // 查询单条评价

    // 商品展示相关
    router.get('/recommend', controller.api.goods.recommend);               // 首页商品展示
    router.get('/classification', controller.api.goods.classification);     // 商品分类查询
    router.get('/goods/one', controller.api.goods.goodsOne);                // 单个商品查询
    router.post('/search', controller.api.goods.search);                    // 搜索

    // 商品操作相关
    router.post('/collection', controller.api.operatingGoods.collection);               // 收藏商品
    router.post('/cancelCollection', controller.api.operatingGoods.cancelCollection);   // 取消收藏商品
    router.post('/addShop', controller.api.operatingGoods.addShop);                     // 加入购物车
    router.post('/editCart', controller.api.operatingGoods.editCart);                   // 购物车增加减少
    router.post('/deleteShop', controller.api.operatingGoods.deleteShop);               // 购物车删除
    router.post('/address', controller.api.operatingGoods.address);                     // 保存收货地址
    router.post('/deleteAddress', controller.api.operatingGoods.deleteAddress);         // 删除单条收货地址
    router.post('/order', controller.api.operatingGoods.order);                         // 接受订单
    router.post('/goodsOne/comment', controller.api.operatingGoods.comment);            // 商品评论

}