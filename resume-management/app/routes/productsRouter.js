var express = require('express');
const SessionManage = require('./SessionManage')
var products = require('../controllers/products');
var productsRouter = express.Router();
const path = require('path')

const multer = require('multer');
// const upload = multer({dest: '/public/uploads/'});
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('destination: ');
    let postPath = path.join(__dirname, '../../', '/public/upload/');
    console.log(postPath);
    cb(null, postPath);
  },
  filename: function(req, file, cb) {
    console.log('filename: ');
    console.log(file);
    let type = file.originalname.split('.').reverse()[0];
    console.log(type)
    cb(null, 'products' + Date.now() + '.' + type);
  }
}) 
let upload = multer({ storage: storage });


productsRouter.post('/add', SessionManage.checkSessionForUser, upload.single('uploadImg'), products.saveProductImg, products.add)

productsRouter.get('/list', products.list)

productsRouter.get('/getProducts', SessionManage.checkSessionForAdmin, products.getProducts)

productsRouter.delete('/delete', products.delete)

productsRouter.delete('/batchDelete', products.batchDelete)

productsRouter.post('/detail', products.detail)

productsRouter.post('/update', upload.single('uploadImg'), products.saveProductImg, products.update)

module.exports = productsRouter
