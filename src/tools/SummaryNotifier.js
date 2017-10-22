import config from 'config'
import moment from 'moment-timezone'
import services from '../shared/services'
import LineBot from '../libs/bots/LineBot'
import SummaryMessages from '../views/SummaryMessages'
import utils from '../libs/utils'

const notifyTime = 10 // 10時に通知

export default class SummaryNotifier {

  static async checkOrSend() {
    const mmt = moment(new Date()).tz('Asia/Tokyo') // JSTでの現在時刻 TODO: 他タイムゾーン対応
    if (mmt.hour() !== notifyTime) {
      return
    }
    // 指定時刻の場合、送信
    // TODO: ユーザーのプラットフォームごとに切り分け
    const bot = new LineBot(config.line.channelAccessToken)
    const users = await services.User.getAllUsers()
    for (const user of users) {
      const messages = await SummaryMessages.create(user.id)
      if (utils.isEmpty(messages)) {
        continue // リマインド履歴なしなど
      }
      const lineUserId = await services.User.getLineUserId(user.id)
      await bot.send(lineUserId, messages)
    }
  }
}
