var fs=require('fs');
var path="test.txt";
var data="\n哈哈哈";
var ops={flag:"a"}
fs.writeFile(path,data,ops,function(err){
  if(err){
    console.log(err);
    return ;
  }
  console.log('写入成功');
})