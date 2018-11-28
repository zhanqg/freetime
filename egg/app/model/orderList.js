// 订单表
module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const OrderListSchema = new Schema({
        uid: String,                // 用户id
        status: {                   // 0,未支付 1，已经支付待发货 2，发货待收货 3，已签收完成订单
            type: Number,
            default: 0      
        },
        order_id: String,           // 订单id
        tel: Number,                // 用户电话
        address: String,            // 用户收货地址
        add_time: {                 //  添加订单时间
            type: String,
            default: +new Date()
        },
        mallPrice: Number,           // 总价
        order_list: [
            {
                count: Number,
                present_price: Number,
                cid: String,
                image_path: String,
                name: String,
                mallPrice: Number,
            }
        ]
    });

    return mongoose.model('OrderList', OrderListSchema, 'orderList');
}