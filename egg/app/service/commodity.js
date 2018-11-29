'use strict';

const BsseService = require('./base')
class CommodityService extends BsseService {
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
        const res2 = await ctx.model.Goods.aggregate([
            {
                $lookup:{
                    from: "comment",
                    localField: "id", 
                    foreignField: "cid", 
                    as: "comment"
                }
            },
            {
                $match:{
                    "id":id
                },
            }
        ])
        if (res2.length) {
            res2[0].comment.forEach(item => {
                if (item.anonymous) {
                    item.comment_nickname = '匿名人士'
                    delete item.comment_uid
                    delete item.comment_avatar
                }
            })
            return ctx.body = {
                code: 200,
                goodsOne: res2[0]
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
            code: 200,
            list
        }
    }
}

module.exports = CommodityService;
