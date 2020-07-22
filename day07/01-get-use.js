var express = require('express')
var fs=require('fs')
var app=express();
app.listen(4000)
//封装成函数 
app.use(rootDir('./public'))

/* app.use('/',function(req,res,next){
  // console.log(req._parsedUrl.pathname);
  if(req.url!='/'){//如果请求地址不是 / 
    var data = fs.readFileSync('./public'+req.url);
    if(req.url=='/style/index.css'){
      res.setHeader('content-type','text/css');
    }
    res.send(data);
    // res.end(data);
    return ;
  }
  //请求地址是 / ,把请求放行 让后续的中间件来处理这个请求
  next();

}) */
app.get('/',function(req,res){
  //看不到样式图片和js输出 
  res.render('test1.ejs');
})

function rootDir(root){
  return function(req,res,next){
    if(req.url!='/'){//如果请求地址不是 / 
      var data = fs.readFileSync(root+req.url);
      if(req.url=='/style/index.css'){
        res.setHeader('content-type','text/css');
      }
      res.send(data);
      // res.end(data);
      return ;
    }
    //请求地址是 / ,把请求放行 让后续的中间件来处理这个请求
    next();
  }
}












/* app.get('/a',function(req,res){
  //只能处理 /a 的请求
  res.end('<h1>/a</h1>')
}) */
/* app.use('/a',function(req,res){
  res.end('<h1>/a</h1>')
  //处理所有以/a开头的请求 
}) */