var http=require('http');
var fs=require('fs');
var url=require('url');

http.createServer(function(req,res){
  if(req.url=='/favicon.ico'){
    return ;
  }
  res.setHeader('content-type','text/html;charset=utf-8');
  fs.readFile('./lianxi04.html',function(err,data){
    if(err){
      res.end('文件读取错误');
      return ;
    }
    res.end(data);
  });
  var urlObj=url.parse(req.url,true);
  var path=urlObj.pathname;
  var user=urlObj.query.username;
  var pass=urlObj.query.password;
  
  if(path=='/login'){
    var vip=["小明","小江","小才","小丽","小笑","小柏","小红","小黑","小白","小蓝","小绿","小黄"];
    if(vip.indexOf(user)==-1){
      res.write('用户名不正确');
      // return ;
    }else if(pass !='123456'){
      res.write('密码不正确');
      // return;
    }else{
      res.write('欢迎您'+user);
    }
  };

}).listen(4000);