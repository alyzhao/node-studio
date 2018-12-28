const express = require('express')
const SessionManage = require('./SessionManage')
const resumeRouter = express.Router()
const resume = require('../controllers/resume')

const multer = require('multer')
// const upload = multer({dest: '/public/uploads/'});
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
    let type = file.originalname.split('.').reverse()[0];
    console.log(type)
    cb(null, 'products' + Date.now() + '.' + type);
  }
}) 
let upload = multer({ storage: storage });

resumeRouter.post('/list', SessionManage.checkSessionForDataRequest, resume.list)

resumeRouter.post('/add', SessionManage.checkSessionForDataRequest, resume.add)

module.exports = resumeRouter