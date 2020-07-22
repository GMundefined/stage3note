var express=require('express')
var app=express();

app.listen(4000)

//nodejs默认的模板引擎是jade 所以
//如果要使用其他模板引擎 需要先设置
//设置 视图模板引擎为ejs
//设置后 在使用res.render方法时 调用的模板的后缀名 .ejs可以省略不写
//如果不设置的话 那么show后面的后缀名 必须添加
//express会根据后缀名自动调用对应的模板引擎
app.set('view engine','ejs');
//如果没有下载ejs或者卸载了ejs 也会报错 cannot find module 'ejs'

app.get('/',function(req,res){
  //模拟从数据库中获取到的数据
  var stus = [
    {id:1,name:"张三"},
    {id:2,name:"李四"},
    {id:3,name:"王五"},
    {id:4,name:"赵六"},
  ];
  //将数据传递给模板渲染展示
  //第一个参数表示模板名称(views文件夹中的模板)
  //第二个参数表示渲染的数据(必须是json格式)
  //第三个参数为回调参数
  res.render('show',{stus:stus});
  //如果上面不设置app.set的话 这里就需要加上.ejs后缀名
});