const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var CategorySchema = new Schema({
	name: String,
	movies: [{type: ObjectId, ref: 'Movie'}],
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
CategorySchema.pre('save', function(next) {
	if (this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now();
	} else {
		this.meta.updateAt = Date.now();
	}
	next(); 	// 必须调用
});

CategorySchema.pre('update', function(next) {
	console.log('update started!')
	// this.meta.updateAt = Date.now();
	next();
});



// 静态方法, 直接通过model调用
CategorySchema.statics = {
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

module.exports = CategorySchema