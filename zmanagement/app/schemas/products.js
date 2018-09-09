const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;


let ProductsSchema = new mongoose.Schema({
  productName: String,
  productImg: String,
  productNumber: String,
  productBrand: String,
  productModel: String,   // 型号
  productMarketDate: {
    type: Date
  },
  productMaterial: String,    // 材质
  productWeight: {
    type: Number,
    default: 0
  },
  identification: String,   // 鉴定标识
  productDetails: String,     // 详情
  originalPrice: Number,      // 原价
  currentPrice: Number,     // 现价
  shopId: {
    type: ObjectId,
    ref: 'user'
  },
  shopName: {
    type: String,
    ref: 'user'
  },
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
})

// 串行中间件, 在每次调用save的方法的时候都会执行
ProductsSchema.pre('save', function(next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now();
  } else {
    this.meta.updateAt = Date.now();
  }
  next();   // 必须调用
});


// 静态方法, 直接通过model调用
ProductsSchema.statics = {
  fetch: function(cb) {
    return this
      .find({})
      .sort('meta.createAt')
      .exec(cb)
  },
  fetchByShopId: function (shopId, cb) {
    return this
      .find({shopId: shopId})
      .sort('meta.createAt')
      .exec(cb)
  },
  findById: function(id, cb) {
    return this
      .findOne({_id: id})
      .exec(cb)
  }
}

module.exports = ProductsSchema