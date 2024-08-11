//导入UserService
const NewsService = require("../../services/web/NewsService");
var moment = require("moment"); // require
const BASEURL = require("../../config/web").BASEURL;
const NewsController = {
//获取新闻列表
newsList: async (req, res) => {
  console.log('1111',req.params.id);
  try {
const result = await NewsService.newsList(req.params.id);
console.log('2222',result);
//处理返回数据
let data = [];
result.map((item) => {
  let object = {};
  (object.id = item._id),
    (object.title = item.title),
    (object.content = item.content),
    (object.category =
      item.category === 1
        ? "最新动态"
        : item.category === 2
        ? "典型案例"
        : item.category === 3
        ? "通知公告"
        : "未知"),
    (object.cover = BASEURL + item.cover),
    (object.isPublished = item.isPublished),
    (object.updateTime = moment(item.updateTime).format(
      "YYYY/MM/DD hh:mm:ss"
    ));
  data.push(object);
  return data;
});
res.json({
  code: 200,
  data: data,
  msg: "新闻列表获取成功",
});
  } catch (error) {
    res.json({
      code: 400,
      msg: "新闻列表获取失败",
    });
  }
},
//获取图片列表
imgList: async (req, res) => {
  try {
const result = await NewsService.imgList();
//处理返回数据
result.map((item) => {
  item.cover = BASEURL + item.cover;
  return item;
});
res.json({
  code: 200,
  data: result,
  msg: "图片列表获取成功",
});
  } catch (error) {
    res.json({
      code: 400,
      msg: "图片列表获取失败",
  });
}
},
//搜索新闻
searchNews: async (req, res) => {
  try {
const result = await NewsService.searchNews(req.query.keyword);
//处理返回数据
let data = [];
result.map((item) => {
  let object = {};
  (object.id = item._id),
    (object.title = item.title),
    (object.content = item.content),
    (object.category =
      item.category === 1
        ? "最新动态"
        : item.category === 2
        ? "典型案例"
        : item.category === 3
        ? "通知公告"
        : "未知"),
    (object.cover = BASEURL + item.cover),
    (object.isPublished = item.isPublished),
    (object.updateTime = moment(item.updateTime).format(
      "YYYY/MM/DD hh:mm:ss"
    ));
  data.push(object);
  return data;
})
res.json({
  code: 200,
  data: data,
  msg: "新闻搜索成功",
});
  } catch (error) {
    res.json({
      code: 400,
      msg: "新闻搜索失败",
    });
  }
},
//获取置顶新闻
topList: async (req, res) => {
  try {
const result = await NewsService.topList(req.query.num);
//处理返回数据
let data = [];
result.map((item) => {
  let object = {};
  (object.id = item._id),
    (object.title = item.title),
    (object.content = item.content),
    (object.category =
      item.category === 1
        ? "最新动态"
        : item.category === 2
        ? "典型案例"
        : item.category === 3
        ? "通知公告"
        : "未知"),
    (object.cover = BASEURL + item.cover),
    (object.isPublished = item.isPublished),
    (object.updateTime = moment(item.updateTime).format(
      "YYYY/MM/DD hh:mm:ss"
    ));
  data.push(object);
  return data;
}
);
res.json({
  code: 200,
  data: data,
  msg: "置顶新闻获取成功",
});
  } catch (error) {
    res.json({
      code: 400,
      msg: "置顶新闻获取失败",
    });
  }
},
}
module.exports = NewsController;
