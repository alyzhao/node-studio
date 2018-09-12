var express = require('express');
var products = require('../controllers/products');
var clientRouter = express.Router();

clientRouter.get('/list', products.getShopProducts)

module.exports = clientRouter