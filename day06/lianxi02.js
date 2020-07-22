//获取uploads文件夹中所有的图片 将其展示在页面上

var express=require('express');
var fs=require('fs');
var app=express();
app.listen(4000);
//设置视图模板引擎
app.set('view engine','ejs')
//设置根目录
app.use(express.static('./uploads'));
//处理 /请求
app.get('/',function(req,res){
  //获取uploads所有图片
  var pics = fs.readdirSync('./uploads');
  //将pics传递给视图模板解析
  res.render('lianxi02',{pics:pics});
 /*  res.render('lianxi02',{pics:pics},function(err,html){//回调函数 针对渲染出错的情况
    if(err){
      res.send('出错了')
      return ;
    }
    //没有出错
    res.send(html);
  }) */
})