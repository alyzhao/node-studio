const mongoose = require('mongoose');
let ViewerSchema = require('../schemas/viewer');
module.exports = mongoose.model('viewer', ViewerSchema, 'viewer')
