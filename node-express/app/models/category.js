const mongoose = require('mongoose');
var CategorySchema = require('../schemas/category');
var Category = mongoose.model('Category', CategorySchema, 'category');

module.exports = Category;