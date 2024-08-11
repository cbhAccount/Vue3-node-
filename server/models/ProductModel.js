//导入mongoose
const mongoose = require('mongoose');
//创建ProductModel
const ProductScheam = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  introduction: {
    type: String,
    required: true
  },
  detail: {
    type: String,
    required: true
  }, //1最新动态 2典型案例 3通知公告
  cover: {
    type: String,
    required: true
  },
  createTime: {
    type: Date,
    default: Date.now
  },
  updateTime : {
    type: Date,
    default: Date.now
  }
});
const ProductModel = mongoose.model('Product', ProductScheam);
module.exports = ProductModel;