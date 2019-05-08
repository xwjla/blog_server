const router = require('koa-router')()
const fs = require('fs')
const path = require('path')
const qiniu = require('qiniu')

router.post('/uploadFile',async(ctx)=>{
  const file = ctx.request.files.file;    // 获取上传文件

  const reader = fs.createReadStream(file.path);
  const ext = file.name.split('.').pop();		// 获取上传文件扩展名
  let url =  `/upload/${(Math.random()).toString().substring(3)}.${ext}`
  let filePath = path.join(__dirname, '../../public/') + url;

  const upStream = fs.createWriteStream(filePath);
  // 创建可写流
  //const upStream = fs.createWriteStream(filePath);
  // 可读流通过管道写入可写流
  reader.pipe(upStream);
  ctx.body = {
    code:200,
    data:{
      imgUrl:url
    },
    mag:"上传成功！"
  };
})
router.get('/qiniuUpload', async (ctx, next) => {
  const bucket = 'xuweijin'
  const accessKey = 'vGv2TJUZpDFKvQLJfkO8rT-XiCI7jBwAlgzCcyJl'
  const secretKey = 'A8iPK4KmH_4b6ceFOQxQFtlmRFBeFYEnY_6n2_BR'

  const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
  const policyParams = { scope: bucket }
  const putPolicy = new qiniu.rs.PutPolicy(policyParams);
  const uploadToken = putPolicy.uploadToken(mac);
  ctx.body = {
    code:200,
    data:{qiniuToken:uploadToken},
    msg:'获取token成功'}
})
router.get('/uploadFile1',async(ctx)=>{
  ctx.body={
    msg:'ceshi'
  }
})

module.exports = router