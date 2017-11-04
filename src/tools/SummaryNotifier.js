import config from 'config'
import moment from 'moment-timezone'
import services from '../shared/services'
import LineBot from '../libs/bots/LineBot'
import SummaryMessages from '../views/SummaryMessages'
import Summary from './Summary'
import utils from '../libs/utils'

const NOTIFY_TIME = 10 // 10時に通知

export default class SummaryNotifier {

  static async checkOrSend() {
    const now = new Date()

    // TODO: ユーザーのプラットフォームごとに切り分け
    const bot = new LineBot(config.line.channelAccessToken)
    const users = await services.User.getAllUsers()
    for (const user of users) {
      const timeZone = 'Asia/Tokyo' // TODO: ユーザーごとにタイムゾーンを持たせる
      if (moment(now).tz(timeZone).hour() != NOTIFY_TIME) continue
      /* 対象時刻 */
      const summary = await new Summary(user.id, timeZone, now).get()
      if (utils.isEmpty(summary)) {
        continue // リマインド履歴なしなど
      }
      const messages = await SummaryMessages.create(summary)
      const lineUserId = await services.User.getLineUserId(user.id)
      await bot.send(lineUserId, messages)
    }
  }
}
