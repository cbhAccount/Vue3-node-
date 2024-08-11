var express = require('express');
var NewsRouter = express.Router();

//文件上传
const multer  = require('multer')

const NewsController = require('../../controllers/web/NewsController');
/* GET home page. */
NewsRouter.get(`/webapi/news/list/`,NewsController.newsList);
NewsRouter.get(`/webapi/news/list/:id`,NewsController.newsList);
NewsRouter.get('/webapi/news/imgList',NewsController.imgList);
NewsRouter.get('/webapi/news/search',NewsController.searchNews);
NewsRouter.get('/webapi/news/toplist',NewsController.topList);
module.exports = NewsRouter;