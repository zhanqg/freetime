'use strict';

const Controller = require('egg').Controller;

class UserOperationController extends Controller {
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
}

module.exports = UserOperationController;
