var http=require('http');
var fs=require('fs');
var url=require('url');

http.createServer(function(req,res){
  res.setHeader("content-type","text/html;charset=utf-8");
  if(req.url=="/favicon.ico"){
    return ;
  }
  var urlObj=url.parse(req.url,true);
  var path=urlObj.pathname;
  var query=urlObj.query;
  if(path=='/login'){
    var username=query.username;
    var password=query.password;
    fs.readFile('./user1.json',function(err,data){
      if(err){
        res.end('服务器故障，稍后再试');
        return ;
      }
      data=data.toString();
      data=JSON.parse(data);
      // console.log(data);
      var flag=false;//假设用户名密码有错误
      for(var i=0;i<data.length;i++){
        var u =data[i];
        if(username==u.username&&password==u.password){
          flag=true;//用户名密码均正确
          break;
        }      
      } 
      if(flag){
        res.end('登录成功');
      }else{
        res.end('用户名或密码有错');
      } 
    })
    return ;
  }
  //其他请求
  
  fs.readFile('./day03-lianxi04.html',function(err,data){
    if(err){
      res.end('error');
      return ;
    }
    res.end(data);
  })

}).listen(4000)