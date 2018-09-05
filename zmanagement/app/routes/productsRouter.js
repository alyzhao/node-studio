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
    let type = file.originalname.split('.')[1];
    cb(null, 'products' + Date.now() + '.' + type);
  }
}) 
let upload = multer({ storage: storage });


productsRouter.post('/add', SessionManage.checkSessionForUser, upload.single('uploadImg'), products.saveProductImg, products.add)

module.exports = productsRouter
