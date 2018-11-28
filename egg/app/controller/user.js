'use strict';

const BaseController = require('./base')

class UserController extends BaseController {
    // 用户注册
    async register() {
        const { ctx } = this
        const { nickname, password } = ctx.request.body
        if (!nickname || !password) {
            return ctx.body = {
                code: -1,
                msg: '请输入完整信息'
            }
        }
        await this.service.user.register(nickname, password)
    }

    // 用户登录
    async login() {
        const { ctx } = this
        const { nickname, password } = ctx.request.body
        if (!nickname || !password) {
            return ctx.body = {
                code: -1,
                msg: '请输入完整信息'
            }
        }
        await this.service.user.login(nickname, password)
    }

    // 保持登录
    async keepLogin() {
        const { ctx } = this
        if (ctx.session.userInfo) {
            ctx.body = {
                code: 200,
                nickname: ctx.session.userInfo.nickname,
            }
        } else {
            ctx.body = {
                code: -1,
                msg: '请登录'
            }
        }
    }

    // 退出登录
    async loginOut() {
        const { ctx } = this
        if (ctx.session.userInfo) {
            ctx.session.userInfo = null
            ctx.body = {
                code: 0
            }
        }
    }

    // 用户查询
    async queryUser() {
        await this.service.user.queryUser()
    }

    // 保存用户
    async saveUser() {
        const data = this.ctx.request.body
        await this.service.user.saveUser(data)
    }
}

module.exports = UserController;
