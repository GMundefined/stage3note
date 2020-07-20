var http=require('http');
var fs=require('fs');
var url=require('url');

http.createServer(function(req,res){
  res.setHeader("content-type","text/html;charset=utf-8");
  if(req.url=='/favicon.ico'){return ;};
  var urlObj=url.parse(req.url,true);
  var path=urlObj.pathname;
  var username=urlObj.query.username;
  var message=urlObj.query.message;
  if(path=='/tijiao'){
    var filename="./data/"+username+".txt";
    fs.readFile(filename,"utf-8",function(err,data){
      if(err){// 没有读取到文件  创建文件
        fs.writeFile(filename,message,{flag:"a"},function(err){
          if(err){
            res.end('用户留言储存失败');
            console.log(err);
            return ;
          }
          res.end('用户留言存储成功');
        })
        return ; 
      }
      //读取到文件  往原有的文件中追加信息
      fs.writeFile(filename,message+'\n',{flag:"a"},function(err){
        if(err){
          res.end('用户留言储存失败!!!');
          console.log(err);
          return ;
        }
        res.end('用户留言存储成功!!!');
      })
      return ; 
    });
  };
  if(path=='/show'){
    fs.readdir("data/",{withFileTypes:true},function(err,files){
      if(err){
        res.end('文件夹读取错误');
        return ;
      };
      var j=Math.round(Math.random()*(files.length-1));
      fs.readFile('data/'+files[j].name,"utf-8",function(err,data){
        if(err){
          res.end('show信息错误');
          return ;
        }
        res.end(data);
      });
      // console.log(files);
     /* (function iterate(i){
        // 判断递归结束的条件
        if(i>=files.length){
          res.end('<mark>内容显示完成</mark>');
          return ;
        }
        // console.log(files[i].name);
        var j=Math.round(Math.random()*(files.length-1));
        fs.readFile('./data/'+files[j].name,"utf-8",function(err,data){
          if(err){
            res.end('show信息错误');
            return ;
          }
          res.end(data);
        }) 
        i++
        iterate(i)
      })(0);   
    });   */
    
    });
    return ;
  }
  //其他情况
  fs.readFile('./form.html',function(err,data){
    if(err){
      res.end('页面读取错误');
      return ;
    }
    res.end(data);
  });

}).listen(4000);