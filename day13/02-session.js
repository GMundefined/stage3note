var express=require('express')
var session=require('express-session')
var app=express()
app.listen(4000)
app.use(session({
  secret:"abc",
  resave:false,
  saveUninitialized:true
}))
app.get('/',function(req,res){
  //向session中保存数据
  req.session.username="张三"
  res.send('<h1>session</h1>')
})
app.get('/getsession',function(req,res){
  console.log(req.session)
  res.send('到控制台看打印信息')
})