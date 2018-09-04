var express = require('express');

var user = require('../controllers/user');
var userRouter = express.Router();

userRouter.post('/signup', user.signup)

userRouter.post('/signin', user.signin)

module.exports = userRouter