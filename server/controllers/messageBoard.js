const sqldb = require('../utils/sqldb')
const toolApi = require('../utils/api')

const messageBoard = {
  async addMessageBoard(ctx){
    let sql = 'insert into messageBoard(id,userName,email,content,createTime) values(?,?,?,?,?)'
    const id = toolApi.toolApi.guid()
    const Time = Date.parse(new Date())
    let params = [id,ctx.userName,ctx.email,ctx.content,Time]
    let result = await sqldb.query(sql,params)
    return result
  },
  async getMessageBoard(ctx){
    let sql = 'select id,userName,email,content,createTime from messageBoard order by createTime DESC'
    let result = await sqldb.query(sql)
    return result
  },
  async getWxToken(){
    let sql = 'select id,wx_token,create_time from wxToken'
    let result = await sqldb.query(sql)
    return result
  },
  async saveWxToken(ctx){
    const Time = Date.parse(new Date())
    let sql = 'UPDATE wxToken SET wx_token="'+JSON.parse(ctx).access_token+'",create_time="'+Time+'"'
    let result = await sqldb.query(sql)
    return result
  }
}

module.exports = messageBoard