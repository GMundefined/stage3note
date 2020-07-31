var express=require('express')
var app=express()
app.listen(4000)
//cookieParser()的参数 如果不使用signed cookie 参数可以不写
var cookieParser=require('cookie-parser')
app.use(cookieParser())
// app.use(cookieParser('Gloria'))

var User=require('./model/index.js').User
// console.log(User)
// app.set(express.static('./'))
app.use(express.urlencoded({extended:true}))
app.get('/',function(req,res){
  //获取cookie 判断有没有登录过
  var username=req.cookies.username;
  if(!username){//没有登录过
    res.render('login.ejs')
    return ;
  }
  //登录过
  User.find({username:username},function(err,result){
    if(err){
      console.log(err)
      res.render('welcome.ejs',{msg:"网络故障"})
      return ;
    }
    if(result.length==0){
      //数据库中没有cookie里保存的用户名
      //清除无效的cookie
      res.clearCookie('username')
      //返回信息
      res.render('welcome.ejs',{msg:"登录失效 重新登录"})
      return ;
    }
    //在数据库中找到了对应cookie的用户名
    res.render('welcome.ejs',{msg:"欢迎你,"+username})
  })
  
})
app.get('/login',function(req,res){
  res.render('login.ejs')
})
app.post('/login',function(req,res){
  var username=req.body.username
  var password=req.body.password
  var data={
    username:username,
    password:password
  }
  User.find(data,function(err,docs){
    if(err){
      console.log(err)
      res.render('welcome.ejs',{msg:"数据库访问失败"})
      return ;
    }
    // console.log(docs)
    //找到了
    if(docs.length>0){//数据不为空
      //用户名密码正确 登录成功 保存登录状态
      res.cookie('username',username)
      // res.redirect('/')
      //res.send('登录成功 欢迎你，'+username)
      // res.render('welcome.ejs',{msg:docs})
      res.render('welcome.ejs',{msg:"登录成功 欢迎你，"+username})
      return ;
    }else{
      res.render('welcome.ejs',{msg:"用户名或密码错误"})
    }
  })
})
app.get('/register',function(req,res){
  res.render('register.ejs')
})
app.post('/register',function(req,res){
  var username=req.body.username
  var password=req.body.password
  data={
    username:username,
    password:password
  }
  User.find(data,function(err,docs){
    if(err){
      console.log(err)
      res.render('welcome.ejs',{msg:"数据库访问失败"})
      return ;
    }
    //找到了
    if(docs.length>0){//数据不为空 说明已经注册过了
      res.render('welcome.ejs',{msg:"已经注册 请登录"})
      return ;
    }else{//没有找到 就保存数据 到数据库
      var o=new User(data)
      o.save(function(err){
        if(err){
          console.log(err)
          res.render('welcome.ejs',{msg:"保存数据时 数据库访问失败"})
          return ;
        }
        //保存成功  跳转到登录页面
        res.redirect('/')
      })
      // res.render('welcome.ejs',{msg:"数据库查找失败"})
    }
  })
})