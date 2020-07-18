var http=require('http');
var server=http.createServer(function(req,res){
  if(req.url=='/favicon.ico'){
    return ;
  };
  var str=req.url.slice(req.url.indexOf('?')+1);//username=ddd&password=dddd
  var arr=str.split('&');
  var str1='';
  res.writeHead(200,{"content-type":"text/html;charset=utf-8"});
  str1+="你的用户名是："+arr[0].slice(arr[0].indexOf('=')+1)+",你的密码是："+arr[1].slice(arr[1].indexOf('=')+1);
  res.end(str1);
 
});
server.listen(4000);