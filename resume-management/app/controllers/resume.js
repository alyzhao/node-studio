const Resume = require('../models/resume')
const Viewer = require('../models/viewer')
const { upload, errorHandle, mailTransport } = require('../utils/')
const fs = require('fs')
const path = require('path')
const { mail } = require('../config.js')

exports.list = (req, res) => {
  let { page, size } = req.query
  console.log('size', size)
  console.log('page', page)
  Resume.fetchPaginate(page, size, (err, result) => {
    if (err) {
      return errorHandle(res, '获取面试列表失败, 请重试!', err)
    }
    console.log(result)
    Resume.countDocuments({}, (err, count) => {
      if (err) {
        return errorHandle(res, '获取面试列表失败, 请重试!', err)
      }
      let _result = result.map(item => {

        let { filename, filePath, name, phone, job, viewDate, viewerId, _id, description } = item
        console.log(_id)
        let _item = { filename, filePath, name, phone, job, _id, description }
        if (viewerId) {
          _item.viewerId = viewerId._id
          _item.rank = viewerId.rank
        }
        
        _item.viewDate = new Date(viewDate).toLocaleDateString()
        return _item
      })
      res.status(200).json({message: 'success', list: _result, count, page, size})
    })
  })
}

exports.add = (req, res) => {
  upload(req, res, err => {
    if (err) {
      return errorHandle(res, err.message, err)
    }
    let filename = req.file.filename
    let filenamePre = filename.split('.')[0]
    let info = filenamePre.split('+')

    let [ viewDate, phone, name, job ] = info
    let filePath = '/upload/' + filename

    let viewDate_real = new Date(viewDate).toLocaleString()
    console.log('viewDate_real', viewDate_real)

    let resumeDoc = new Resume({
      filename,
      filePath,
      name,
      phone,
      job,
      viewDate: new Date(viewDate_real)
    })
    resumeDoc.save((err, result) => {
      if (err) {
        console.log(err)
        return errorHandle(res, '添加简历信息失败', err)
      } else {
        res.status(200).json({message: 'success', resume: result})
      }
    })
  })
}

exports.delete = (req, res) => {
  let select = {
    _id: req.body._id
  }
  Resume.findById(req.body._id, (err, resumeInfo) => {
    if (err) {
      return errorHandle(res, '没有该简历信息', err)
    }
    console.log(resumeInfo)
    let filePath = resumeInfo.filePath
    fs.unlink(path.join('./public', filePath), err => {
      if (err) {
        console.log(err)
      }
      Resume.remove(select, (err, result) => {
        let message = 'success'
        if (err) {
          message = '没有该简历信息'
          errorHandle(res, message, err)
        } else {
          res.status(200).json({message})      
        }
      })

    })
  })
}

exports.setViewer = (req, res) => {
  let resumeId = req.body.resumeId
  let rank = req.body.rank
  console.log(rank)
  let errMessage = '转交失败'
  Viewer.fetchNext(rank, (err, viewerInfo) => {
    if (err || !viewerInfo) {
      return errorHandle(res, errMessage, err)
    }
    console.log(viewerInfo)
    let email = viewerInfo.email
    if (!email) {
      return errorHandle(res, '转交人没有邮箱', err)
    }

    Resume.findById(resumeId, (err, resumeInfo) => {
      if (err) {
        return errorHandle(res, '没有该简历信息', err)
      }

      let { name, phone, job, filePath, filename } = resumeInfo
      let viewDateFormat = resumeInfo.viewDateFormat

      let mailText = `【面试】 ${name} ${phone} ${job} ${viewDateFormat}`
      console.log(mailText)

      let options = {
        from: `<${mail.auth.user}>`,
        to: `<${email}>`,
        subject: mailText,
        text: mailText,
        html: `<h3>${mailText}</h3>`,
        attachments: [{
          filename: filename,
          path: path.join('./public', filePath)
        }]
      }

      mailTransport.sendMail(options, (err, msg) => {
        if (err) {
          return errorHandle(res, '发送邮件失败', err)
        } else {
          resumeInfo.viewerId = viewerInfo._id
          resumeInfo.save((err, result) => {
            if (err) {
              return errorHandle(res, '邮件已发送, 转交失败', err)
            }
            res.status(200).json({ message: '转交成功!' })
          })
        }
      })
      
    })

  })
}

exports.describe = (req, res) => {
  let { resumeId, description } = req.body
  Resume.updateOne({ _id: resumeId }, {$set : { description }}, (err, result) => {
    if (err) {
      console.log(err)
      return errorHandle(res, '评价失败!', err)
    }
    console.log(result)
    res.status(200).json({ message: '评价成功!' })
  })
}

// smyovfpepaonbfjg
// sktflitkcoxfbdef