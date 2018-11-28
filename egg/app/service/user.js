'use strict';

const BsseService = require('./base')
const md5 = require('md5')
class UserService extends BsseService {
    // 处理用户注册
    async register(nickname, pwd) {
        const { ctx } = this
        let data = await ctx.model.Admin.findOne({ nickname })
        if (!data) {
            let username = this.ctx.helper.random(15)   // 获取用户名
            let user = await new ctx.model.Admin({
                nickname,
                username,
                password: md5(pwd)
            })
            await user.save()

            this.success('注册成功')
            ctx.session.userInfo = user

        } else {
            if (data.nickname === nickname) {
                this.error('用户名已存在')
            }
        }
    }

    // 处理用户登录
    async login(nickname, pwd) {
        const { ctx } = this
        let data = await ctx.model.Admin.findOne({ nickname })
        if (!data || !data.nickname) {  //说明数据库没有这个名字
            this.error('用户名错误')
        } else {
            if (data.password != md5(pwd)) {
                this.error('密码错误')
            } else {
                ctx.session.userInfo = data
                this.success('登录成功')
                
            }
        }
    }

    // 用户查询
    async queryUser() {
        let data = await this.ctx.model.Admin.findOne({ 'username': this.ctx.session.userInfo.username })
        if (!data) {
            this.error('用户名不存在')
            return
        }
        this.ctx.body = data
    }

    // 修改保存用户
    async saveUser(data) {
        if (data.nickname === this.ctx.session.userInfo.nickname) {
            await this.ctx.model.Admin.updateOne({ '_id': data.id }, data)
            this.ctx.session.userInfo['nickname'] = data.nickname
            this.success('更改成功')
        } else {
            let user = await this.ctx.model.Admin.findOne({ nickname: data.nickname })
            if (user) {
                this.error('昵称已经存在')
                return
            } else {
                await this.ctx.model.Admin.updateOne({ '_id': data.id }, data)
                this.ctx.session.userInfo['nickname'] = data.nickname
                this.success('更改成功')
            }
        }
    }

}

module.exports = UserService;
