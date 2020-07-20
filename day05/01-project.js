//创建服务器 启动监听 
//当访问时 返回index.html 页面的内容

var http=require('http');
var fs=require('fs');
http.createServer(function(req,res){
  // res.setHeader('content-type',"text/html;charset=utf-8");
  if(req.url=='/favicon.ico'){
    return ;
  } 
  var url=req.url;
  // console.log(url);
  if(url=='/'){
    url='/index.html'
  }
  fs.readFile('./project'+url,function(err,data){
    if(err){
      console.log(err);
      res.end('读取页面错误');
    }
    res.end(data);
  })
}).listen(4000);