var express = require('express');
const SessionManage = require('./SessionManage')
var user = require('../controllers/user');
var userRouter = express.Router();

userRouter.post('/signup', user.signup)

userRouter.post('/signin', user.signin)

userRouter.post('/', SessionManage.checkSessionForDataRequest, user.getUserInfo)

module.exports = userRouter