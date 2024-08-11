const NewsModel = require("../../models/NewsModel");
const NewsService = {
//获取新闻列表
newsList: async (id) => {
  //分页查询并返回总数
  return await id ? NewsModel.find({_id:id,isPublished:1}) : NewsModel.find({isPublished:1}).sort({updateTime:-1,id:-1})
},
//获取图片列表
imgList: async () => {
  return await NewsModel.find({isPublished:1},{id:1,title:1,cover:1}).sort({updateTime:-1,id:-1}).then((res)=>{
    return res;
  });
},
//搜索新闻
searchNews: async (title) => {
  return await NewsModel.find({title:{$regex:title,$options:'i'},isPublished:1}).sort({updateTime:-1,id:-1}).then((res)=>{
    return res;
  });
},
//获取置顶新闻
topList: async (num) => {
  return await NewsModel.find({isPublished:1}).sort({updateTime:-1,id:-1}).limit(num).then((res)=>{
    return res;
  });
}
}


module.exports = NewsService;