'use strict';

module.exports = appInfo => {
  const config = exports = {};
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1542473992654_7948';
  
  // add your config here
  config.middleware = ['isLogin'];

  // 修改默认端口号
  config.cluster = {
    listen: {
      path: '',
      port: 3000,
      hostname: 'localhost',
    }
  }

  // 连接数据库
  exports.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1/shop4',
      options: {},
    },
  }

  // 关闭默认的安全校验
  exports.security = {
    csrf: false
  }

  config.session = {
    key: 'SESSION_ID',
    maxAge: 8640000,
    overwrite: true,  //是否可以overwrite    (默认default true)
    httpOnly: true, //cookie是否只有服务器端可以访问 httpOnly or not (default true)
    signed: true,   //签名默认true
    rolling: false,  //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
    renew: false,  //(boolean) renew session when session is nearly expired,
  }
  return config;
};
