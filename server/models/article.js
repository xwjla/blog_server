const cArticle = require('../controllers/article')
const article = {
  async getArticle(ctx){
    const form = ctx.request.query
    let result = await cArticle.getArticle(form)
    let rResult = {}
    rResult = {
      data:result,
      code: '200',
      msg: '查询成功'
    }
    return rResult
  },
  async getArticleById(ctx){
    const form = ctx.request.query
    let result = await cArticle.getArticleById(form)
    let result3 = result.result1[0]
    console.log(result)
    if(result.result2 == 0){
      result3.hasFollowed = 0
    }else{
      result3.hasFollowed = 1
    }
    let rResult = {}
    rResult = {
      data:result3,
      code: '200',
      msg: '查询成功'
    }
    return rResult
  },
  async saveArticleTag(ctx){
    const form = ctx.request.body
    let result = await cArticle.saveArticleTag(form)
    let rResult = {}
    rResult = {
      code: '200',
      msg: '添加成功'
    }
    return rResult
  }
}

module.exports = article