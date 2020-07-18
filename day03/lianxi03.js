var http=require('http');
var fs=require('fs');
var url=require('url');

http.createServer(function(req,res){
  res.setHeader('content-type','text/html;charset=utf-8');
  if(req.url=='/favicon.ico'){
    return ;
  };
  var datas;
  if(req.url=='/btn1'){
    fs.readFile('./lianxi03.json',function(err,datas){
      if(err){
        res.end('数据读取错误'); 
        return ;
      }
      datas=JSON.parse(datas);
      var i=Math.round(Math.random()*(datas.user1.length-1));
      var j=Math.round(Math.random()*(datas.user2.length-1));
  /*     console.log(datas.user1.length);
      console.log(datas.user2.length); */
      res.end(datas.user1[i]);
    });
    return ; 
  }
  if(req.url=='/btn2'){
    fs.readFile('./lianxi03.json',function(err,datas){
      if(err){
        res.end('数据读取错误'); 
        return ;
      }
      datas=JSON.parse(datas);
      var i=Math.round(Math.random()*(datas.user1.length-1));
      var j=Math.round(Math.random()*(datas.user2.length-1));
  /*     console.log(datas.user1.length);
      console.log(datas.user2.length); */
      res.end(datas.user2[j]);  
    });
    
    return ;
  }
  
  fs.readFile('./lianxi03.html',function(err,data){
    if(err){
      res.end('页面加载错误');
      return ;
    } 
    res.end(data);
  }); 
 
}).listen(4000);





