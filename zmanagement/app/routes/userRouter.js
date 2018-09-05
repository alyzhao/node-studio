var express = require('express');
const SessionManage = require('./SessionManage')
var user = require('../controllers/user');
var userRouter = express.Router();

userRouter.post('/signup', user.signup)

userRouter.post('/signin', user.signin)

userRouter.post('/update', SessionManage.checkSessionForDataRequest, user.update)

userRouter.post('/signout', SessionManage.checkSessionForDataRequest, user.signout)

userRouter.delete('/delete', SessionManage.checkSessionForAdmin, user.delete)

userRouter.delete('/batchDelete', SessionManage.checkSessionForAdmin, user.batchDelete)

userRouter.get('/list', SessionManage.checkSessionForAdmin, user.list)

userRouter.post('/getShopInfo', SessionManage.checkSessionForAdmin, user.getShopInfo)

userRouter.post('/updateShopInfo', SessionManage.checkSessionForAdmin, user.updateShopInfo)

userRouter.post('/', SessionManage.checkSessionForDataRequest, user.getUserInfo)

module.exports = userRouter