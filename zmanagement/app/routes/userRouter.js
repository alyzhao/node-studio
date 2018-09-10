var express = require('express');
const SessionManage = require('./SessionManage')
var user = require('../controllers/user');
var userRouter = express.Router();
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
    cb(null, 'license' + Date.now() + '.' + type);
  }
}) 
let upload = multer({ storage: storage });

userRouter.post('/signup', upload.single('uploadImg'), user.saveLicenseImg, user.signup)

userRouter.post('/signin', user.signin)

userRouter.post('/update', SessionManage.checkSessionForDataRequest, user.update)

userRouter.post('/signout', SessionManage.checkSessionForDataRequest, user.signout)

userRouter.delete('/delete', SessionManage.checkSessionForAdmin, user.delete)

userRouter.delete('/batchDelete', SessionManage.checkSessionForAdmin, user.batchDelete)

userRouter.get('/list', SessionManage.checkSessionForAdmin, user.list)

userRouter.post('/getShopInfo', SessionManage.checkSessionForAdmin, user.getShopInfo)

userRouter.post('/updateShopInfo', SessionManage.checkSessionForAdmin, upload.single('uploadImg'), user.saveLicenseImg, user.updateShopInfo)

userRouter.post('/', SessionManage.checkSessionForDataRequest, user.getUserInfo)

module.exports = userRouter