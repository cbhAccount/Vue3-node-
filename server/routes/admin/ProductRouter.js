const express = require('express');
const ProductRouter = express.Router();
//文件上传
const multer = require('multer');
const upload = multer({ dest: 'public/productuploads/' });
const ProductController = require('../../controllers/admin/ProductController');
/* GET home page. */
ProductRouter.post('/adminapi/product/add', upload.single('file'), ProductController.add);
ProductRouter.get('/adminapi/product/list', ProductController.productList);
ProductRouter.put('/adminapi/product/list', upload.single('file'), ProductController.updateProduct);
ProductRouter.delete('/adminapi/product/delete', ProductController.deleteProduct);
ProductRouter.get('/adminapi/product/listImg', ProductController.getProductImg);
module.exports = ProductRouter;