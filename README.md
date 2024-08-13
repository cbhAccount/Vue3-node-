这是一个基于前端Vue3与后端node+mongdb项目的全栈练习项目，其中web端用vue3中vite+pinia，admin端用vue3的yarn管理
注意 管理员账号不能在前端被注册，第一个管理员账户需要去启动node服务之后，去mongdb中user集合中创建第一个用户
其中用户表mongdb集合模型为
{
username:{
    type:String,
    required:true
},
password: {
    type: String,
    required: true
},
gender:Number,//0:女 1:男
introduction:String,//自我简介
role:Number,//0:普通用户 1:管理员
avatar:String//头像信息地址
}
