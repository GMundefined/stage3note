var fs= require('fs');
//recursive 是否创建父目录 默认false 
//如果recursive为true的话 即便已经存在要创建的文件夹 也不会报错
/* fs.mkdir('a/b/c',{recursive:true},function(err){
  if(err){
    console.log('创建失败');
    console.log(err);
    return ;
  }
  console.log('创建成功');
}) */

//同步方法 没有返回值 
fs.mkdirSync('a');