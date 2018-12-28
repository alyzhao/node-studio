const Resume = require('../models/resume')
const errorHandle = require('../utils').errorHandle

exports.saveResume = (req, res, next) => {
  let file = req.file;
  console.log(file)
  if (file) {
    let filename = file.filename;
    req.shopLicense = '/upload/' + filename;
  }
  next()
}

exports.list = (req, res) => {
  
}

exports.add = (req, res) => {

}