//引入mongoose 
var mongoose=require('mongoose')
//mongoose对数据库的操作全部都是基于Schema的
//创建user对应的Schema
//参数为数据的结构
//key表示存储数据的属性 value表示存储的数据类型
var userSchema=new mongoose.Schema({
  uname:String,
  age:Number,
  isMarried:Boolean,
  birth:Date
})
//基于Schema创建对应的模型(model)
//第一个参数：其对应的复数形式为集合名称
//第二个参数:Schema
var User=mongoose.model('user',userSchema)
//连接数据库 
//协议://ip:端口/数据库名称
var url='mongodb://localhost:27017/web'
var opt={useUnifiedTopology:true,useNewUrlParser: true }
mongoose.connect(url,opt);
/* 
监听mongoose的连接情况
var db=mongoose.connection
db.on('error',function(err){
  console.log(err)
})
db.once('open',function(){
  console.log('连接成功')
}) */
//连接成功后 CRUD增删改查
//4.查询数据
/* User.find({查询条件},function(err,docs){

}) */
User.find({age:{$gt:20}},function(err,docs){
  console.log(err)
  console.log(docs)
})
//3.修改数据
//修改一条数据
/* User.updateOne({修改的条件},{$set:{修改的数据}},function(err,raw){
  
}) */
/* User.updateOne({age:23},{$set:{age:18}},function(err,raw){
  console.log(err)
  console.log(raw)
}) */ 
//2.删除数据
//删除一条数据
/* User.deleteOne({},function(err){
  console.log(err)
}) */
//1.增加数据
var u ={
  uname:'张三',
  age:23,
  isMarried:false,
  birth:new Date(),
  test:'测试的数据'//不可以保持进数据库
}
/* User.insertMany([u],function(err,docs){
  console.log(err)
  console.log(docs)
}) */
/* 
save()是定义在model原型对象上的方法
var o=new User(u)
o.save(function(err,docs){
  console.log(err)
  console.log(docs)
}) */
var u1 ={
  uname:'李四',
  age:25,
  isMarried:true,
  birth:new Date(),
}
var u2 ={
  uname:'王五',
  age:27,
  isMarried:false,
  birth:new Date(),
}
var u3 ={
  uname:'赵六',
  age:36,
  isMarried:false,
  birth:new Date(),
}
/* User.insertMany([u1,u2,u3],function(err,docs){
  console.log(err)
  console.log(docs)
}) 
 */