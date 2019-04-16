const router = require('koa-router')()
const article = require('../models/article')
router.prefix('/blogApi/article')
router.get('/getArticle',async(ctx,next) =>{
  let result = await article.getArticle(ctx);
  ctx.body = result;
})
router.get('/getArticleById',async(ctx,next) =>{
  let result = await article.getArticleById(ctx);
  ctx.body = result;
})
router.post('/saveArticleTag',async(ctx,next) => {
  let result = await article.saveArticleTag(ctx);
  ctx.body = result;
})
module.exports = router