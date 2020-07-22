const fd=require('formidable');
const fs=require('fs')
const http=require('http')

http.createServer(function(req,res){
  if(req.url=='/tijiao' && req.method.toLowerCase()=='post'){
    //获取表单对象
    // const form = fd({ multiples: true });
    const form =fd();
    //设置上传文件临时保存的路径
    form.uploadDir='./uploads';
    /*
    form.pars()解析请求对象 获取其中的数据
    err:错误信息 解析出错
    fields：解析得到的表单中的文本域的内容
    files：解析得到的表单中上传的文件(文件默认保存在c盘) windows系统不允许跨盘符操作 
    */ 
    form.parse(req, (err, fields, files) => {
      console.log(fields)
      console.log(files.pic.path);
      // res.end('over');
      //修改上传文件的名称
      //如果一次性上传多个文件 可以遍历files 进行改名操作
      var oldName=files.pic.path;
      var newName=files.pic.name;
      newName='./uploads/'+newName;
      //改名 fs.rename()异步方法
      fs.rename(oldName,newName,function(err){
        console.log(err)
        res.end('rename over')
      })
    });
    return ;
  }
  fs.readFile('./01.html',function(err,data){
    if(err){
      res.end('read file error')
      return ;
    }
    res.end(data)
  })
}).listen(4000)