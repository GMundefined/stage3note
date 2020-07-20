var id=1;
var name='张三';
function say(){
  console.log('你好');
}
function Stu(id,name){
  this.id=id;
  this.name=name;

}
Stu.prototype={
  say:function(){
    console.log(this.name)
  }
}
/* exports.id=id;
exports.name=name;
exports.say=say;

module.exports={
  sid:id,
  sname:name,
  say:say,
} */
module.exports = Stu;
