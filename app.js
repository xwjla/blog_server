const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const koajwt = require('koa-jwt');
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-session')
const cors = require('koa2-cors');
const koaBody = require('koa-body')

const index = require('./server/routers/index')
const users = require('./server/routers/users')
const article = require('./server/routers/article')
const upload = require('./server/routers/upload')
const lottery = require('./server/routers/lottery')

app.keys = ['this is my secret and fuck you all'];

app.use((ctx, next) => {
  return next().catch((err) => {
    console.log(err.status)
    if(err.status === 401){
      ctx.status = 401;
      ctx.body = {msg:'token失效',code:401,state: 'error'};
    }else{
      throw err;
    }
  })
})
app.use(cors());

app.use(koajwt({
  secret: 'my_token'
}).unless({
  path: [/^\/users\/login|upload|users\/register/,'/article/getArticleById','/article/getArticle','/users/getUserBasicInfo','/lottery/getAllResult']
}))

app.use(session({
  key: 'koa:sess', /** cookie的名称，可以不管 */
  maxAge: 7200000, /** (number) maxAge in ms (default is 1 days)，cookie的过期时间，这里表示2个小时 */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
},app));

// error handler
onerror(app)

app.use(koaBody({
  multipart:true
  }
))

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/server/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(article.routes(), article.allowedMethods())
app.use(upload.routes(), upload.allowedMethods())
app.use(lottery.routes(), lottery.allowedMethods())



// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
