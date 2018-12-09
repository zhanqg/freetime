'use strict';

module.exports = app => {
  require('./router/user')(app)           // 用户处理路由
  require('./router/commodity')(app)      // 商品展示路由
  require('./router/userOperation')(app)  // 查询用户商品相关
  require('./router/operatingGoods')(app) // 用户操作商品
  app.router.get('/verify', app.controller.base.verify);//验证码
  app.router.get('/', app.controller.importData.index); // 往数据库导入数据
};
