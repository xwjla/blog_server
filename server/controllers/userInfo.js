const sqldb = require('../utils/sqldb')
const toolApi = require('../utils/api')

const userInfo = {
  async login(ctx){
    let s_userInfo = await this.getUserInfoByPhone(ctx.userName)
    return s_userInfo
  },
  async getUserInfoByPhone(args){
    let sql = 'select *from userInfo where user_name = ?'
    let params = [args]
    let result = await sqldb.query(sql,params)
    return result
  },
  async publish(args){
    let sql = 'insert into article(id,u_id,article_title,article_tag_id,article_text,article_content,create_time) values(?,?,?,?,?,?,?)'
    const id = toolApi.toolApi.guid()
    const Time = Date.parse(new Date())
    let params = [id,args.u_id,args.article_title,args.article_tag_id,args.article_text,args.article_content,Time]
    let result = await sqldb.query(sql,params)
    return result
  },
  async getTag(args){
    let sql = 'select *from tag where u_id = ?'
    let params = [args.u_id]
    let result = await sqldb.query(sql,params)
    return result
  },
  async register(ctx){
    let sql = 'insert into userInfo(u_id,user_name,real_name,password,createTime) values (?,?,?,?,?)'
    const id = toolApi.toolApi.guid()
    const Time = Date.parse(new Date())
    let params = [id,ctx.userName,ctx.realName,ctx.password,Time]
    let result = await sqldb.query(sql,params)
    return result
  }
}
module.exports = userInfo