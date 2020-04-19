const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

let ResumeSchema = new mongoose.Schema({
  filename: {
    unique: true,
    type: String
  },
  filePath: String,
  name: String,
  phone: String,
  job: String,
  viewDate: Date,
  viewerId: {
    type: ObjectId,
    ref: 'viewer'
  },
  description: String,
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

ResumeSchema.virtual('viewDateFormat').get(function() {
  return new Date(this.viewDate).toLocaleDateString()
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
  fetchByFilename: function(filename, cb) {
    return this
      .findOne({ filename: filename })
      .exec(cb)
  },
  fetchPaginate: function (page, size, cb) {
    return this
      .find()
      .limit(parseInt(size))
      .skip((page - 1) * size)
      .sort({viewDate: -1})
      .populate('viewerId')
      .exec(cb)
  }
}

module.exports = ResumeSchema