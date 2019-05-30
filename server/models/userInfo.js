const sqldb = require('../utils/sqldb')
const cUserinfo = require('../controllers/userInfo')
const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');

const userInfo = {
	async getUserInfo (args){
		let sql = 'SELECT * FROM userInfo'
		let result = await sqldb.query(sql)
		let data = {
			data:result,
			msg:'success',
			code:'200'
		}
		return data
	},
	async login (ctx){
    const form = ctx.request.body
    let result = await cUserinfo.login(form)
    let rResult = {}
    if(result.length == 0){
      rResult.msg = '用户名错误';
      rResult.code = '100';
    }else if(result.length == 1 && result[0].password == form.password){
      const token = jwt.sign({
        name: form.userName,
        _id: result[0].u_id
      }, 'my_token', { expiresIn: '2h' });
      rResult.msg = '登录成功';
      rResult.data = {
        token:token,
        userName:result[0].user_name,
        u_id:result[0].u_id,
        realName:result[0].real_name,
        avater:result[0].avater
      }
      rResult.code = '200';
    }else if(result.length == 1 && result[0].password != form.password){
      rResult.msg = '密码错误';
      rResult.code = '100';
    }
    return rResult
  },
  async getTag(ctx){
    const form = ctx.request.query
    const token = ctx.state.user
    console.log(token)
    let result = await cUserinfo.getTag(form)
    let data = {
      data:result,
      msg:'success',
      code:'200'
    }
    return data
  },
  async getUserBasicInfo(ctx){
	  let form = ctx.request.query
    let result = await cUserinfo.getUserBasicInfo(form.u_id)
    let followNum = await cUserinfo.followNum(form)

    if(form.token !=''){
	    form.token = jwt_decode(form.token)
	    let hasFollowed = await cUserinfo.hasFollowed(form)
      result.hasFollowed = hasFollowed[0].count
    }else{
      result.hasFollowed = 1
    }
    result.following = followNum[0].count
    result.follower = followNum[1].count
    let data = {
      data:result,
      msg:'success',
      code:'200'
    }
    return data
  },
  async publish(ctx){
    const form = ctx.request.body
    let result = await cUserinfo.publish(form)
    let rResult = {}
    rResult.msg = '发布成功';
    rResult.code = '200';
    return rResult
  },
  async follow(ctx){
    const form = ctx.request.body
    let result = await cUserinfo.follow(form)
    let rResult = {}
    rResult.msg = '操作成功';
    rResult.code = '200';
    return rResult
  },
  async register (ctx){
	  const form = ctx.request.body
    let result = await cUserinfo.getUserInfoByPhone(form.userName)
    let rResult = {}
    if(result.length == 1){
      rResult.msg = '账号已存在';
      rResult.code = '100';
    }else{
      let result = await cUserinfo.register(form)
      rResult.msg = '注册成功';
      rResult.code = '200';
    }
    return rResult
  },
  async editUserAvater (ctx){
    const form = ctx.request.body
    let result = await cUserinfo.editUserAvater(form)
    let rResult = {}
    rResult.msg = '编辑成功';
    rResult.code = '200';
    return rResult
  },
  async getFollowerList (ctx){
    const form = ctx.request.query
    let result = await cUserinfo.getFollowerList(form)
    console.log(result)
    for(let item in result){
      //result[item].token=''
      console.log(result[item])
      let obj = await cUserinfo.getUserBasicInfo(result[item].f_id)
      console.log(obj)
      result[item].followerInfo = obj
    }
    let data = {
      data:result,
      msg:'success',
      code:'200'
    }
    return data
  },
  async getFollowingList (ctx){
    const form = ctx.request.query
    let result = await cUserinfo.getFollowingList(form)
    console.log(result)
    for(let item in result){
      //result[item].token=''
      console.log(result[item])
      let obj = await cUserinfo.getUserBasicInfo(result[item].u_id)
      console.log(obj)
      result[item].followerInfo = obj
    }
    let data = {
      data:result,
      msg:'success',
      code:'200'
    }
    return data
  }
}

module.exports = userInfo