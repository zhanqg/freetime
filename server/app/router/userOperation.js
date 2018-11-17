// 用户操作商品相关
module.exports = app => {
    const { router, controller } = app;
    router.post('/isCollection', controller.userOperation.isCollection); // 查询是否已收藏
    router.post('/getCard', controller.userOperation.getCard); // 查询是否已收藏
    router.get('/myOrder', controller.userOperation.myOrder); // 查询用户订单
    router.get('/collection/list', controller.userOperation.collectionList); // 查询收藏的商品
    router.get('/getAddress', controller.userOperation.getAddress); // 查询收货地址

}