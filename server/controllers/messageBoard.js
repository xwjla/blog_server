const sqldb = require('../utils/sqldb')
const toolApi = require('../utils/api')

const messageBoard = {
  async addMessageBoard(ctx){
    let sql = 'insert into messageBoard(id,userName,email,content,createTime) values(?,?,?,?,?)'
    const id = toolApi.toolApi.guid()
    const Time = Date.parse(new Date())
    let params = [id,ctx.userName,ctx.email,ctx.content,Time]
    let result = await sqldb.query(sql,params)
    console.log(result)
    return result
  },
  async getMessageBoard(ctx){
    let sql = 'select id,userName,email,content,createTime from messageBoard order by createTime DESC'
    let result = await sqldb.query(sql)
    return result
  }
}

module.exports = messageBoard