var http=require('http')
var fs=require('fs')
var ejs=require('ejs')

http.createServer(function(req,res){
  //模拟的数据
  var items=[
    '华为','海尔','小米','联想','步步高','锤子'
  ];
  //读取模板文件
  var data=fs.readFileSync('./lianxi01.html','utf-8');
  //ejs渲染模板  
  //传递的数据必须包装成对象  其属性就是模板中的变量
  var html=ejs.render(data,{items:items});
  //返回渲染后的数据
  res.end(html)
}).listen(4000)