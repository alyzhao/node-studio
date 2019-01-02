const path = require('path')
const Resume = require('../models/resume')
const multer = require('multer')
const nodemailer = require('nodemailer')
const { mail } = require('../config')

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('destination: ');
    let postPath = path.join(__dirname, '../../', '/public/upload/');
    console.log(postPath);
    cb(null, postPath);
  },
  filename: function(req, file, cb) {
    console.log('filename: ');
    console.log(file);
    // let type = file.originalname.split('.').reverse()[0];
    cb(null, file.originalname);
  }
})

let fileFilter = function(req, file, cb) {
  let filename = file.originalname
  let filenamePre = filename.split('.')[0]
  let info = filenamePre.split('+')

  if (info.length !== 4) {
    return cb(new Error(`文件名不合法, 请用'+'链接`), false)
  } else {
    Resume.fetchByFilename(filename, (err, result) => {
      console.log(result)
      if (err) {
        cb(err, false)
      } else if (result) {
        cb(new Error('文件已存在或文件名重复'), false)
      } else {
        cb(null, true)
      }
    })
  }
}

exports.mailTransport = nodemailer.createTransport({
    host: mail.host,
    auth: mail.auth,
    secureConnection: true, // use SSL
})

exports.upload = multer({ storage, fileFilter }).single('resume')

exports.errorHandle = function (res, message, err) {
  return res.status(500).json({message, err})
}
