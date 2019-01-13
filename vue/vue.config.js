const path = require('path')
function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    baseUrl: '/public/static/',
    chainWebpack: config => {
        config.resolve.alias
            .set('js', resolve('src/assets/js'))
            .set('css', resolve('src/assets/css'))
            .set('img', resolve('src/assets/img'))
    },
    devServer: {
        port: 8090,
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                ws: true,
                changeOrigin: true,  //是否跨域
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    productionSourceMap: false, //如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建
}