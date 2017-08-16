const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
	name: {
		unique: true,
		type: String
	},
	password: String,
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
UserSchema.pre('save', function(next) {
	let user = this;
	if (this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now();
	} else {
		this.meta.updateAt = Date.now();
	}

	bcrypt.genSalt(10, function(err,salt) {
		if (err) return next(err);
		bcrypt.hash(user.password, salt, function(err,hash) {
			if(err) return next(err);
			user.password = hash;
			next();
		})
	})
});

// 静态方法, 直接通过model调用
UserSchema.statics = {
	fetch: function(cb) {
		return this
			.find({})
			.sort('meta.updateAt')
			.exec(cb)
	},
	findById: function(id, cb) {
		return this
			.findOne({_id: id})
			.exec(cb)
	}
}

module.exports = UserSchema;