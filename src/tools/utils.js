import moment from 'moment-timezone'

export default {
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
