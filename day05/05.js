var http=require('http');
var fs=require('fs');
var qs=require('querystring');//解析字符串
http.createServer(function(req,res){
  if(req.url=='/tijiao' && req.method.toLowerCase()=='post'){
    //nodejs为了追求数据传输的速率 采用一小段一小段传输的方式，这样就产生了两种状态
    //数据传输过程中 数据传输完成
    var str='';//用于拼接每次传输的小段数据
    //数据传输过程中  chunk代表每次传输的一小段数据
    req.on('data',function(chunk){
      str+=chunk;
    })
    //数据传输完成
    req.on('end',function(){
      console.log(str);
      str=qs.parse(str);
      console.log(str);
      res.end('over');
    })
    return ;
  }
  //其他请求
  fs.readFile('./05.html',function(err,data){
    if(err){
      res.end('read fild error');
      return ;
    }
    res.end(data)
  });
}).listen(4000)