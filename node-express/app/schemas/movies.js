const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;


var MovieSchema = new Schema({
	doctor: String,
	title: String,
	language: String,
	country: String,
	summary: String,
	flash: String,
	poster: String,
	year: Number,
	pv: {
		type: Number,
		default: 0
	},
	category: {type: ObjectId, ref: 'Category'},	// ref是Model名
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
MovieSchema.pre('save', function(next) {
	if (this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now();
	} else {
		this.meta.updateAt = Date.now();
	}
	next(); 	// 必须调用
});

MovieSchema.pre('update', function(next) {
	console.log('update started!')
	// this.meta.updateAt = Date.now();
	next();
});



// 静态方法, 直接通过model调用
MovieSchema.statics = {
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

module.exports = MovieSchema