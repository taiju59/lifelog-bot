const utils = require('../utils/utils')

const REMIND_DATA_PATH = __dirname + '/../../data/reminds.json'

class User {

  getList(userId) {
    const reminds = this._getAll()
    const userReminds = reminds.filter((value) => {
      return (userId == value.userId)
    })
    return (userReminds.length == 1) ? userReminds[0].list:null
  }

  _getAll() {
    const json = utils.readFileSync(REMIND_DATA_PATH)
    return JSON.parse(json)
  }
}
module.exports = new User()
