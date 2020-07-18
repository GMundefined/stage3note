var http = require("http");
var fs =require('fs');

http.createServer(function(req,res){
  if(req.url=="/favicon.ico"){
    return ;
  }
  res.setHeader("content-type","text/html;charset=utf-8");
  if(req.url=="/xiaoming"){
    res.end("Hello ,I'm 小明")
    return ;
  }
  if(req.url=="/xiaohong"){
    res.end("Hello ,I'm 小红")
    return ;
  }

  fs.readFile("day03-lianxi03.html",function(err,data){
    if(err){
      res.end("ERROR")
      return;
    }
    res.end(data)
  })

}).listen(4000)