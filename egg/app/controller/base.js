// 父类
'use strict';

const Controller = require('egg').Controller;
class BaseController extends Controller {
    async success(msg) {
        this.ctx.body = {
            code: 200,
            msg
        }
    }

    async error(msg) {
        this.ctx.body = {
            code: -1,
            msg
        }
    }

    async verify() {
        let captcha = await this.service.tools.captcha();  //服务里面的方法
        this.ctx.response.type = 'image/svg+xml';   /*指定返回的类型*/
        this.ctx.body = captcha.data;      /*给页面返回一张图片*/
    }
}

module.exports = BaseController;
