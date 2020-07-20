function getTime(){
  var now =new Date();
  var hour=now.getHours();
  var  minute=now.getMinutes();
  var second=now.getSeconds();
  return hour+':'+minute+':'+second;
}
exports.getTime=getTime;