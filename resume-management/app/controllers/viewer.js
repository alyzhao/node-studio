const Viewer = require('../models/viewer')
const errorHandle = require('../utils').errorHandle

exports.add = (req, res) => {
  let params = req.body
  let viewerDoc = new Viewer(params)
  viewerDoc.save((err, result) => {
    console.log(err)
    if (err) {
      return errorHandle(res, '添加失败, 请重试!', err)
    } else {
      res.status(200).json({message: 'success', viewer: result})
    }
  })
}

exports.list = (req, res) => {
  Viewer.fetch((err, result) => {
    if (err) {
      return errorHandle(res, '获取面试人列表失败')
    }
    res.status(200).json({message: 'success', list: result})
  })
}