const line = require('../utils/line')
const userService = require('../services/user')
const remindService = require('../services/remind')

const TYPE_MORNING = 'morning'
const TYPE_NIGHT = 'night'

class Remind {
  ask(type) {
    switch (type) {
      case TYPE_MORNING:
        this._ask('忘れ物ない？')
        break
      case TYPE_NIGHT:
        this._ask('明日の準備はできたかな？')
        break
      default:
        console.log(Error('Invalid type'))
        return
    }
  }

  _ask(text) {
    const userIds = userService.getAllIds()
    for (const userId of userIds) {
      let sendText = text
      const list = remindService.getList(userId)
      if (list) {
        sendText += '\n==\n' + list + '\n=='
      }
      line.push(userId, [{
        type: 'text',
        text: sendText
      }])
    }
  }
}
module.exports = new Remind()