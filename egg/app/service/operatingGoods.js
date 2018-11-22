'use strict';

const Service = require('egg').Service;

class OperatingGoodsService extends Service {
    // 收藏商品
    async collection(data) {
        const { ctx } = this
        const username = ctx.session.username
        await ctx.model.User.findOneAndUpdate({ username }, {
            $push: {
                'collections': data
            }
        })
        ctx.body = {
            status: 200,
            msg: '收藏成功'
        }
    }

    // 取消收藏
    async cancelCollection(id) {
        const { ctx } = this
        await ctx.model.User.findOneAndUpdate({ username: ctx.session.username }, {
            $pull: {
                'collections': {
                    'id': id
                }
            }
        })
        ctx.body = {
            status: 200,
            msg: '取消收藏成功'
        }
    }

    // 加入购物车
    async addShop(ids) {
        const { ctx } = this
        const username = ctx.session.username
        // 单价 id image_path 商品名字
        // 先查数据库有没有这条商品,有就数量加1,没有就新创建一条
        const test = await ctx.model.User.aggregate([{ "$unwind": "$shopList" },
        { "$match": { "shopList.id": ids, username } },
        { "$project": { "shopList": 1 } }])
        let newData = test.length && test[0].shopList
        console.log(newData);

        if (newData) {
            await ctx.model.User.findOneAndUpdate({ username, 'shopList.id': ids }, {
                $set: {
                    'shopList.$.count': newData.count += 1
                }
            })
        } else {  // 说明没有这条数据
            // 查到这条商品数据
            let goods = await ctx.model.Goods.findOne({ id: ids }).exec()
            const { present_price, id, image_path, name } = goods
            let shop = {
                present_price,
                id,
                image_path,
                name,
                mallPrice: present_price,
                check: false,
                count: 1,
            }
            await ctx.model.User.findOneAndUpdate({ username }, {
                $push: {
                    'shopList': shop
                }
            })
        }
        ctx.body = {
            status: 200,
            msg: '加入购物车成功'
        }
    }

    // 购物车增加减少
    async editCart(data) {
        const { ctx } = this
        const username = ctx.session.username
        await ctx.model.User.findOneAndUpdate({ username, 'shopList.id': data.id }, {
            $set: {
                'shopList.$.count': data.count,
                'shopList.$.mallPrice': data.mallPrice,
            }
        })
        ctx.body = {
            status: 200,
            msg: '修改成功'
        }
    }

    // 购物车删除
    async deleteShop(data) {
        const { ctx } = this
        const username = ctx.session.username
        data.forEach(ids => {
            ctx.model.User.findOneAndUpdate({ username, 'shopList.id': ids }, {
                $pull: {
                    'shopList': {
                        'id': ids
                    }
                }
            }).exec()
        })
        ctx.body = {
            status: 200,
            msg: '删除成功'
        }
    }

    // 保存收货地址
    async address(data) {
        const { ctx } = this
        const username = ctx.session.username
        if (data.id) {    // 说明是更新地址
            await ctx.model.User.findOneAndUpdate({ username, 'addressList.id': data.id }, {
                $set: {
                    'addressList.$': data
                }
            })
            ctx.body = {
                status: 200,
                msg: '更新成功'
            }
        } else {  // 新增地址
            const data2 = Object.assign(data, {
                id: String(+Date.now())
            })    // 地址id
            await ctx.model.User.findOneAndUpdate({ username }, {
                $push: {
                    'addressList': data2
                }
            })
            ctx.body = {
                status: 200,
                msg: '添加成功'
            }
        }
    }

    // 删除单条收货地址
    async deleteAddress(id) {
        await this.ctx.model.User.findOneAndUpdate({ username: this.ctx.session.username }, {
            $pull: {
                'addressList': {
                    'id': id
                }
            }
        })
        this.ctx.body = {
            code: 200,
            msg: '删除成功'
        }
    }

    // 接受订单
    async order(data) {
        const { ctx } = this
        // 订单信息
        let platform = '622'           // 订单头
        let r1 = Math.floor(Math.random() * 10)
        let r2 = Math.floor(Math.random() * 10)
        // 'YYYY-MM-DD HH:mm:ss'
        let sysDate = ctx.helper.format(+new Date(), 'YYYYMMDDhhmmss')          // 系统时间
        let createDate = ctx.helper.format(+new Date(), 'YYYY-MM-DD hh:mm:ss')   // 订单创建时间
        let orderId = platform + r1 + sysDate + r2;   // 订单id
        const username = ctx.session.username
        let newData = []
        const order = await ctx.model.User.findOne({ username })
        if (!order.order) {
            order.order = {}
        }
        // 根据id查询出购物车订单
        for (let i = 0; i < data.orderId.length; i++) {
            if (data.idDirect) {
                const res = await ctx.model.Goods.findOne({ id: data.orderId[0] })
                newData[i] = {
                    order_id: orderId + i,
                    count: data.count,
                    present_price: res.present_price,
                    id: res.id,
                    image_path: res.image_path,
                    name: res.namem,
                    mallPrice: data.totalPrice,
                }
            } else {
                let item = await ctx.model.User.aggregate([
                    { "$unwind": "$shopList" },
                    { "$match": { "shopList.id": data.orderId[i], username } },
                    { "$project": { "shopList": 1 } }
                ])
                newData[i] = item[0].shopList
                newData[i].order_id = orderId + i
            }

        }
        if (!order.order[orderId]) {
            order.order[orderId] = {
                address: data.address,
                tel: data.tel,
                orderList: newData,
                totalPrice: data.totalPrice,
                createDate,
                orderId,
            }
        }
        await ctx.model.User.update({ username }, {
            $set: {
                'order': order.order,
            }
        })

        for (let i = 0; i < data.orderId.length; i++) {
            await ctx.model.User.findOneAndUpdate({ username, 'shopList.id': data.orderId[i] }, {
                $pull: {
                    'shopList': {
                        'id': data.orderId[i]
                    }
                }
            })
        }
        ctx.body = {
            status: 200,
            msg: '结算成功!'
        }
    }
}

module.exports = OperatingGoodsService;
