var moment = require("moment");
//引入Service
const ProductService = require("../../services/admin/ProductService");
const ProductController = {
  //添加产品
  add: async (req, res) => {
    console.log(req.body, req.file);
    //调用UserService的更新数据库方法
    const cover = req.file ? `/productuploads/${req.file.filename}` : "";
    //调用UserService的更新数据库方法
    try {
      await ProductService.add({ ...req.body, cover: cover });
      res.json({
        code: 200,
        msg: "产品添加成功",
      });
    } catch (error) {
      res.json({
        code: 400,
        msg: "产品添加失败",
      });
    }
  },
  //获取产品列表
  productList: async (req, res) => {
    try{
    const result = await ProductService.productList(
      req.query.pagenum,
      req.query.pagesize
    );
    //处理返回数据
    let data = [];
    result.list.map((item) => {
      let object = {};
      (object.id = item._id),
        (object.title = item.title),
        (object.introduction = item.introduction),
        (object.detail = item.detail),
        (object.cover = "http://localhost:3000" + item.cover),
        (object.updateTime = moment(item.updateTime).format(
          "YYYY/MM/DD hh:mm:ss"
        ));
      data.push(object);
      return data;
    });
    console.log(data);
    res.json({
      code: 200,
      msg: "获取产品列表成功",
      data: {
        total: result.total,
        list: data,
      },
    });
  }catch(error){
    res.json({
      code: 400,
      msg: "获取产品列表失败",
      data: {
        total: 0,
        list: [],
      }
    });
  }
  },
  //更新产品
  updateProduct: async (req, res) => {
    console.log(req.body, req.file);
    const cover = req.file ? `/productuploads/${req.file.filename}` : "";
    try {
      await ProductService.updateProduct({ ...req.body, cover: cover });
      res.json({
        code: 200,
        msg: "产品更新成功",
      });
    } catch (error) {
      res.json({
        code: 400,
        msg: "产品更新失败",
      });
    }
  },
  //删除产品
  deleteProduct: async (req, res) => {
    try {
      console.log(req.query);
      await ProductService.deleteProduct(req.query.id);
      res.json({
        code: 200,
        msg: "产品删除成功",
      });
    } catch (error) {
      res.json({
        code: 400,
        msg: "产品删除失败",
      });
    }
  },
  getProductImg: async (req, res) => {
    try {
      const result = await ProductService.getProductImg();
      let data = [];
      result.map((item) => {
        let object = {};
        object.id = item._id;
        object.cover = "http://localhost:3000" + item.cover;
        object.title = item.title;
        data.push(object);
        return data;
      });
      console.log(data);
      res.json({
        code: 200,
        msg: "获取产品图片成功",
        data: data,
      });
    } catch (error) {
      res.json({
        code: 400,
        msg: "获取产品图片失败",
        data: [],
      });
    }
  }
};
module.exports = ProductController 