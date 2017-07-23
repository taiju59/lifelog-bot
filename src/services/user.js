const utils = require('../utils/utils')

const URSER_DATA_PATH = __dirname + '/../../data/users.json'

class User {

  addOrNo(userId) {
    const isExist = this._checkExist(userId)
    if (isExist) {
      return false
    }
    this._add(userId)
    return true
  }

  getAllIds() {
    const users = this._getAll()
    return users.map((value) => {
      return value.userId
    })
  }

  _getAll() {
    const json = utils.readFileSync(URSER_DATA_PATH)
    return JSON.parse(json)
  }

  _add(userId) {
    const users = this._getAll()
    users.push({
      userId: userId
    })
    const json = JSON.stringify(users)
    utils.writeFileSync(URSER_DATA_PATH, json)
  }

  _checkExist(userId) {
    const users = this._getAll()
    return users.some((value) => {
      return value.userId == userId
    })
  }
}
module.exports = new User()
