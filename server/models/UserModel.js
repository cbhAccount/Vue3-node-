//引入mongoose
const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  username:{
    type:String,
    required:true
},
password: {
    type: String,
    required: true
},
gender:Number,//0:女 1:男
introduction:String,
role:Number,//0:普通用户 1:管理员
avatar:String
});
const UserModel  = mongoose.model('User',UserSchema);
module.exports = UserModel;