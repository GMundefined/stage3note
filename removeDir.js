//自己封装一个可以删除非空文件夹的方法
var fs=require('fs')
/**
 *@method 根据传进来的参数删除指定的文件和文件夹
 * @param {String} path 被删除的文件或文件夹的路径
 */
function deleteDir(path){
  //判断path是文件还是文件夹
  var state=fs.statSync(path)
  if(state.isFile()){
    //是文件 删除文件
    fs.unlinkSync(path);   
  }else{
    //path是文件夹
    //获取path中的所有内容
    var files=fs.readdirSync(path)
    //遍历files 然后将其删除
    for(var i=0;i<files.length;i++){
      //deleteDir()方法就是用来删除某个文件或文件夹
      //删除的路径是path下面的文件或文件夹
      deleteDir(path+'/'+files[i])
    }
    //删除自身
    fs.rmdirSync(path);
  }
}
deleteDir('txt')
//删除完成的文件夹并不会出现在垃圾箱