const router = require('koa-router')()
const getUserInfo = require('../models/userInfo')

router.prefix('/users')

router.get('/', async (ctx, next) => {
	let result = await getUserInfo.getUserInfo(ctx);
  ctx.body = result;
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

router.post('/login',async (ctx,next) => {
  const result = await getUserInfo.login(ctx)
  ctx.body = result
})
router.post('/register',async (ctx,next) => {
  const result = await getUserInfo.register(ctx)
  ctx.body = result
})
router.get('/getTag',async (ctx,next) => {
  const result = await getUserInfo.getTag(ctx)
  ctx.body = result
})
router.get('/getTagTest',async (ctx,next) => {
  ctx.body = {
    msg:'ceshi'
  }
})
router.post('/publish',async (ctx,next) => {
  const result = await getUserInfo.publish(ctx)
  ctx.body = result
})


module.exports = router
