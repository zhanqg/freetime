'use strict';

const BsseService = require('./base')
const md5 = require('md5')
const USERStR = '_id avatar day gender month nickname username year'
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
            ctx.session.userInfo = user
            let userInfo = {
                avatar: user.avatar,
                day: user.day,
                gender: user.gender,
                month: user.month,
                nickname: user.nickname,
                username: user.username,
                year: user.year
            }
            ctx.body = {
                code: 200,
                userInfo,
                msg: '注册成功'
            }

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
                let user = ctx.session.userInfo
                let userInfo = {
                    avatar: user.avatar,
                    day: user.day,
                    gender: user.gender,
                    month: user.month,
                    nickname: user.nickname,
                    username: user.username,
                    year: user.year
                }
                ctx.body = {
                    code: 200,
                    msg: '登录成功',
                    userInfo: userInfo
                }
                // this.success('登录成功')

            }
        }
    }

    // 用户查询
    async queryUser() {
        let userInfo = await this.ctx.model.Admin.findById(this.ctx.session.userInfo._id, USERStR)
        if (!userInfo) {
            this.error('用户名不存在')
            return
        }
        this.ctx.body = {
            code: 200,
            userInfo
        }
    }

    // 修改保存用户
    async saveUser(data) {
        // 更改评论表里面信息
        if (data.avatar) {  // 判断是否修改头像
            let { saveDir } = await this.service.tools.getUploadFile(data.avatar)
            data.avatar = saveDir
            this.ctx.session.userInfo['avatar'] = data.avatar
        } 
       
        if (data.nickname === this.ctx.session.userInfo.nickname) {
            await this.ctx.model.Admin.updateOne({ '_id': data.id }, data)
            this.ctx.session.userInfo['nickname'] = data.nickname

            let user = await this.ctx.model.Admin.findById(data.id, USERStR)

            this.ctx.body = {
                code: 200,
                msg: '更改成功',
                user
            }
        } else {
            let user = await this.ctx.model.Admin.findOne({ nickname: data.nickname })
            if (user) {
                this.error('昵称已经存在')
                return
            } else {
                await this.ctx.model.Admin.updateOne({ '_id': data.id }, data)
                this.ctx.session.userInfo['nickname'] = data.nickname
                let user = await this.ctx.model.Admin.findById(data.id, USERStR)
                this.ctx.body = {
                    code: 200,
                    msg: '更改成功',
                    user
                }
            }
        }
    }

}

module.exports = UserService;
