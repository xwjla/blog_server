const sqldb = require('../utils/sqldb')
const toolApi = require('../utils/api')
const lottery = {
  async getLotteryResult(ctx) {
    let params = [ctx.u_id]
    let sql = 'SELECT * from lottery where u_id = ?'
    let result = ''
    result = await sqldb.query(sql,params)
    return result
  },
  async getAllResult(ctx) {
    let params = [1]
    let sql = 'SELECT lottery.u_id,lottery.id,lottery.selectNum,lottery.create_time,userInfo.real_name from lottery left join userInfo on lottery.u_id = userInfo.u_id where id not in(?)'
    let result = ''
    result = await sqldb.query(sql,params)
    return result
  },
  async hasLottery(ctx){
    let sql3 = 'select * from lottery where u_id = ?'
    let params3 = [ctx.u_id]
    let rrr = await sqldb.query(sql3,params3)
    return rrr
  },
  async saveLotteryResult(ctx){

    let sql1 = 'select * from lottery where id = 1'
    let str = await sqldb.query(sql1)



    let arr = str[0].selectNum.split(',')
    const index = Math.floor((Math.random()*arr.length));
    let selectNum = arr[index]
    const id = toolApi.toolApi.guid()
    const Time = Date.parse(new Date())
    let sql = 'insert into lottery(id,u_id,selectNum,create_time) values (?,?,?,?)'
    let params = [id,ctx.u_id,selectNum,Time]
    let result1 = await sqldb.query(sql,params)
    let sql12 = 'update lottery set selectNum = ? where id = ?'
    arr.splice(index,1)
    let str2 = arr.join(',')
    let params2 = [str2,'1']
    let result5 = await sqldb.query(sql12,params2)
    let result = {
      result1:result1,
      result2:selectNum
    }
    return result
  }
}

module.exports = lottery