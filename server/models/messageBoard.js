const cMessageBoard = require('../controllers/messageBoard')
const request = require('request')

const messageBoard = {
  async addMessageBoard(ctx){
    const form = ctx.request.body
    let result1 = await cMessageBoard.getWxToken()
    var options = {
      uri: 'https://api.weixin.qq.com/wxa/msg_sec_check?access_token='+result1[0].wx_token,
      method: 'POST',
      json: {"content":form.content }
    };
    let rResult = {}
    return new Promise(resolve => {
      request(options,(error,res,body) => {
        if(body.errcode === 0){
          cMessageBoard.addMessageBoard(form).then(()=>{
            rResult = {
              code: '200',
              msg: '添加成功'
            }
            resolve(rResult)
          })
        }else{
          rResult = {
            code: '100',
            msg: '内容违规，请重新编辑后提交~'
          }
          resolve(rResult)
        }
      })
    }).then(rResult => {
      return rResult
    })

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
  },
  async getWxToken(){
    request('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx34b5961b7a841a40&secret=0326e8f05c685795a8719e1f66b2b39f',(error,res,body) => {
      if (!error && res.statusCode == 200) {
        cMessageBoard.saveWxToken(body)
      }
    })
  }
}
setInterval(messageBoard.getWxToken,
  6200000
  )


module.exports = messageBoard