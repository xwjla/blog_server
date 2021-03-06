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
    let sql = ''
    let params = ''
    if(args.type == 'create'){
      sql = 'insert into article(id,u_id,article_title,article_tag_id,article_text,article_content,create_time) values(?,?,?,?,?,?,?)'
      const id = toolApi.toolApi.guid()
      const Time = Date.parse(new Date())
      params = [id,args.u_id,args.article_title,args.article_tag_id,args.article_text,args.article_content,Time]
    }else{
      sql = 'update article set article_title=?,article_tag_id=?,article_text=?,article_content=?,update_time=? where id=?'
      const Time = Date.parse(new Date())
      params = [args.article_title,args.article_tag_id,args.article_text,args.article_content,Time,args.id]
    }
    let result = await sqldb.query(sql,params)
    return result
  },
  async getTag(args){
    let sql = 'select tag.id,tag.name,tag.u_id,(select count(id) from article where tag.id = article.article_tag_id and ( article.private not in(1) or article.private is null )) as article_count from tag where u_id = ?'
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
  },
  async follow(ctx){
    let sql1 = 'select COUNT(*) as count from userFollow where u_id = ? and f_id=?'
    let params1 = [ctx.u_id,ctx.f_id]
    let result1 = await sqldb.query(sql1,params1)
    let result = ''
    if(result1[0].count == 0){
      let sql = 'insert into userFollow(id,u_id,f_id,create_time) values (?,?,?,?)'
      const id = toolApi.toolApi.guid()
      const Time = Date.parse(new Date())
      let params = [id,ctx.u_id,ctx.f_id,Time]
      result = await sqldb.query(sql,params)
      let sql3 = 'select COUNT(*) as count,id from notice where user_id = ? and sender_id=? and type=?'
      let params3 = [ctx.f_id,ctx.u_id,'follow']
      let result3 = await sqldb.query(sql3,params3)
      if(result3[0].count == 0){  //如果之前没关注过，插入一条
        const id1 = toolApi.toolApi.guid()
        const Time1 = Date.parse(new Date())
        let sql2 = 'insert into notice(id,content,type,is_read,user_id,sender_id,target_id,target_type,create_time) values (?,?,?,?,?,?,?,?,?)'   //往消息表里插入一条数据
        let params2 = [id1,' ','follow','0',ctx.f_id,ctx.u_id,' ',' ',Time1]
        let result2 = await sqldb.query(sql2,params2)
      }else{    //之前关注过，只更新时间
        let sql2 = 'update notice set create_time=? and is_read = ? where id=?'
        const Time1 = Date.parse(new Date())
        let params2 = [Time1,'0',result3[0].id]
        let result2 = await sqldb.query(sql2,params2)
      }
      console.log(global)
      global.io.emit(ctx.f_id, {cccc: 1});
    }else{
      let sql = 'delete from userFollow where u_id=? and f_id=?'
      let params = [ctx.u_id,ctx.f_id]
      result = await sqldb.query(sql,params)
    }

    return result
  },
  async editUserAvater(ctx){
    //let sql = 'insert into userInfo(u_id,user_name,real_name,password,createTime) values (?,?,?,?,?)'
    console.log(ctx)
    let sql = 'UPDATE userInfo SET avater="'+ctx.avater+'" WHERE u_id="'+ctx.u_id+'"';
    console.log(sql)
    let result = await sqldb.query(sql)
    return result
  },
  async getUserBasicInfo(ctx){   //获取用户基本信息
    let sql = 'select u_id,user_name,real_name,avater from userInfo where u_id = ?'
    let params = [ctx]
    let result = await sqldb.query(sql,params)
    return result[0]
  },
  async hasFollowed(ctx){
    let sql1 = 'select COUNT(*) as count from userFollow where u_id = ? and f_id=?'
    let params1 = [ctx.token._id,ctx.u_id]
    let result1 = await sqldb.query(sql1,params1)
    return result1
  },
  async followNum(ctx){
    let sql = 'select count(*) as count from userFollow where u_id = ? union all select count(*) as count from userFollow where f_id = ?'
    let params = [ctx.u_id,ctx.u_id]
    let result = await sqldb.query(sql,params)
    return result
  },
  async getFollowerList(ctx){
    let sql = 'select * from userFollow where u_id = ?'
    let params = [ctx.u_id]
    let result = await sqldb.query(sql,params)
    return result
  },
  async getFollowingList(ctx){
    let sql = 'select * from userFollow where f_id = ?'
    let params = [ctx.u_id]
    let result = await sqldb.query(sql,params)
    return result
  }
}
module.exports = userInfo