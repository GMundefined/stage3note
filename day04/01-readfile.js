var fs=require('fs');
//异步方法读取文件错误的时候 程序依然会执行 不会崩溃
//第一个参数 给请求的文件地址 第二个参数 可以写成一个对象 传入编码的格式 第三个就是回调函数 会有err 和data信息 
fs.readFile('./笔记.html',{encoding:"utf-8"},function(err,data){
  // console.log(err);
  console.log(data);
})

//同步方法中 没有回调函数 读取到的结果会作为返回值返回
//同步方法中 如果读取文件错误 程序会崩溃 后续代码并不会执行
//第一个参数 给请求的文件地址 第二个参数 直接写传入编码的格式
var data=fs.readFileSync('./笔记.html',"utf-8");
console.log(data);