var http=require('http');
var url=require('url');
//如果不想在res.end里面写js代码形成圆形或方块 可以引入fs模块 获取html页面代码(需要写两个html页面)
http.createServer(function(req,res){
  if(req.url=='/favicon.ico'){return ;};
  res.setHeader("content-type","text/html;charset=utf-8");
  var urlObj=url.parse(req.url,true);
  var path=urlObj.pathname;
  // 因为不需要传递参数 所以可以直接用req.url进行判断 就不用引入url模块
  if(path=='/circle'){
    res.end('<div style="width:100px;height:100px;border:1px solid red;border-radius:50%;background:red"></div>');
    return ;
  }
  if(path=='/square'){
    res.end('<div style="width:100px;height:100px;border:1px solid red;background:blue"></div>');
    return ;
  }   
  res.end('地址错误');  
}).listen(4000);