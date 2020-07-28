var express=require('express')
var app=express();
app.listen(4000)

app.set('view engine','ejs')//设置视图模模板引擎
app.use(express.static('./'));//设置根目录 解决jquery文件引入问题
app.use(express.urlencoded({extended:true}))//设置post请求参数的解析方式

//把数据库引入进来
var MongoClient=require('mongodb').MongoClient
//连接地址
var url ="mongodb://localhost:27017"
//连接选项
var opt={useUnifiedTopology:true}

// 处理 / 请求 显示登录注册页面
app.get('/',function(req,res){
  res.render('login')
})
app.get('/register',function(req,res){
  res.render('register')
})

app.post('/register',function(req,res){
  //获取请求参数
  var body=req.body;
  var username=body.username;
  var password=body.password;
  var data=[{
    "username":username,
    "password":password
  }];
  // console.log(data)
  //连接数据库 判断用户名是否已经存在
  MongoClient.connect(url,opt,function(err,client){
    if(err){
      console.log(err)
      res.send('数据库连接失败')
      return ;
    }
    //连接成功
    var col=client.db('web').collection('vip')

    col.find({username:username}).toArray(function(err,docs){
      if(err){
        console.log(err)
        res.send('数据库读取失败')
        client.close();
        return ;
      }
      //数据库读取成功
      // console.log(docs)  //没有注册 就是空数组
      if(docs.length==0){
        col.insertMany(data,function(err,result){
          if(err){
            console.log(err)
            res.send('数据存储失败')
            client.close()
            return ;
          }
          //存储成功
          // res.redirect('/')//重定向到登录页面   因为是ajax发送的请求 所以重定向不了
          res.send('存储成功')
          client.close();   
        })
      }
    })
  }) 
})
app.post('/login',function(req,res){
  //获取请求参数
  var body=req.body;
  var username=body.username;
  var password=body.password;
  var data=[{
    "username":username,
    "password":password
  }];
  // console.log(data)
  //连接数据库 判断用户名是否已经存在
  MongoClient.connect(url,opt,function(err,client){
    if(err){
      console.log(err)
      res.send('数据库连接失败')
      return ;
    }
    //连接成功
    var col=client.db('web').collection('vip')
    col.find({username:username}).toArray(function(err,docs){
      if(err){
        console.log(err)
        res.send('数据库查询失败')
        client.close();
        return ;
      }
      //数据库查询成功
      // console.log(docs)  //没有查询结果 就是空数组
      if(docs.length==0){//没找到该用户名 
        res.send('用户名不正确 请重新输入')
      }else{//找到该用户 判断密码是否正确
        if(password==docs[0].password){
          res.send('用户名密码均正确 登录成功')
          return ;
        }
        res.send('用户名正确 密码错误 请重新核实密码')
      }
      client.close();
    })
  }) 
})