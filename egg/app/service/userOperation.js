'use strict';

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
        const res = await ctx.model.OrderList.find({uid})
        ctx.body = {
            code: 200,
            list: res.reverse()
        }
    }

    // 查询收藏的商品
    async collectionList() {
        const { ctx } = this
        const { _id } = ctx.session.userInfo
        const result = await ctx.model.Collection.find({ uid: _id }).sort({ 'add_time': -1 })
        ctx.body = {
            code: 200,
            collection: result
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

        await ctx.model.Address.findOneAndUpdate({ uid: _id, _id: id },{
            $set: {
                'isDefault': true,
            }
        })
        this.success('设置默认地址成功')
    }
}

module.exports = UserOperationService;
