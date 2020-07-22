//静态文件伺服功能
var express=require('express');
var app=express();
app.listen(4000);
//将当前路径下的public文件夹设置为根目录
app.use(express.static('./public'))
app.get('/',function(req,res){
  //static.ejs中没有坑需要数据来填充 所以不需要传递数据过去
  //因为没有设置默认的视图模板引擎 所以后缀名必须添加
  res.render('static.ejs');
})
