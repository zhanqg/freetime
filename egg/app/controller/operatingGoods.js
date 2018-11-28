'use strict';

const BaseController = require('./base')
class OperatingGoodsController extends BaseController {
    // 收藏商品
    async collection() {
        const data = this.ctx.request.body
        if (!data) {
            return this.ctx.body = {
                code: -1,
                msg: '缺少重要参数'
            }
        }
        await this.service.operatingGoods.collection(data)
    }

    // 取消收藏
    async cancelCollection() {
        if (!this.ctx.request.body.id) {
            return this.ctx.body = {
                code: -1,
                msg: '缺少重要参数id'
            }
        }
        await this.service.operatingGoods.cancelCollection(this.ctx.request.body.id)
    }

    // 加入购物车
    async addShop() {
        if (!this.ctx.request.body.id) {
            return this.ctx.body = {
                code: -1,
                msg: '缺少重要参数id'
            }
        }
        await this.service.operatingGoods.addShop(this.ctx.request.body.id)
    }

    // 购物车增加减少
    async editCart() {
        const data = this.ctx.request.body
        if (!data) {
            return this.ctx.body = {
                code: -1,
                msg: '缺少重要参数'
            }
        }
        await this.service.operatingGoods.editCart(data)
    }

    // 购物车删除
    async deleteShop() {
        const data = this.ctx.request.body
        if (!data) {
            return this.ctx.body = {
                code: -1,
                msg: '缺少重要参数'
            }
        }

        await this.service.operatingGoods.deleteShop(data)
    }

    // 保存收货地址
    async address() {
        const { ctx } = this
        const data = ctx.request.body
        if (!data) {
            return ctx.body = {
                code: -1,
                msg: '缺少重要参数'
            }
        }
        await this.service.operatingGoods.address(data)
    }

    // 删除单条收货地址
    async deleteAddress() {
        const { ctx } = this
        if (!ctx.request.body.id) {
            return ctx.body = {
                code: -1,
                msg: '缺少重要参数id'
            }
        }
        await this.service.operatingGoods.deleteAddress(ctx.request.body.id)
    }

    // 接受订单
    async order() {
        const data = this.ctx.request.body
        if (!data) {
            return ctx.body = {
                code: -1,
                msg: '缺少重要参数'
            }
        }
        await this.service.operatingGoods.order(data)
    }
}

module.exports = OperatingGoodsController;
