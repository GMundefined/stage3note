var http=require('http');
var server=http.createServer(function(req,res){
  if(req.url=='favicon.ico'){
    return ;
  }
  // console.log(res);
  //end方法的作用：结束请求 返回响应
  // res.end('over');
  //res.end('123');//end方法只能执行一次
  //res.write方法 ：返回数据 但是不结束请求
  //设置响应头 解决中文编码问题
  res.setHeader('Content-Type',"text/html;charset=utf-8");
  res.write('<h1 style="color:red">第一次返回数据</h1>');
  res.write('<h2>第二次返回数据</h2>');
  // res.end();
  res.end('<h3>over</h3>');
});
server.listen(4000);