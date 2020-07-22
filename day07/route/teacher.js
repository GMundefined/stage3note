//创建teacher路由 
var express = require('express')
var router=express.Router();
router.get('/',function(req,res){
  res.send('所有以/teacher开始的请求');
})
router.get('/login',function(req,res){
  res.send('teacher的login请求')
})
router.get('/logout',function(req,res){
  res.send('teacher的logout请求')
})
router.get('/publish',function(req,res){
  res.send('teacher的发表请求')
})
module.exports=router;