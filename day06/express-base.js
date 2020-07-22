//express的基本用法
var express=require('express');
//创建应用
var app=express();

//监听端口
app.listen(4000);

//处理get方式的 / 请求
app.get('/',function(req,res){

  res.end('this is / request');
});
//处理get方式的 /a 请求
app.get('/a',function(req,res){
  var path=req_parsedUrl.pathname;//请求路径
  var query=req.query;//请求参数
  console.log(pathname)
  console.log(query)
  res.send('<h1>这是/a的请求</h1>');
});
//请求地址的匹配
//忽略大小写 忽略参数 忽略锚点

//接收类似于 /show/xxx的请求 
//其中，第二个层级胃请求参数
//参数的属性名为name   :name 模糊匹配 所以写在下面的话 就不会把img的请求给覆盖掉了
//请求的匹配安装从上往下依次匹配的顺序
//如果上面有请求能匹配成功 则请求处理结束
//如果匹配不成功则继续往下依次匹配
//直至匹配成功 或者无法处理(cannot not get xxx请求)
//一般情况下 精确匹配写上上面 模糊匹配写在下面
app.get('/show/:name',function(req,res){
  console.log(req.params.name);

  res.send('冒号传参的方式');
})

//请求地址 还可以是正则表达式
// 匹配 /pic/xxx 的请求地址
//使用正则时 变化的部分必须使用()括起来 
//每一组小括号()就是一个参数 可以通过params[n]取值
app.get(/\/pic\/(.{1,}\.(jpg|png|jpeg|gif))/,function(req,res){
  console.log(req.params[0]);
  res.send('图片路径')
})










// /show/img永远无法得到解决 因为被上面的模糊匹配给抢了
app.get('/show/img',function(req,res){
  // console.log(req.params.name);

  res.send('/show/img请求');
})


//处理post方式的 /tijiao 请求
app.post('/tijiao',function(req,res){
  res.end('post request');
});