// 方法插件

const sd = require('silly-datetime')

// helper 是被挂在ctx下面
module.exports = {
    format(time,format) {
        return sd.format(time,format)
    }
}