const router = require('koa-router')()
const article = require('../models/article')
router.prefix('/article')
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
router.post('/collectArticle',async(ctx)=>{
  let result = await article.collectArticle(ctx);
  ctx.body = result;
})
router.post('/commentSave',async(ctx)=>{
  let result = await article.commentSave(ctx);
  ctx.body = result;
})
router.get('/getCommentList',async(ctx)=>{
  let result = await article.getCommentList(ctx);
  ctx.body = result;
})
router.get('/needless/getCollection',async(ctx)=>{
  let result = await article.getCollection(ctx);
  ctx.body = result;
})
router.get('/needless/getArticleByTags',async(ctx)=>{   //根据标签查询文章列表
  let result = await article.getArticleByTags(ctx);
  ctx.body = result;
})
router.post('/deleteComment',async(ctx)=>{
  let result = await article.deleteComment(ctx);
  ctx.body = result;
})
router.post('/deleteArticle',async(ctx)=>{
  let result = await article.deleteArticle(ctx);
  ctx.body = result;
})
module.exports = router