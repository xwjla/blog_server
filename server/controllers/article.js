const sqldb = require('../utils/sqldb')
const toolApi = require('../utils/api')
const article = {
  async getArticle(ctx){
    let params = [ctx.u_id]
    /*let sql = 'select * from article'
    if(ctx.u_id != null){
      sql += ' where u_id = ? order by create_time desc'
    }else{
      sql += ' order by create_time'
    }*/
    let sql = ''
    let str = 'SELECT article.id, article.u_id, article.article_title, article.article_tag_id,article.article_text,article.create_time,tag.name as tag_name,userInfo.user_name,userInfo.avater,userInfo.real_name,(select count(`article_id`) from articleComment where article.id = articleComment.`article_id`) as comment_count FROM article LEFT JOIN tag ON article.article_tag_id=tag.id LEFT JOIN userInfo ON article.u_id=userInfo.u_id'
    let result = ''
    if(params[0]!=''){
      sql = str + ' where article.u_id = ? and ( article.private not in(1) or article.private is null ) order by create_time DESC'
      result = await sqldb.query(sql,params)
    }else{
      sql = str + ' where article.private not in(1) or article.private is null order by create_time DESC'
      result = await sqldb.query(sql)
    }
    //let sql = 'SELECT article.id, article.u_id, article.article_title, article.article_tag_id,article.article_text,article.article_content,article.create_time,tag.name FROM article INNER JOIN tag ON article.article_tag_id=tag.id where article.u_id = ? order by create_time'

    return result
  },
  async getArticleById(ctx){    //查询文章详情
    let params = [ctx.id]
    let sql = 'SELECT article.id, article.u_id, article.article_title, article.article_tag_id,article.article_text,article.article_content,article.create_time,tag.name as tag_name,userInfo.real_name,userInfo.user_name,userInfo.avater FROM article LEFT JOIN tag ON article.article_tag_id=tag.id LEFT JOIN userInfo ON article.u_id = userInfo.u_id where article.id = ?'
    //let sql = 'select * from article where id = ?'
    let result1 = await sqldb.query(sql,params)
    let sql2 = 'select COUNT(*) as count from userFollow where u_id = ? and f_id=?'
    let params2 = [ctx.u_id,result1[0].u_id]
    let result2 = await sqldb.query(sql2,params2)
    console.log(result2[0].count)
    let result3 = {}
    return result3 = {
      result1:result1,
      result2:result2[0].count
    }
  },
  async collectArticle(ctx,ctxParam){
    const u_id = ctx.state.user._id
    let params = [u_id,ctxParam.article_id]
    let sql = 'select count(*) as count from collection where u_id=? and article_id = ?'
    let result = await sqldb.query(sql,params)
    let result1 = ''
    if(result[0].count == 0){
      let sql1 = 'insert into collection(id,u_id,article_id,create_time) values (?,?,?,?)'
      const id = toolApi.toolApi.guid()
      const Time = Date.parse(new Date())
      let params1 = [id,u_id,ctxParam.article_id,Time]
      result1 = await sqldb.query(sql1,params1)
    }else{
      let sql1 = 'delete from collection where article_id = ? and u_id = ?'
      let params1 = [ctxParam.article_id,u_id]
      result1 = await sqldb.query(sql1,params1)
    }
    return result1
  },
  async saveArticleTag(ctx){
    const id = toolApi.toolApi.guid()
    let params = [id,ctx.name,ctx.u_id]
    //let sql = 'insert into article(id,u_id,article_title,article_tag_id,article_text,article_content,create_time) values(?,?,?,?,?,?,?)'
    let sql = 'insert into tag(id,name,u_id) values(?,?,?)'
    let result = await sqldb.query(sql,params)
    result.tag_id = id
    return result
  },
  async getCountCollectArticle(ctx){    //查询该文章被多少人收藏过
    let sql = 'select count(*) as count from collection where article_id = ?'
    let params = [ctx.id]
    let result = await sqldb.query(sql,params)
    return result
  },
  async hasCollect(ctx){
    let sql = 'select count(*) as count from collection where u_id = ? and article_id = ?'
    let params = [ctx.u_id,ctx.id]
    let result = await sqldb.query(sql,params)
    return result
  },
  async commentSave(ctx){
    const id = toolApi.toolApi.guid()
    const Time = Date.parse(new Date())
    let sql = 'insert into articleComment(id,article_id,parent_id,u_id,content,create_time,res_u_id) values(?,?,?,?,?,?,?)'
    let params = [id,ctx.article_id,ctx.parent_id,ctx.u_id,ctx.content,Time,ctx.res_u_id]
    let result = await sqldb.query(sql,params)
    return result
  },
  async getCommentList(ctx){
    let sql = 'select articleComment.id,articleComment.u_id,articleComment.res_u_id,articleComment.content,articleComment.create_time,if(ISNULL(articleComment.parent_id)||(LENGTH(trim(articleComment.parent_id))=0),"0",`parent_id`) AS `parent_id`,articleComment.article_id,userInfo.real_name,userInfo.user_name,userInfo.avater,b.real_name as res_real_name from articleComment left join userInfo on articleComment.u_id = userInfo.u_id left join userInfo as b on articleComment.res_u_id = b.u_id where article_id = ? order by create_time DESC'
    let params = [ctx.article_id]
    let result = await sqldb.query(sql,params)
    return result
  },
  async deleteComment(ctx){
    let sql = 'delete from articleComment where u_id = ? and id = ?'
    let params = [ctx.token._id,ctx.id]
    let result = await sqldb.query(sql,params)
    return result
  },
  async getCollection(ctx){
    let sql = 'SELECT article.id, article.u_id, article.article_title, article.article_tag_id,article.article_text,article.create_time,tag.name as tag_name,userInfo.user_name,userInfo.avater,userInfo.real_name,(select count(`article_id`) from articleComment where article.id = articleComment.`article_id`) as comment_count FROM article LEFT JOIN tag ON article.article_tag_id=tag.id LEFT JOIN userInfo ON article.u_id=userInfo.u_id where article.id in(select article_id from collection where u_id=?)'
    let params = [ctx.u_id]
    let result = await sqldb.query(sql,params)
    return result
  },
  async getArticleList(ctx){
    let params = [ctx]
    let sql = 'SELECT article.id, article.u_id, article.article_title, article.article_tag_id,article.article_text,article.create_time,tag.name as tag_name,userInfo.user_name,userInfo.avater,userInfo.real_name,(select count(`article_id`) from articleComment where article.id = articleComment.`article_id`) as comment_count FROM article LEFT JOIN tag ON article.article_tag_id=tag.id LEFT JOIN userInfo ON article.u_id=userInfo.u_id where article.id in(select article_id from collection where u_id=?)'
    let result = await sqldb.query(sql,params)
    return result
  },
  async getArticleByTags(ctx){
    let params = [ctx]
    let sql = 'SELECT article.id, article.u_id, article.article_title, article.article_tag_id,article.article_text,article.create_time,tag.name as tag_name,userInfo.user_name,userInfo.avater,userInfo.real_name,(select count(`article_id`) from articleComment where article.id = articleComment.`article_id`) as comment_count FROM article LEFT JOIN tag ON article.article_tag_id=tag.id LEFT JOIN userInfo ON article.u_id=userInfo.u_id where article.article_tag_id = ?'
    let result = await sqldb.query(sql,params)
    return result
  }
}

module.exports = article
