//导入UserService
const ProductService = require("../../services/web/ProductService");
var moment = require("moment"); // require
const BASEURL = require("../../config/web").BASEURL;
const ProductController = {
//获取产品图片列表
productList: async (req, res) => {
  try {
const result = await ProductService.productList();
//处理返回数据
result.map((item) => {
  item.cover = BASEURL + item.cover;
  return item;
});
console.log('2222',result);
res.json({
  code: 200,
  data: result,
  msg: "产品图片列表获取成功",
});
  } catch (error) {
    res.json({
      code: 400,
      msg: "产品图片列表获取失败",
    });
  }
}
}
module.exports = ProductController;