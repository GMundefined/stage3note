//创建student路由
var express=require('express')
var router=express.Router();//创建路由对象
//使用路由对象处理具体的请求
// 处理 /student/login 请求
router.get('/login',function(req,res){
  res.send('<h1>学生的login请求</h1>')
})
// 处理 /student/logout 请求
router.get('/logout',function(req,res){
  res.send('<h1>学生的logout请求</h1>')
})
// 处理 /student/choose 请求
router.get('/choose',function(req,res){
  res.send('<h1>学生的选课请求</h1>')
})

//暴露路由对象
module.exports=router;