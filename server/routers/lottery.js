const router = require('koa-router')()
const lottery = require('../models/lottery')
router.prefix('/lottery')
router.get('/getLotteryResult',async(ctx,next) =>{
  let result = await lottery.getLotteryResult(ctx);
  ctx.body = result;
})
router.post('/saveLotteryResult',async(ctx,next) =>{
  let result = await lottery.saveLotteryResult(ctx);
  ctx.body = result;
})
router.get('/getAllResult',async(ctx,next) =>{
  let result = await lottery.getAllResult(ctx);
  ctx.body = result;
})

module.exports = router