var express=require('express');//渲染
var fs=require('fs');//文件读取
var fd=require('formidable');//文件上传
var app=express();//创建服务
app.listen(4000);//启动监听
app.set('view engine','ejs')//设置渲染引擎
app.use(express.static('./uploadPic'));//设置根目录
app.get('/',function(req,res){//默认加载页面
  fs.readFile('./zuoye.html',function(err,data){
    if(err){
      res.end('read file error cannot show the page')
      return ;
    }
    res.end(data);
  })
});
app.post('/tijiao',function(req,res){
  // const form =fd({multiple:true});
  form.uploadDir='./uploadPic';
  form.parse(req, (err, fields, files) => {  
    console.log(fields);
    console.log(files);
    var oldName=files.pic.path;
    var newName=files.pic.name;
    newName='./uploadPic/'+newName;
    //改名 fs.rename()异步方法
    fs.rename(oldName,newName,function(err){
      // console.log(err)
      // res.send('rename over')
      var pics = fs.readdirSync('./uploadPic');
      res.render('zuoye',{pics:pics});
    })
  });
  /* var pics = fs.readdirSync('./uploadPic');
  res.render('zuoye',{pics:pics}); */
  return ;
})

/* app.get('/show',function(req,res){
  var pics = fs.readdirSync('./uploadPic');
  res.render('zuoye',{pics:pics});

})   */
