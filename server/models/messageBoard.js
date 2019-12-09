const cMessageBoard = require('../controllers/messageBoard')

const messageBoard = {
  async addMessageBoard(ctx){
    const form = ctx.request.body
    let result = await cMessageBoard.addMessageBoard(form)
    let rResult = {}
    rResult = {
      code: '200',
      msg: '添加成功'
    }
    return rResult
  },
  async getMessageBoard(ctx){
    const form = ctx.request.query
    let result = await cMessageBoard.getMessageBoard(form)
    let rResult = {}
    rResult = {
      data:result,
      code:'200',
      msg:'查询成功'
    }
    return rResult
  }
}

module.exports = messageBoard