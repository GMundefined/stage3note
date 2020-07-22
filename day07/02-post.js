var express =require('express')
var app=express();

app.listen(4000)
app.use(express.urlencoded({extended:true}))
app.get('/',function(req,res){
  res.render('form.ejs')
})

app.post('/tijiao',function(req,res){
  console.log(req);
  res.end('over');
})