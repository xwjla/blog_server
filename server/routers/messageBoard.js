const router = require('koa-router')()
const messageBoard = require('../models/messageBoard')
router.prefix('/messageBoard')
router.get('/needless/getMessageBoard',async(ctx,next) => {
  let result = await messageBoard.getMessageBoard(ctx)
  ctx.body = result
})
router.post('/needless/addMessageBoard',async(ctx,next) => {
  let result = await messageBoard.addMessageBoard(ctx)
  ctx.body = result
})

module.exports = router