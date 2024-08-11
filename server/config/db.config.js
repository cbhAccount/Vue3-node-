const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Vue3_node');
//数据库连接成功回调函数
mongoose.connection.on('connected',()=>{
    console.log('数据库连接成功');
})