'use strict';

const Service = require('egg').Service;

class UserOperationService extends Service {
    // 查询商品是否已经收藏
    async isCollection(res) {
        const { ctx } = this
        const username = ctx.session.username
        const result = await ctx.model.User.findOne({ username })
        let isCollection
        if (!res || !res.id) {
            isCollection = 0  // 未收藏
        } else {
            if (!result) {
                ctx.body = {
                    status: -1,
                    msg: '请登录'
                }
            }
            if (result.collections.length) {
                for (let i = 0; i < result.collections.length; i++) {
                    if (result.collections[i].id === res.id) {
                        isCollection = 1
                        break
                    } else {
                        isCollection = 0
                    }
                }
            } else {
                isCollection = 0
            }
        }
        ctx.body = {
            status: 200,
            isCollection
        }
    }

    // 查询购物车
    async getCard() {
        const { ctx } = this
        const username = ctx.session.username
        const res = await ctx.model.User.findOne({ username })
        ctx.body = {
            status: 200,
            shopList: res && res.shopList || []
        }
    }

    // 查询用户订单
    async myOrder() {
        const { ctx } = this
        const username = ctx.session.username
        const res = await ctx.model.User.findOne({ username })
        ctx.body = {
            status: 200,
            list: res.order
        }
    }

    // 查询收藏的商品
    async collectionList() {
        const { ctx } = this
        const username = ctx.session.username
        const result = await ctx.model.User.findOne({ username })
        ctx.body = {
            status: 200,
            collection: result.collections || []
        }
    }

    // 查询用户的收获地址
    async getAddress() {
        const { ctx } = this
        const res = await  ctx.model.User.findOne({ username: ctx.session.username })
        ctx.body = {
            status: 200,
            address: res.addressList
        }
    }
}

module.exports = UserOperationService;
