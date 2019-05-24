const cLottery = require('../controllers/lottery')
const lottery = {
  async getLotteryResult(ctx){
    const form = ctx.request.query
    let result = await cLottery.getLotteryResult(form)
    let rResult = {}
    let result1 = {}
    if(result.length == 0){
      console.log(result)
      result1.hasChance = 1
    }else{
      result1 = result[0]
      result1.hasChance = 0
    }
    rResult = {
      data:result1,
      code: '200',
      msg: '查询成功'
    }
    return rResult
  },
  async saveLotteryResult(ctx){
    const form = ctx.request.body
    let hasLottery = await cLottery.hasLottery(form)
    if(hasLottery.length == 0){
      let result = await cLottery.saveLotteryResult(form)
      let rResult = {}
      rResult = {
        data:result.result2,
        code: '200',
        msg: '查询成功'
      }
      return rResult
    }else{
      let rResult = {
        code: '100',
        msg: '您已经抽过签了！'
      }
      return rResult
    }
  },
  async getAllResult(ctx){
    const form = ctx.request.query
    let result = await cLottery.getAllResult(form)
    rResult = {
      data:result,
      code: '200',
      msg: '查询成功'
    }
    return rResult
  }
}

module.exports = lottery