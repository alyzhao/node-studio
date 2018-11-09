const fs = require('fs')
const path = require('path')

let result = [{
  data: 'test1'
}, {
  data: 'test2'
}, {
  data: 'test3'
}]

function writeResult () {
  fs.writeFile(path.join(__dirname, './result/data.js'), JSON.stringify(result, null, 2), err => {
    if (err) throw err
    console.log('save successed!')
  })
}

writeResult()