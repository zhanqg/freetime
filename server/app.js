const Koa = require('koa')
const app = new Koa()
const fs = require('fs')
const views = require('koa-views')
const json = require('koa-json')
const bodyparser = require('koa-bodyparser')
const index = require('./routes/index')
const session = require('koa-session');
const Goods = require('./mongodb/schema/home');//引入schema
const Goods2 = require('./mongodb/schema/goods');//引入schema
// error handler
app.keys = ['some secret hurr'];
const CONFIG = {
  key: 'koa:sess',   //cookie key (default is koa:sess)
  maxAge: 86400000,  // cookie的过期时间 maxAge in ms (default is 1 days)
  overwrite: true,  //是否可以overwrite    (默认default true)
  httpOnly: true, //cookie是否只有服务器端可以访问 httpOnly or not (default true)
  signed: true,   //签名默认true
  rolling: false,  //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
  renew: false,  //(boolean) renew session when session is nearly expired,
};
app.use(session(CONFIG, app));
// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(require('koa-static')(__dirname + '/dist'))

app.use(views(__dirname + '/views', {
  extension: 'html'
}))

  // 把商品导入数据库
  ; (async () => {
    const res = await Goods.find({})
    if (!res.length) { // 说明数据库没有商品，导入商品
      fs.readFile('./goods.json', 'utf8', (err, data) => {
        data = JSON.parse(data)
        let saveCount = 0
        data.map((value, index) => {
          let newGoods = new Goods(value)
          newGoods.save().then(() => {
            saveCount++
            console.log('数据导入成功' + saveCount + '条')
          }).catch(error => {
            console.log('数据导入失败：' + error + '条')
          })
        })
      })
 
 

      fs.readFile('./goods2.json', 'utf8', (err, data) => {
        data = JSON.parse(data)
        let saveCount = 0
        data.map((value, index) => {
          let newGoods = new Goods2(value)
          newGoods.save().then(() => {
            saveCount++
            console.log('数据导入成功' + saveCount + '条')
          }).catch(error => {
            console.log('数据导入失败：' + error + '条')
          })
        })
      })
    }
  })()


// 请求拦截
app.use(async (ctx, next) => {
  if (ctx.session.login != 1) { // 没有登录
    const arr = ['/register', '/recommend', '/login','/search']
    if (arr.includes(ctx.url) || ctx.url.includes('/classification') || ctx.url.includes('/goods/one')) {

      await next()
      return
    }
    ctx.body = {
      msg: '请登录',
      status: -1
    }
  } else {
    await next()
  }
})



// routes
app.use(index.routes(), index.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
