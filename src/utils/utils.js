const fs = require('fs')
const moment = require('moment-timezone')

module.exports = {
  readFileSync(filePath) {
    console.log('readFileSync')
    console.log('filePath: ' + filePath)
    const data = fs.readFileSync(filePath, 'utf-8')
    console.log('data: ' + data)
    return data
  },
  writeFileSync(filePath, data) {
    console.log('writeFileSync')
    console.log('filePath: ' + filePath)
    console.log('data: ' + data)
    fs.writeFileSync(filePath, data)
  },
  timeToString(time, format) {
    // timeはDate型でもunixタイムスタンプでも可
    moment.tz.setDefault('Asia/Tokyo')
    return moment(time).format(format)
  },
  postbackDataToObject(data) {
    const array = data.split('&')
    let object = {}
    for (const value of array) {
      const array2 = value.split('=')
      object[array2[0]] = array2[1]
    }
    return object
  }
}
