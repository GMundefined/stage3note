//使用mongoose简单实现员工信息管理功能
var express=require('express')
var app=express()
var fs=require('fs')

const pos={
  "后端开发":1,
  "web开发":2,
  "UI设计":3,
}
app.listen(4000)
app.use(express.urlencoded({extended:true}))
var User=require('./02-user.js')
/* app.get('/',function(req,res){
  res.render('show.ejs')
}) */
app.get('/',function(req,res){
  //获取数据库中的员工信息  只查询id name position 三个信息
  User.find({},'id name position',function(err,docs){
    if(err){
      console.log(err)
      res.render('show.ejs',{status:1,errMsg:"获取数据失败"})
      return ;
    }
    // console.log(docs)
    res.render('show.ejs',{status:0,docs:docs})
  })
})
app.post('/add',function(req,res){
  var body=req.body;
  var name=body.empName;
  var age=body.age;
  var position=body.position;
  var hireDate=new Date();//日期
  var hobbies=[];//爱好
  var id=parseInt(fs.readFileSync('./id.txt'));//上一个id
  id++;
  fs.writeFileSync('./id.txt',id)
  //创建对象
  var o=new User({
    id:id,
    name:name,
    age:age,
    position:pos[position],
    hireDate:hireDate,
    hobbies:hobbies
  })
  //保存进数组
  o.save(function(err,product){
    if(err){
      console.log(err) 
    }
    // console.log(product) 
    res.redirect('/')
  })
})