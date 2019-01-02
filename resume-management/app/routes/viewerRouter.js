const express = require('express')
const viewerRouter = express.Router()
const viewer = require('../controllers/viewer')

viewerRouter.post('/add', viewer.add)

viewerRouter.get('/list', viewer.list)

module.exports = viewerRouter