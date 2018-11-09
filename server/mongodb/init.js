const mongoose = require('mongoose');
// 2，创建数据库连接
const db = mongoose.createConnection('mongodb://127.0.0.1:27017/shop2');
db.once('open', async callback => {
    console.log('mongodb数据库连接成功')
})
db.once('error', () => console.log('mongodb数据库连接失败'));
// 导出模块
module.exports = db;