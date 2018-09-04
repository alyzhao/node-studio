const User = require('../models/user.js')
const errorHandle = require('../utils').errorHandle

// 注册
exports.signup = function (req, res) {
  let params = req.body.shopInfo
  console.log('params', params)
  User.findOne({email: params.email}, (err, result) => {
    if (err) {
      console.log(err)
      return errorHandle(res, '添加失败, 请重试!', err)
    }

    if (result) {
      res.status(200).json({message: '邮箱已存在!'})
    } else {
      let userDoc = new User({
        email: params.email,
        shopName: params.shopName,
        shopOwner: params.shopOwner,
        shopPhone: params.shopPhone,
        password: params.password
      })
      userDoc.save((err, result) => {
        console.log(err)
        if (err) {
          return errorHandle(res, '添加失败, 请重试!', err)
        } else {
          res.status(200).json({message: 'success', user: result})
        }
      })
    }
  })
}

exports.signin = function (req, res) {
  let params = req.body.user
  User.findOne({email: params.email}, (err, result) => {
    if (err) {
      return errorHandle(res, '登陆失败, 请重试!', err)
    }

    if (!result) {
      return res.status(200).json({message: '用户名不存在, 请联系管理员！'})
    }

    result.comparePassword(params.password, (err, isMatch) => {
      if (err) {
        return errorHandle(res, '登陆失败, 请重试!', err)
      }
      if (isMatch) {
        console.log('password is pass!');
        req.session.email = result.email;  // 设置session
        req.session.role = result.role
        req.session.user = {
          email: result.email,
          role: result.role,
          shopName: result.shopName,
          shopPhone: result.shopPhone
        }
        req.session.expiretime = 1
        // res.redirect('/')
        res.status(200).json({message: 'success', user: {email: result.email, role: result.role}})
      } else {
        res.status(200).json({message: '密码错误!'})
      }
    })

  })
}

exports.getUserInfo = function (req, res) {
  return res.status(200).json({
    role: req.session.role,
    email: req.session.email
  })
}