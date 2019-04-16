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
    let sql = 'SELECT article.id, article.u_id, article.article_title, article.article_tag_id,article.article_text,article.article_content,article.create_time,tag.name FROM article INNER JOIN tag ON article.article_tag_id=tag.id where article.u_id = ? order by create_time'
    let result = await sqldb.query(sql,params)
    return result
  },
  async getArticleById(ctx){
    let params = [ctx.id]
    let sql = 'SELECT article.id, article.u_id, article.article_title, article.article_tag_id,article.article_text,article.article_content,article.create_time,tag.name FROM article INNER JOIN tag ON article.article_tag_id=tag.id where article.id = ?'
    //let sql = 'select * from article where id = ?'
    let result = await sqldb.query(sql,params)
    return result
  },
  async saveArticleTag(ctx){
    const id = toolApi.toolApi.guid()
    let params = [id,ctx.name,ctx.u_id]
    //let sql = 'insert into article(id,u_id,article_title,article_tag_id,article_text,article_content,create_time) values(?,?,?,?,?,?,?)'
    let sql = 'insert into tag(id,name,u_id) values(?,?,?)'
    let result = await sqldb.query(sql,params)
    return result
  }
}

module.exports = article
