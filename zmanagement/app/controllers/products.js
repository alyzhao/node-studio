const Products = require('../models/products.js')
const errorHandle = require('../utils').errorHandle

exports.saveProductImg = function (req, res, next) {
  let file = req.file;
  console.log(req.body)
  console.log(req.body.uploadImg)
  let filename = file.filename;
  if (filename) {
    req.productImg = '/upload/' + filename;
  }
  next()
}

exports.add = function (req, res) {
  console.log(req.body)
  console.log()
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
  console.log('-----products list------')
  console.log(req.session.user.role)
  if (req.session.user.role > 50) {
    Products.fetch((err, result) => {
      if (err) {
        return errorHandle(res, '获取商品列表失败, 请重试!', err)
      }
      console.log('-----products list------')
      console.log(result)
      res.status(200).json({message: 'success', list: result})
    })
  } else {
    Products.fetchByShopId(req.session.user._id, (err, result) => {
      if (err) {
        return errorHandle(res, '获取商品列表失败, 请重试!', err)
      }
      console.log('-----products list------')
      console.log(result)
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
