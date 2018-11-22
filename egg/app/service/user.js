'use strict';

const Service = require('egg').Service;
const md5 = require('md5')
class UserService extends Service {
    // 处理用户注册
    async register(username, pwd) {
        const { ctx } = this
        let data = await ctx.model.User.findOne({ username })
        if (!data) {
            await new ctx.model.User({
                username,
                password: md5(pwd)
            }).save()
            ctx.body = {
                code: 200,
                msg: '注册成功'
            }
            ctx.session['login'] = 1
            ctx.session['username'] = username
        } else {
            if (data.username === username) {
                ctx.body = {
                    code: -1,
                    msg: '用户名已存在'
                }
            }
        }
    }

    // 处理用户登录
    async login(username, pwd) {
        const { ctx } = this
        let data = await ctx.model.User.findOne({ username })
        if (!data || !data.username) {  //说明数据库没有这个名字
            ctx.body = {
                code: -1,
                msg: '用户名不存在',
            }
        } else {
            if (data.password != md5(pwd)) {
                ctx.body = {
                    code: -1,
                    msg: '密码错误',
                }
            } else {
                ctx.session['login'] = 1
                ctx.session['username'] = username
                ctx.body = {
                    code: 200,
                    msg: '登录成功',
                }
            }
        }
    }
}

module.exports = UserService;
