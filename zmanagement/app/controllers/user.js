const User = require('../models/user.js')
const errorHandle = require('../utils').errorHandle
const _ = require('lodash')

exports.saveLicenseImg = function (req, res, next) {
  let file = req.file;
  console.log(file)
  if (file) {
    let filename = file.filename;
    req.shopLicense = '/upload/' + filename;
  }
  next()
}

// 注册
exports.signup = function (req, res) {
  let params = req.body
  console.log('params', params)
  console.log(req.body.email)
  console.log(params.email)
  User.findOne({email: params.email}, (err, result) => {
    if (err) {
      console.log(err)
      return errorHandle(res, '添加失败, 请重试!', err)
    }

    if (result) {
      res.status(200).json({message: '邮箱已存在!'})
    } else {
      if (req.shopLicense) {
        params.shopLicense = req.shopLicense
      }
      let userDoc = new User(params)
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
        req.session.user = {
          _id: result._id,
          email: result.email,
          role: result.role,
          shopOwner: result.shopOwner,
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
    user: req.session.user
  })
}

exports.update = function (req, res) {
  let _id = req.session.user._id
  User.findOne({email: req.body.user.email, _id: {$ne: _id}}, (err, result) => {
    if (result) {
      return res.status(200).json({message: '邮箱已存在!'})
    }
    User.findById(_id, (err, user) => {
      if (err) {
        return errorHandle(res, '修改失败, 请重试!', err)
      }
      if (!user) {
        return res.status(401).send('用户不存在!')
      }
      let _user = _.assignIn(user, req.body.user)
      console.log('-----before update-----')
      console.log(_user)
      _user.save((err, result) => {
        if (err) {
          return errorHandle(res, '修改失败, 请重试!', err)
        }
        console.log('-----update------')
        console.log(result)
        req.session.user = {
          _id: result._id,
          email: result.email,
          role: result.role,
          shopOwner: result.shopOwner,
          shopName: result.shopName,
          shopPhone: result.shopPhone
        }
        res.status(200).json({message: 'success'})
      })
    })    
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

exports.list = function (req, res) {
  User.fetchUser(function(err, users) {
    if (err) {
      return errorHandle(res, '获取商家列表失败, 请重试!', err)
    }
    res.status(200).json(users)
  })
}

exports.getShopInfo = function (req, res) {
  User.findById(req.body._id, function (err, shopInfo) {
    if (!shopInfo) {
      return res.status(200).json({message: '该商户不存在!'})
    } else {
      console.log('-----shopInfo-----')
      res.status(200).json({
        message: 'success',
        shopInfo: shopInfo
      })
    }
  })
}

exports.updateShopInfo = function (req, res) {
  let params = req.body
  let _id = params._id
  User.findOne({email: params.email, _id: {$ne: _id}}, (err, result) => {
    if (result) {
      return res.status(200).json({message: '邮箱已存在!'})
    }
    User.findById(_id, (err, shopInfo) => {
      if (err) {
        return errorHandle(res, '修改失败, 请重试!', err)
      }
      if (!shopInfo) {
        return res.status(401).send('用户不存在!')
      }
      let _shopInfo = _.assignIn(shopInfo, params)
      console.log(_shopInfo)
      if (req.shopLicense) {
        _shopInfo.shopLicense = req.shopLicense
      }
      _shopInfo.save((err, result) => {
        if (err) {
          return errorHandle(res, '修改失败, 请重试!', err)
        }
        res.status(200).json({message: 'success'})
      })
    })    
  })
}

exports.batchDelete = function (req, res) {
  let _ids = req.body._ids
  User.remove({_id: { $in: _ids }}, (err, result) => {
    console.log('------batchDelete-----')
    console.log(result)
    let message = 'success'
    if (err) {
      message = '删除失败, 请重试!'
    }
    res.status(200).json({message})
  })
}