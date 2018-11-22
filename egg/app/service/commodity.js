'use strict';

const Service = require('egg').Service;

class CommodityService extends Service {
    // 首页商品查询
    async recommend() {
        const { ctx } = this
        const res = await ctx.model.Recommend.findOne({})
        if (res) {
            return ctx.body = {
                code: 200,
                data: res
            }
        }
        ctx.body = {
            code: -1,
            data: []
        }
    }

    // 分类商品查询
    async classification(mallSubId) {
        const { ctx } = this
        const res = await ctx.model.Goods.find({ 'sub_id': mallSubId })
        if (res) {
            return ctx.body = {
                code: 200,
                dataList: res
            }
        }
        ctx.body = {
            code: -1,
            dataList: []
        }
    }

    // 单个商品详情查询
    async goodsOne(id) {
        const { ctx } = this
        const res = await ctx.model.Goods.findOne({ id })
        if (res) {
            return ctx.body = {
                code: 200,
                goodsOne: res
            }
        }
        ctx.body = {
            code: -1,
            goodsOne: []
        }
    }

    // 搜索
    async search(value) {
        const list = await this.ctx.model.Goods.find({ 'name': { $regex: value } })
        this.ctx.body = {
            status: 200,
            list
        }
    }
}

module.exports = CommodityService;
