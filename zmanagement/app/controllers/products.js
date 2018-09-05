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
