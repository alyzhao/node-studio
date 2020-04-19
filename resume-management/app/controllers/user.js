const User = require('../models/user.js')
const errorHandle = require('../utils').errorHandle
const _ = require('lodash')

// 注册
exports.signup = function (req, res) {
  let params = req.body
  User.findOne({name: params.name}, (err, result) => {
    if (err) {
      console.log(err)
      return errorHandle(res, '添加失败, 请重试!', err)
    }

    if (result) {
      res.status(200).json({message: '账户已存在!'})
    } else {
      if (req.shopLicense) {
        params.shopLicense = req.shopLicense
      }
      let userDoc = new User(params)
      userDoc.isNew = true
      console.log('-----signup-----')
      console.log(userDoc)
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

// 登录
exports.signin = function (req, res) {
  let params = req.body.user
  User.findOne({name: params.name}, (err, result) => {
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
        req.session.user = result
        req.session.expiretime = 1
        // res.redirect('/')
        res.status(200).json({message: 'success', user: {name: result.name, role: result.role}})
      } else {
        res.status(200).json({message: '密码错误!'})
      }
    })

  })
}

exports.getUserInfo = function (req, res) {
  return res.status(200).json({
    user: req.session.user
  })
}

exports.signout = function (req, res) {
  if (req.session.user) {
    delete req.session.user
  }

  req.session.destroy()
  res.status(200).json({message: 'success'})
}

exports.delete = function (req, res) {
  let _id = req.body._id
  console.log('delete user _id: ' + _id)
  User.remove({_id: _id}, (err, result) => {
    let message = 'success'
    if (err) {
      message = '删除失败, 请重试!'
    }
    res.status(200).json({message})
  })
}
