function showIndex(req,res){
  res.end('这是首页');
  // return '这是首页';
}
function showInfo(req,res){
  res.end('这是信息页');
  // return '这是信息页';
}
function showErr(req,res){
  res.end('这是错误页面');
  // return '这是错误页面';
}
module.exports={
  showIndex:showIndex,
  showInfo:showInfo,
  showErr:showErr,
}