'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
    // 用户注册
    async register() {
        const { ctx } = this
        const { username, password } = ctx.request.body
        if (!username || !password) {
            return ctx.body = {
                code: -1,
                msg: '请输入完整信息'
            }
        }
        await this.service.user.register(username, password)
    }

    // 用户登录
    async login() {
        const { ctx } = this
        const { username, password } = ctx.request.body
        if (!username || !password) {
            return ctx.body = {
                code: -1,
                msg: '请输入完整信息'
            }
        }
        await this.service.user.login(username, password)
    }

    // 保持登录
    async keepLogin() {
        const { ctx } = this
        if (ctx.session.username) {
            ctx.body = {
                status: ctx.session.login,
                username: ctx.session.username,
            }
        } else {
            ctx.body = {
                status: -1,
                msg: '请登录'
            }
        }
    }

    // 退出登录
    async loginOut() {
        const { ctx } = this
        if (ctx.session.username) {
            ctx.session.username = ''
            const status = ctx.session.login = 0
            ctx.body = {
                status
            }
        }
    }
}

module.exports = UserController;
