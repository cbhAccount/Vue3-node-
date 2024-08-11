var express = require('express');
var UserRouter = express.Router();

//文件上传
const multer  = require('multer')
const upload = multer({ dest: 'public/avataruploads/' })

const UserController = require('../../controllers/admin/UserController');
/* GET home page. */
UserRouter.post('/adminapi/user/login',UserController.login);
UserRouter.post('/adminapi/user/upload',upload.single('file'),UserController.upload);
UserRouter.post('/adminapi/user/add',upload.single('file'),UserController.add);
UserRouter.get('/adminapi/user/list',UserController.userList);
UserRouter.delete('/adminapi/user/list/:id',UserController.deleteUser);
UserRouter.put('/adminapi/user/update',upload.single('file'),UserController.updateUser);
module.exports = UserRouter;
