var express = require('express');
var ProductRouter = express.Router();


const ProductController = require('../../controllers/web/ProductController');
/* GET home page. */
ProductRouter.get(`/webapi/product/imgList`,ProductController.productList);
module.exports = ProductRouter;