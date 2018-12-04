'use strict';
var fs = require('fs');

const BsseService = require('./base')
class UserOperationService extends BsseService {

    // 查询商品是否已经收藏
    async isCollection(res) {
        const { ctx } = this
        const { _id } = this.ctx.session.userInfo
        const result = await ctx.model.Collection.findOne({ cid: res.id, uid: _id })
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

    // 查询收藏的商品
    async collectionList() {
        const { ctx } = this
        const { _id } = ctx.session.userInfo
        const collection = await ctx.model.Collection.find({ uid: _id }).sort({ 'add_time': -1 })
        ctx.body = {
            code: 200,
            collection
        }
    }

    // 查询用户的收获地址
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

    // 设置单条默认收获地址
    async setDefaultAddress(id) {
        const { ctx } = this
        const { _id } = ctx.session.userInfo
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
                    // anonymous: true
                },
            },
        ]).sort({ comment_time: -1 }).skip(skip).limit(pageSize)
        const count = await ctx.model.Comment.find({ comment_uid: uid, anonymous: true }).count()
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
    async evaluateOne(_id) {
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
                    '_id': this.app.mongoose.Types.ObjectId(_id)
                },
            },
        ])

        ctx.body = {
            code: 200,
            evaluateOne: evaluateOne[0],
        }
    }
}

module.exports = UserOperationService;
