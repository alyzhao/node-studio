const express = require('express')
const resumeRouter = express.Router()
const resume = require('../controllers/resume')

resumeRouter.get('/list', resume.list)

resumeRouter.post('/add', resume.add)

resumeRouter.delete('/delete', resume.delete)

resumeRouter.post('/setViewer', resume.setViewer)

module.exports = resumeRouter