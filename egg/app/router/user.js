// 前端用户相关路由，注册登录之类的
module.exports = app => {
    const { router, controller } = app;
    router.post('/register', controller.user.register);     // 用户注册
    router.post('/login', controller.user.login);           // 用户登录
    router.post('/queryUser', controller.user.queryUser);   // 查询单个用户
    router.post('/saveUser', controller.user.saveUser);     // 单个用户资料修改保存
    router.post('/keeplogin', controller.user.keepLogin);   // 保持登录
    router.post('/loginOut', controller.user.loginOut);     // 退出登录
}