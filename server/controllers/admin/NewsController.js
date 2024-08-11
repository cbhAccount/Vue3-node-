//导入UserService
const NewsService = require("../../services/admin/NewsService");
var moment = require("moment"); // require
const NewsController = {
  //添加新闻
  add: async (req, res) => {
    console.log(req.body, req.file);
    //调用UserService的更新数据库方法
    const cover = req.file ? `/newsuploads/${req.file.filename}` : "";
    //调用UserService的更新数据库方法
    try {
      await NewsService.add({ ...req.body, cover: cover });
      res.json({
        code: 200,
        msg: "新闻添加成功",
      });
    } catch (error) {
      res.json({
        code: 400,
        msg: "新闻添加失败",
      });
    }
  },
  newsList: async (req, res) => {
    const result = await NewsService.newsList(
      req.query.pagenum,
      req.query.pagesize
    );
    //处理返回数据
    // let map = new Map();
    // for (let item of result.list) {
    // if (!map.has(item.id)) {
    //     map.set(item.id, item);
    // };
    // };
    // const checklist = Array.from(map);
    // console.log(checklist)
    let data = [];
    result.list.map((item) => {
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
        (object.cover = "http://localhost:3000" + item.cover),
        (object.isPublished = item.isPublished),
        (object.updateTime = moment(item.updateTime).format(
          "YYYY/MM/DD hh:mm:ss"
        ));
      data.push(object);
      return data;
    });
    // console.log(data)
    res.json({
      code: 200,
      data: {
        total: result.total,
        data: data,
      },
    });
  },
  //是否发布新闻
  publish: async (req, res) => {
    console.log(req.body);
    const result = await NewsService.publish({
      isPublished: Number(req.body.isPublish),
      id: req.body.id,
    });
    res.json({
      code: 200,
      msg: "新闻发布成功",
    });
  },
  //删除新闻
  deleteNews: async (req, res) => {
    console.log(req.params.id);
    const result = await NewsService.deleteNews(req.params.id);
    res.json({
      code: 200,
      msg: "新闻删除成功",
    });
  },
  //更新新闻
  updateNews: async (req, res) => {
    console.log(req.body, req.file);
    const cover = req.file
      ? `/newsuploads/${req.file.filename}`
      : req.body.cover.split("3000")[1];
    //调用UserService的更新数据库方法
    try {
      await NewsService.updateNews({ ...req.body, cover: cover });
      res.json({
        code: 200,
        msg: "新闻更新成功",
      });
    } catch (error) {
      console.log(error);
      res.json({
        code: 400,
        msg: "新闻更新失败",
      });
    }
  },
};
module.exports = NewsController;
