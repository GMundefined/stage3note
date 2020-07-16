console.log('使用NodeJs运行的js');
function show(){
  for(var i=0;i<5;i++){
    console.log(i);
  }
};
show();
// alert('呵呵'); nodejs的环境下没有window 所以alert会报错
console.log(global);