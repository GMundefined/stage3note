var http=require('http');
var fs=require('fs');
var url=require('url');

http.createServer(function(req,res){
  //设置字符编码
  res.setHeader('content-type','text/html;charset=utf-8');
  //转化请求地址
  var urlObj=url.parse(req.url,true);
  var path =urlObj.pathname;
  //判断请求地址
 /*  if(path=='/favicon.ico'){
    return ;
  }   */
  if(path=='/regist'){
    var username=urlObj.query.username;
    var password=urlObj.query.password;
    //读取user.json文件
    fs.readFile('user.json','utf-8',function(err,data){
      if(err){//没有读取到user.json
        var user=[{
          "username":username,
          "password":password,
        }];
        user=JSON.stringify(user);
        fs.writeFile('user.json',user,function(err){
          if(err){
            res.end('注册失败');
            return ;
          }
          res.end('注册成功!');
        })
        return ;
      }
      //uesr.json文件存在 并且已经读取到了原有的数据
      //data是一个字符串 将其转换成json
      data=JSON.parse(data);
      data.push({
        "username":username,
        "password":password,
      });
      //重新将data转换成字符串 写入文件
      data=JSON.stringify(data);
      fs.writeFile('user.json',data,function(err){
        if(err){
          res.end('注册失败');
          return ;
        }
        res.end('注册成功');
      })
    })  
    return;
  }
  //其他请求 返回表单页面
  fs.readFile('./lianxi01.html',function(err,data){
    if(err){
      res.end('读取页面错误');
      return ;
    }
    res.end(data);
  })
}).listen(4000)