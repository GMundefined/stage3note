//mongoose的简单封装
var mongoose =require('mongoose')
var config=require('./02-config.js')
var protocal=config.protocal//协议
var ip=config.ip//域名
var port=config.port//端口号
var dbName=config.dbName//数据库名称
var colName=config.colName//集合名称
//创建user的Schema
var userSchema=new mongoose.Schema({
  id:{type:Number},
  name:String,
  age:Number,
  position:Number,
  hireDate:Date,
  hobbies:Array,

},{collection:colName,//用于指定集合名称
  versionKey:false,//不要__v:0的属性 官方不建议禁用
})
//创建model 
var User =mongoose.model('emp',userSchema)
//连接地址
var url=protocal+"://"+ip+':'+port+'/'+dbName;
//连接数据库
var opt={useNewUrlParser:true,useUnifiedTopology:true}
mongoose.connect(url,opt)

//暴露出去
module.exports=User;