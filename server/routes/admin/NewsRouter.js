var express = require('express');
var NewsRouter = express.Router();

//文件上传
const multer  = require('multer')
const upload = multer({ dest: 'public/newsuploads/' })

const NewsController = require('../../controllers/admin/NewsController');
/* GET home page. */
NewsRouter.post('/adminapi/news/add',upload.single('file'),NewsController.add);
NewsRouter.get('/adminapi/news/list',NewsController.newsList);
NewsRouter.put('/adminapi/news/publish',NewsController.publish);
NewsRouter.delete('/adminapi/news/list/:id',NewsController.deleteNews);
NewsRouter.put('/adminapi/news/update',upload.single('file'),NewsController.updateNews);
module.exports = NewsRouter;