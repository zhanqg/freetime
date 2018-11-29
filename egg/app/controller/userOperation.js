'use strict';

const BaseController = require('./base')
class UserOperationController extends BaseController {
    // 查询是否已收藏
    async isCollection() {
        if (!this.ctx.request.body) {
            return ctx.body = {
                code: -1,
                msg: '缺少重要参数'
            }
        }
        await this.service.userOperation.isCollection(this.ctx.request.body)
    }

    // 查询购物车
    async getCard() {
        await this.service.userOperation.getCard()
    }

    // 查询用户订单
    async myOrder() {
        await this.service.userOperation.myOrder()
    }

    // 查询收藏的商品
    async collectionList() {
        await this.service.userOperation.collectionList()
    }

    // 查询用户的收获地址
    async getAddress() {
        await this.service.userOperation.getAddress()
    }

    // 查询用户默认收货地址
    async getDefaultAddress() {
        await this.service.userOperation.getDefaultAddress()
    }

    // 设置单条默认收获地址
    async setDefaultAddress() {
        if (!this.ctx.request.body.id) {
            return this.ctx.body = {
                code: -1,
                msg: '缺少重要参数'
            }
        }
        await this.service.userOperation.setDefaultAddress(this.ctx.request.body.id)
    }

    // 查询用户订单数量
    async orderNum() {
        await this.service.userOperation.orderNum()
    }
}

module.exports = UserOperationController;
