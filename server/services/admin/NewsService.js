const NewsModel = require("../../models/NewsModel");

const NewsService = {
//添加新闻
add: async (params) => {
  console.log(params);
 const res = NewsModel.create({
    title: params.title,
    content: params.content,
    category: Number(params.category),
    cover: params.cover,
    isPublished: Number(params.isPublished),
    createTime: params.createTime,
    updateTime: Date.now(),
  }).then((res)=>{
    console.log("222",'成功了');
  }).catch((err)=>{
    console.log("111",err);
  });
  return res;
},
newsList: async (pagenum,pagesize) => {
  //分页查询并返回总数
  let result = {};
  const total = await NewsModel.countDocuments().then((res)=>{
    return res;
  });
  const list = await NewsModel.find().skip((pagenum-1)*pagesize).limit(Number(pagesize)).sort({createTime:-1,id:-1}).then((res)=>{
    return res;
  });
 result.total = total;
  result.list= list;
 return result;
},
//是否发布新闻
publish: async (params) => {
  console.log(params);
  const result = await NewsModel.updateOne({ _id: params.id }, { isPublished: params.isPublished,updateTime:Date.now() }).then((res)=>{
    return res;
  });
  return result;
},
//删除新闻
deleteNews: async (id) => {
  const result = await NewsModel.deleteOne({ _id: id }).then((res)=>{
    return res;
  });
  return result;
},
//更新新闻
updateNews: async (params) => {
  console.log(params);
  if(params.cover){
  return await NewsModel.updateOne({ _id: params.id }, { title: params.title, content: params.content, category: Number(params.category), cover: params.cover, isPublished: Number(params.isPublished),updateTime:Date.now()});
} else{
  return await NewsModel.updateOne({ _id: params.id }, { title: params.title, content: params.content, category: Number(params.category), isPublished: Number(params.isPublished),updateTime:Date.now()});
}
},
};


module.exports = NewsService;