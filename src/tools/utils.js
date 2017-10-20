import moment from 'moment-timezone'

export default {
  isEmpty(value) {
    return value == undefined || value == null || value.length == 0
  },
  jstToUtc(time, format) {
    const timeArray = time.split(' ')[0].split(':')
    const timeObject = {
      hour: timeArray[0],
      minute: timeArray[1]
    }
    return moment.tz(timeObject, 'Asia/Tokyo').utc().format(format)
  },
  utcToJst(time, format) {
    const timeArray = time.split(' ')[0].split(':')
    const timeObject = {
      hour: timeArray[0],
      minute: timeArray[1]
    }
    return moment(timeObject).tz('Asia/Tokyo').format(format)
  },
  postbackDataToObject(data) {
    const array = data.split('&')
    let object = {}
    for (const value of array) {
      const array2 = value.split('=')
      object[array2[0]] = array2[1]
    }
    return object
  },
  random(array) {
    return array[Math.floor(Math.random() * array.length)]
  }
}
