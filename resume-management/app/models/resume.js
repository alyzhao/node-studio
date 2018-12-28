const mongoose = require('mongoose');
let ResumeSchema = require('../schemas/resume');
module.exports = mongoose.model('resume', ResumeSchema, 'resume')
