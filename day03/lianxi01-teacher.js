var http=require('http');
var url=require('url');
var fs = require("fs");

http.createServer(function(req,res){
  if(req.url=='/favicon.ico'){
    return ;
  };
  //使用url模块将字符串格式的请求地址转换为对象
  var urlStr=req.url;
  var urlObj=url.parse(urlStr,true);
  //console.log(urlObj);
  var path=urlObj.pathname;
  var username=urlObj.query.username;
  var password=urlObj.query.password;
  res.setHeader("content-type","text/html;charset=utf-8");
  if(path=='/login'){
    res.end('你的用户名是:'+username+",你的密码是:"+password);
    return ; 
  }

  // 其他情况，跳转到lianxi01页面
  fs.readFile('./lianxi01.html',function(err,data){
    if(err){
      res.end('读取页面错误');
      return ;
    }
    res.end(data);
  })
 

  /* return ;
  var params=req.url.split('?')[1].split('&');//[username=xxx,password=xxx]
  var username,password;
  for(var i=0;i<params.length;i++){
    var arr=params[i].split('=');
    if("username"==arr[0]){
      username=arr[1];
    }
    if("password"==arr[0]){
      password=arr[1];
    }
  }
  res.writeHead(200,{"content-type":"text/html;charset=utf-8"});
  res.end('你的用户名是:'+username+",你的密码是:"+password); */
 
}).listen(4000);