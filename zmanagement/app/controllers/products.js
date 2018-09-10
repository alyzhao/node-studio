const Products = require('../models/products.js')
const errorHandle = require('../utils').errorHandle
const _ = require('lodash')

exports.saveProductImg = function (req, res, next) {
  let file = req.file;
  console.log(file)
  if (file) {
    let filename = file.filename;
    req.productImg = '/upload/' + filename;
  }
  next()
}

exports.add = function (req, res) {
  console.log(req.body)
  let product = {
    productName: req.body.productName
  }
  if (req.productImg) {
    product.productImg = req.productImg
  }

  product.shopId = req.session.user._id
  product.shopName = req.session.user.shopName

  let productDoc = new Products(product)

  productDoc.save((err, result) => {
    if (err) {
      return errorHandle(res, '添加商品失败, 请重试!', err)
    } else {
      res.status(200).json({message: 'success', product: result})
    }
  })
}

exports.list = function (req, res) {
  if (req.session.user.role > 50) {
    Products.fetch((err, result) => {
      if (err) {
        return errorHandle(res, '获取商品列表失败, 请重试!', err)
      }
      res.status(200).json({message: 'success', list: result})
    })
  } else {
    Products.fetchByShopId(req.session.user._id, (err, result) => {
      if (err) {
        return errorHandle(res, '获取商品列表失败, 请重试!', err)
      }
      res.status(200).json({message: 'success', list: result})
    })
  }
}

exports.delete = function (req, res) {
  let select = {
    _id: req.body._id
  }
  if (req.session.role < 10) {
    select.shopId = req.session.user._id
  }
  Products.remove(select, (err, result) => {
    let message = 'success'
    if (err) {
      message = '删除失败, 请重试!'
    }
    res.status(200).json({message})
  })

}

exports.batchDelete = function (req, res) {
  let select = {
    _id: { $in: req.body._ids }
  }
  if (req.session.role < 10) {
    select.shopId = req.session.user._id
  }
  let _ids = req.body._ids
  Products.remove(select, (err, result) => {
    console.log('------batchDelete-----')
    console.log(result)
    let message = 'success'
    if (err) {
      message = '删除失败, 请重试!'
    }
    res.status(200).json({message})
  })
}

exports.detail = function (req, res) {
  Products.findById(req.body._id, (err, productInfo) => {
    if (!productInfo) {
      return res.status(200).json({message: '该商品不存在!'})
    } else {
      console.log('-----productInfo-----')
      res.status(200).json({
        message: 'success',
        productInfo: productInfo
      })
    }
  })
}

exports.update = function (req, res) {
  let select = {
    _id: req.body._id
  }
  if (req.session.role < 10) {
    select.shopId = req.session.user._id
  }
  Products.findOne(select, (err, result) => {
    if (err) {
      return errorHandle(res, '修改失败, 请重试!', err)
    }
    if (!result) {
      return res.status(401).send('该商品不存在!')
    }
    console.log(req.body)
    let _product = _.assignIn(result, {
      productName: req.body.productName,
      productImg: req.productImg || req.body.productImg
    })

    _product.save((err, result) => {
      console.log('-----update products-----')
      console.log(result)
      if (err) {
        return errorHandle(res, '修改失败, 请重试!', err)
      }
      res.status(200).json({message: 'success'})
    })
  })
}