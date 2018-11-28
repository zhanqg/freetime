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
}

module.exports = BaseController;
