import config from 'config'
import moment from 'moment-timezone'
import services from '../shared/services'
import LineBot from '../libs/bots/LineBot'

export default class Notifier {

  constructor(date) {
    this.date = date
  }

  async checkOrSend() {
    // 対象のリマインダーを取得
    const mmt = moment(this.date)
    const min = mmt.format('HH:mm')
    const max = mmt.add(1, 'minutes').format('HH:mm')
    const reminders = await services.User.getReminderFromTime(min, max)

    // 送信
    const bot = new LineBot(config.line.channelAccessToken)
    for (const reminder of reminders) {
      const lineUserId = await services.User.getLineUserId(reminder.userId)
      await bot.send(lineUserId, [{
        type: 'text',
        text: `「${reminder.name}」の時間ですよ〜`
      }])
    }
  }
}
