//引入mongoose
const mongoose = require('mongoose');
const NewsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  category: {
    type: Number,
    required: true
  }, //1最新动态 2典型案例 3通知公告
  cover: {
    type: String,
    required: true
  },
  isPublished: {
    type: Number,
    required: true
  },
  createTime: {
    type: Date,
    required: true,
    default: Date.now
  },
  updateTime: {
    type: Date,
    required: true,
    default: Date.now
  }
});//定义新闻模型
const NewsModel = mongoose.model('News', NewsSchema);
module.exports = NewsModel;