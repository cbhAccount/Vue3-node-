const ProductModel = require("../../models/ProductModel");
const ProductService = {
//获取新闻图片列表
productList: async () => {
  return await ProductModel.find({},{id:1,title:1,cover:1,introduction:1,detail:1}).sort({updateTime:-1,id:-1}).then((res)=>{
    return res;
  });
},
}


module.exports = ProductService;