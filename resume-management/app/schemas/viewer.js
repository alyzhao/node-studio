const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ViewerSchema = new mongoose.Schema({
  name: String,
  rank: {
    type: Number,
    default: 0
  },
  email: String
})

ViewerSchema.statics = {
  fetch: function (cb) {
    return this
      .find({})
      .sort('rank')
      .exec(cb)
  }
}

module.exports = ViewerSchema