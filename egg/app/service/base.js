'use strict';

const Service = require('egg').Service;

class BaseService extends Service {
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

module.exports = BaseService;
