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
router.post('/editUserAvater',async (ctx,next) => {
  const result = await getUserInfo.editUserAvater(ctx)
  ctx.body = result
})
router.get('/getTag',async (ctx,next) => {
  const result = await getUserInfo.getTag(ctx)
  ctx.body = result
})
router.post('/follow',async (ctx,next) => {   //加关注
  const result = await getUserInfo.follow(ctx)
  ctx.body = result
})
router.post('/publish',async (ctx,next) => {
  const result = await getUserInfo.publish(ctx)
  ctx.body = result
})
router.get('/getUserBasicInfo',async (ctx,next) => {
  const result = await getUserInfo.getUserBasicInfo(ctx)
  ctx.body = result
})
router.get('/needless/getFollowerList',async (ctx,next) => {   //带needless前缀的表示不需要token校验
  const result = await getUserInfo.getFollowerList(ctx)
  ctx.body = result
})
router.get('/needless/getFollowingList',async (ctx,next) => {   //带needless前缀的表示不需要token校验
  const result = await getUserInfo.getFollowingList(ctx)
  ctx.body = result
})


module.exports = router
