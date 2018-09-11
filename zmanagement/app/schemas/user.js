const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

let UserSchema = new mongoose.Schema({
  email: {
    unique: true,
    type: String
  },
  shopName: {
    type: String
  },
  // shopOwner: {
  //   type: String
  // },
  shopPhone: {
    type: String
  },
  shopAddress: {
    type: String
  },
  shopStore: {  // 门店
    type: String
  },
  shopLicense: {  // 营业执照
    type: String
  },
  shopCheckDate: {
    type: Date,
    default: Date.now()
  },
  password: String,
  // 0 normal user
  // 1 verified user
  // 2 professonal user
  // > 10 admin
  // > 50 super admin
  role: {
    type: Number,
    default: 0
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



UserSchema.methods = {
  comparePassword: function(_password, cb) {
    bcrypt.compare(_password, this.password, function(err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
    })
  }
}

// 串行中间件, 在每次调用save的方法的时候都会执行
UserSchema.pre('save', function(next) {
  let user = this;
  console.log(this.isNew)
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now();
    bcrypt.genSalt(10, function(err,salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function(err,hash) {
        if(err) return next(err);
        user.password = hash;
        next();
      })
    })
  } else {
    this.meta.updateAt = Date.now();
    next()
  }

});

// 静态方法, 直接通过model调用
UserSchema.statics = {
  fetch: function(cb) {
    return this
      .find({})
      .sort('meta.createAt')
      .exec(cb)
  },
  fetchUser: function (cb) {
    return this
      .find({role: {$lt: 10}})
      .sort('meta.createAt')
      .exec(cb)
  },
  findById: function(id, cb) {
    return this
      .findOne({_id: id})
      .exec(cb)
  }
}

module.exports = UserSchema