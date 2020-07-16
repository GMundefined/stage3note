var http=require('http');
var server=http.createServer(function(req,res){
  //如果请求是小图标，直接返回不处理
  if(req.url=="/favicon.ico"){
    return ;
  }
  //req.url可以获取到请求地址的路径和传递的参数 拿不到锚点
  var url=req.url;
  var path=url.split('?')[0];
  var params=url.split('?')[1].split('&');
  var s='';
  for(var i=0;i<params.length;i++){
    var arr=params[i].split('=');
    s+=arr[0]+"值为"+arr[1]+",";
  };
  s=s.slice(0,s.length-1);
  //[id=1,age=20]
  // console.log(req.url);
  // console.log(req.method);
  //返回响应，结束请求
  //需要设置响应头 不然中文会乱码
  res.writeHead(200,{"content-type":"text/html;charset=utf-8"});
  res.end("你的请求地址是"+path+",你的请求参数是"+s);//不返回任何数据 仅仅结束请求
  // 接收请求 返回请求中的参数数据
  //  /a/b/c?id=1&age=20
  //返回：你的请求地址是/a/b/c,你的请求参数是id值为1,age值为20
});
server.listen(4000,function(){
  console.log('服务器开启成功，地址为localhost:4000')
});