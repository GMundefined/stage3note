var express=require('express')
var app=express()
app.listen(4000)

//设置post请求参数的解析方式
app.use(express.urlencoded({extended:true}))

var MongoClient=require('mongodb').MongoClient
//连接地址
var url ="mongodb://localhost:27017"
//连接选项
var opt={useUnifiedTopology:true}
var ObjectId=require('mongodb').ObjectID;

//  /请求 展示所有数据
app.get('/',function(req,res){
  //连接数据库
  MongoClient.connect(url,opt,function(err,client){
    if(err){//连接数据库失败
      console.log(err)
      res.send('<h1>网络波动，稍后再试</h1>')//连接失败后返回给浏览器的信息
      return ;
    }
    //连接成功  获取集合对象
    var col=client.db('web').collection('products');
    //获取所有数据
    // col.find({}).sort({pid:1}).toArray
    col.find({},{sort:{pid:1}}).toArray(function(err,docs){
      if(err){//获取数据失败
        console.log(err)
        res.send('获取数据失败');//返回响应
        client.close();
        return ;
      }
      //获取数据成功 将其渲染到视图模板上
      // console.log(docs)
      res.render('show.ejs',{products:docs})
      client.close();
    })
  })
})

// /add请求 get发送的请求  直接跳转到添加数据的页面
app.get('/add',function(req,res){
  res.render('add.ejs')
})

// post的/add请求 接收页面传递的数据 将其保存进数据库
app.post('/add',function(req,res){
  //获取请求参数
  var body=req.body;
  var data={};
  data.pid=parseInt(body.pid)
  data.pname=body.pname
  data.price=parseInt(body.price)
  data.count=parseInt(body.count)
  //连接数据库
  MongoClient.connect(url,opt,function(err,client){
    if(err){
      console.log(err)
      res.send('网络波动 稍后再试')
      return ;
    }
    //连接成功
    var col=client.db('web').collection('products')
    //添加数据
    col.insertOne(data,function(err,result){
      if(err){
        console.log(err)
        res.send('上新失败 稍后再试')
        client.close()
        return ;
      }
      //添加成功
      if(result.result.n>0){
        //添加成功 跳转回首页
        res.redirect('/')

      }else{
        //数据没添加成功
        res.send('添加失败')
      }
      client.close();
    })
  })
})

// get的 /update请求 跳转到修改的页面
app.get('/update',function(req,res){
  //获取参数
  var id=req.query.id
  //将字符串的id转化成ObjectId类型 上面还需要声明ObjectId 
  id=ObjectId(id);
  MongoClient.connect(url,opt,function(err,client){
    if(err){
      console.log(err)
      res.send('网络波动 稍后再试')
      return ;
    }
    //连接成功
    var col=client.db('web').collection('products')
    col.find({_id:id}).toArray(function(err,docs){
      if(err){
        console.log(err)
        res.send('服务器故障')
        client.close();
        return ;
      }
      //查询数据成功
      if(docs.length==0){
        //没有数据
        res.send('查无此数据')
      }else{
        res.render('update.ejs',{products:docs[0]})
      }
      client.close();
    })
  })
})

//post的 /update请求 修改数据库的对应数据 跳转到首页
app.post('/update',function(req,res){
  var body=req.body;
  var data={};//修改的数据
  data.price=parseInt(body.price)
  data.count=parseInt(body.count)
  var id=ObjectId(body.id);//获取_id的值 并将其转换成ObjectId类型
  var filter ={_id:id}//修改的条件
  //连接数据库 修改数据库的数据
  MongoClient.connect(url,opt,function(err,client){
    if(err){
      console.log(err)
      res.send('网络波动')
      return ;
    }
    //连接成功 获取集合对象
    var col=client.db('web').collection('products')
    col.updateOne(filter,{$set:data},function(err,result){
      if(err){
        console.log(err)
        res.send('修改失败')
        client.close();
        return ;
      }
      if(result.result.nModified>0){//修改成功
        res.redirect('/')
      }else{
        res.send('数据未曾发生改变 无须更新')
      }
      client.close();
    })
  })
})

// /delete/:id 删除指定id的数据
app.get('/delete/:id',function(req,res){
  var id=req.params.id;
  id=ObjectId(id);//转换成对象
  var filter = {_id:id}
  //连接数据库删除数据
  MongoClient.connect(url,opt,function(err,client){
    if(err){
      console.log(err)
      res.send('网络波动 稍后再试')
      return ;
    }
    //连接成功
    var col = client.db('web').collection('products')
    col.deleteOne(filter,function(err,result){
      if(err){
        console.log(err)
        res.send('数据删除失败')
        client.close();
        return ;
      }
      //删除成功
      // console.log(result.result)
      if(result.result.n>0){
        res.redirect('/')
      }else{
        res.send('删除失败')
      }
      client.close();
    })
  })
})