const router = require('koa-router')()
const fs = require('fs')
const path = require('path')

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
router.get('/uploadFile1',async(ctx)=>{
  ctx.body={
    msg:'ceshi'
  }
})

module.exports = router