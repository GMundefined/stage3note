var express=require('express')
//引入student路由模块
var student=require('./route/student.js')
var teacher=require('./route/teacher.js')
var app=express()
app.listen(4000)

//处理所有以 /student 开头的请求
app.use('/student',student)
//处理所有以 /teacher 开头的请求
app.use('/teacher',teacher)
