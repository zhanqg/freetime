'use strict';

const Controller = require('egg').Controller;
// 商品查询相关
class CommodityController extends Controller {
    // 首页商品展示
    async recommend() {
        await this.service.commodity.recommend()
    }

    // 分类商品查询
    async classification() {
        if (!this.ctx.query.mallSubId) {
            return ctx.body = {
                code: -1,
                msg: '缺少参数mallSubId'
            }
        }
        await this.service.commodity.classification(this.ctx.query.mallSubId)
    }

    // 单个商品详情查询
    async goodsOne() {
        if (!this.ctx.query.id) {
            return ctx.body = {
                code: -1,
                msg: '缺少参数mallSubId'
            }
        }
        await this.service.commodity.goodsOne(this.ctx.query.id)
    }

    // 搜索
    async search() {
        if (!this.ctx.request.body.value) {
            return ctx.body = {
                code: -1,
                msg: '缺少参数value'
            }
        }
        await this.service.commodity.search(this.ctx.request.body.value)

    }
}

module.exports = CommodityController;
