const line = require('../utils/line')
const userService = require('../services/user')

class Remind {
  askMorning() {
    this._ask('忘れ物ない？')
  }

  askNight() {
    this._ask('明日の準備はできたかな？')
  }

  _ask(text) {
    const userIds = userService.getAllIds()
    for (const userId of userIds) {
      line.push(userId, [{
        type: 'text',
        text: text
      }])
    }
  }
}
module.exports = new Remind()