var mongoose=require('mongoose')
var Schema=mongoose.Schema;
var userSchema=new Schema({
  username:String,
  password:String
},{
  collection:'user'
})

var url = "mongodb://localhost:27017/web"
mongoose.connect(url, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

module.exports={
  User:mongoose.model('user',userSchema)
}