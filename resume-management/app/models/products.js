const mongoose = require('mongoose');
let ProductsSchema = require('../schemas/products');
module.exports = mongoose.model('products', ProductsSchema, 'products')