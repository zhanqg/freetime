'use strict';
// 用户相关操作
const BaseController = require('../base')
const md5 = require('md5')
const USERSTR = '_id avatar day gender month nickname username year'
class UserController extends BaseController {
    // 用户注册
    async register() {
        const { ctx } = this
        const { nickname, password, verify } = ctx.request.body
        if (!nickname || !password || !verify) {
            return ctx.body = {
                code: -1,
                msg: '请输入完整信息'
            }
        }
        console.log(ctx.session);
       
                
        if (this.ctx.session.code.toUpperCase() !== verify.toUpperCase()) {
            return ctx.body = {
                code: -2,
                msg: '验证码错误'
            }
        }

        let data = await ctx.model.Admin.findOne({ nickname })
        if (!data) {
            let username = this.ctx.helper.random(15)   // 获取用户名
            let user = await new ctx.model.Admin({
                nickname,
                username,
                password: md5(password)
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

    // 用户登录
    async login() {
        const { ctx } = this
        const { nickname, password, verify } = ctx.request.body
        if (!nickname || !password) {
            return ctx.body = {
                code: -1,
                msg: '请输入完整信息'
            }
        }
        if (this.ctx.session.code.toUpperCase() !== verify.toUpperCase()) {
            return ctx.body = {
                code: -2,
                msg: '验证码错误'
            }
        }
        let data = await ctx.model.Admin.findOne({ nickname })
        if (!data || !data.nickname) {  //说明数据库没有这个名字
            this.error('用户名错误')
        } else {
            if (data.password != md5(password)) {
                this.error('密码错误')
            } else {
                ctx.session.userInfo = data
                let userInfo = {
                    avatar: data.avatar,
                    day: data.day,
                    gender: data.gender,
                    month: data.month,
                    nickname: data.nickname,
                    username: data.username,
                    year: data.year
                }
                ctx.body = {
                    code: 200,
                    msg: '登录成功',
                    userInfo
                }
            }
        }
    }

    // 保持登录
    async keepLogin() {
        

        const { ctx } = this
        if (ctx.session.userInfo) {
            let userInfo = await this.ctx.model.Admin.findById(ctx.session.userInfo._id, USERSTR)
            ctx.body = {
                code: 200,
                userInfo
            }
        } else {
            ctx.body = {
                code: -1,
                msg: '请登录',
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
        let userInfo = await this.ctx.model.Admin.findById(this.ctx.session.userInfo._id, USERSTR)
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
    async saveUser() {
        const data = this.ctx.request.body
        if (data.avatar) {  // 判断是否修改头像
            let { saveDir } = await this.service.tools.getUploadFile(data.avatar)
            data.avatar = saveDir
            this.ctx.session.userInfo['avatar'] = data.avatar
        }
        if (data.nickname === this.ctx.session.userInfo.nickname) {
            await this.ctx.model.Admin.updateOne({ '_id': data.id }, data)
            this.ctx.session.userInfo['nickname'] = data.nickname
            let user = await this.ctx.model.Admin.findById(data.id, USERSTR)
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
                let user = await this.ctx.model.Admin.findById(data.id, USERSTR)
                this.ctx.body = {
                    code: 200,
                    msg: '更改成功',
                    user
                }
            }
        }
    }

    // 查询用户收货地址
    async getAddress() {
        const { ctx } = this
        const { _id } = ctx.session.userInfo
        const address = await ctx.model.Address.find({ uid: _id })
        ctx.body = {
            code: 200,
            address
        }
    }

    // 查询默认收货地址
    async getDefaultAddress() {
        const { ctx } = this
        const { _id } = ctx.session.userInfo
        const defaultAdd = await ctx.model.Address.findOne({ uid: _id, isDefault: true })
        ctx.body = {
            code: 200,
            defaultAdd
        }
    }

    async setDefaultAddress() {
        const { ctx } = this
        const { _id } = ctx.session.userInfo
        const {id} = ctx.request.body
        await ctx.model.Address.updateMany({ uid: _id, isDefault: true }, {
            $set: {
                'isDefault': false,
            }
        })

        await ctx.model.Address.findOneAndUpdate({ uid: _id, _id: id }, {
            $set: {
                'isDefault': true,
            }
        })
        this.success('设置默认地址成功')
    }

    // 查询商品是否已经收藏
    async isCollection() {
        const { ctx } = this
        const { _id } = this.ctx.session.userInfo
        const {id} = this.ctx.request.body    // 商品id
        const result = await ctx.model.Collection.findOne({ cid: id, uid: _id })
        if (!result) {
            ctx.body = {
                code: 200,
                isCollection: 0
            }
        } else {
            ctx.body = {
                code: 200,
                isCollection: 1
            }
        }
    }

    // 查询购物车
    async getCard() {
        const { ctx } = this
        const res = await ctx.model.ShopList.find({ uid: ctx.session.userInfo._id }).sort({ 'add_time': -1 })
        ctx.body = {
            code: 200,
            shopList: res
        }
    }

    // 查询用户订单
    async myOrder() {
        const { ctx } = this
        const uid = ctx.session.userInfo._id
        const res = await ctx.model.OrderList.find({ uid })
        ctx.body = {
            code: 200,
            list: res.reverse()
        }
    }

    // 查询用户订单数量
    async orderNum() {
        const { ctx } = this
        const uid = ctx.session.userInfo._id
        // 0,待付款 1，待发货 2，待收货 3，已完成
        let num = [], num1 = [], num2 = [], num3 = [], numList = [], evaluate = [] // 待评价
        const res = await ctx.model.OrderList.find({ uid })
        res.forEach(item => {
            if (item.status == 0) {
                num.push(item)
            } else if (item.status == 1) {
                num1.push(item)
            } else if (item.status == 2) {
                num2.push(item)
            } else if (item.status == 3) {
                num3.push(item)
            } else {
                item.order_list.forEach(v => {
                    if (!v.isComment) {
                        evaluate.push(v)// 待评价商品数量
                    }
                })
            }
        })
        numList.push(num.length, num1.length, num2.length, evaluate.length, num3.length)
        ctx.body = {
            code: 200,
            numList,
        }
    }

    // 查询已经评价的商品
    async alreadyEvaluated() {
        const { ctx } = this
        const uid = ctx.session.userInfo._id
        let pageSize = 10
        let page = ctx.query.page || 1
        let skip = (page - 1) * pageSize
        const alreadyEvaluated = await ctx.model.Comment.aggregate([
            {
                $lookup: {
                    from: "goods",
                    localField: "cid",
                    foreignField: "id",
                    as: "goods"
                }
            },
            {
                $match: {
                    comment_uid: this.app.mongoose.Types.ObjectId(uid),
                },
            },
            {
                $sort: { comment_time: -1 }
            },
            {
                $skip: skip
            },
            {
                $limit: pageSize
            }

        ])
        const count = await ctx.model.Comment.find({ comment_uid: uid}).count()
        ctx.body = {
            code: 200,
            data: {
                count,
                page,
                list: alreadyEvaluated
            }
        }
    }
    // 查询待评价的商品
    async tobeEvaluated() {
        const { ctx } = this
        const uid = ctx.session.userInfo._id
        let pageSize = 10
        let page = ctx.query.page || 1
        let skip = (page - 1) * pageSize
        let status = ctx.query.status || 4
        const res = await ctx.model.OrderList.find({ uid, status })
        let eva = []
        res.forEach(item => {
            item.order_list.forEach(v => {
                if (!v.isComment) {
                    eva.push(v)
                }
            })
        })

        const res2 = await ctx.model.OrderList.find({ uid, status, 'order_list.isComment': false }).skip(skip).limit(pageSize)
        let eva2 = []
        res2.forEach(item => {
            item.order_list.forEach(v => {
                if (!v.isComment) {
                    eva2.push(v)
                }
            })
        })
        ctx.body = {
            code: 200,
            data: {
                list: eva2,
                page,
                count: eva.length
            }
        }
    }

    // 查询单条 评价详情
    async evaluateOne() {
        const { ctx } = this
        const evaluateOne = await ctx.model.Comment.aggregate([
            {
                $lookup: {
                    from: "goods",
                    localField: "cid",
                    foreignField: "id",
                    as: "goods"
                }
            },
            {
                $lookup: {
                    from: "admin",
                    localField: "comment_uid",
                    foreignField: "_id",
                    as: "user"
                }
            },
            {
                $match: {
                    '_id': this.app.mongoose.Types.ObjectId(ctx.request.body._id)
                },
            },
        ])

        ctx.body = {
            code: 200,
            evaluateOne: evaluateOne[0],
        }
    }

    // 查询收藏的商品
    async collectionList() {
        const { ctx } = this
        const { _id } = ctx.session.userInfo
        let pageSize = 10
        let page = ctx.query.page || 1
        let skip = (page - 1) * pageSize
        const list = await ctx.model.Collection.find({ uid: _id }).sort({ 'add_time': -1 }).skip(skip).limit(pageSize)
        const count = await ctx.model.Collection.find({ uid: _id }).count()
        ctx.body = {
            code: 200,
            data: {
                count,
                list,
                page
            }
        }
    }
}

module.exports = UserController;
