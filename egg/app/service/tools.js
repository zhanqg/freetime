'use strict';

const Service = require('egg').Service;
const fs = require('fs')
class ToolsService extends Service {
    // 写入文件
    async writeFile(path, dataBuffer) {
        return new Promise((resolve, reject) => {
            fs.writeFile(path, dataBuffer, function (err) {//用fs写入文件
                if (err) {
                    console.log(err);
                    reject(err)
                } else {
                    resolve()
                }
            })
        })
    }

    // 创建相册的保存路径
    async getUploadFile(_base64) {
        const { username, _id } = this.ctx.session.userInfo
        var paths = this.app.config.uploadDir + Date.now() + username + _id + '.png';//从app.js级开始找--在我的项目工程里是这样的
        var base64 = _base64.replace(/^data:image\/\w+;base64,/, "");//去掉图片base64码前面部分data:image/png;base64
        var dataBuffer = new Buffer(base64, 'base64'); //把base64码转成buffer对象，
        await this.writeFile(paths, dataBuffer)
        return {
            saveDir: this.app.config.url + paths.slice(3).replace(/\\/g, '/')
        }

    }
}

module.exports = ToolsService;