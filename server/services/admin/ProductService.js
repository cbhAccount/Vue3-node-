//引入ProductModel模型
const ProductModel = require("../../models/ProductModel");
const ProductService = {
  //添加产品
  add: async (params) => {
    console.log(params);
    const res = ProductModel.create({
      title: params.title,
      introduction: params.introduction,
      detail: params.detail,
      cover: params.cover,
      createTime: params.createTime,
      updateTime: Date.now(),
    })
      .then((res) => {
        console.log("222", "成功了");
      })
      .catch((err) => {
        console.log("111", err);
      });
    return res;
  },
  //获取产品列表
  productList: async (pagenum, pagesize) => {
    const total = await ProductModel.countDocuments();
    const list = await ProductModel.find()
      .skip((pagenum - 1) * pagesize)
      .sort({ updateTime: -1, _id: -1 })
      .limit(pagesize);
    return {
      total,
      list,
    };
  },
  //更新产品
  updateProduct: async (params) => {
    if (params.cover) {
      return ProductModel.updateOne(
        { _id: params.id },
        {
          title: params.title,
          introduction: params.introduction,
          detail: params.detail,
          cover: params.cover,
          updateTime: Date.now(),
        }
      );
    } else {
      return ProductModel.updateOne(
        { _id: params.id },
        {
          title: params.title,
          introduction: params.introduction,
          detail: params.detail,
          updateTime: Date.now(),
        }
      );
    }
  },
  //删除产品
  deleteProduct: async (id) => {
    return ProductModel.deleteOne({ _id: id });
  },
  getProductImg: async () => {
    return ProductModel.find({}, { cover: 1, _id: 1, title: 1 });
  }
};
module.exports = ProductService;
