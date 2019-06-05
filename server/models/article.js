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
    let collectCount = await cArticle.getCountCollectArticle(form)
    if(form.u_id == ''){
      result3.hasCollect = 0
    }else {
      let count = await cArticle.hasCollect(form)
      result3.hasCollect = count[0].count
    }
    console.log(result)
    if(result.result2 == 0){
      result3.hasFollowed = 0
    }else{
      result3.hasFollowed = 1
    }
    result3.collectCount = collectCount[0].count
    let rResult = {}
    rResult = {
      data:result3,
      code: '200',
      msg: '查询成功'
    }
    return rResult
  },
  async collectArticle(ctx){
    const form = ctx.request.body
    let result = await cArticle.collectArticle(ctx,form)
    let rResult = {}
    rResult = {
      code: '200',
      msg: '操作成功'
    }
    return rResult
  },
  async saveArticleTag(ctx){
    const form = ctx.request.body
    let result = await cArticle.saveArticleTag(form)
    console.log(result)
    let rResult = {}
    rResult = {
      data:{
        tag_id:result.tag_id
      },
      code: '200',
      msg: '添加成功'
    }
    return rResult
  },
  async commentSave(ctx){
    const form = ctx.request.body
    let result = await cArticle.commentSave(form)
    let rReuslt = {
      code:'200',
      msg:'评论成功'
    }
    return rReuslt
  },
  async getCommentList(ctx){
    const form = ctx.request.query
    let result = await cArticle.getCommentList(form)
    let arr = []
    result.forEach((item,index)=>{
      item.child = []
      if(item.parent_id == '0'){
        arr.push(item)
      }
    })
    result.forEach((item,index)=>{
      arr.forEach((option,index)=>{
        if(option.id == item.parent_id){
          option.child.unshift(item)
        }
      })
    })
    let rResult = {}
    rResult = {
      data:arr,
      code: '200',
      msg: '查询成功'
    }
    return rResult
  },
  async deleteComment(ctx){
    const form = ctx.request.body
    form.token = ctx.state.user
    let result = await cArticle.deleteComment(form)
    let rResult = {}
    rResult = {
      code: '200',
      msg: '删除成功'
    }
    return rResult
  },
  async getCollection(ctx){
    const form = ctx.request.query
    let result = await cArticle.getCollection(form)
    let rResult = {}
    rResult = {
      data:result,
      code: '200',
      msg: '成功'
    }
    return rResult
  },
  async getArticleByTags(ctx){
    const form = ctx.request.query
    let result = await cArticle.getArticleByTags(form.id)
    let rResult = {}
    rResult = {
      data:result,
      code: '200',
      msg: '成功'
    }
    return rResult
  },
  async deleteArticle(ctx){
    const form  = ctx.request.body
    form.token = ctx.state.user
    let result = await cArticle.deleteArticle(form)
    let rResult = {}
    rResult = {
      code: '200',
      msg: '删除成功'
    }
    return rResult
  }
}

module.exports = article