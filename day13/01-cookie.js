var express=require('express')
var cookieParser=require('cookie-parser')
var app=express()
app.use(cookieParser('abc'))//口令
app.listen(4000)
//设置cookie
app.get('/',function(req,res){
  res.cookie("cookie1","aaa")
  res.cookie("cookie2","bbb",{httpOnly:true})//无法通过脚本获取该cookie
  res.cookie('cookie3','ccc',{domain:'localhost'})//无法通过127.0.0.1获取该cookie只能通过localhost访问该cookie
  res.cookie('cookie4','ddd',{expires:new Date(Date.now()+5000)})//生命周期
  res.cookie('cookie5','eee',{maxAge:5000})//生命周期
  res.cookie('cookie6','fff',{path:'/patha'})//只能在指定的请求路径下访问
  res.cookie('cookie7','ggg',{signed:true})
 /* When using cookie-parser middleware, 
  this method also supports signed cookies.
 */

  res.end();
})
app.get('/getcookie',function(req,res){
  console.log(req.cookies)
  console.log(req.signedCookies)
  res.end()
})

app.get('/patha',function(req,res){
  res.end()
})
app.get('/pathb',function(req,res){
  res.end()
})