var http=require('http');
var router=require('./router.js');

http.createServer(function(req,res){
  res.setHeader('content-type','text/html;charset=utf-8');
  if(req.url=='/favicon.ico'){
    return ;
  }
  if(req.url=='/'){
    router.showIndex(req,res)
    // res.end(router.showIndex());
    return ;
  }
  if(req.url=='/info'){
    router.showInfo(req,res)
    // res.end(router.showInfo());
    return ;
  }
  router.showErr(req,res);
  // res.end(router.showErr());
}).listen(4000)