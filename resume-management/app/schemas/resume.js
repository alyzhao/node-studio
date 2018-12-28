const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

let ResumeSchema = new mongoose.Schema({
  fileName: String,
  filePath: String,
  name: String,
  phone: String,
  job: String,
  viewerId: {
    type: ObjectId,
    ref: 'viewer'
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

// 静态方法, 直接通过model调用
ResumeSchema.statics = {
  fetch: function(cb) {
    return this
      .find({})
      .sort('meta.createAt')
      .exec(cb)
  },
  fetchByViewerId: function (shopId, cb) {
    return this
      .find({shopId: shopId})
      .sort('meta.createAt')
      .exec(cb)
  },
  findById: function(id, cb) {
    return this
      .findOne({_id: id})
      .exec(cb)
  },
  fetchPaginate: function (select, page, size, cb) {
    return this
      .find(select)
      .skip((page - 1) * size)
      .sort('meta.createAt')
      .exec(cb)
  }
}

module.exports = ResumeSchema