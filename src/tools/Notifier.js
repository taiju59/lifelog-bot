import config from 'config'
import moment from 'moment-timezone'
import services from '../shared/services'
import LineBot from '../libs/bots/LineBot'
import Stickers from '../views/Stickers'

export default class Notifier {

  static async checkOrSend() {
    console.log('call')
    // 対象のリマインダーを取得
    const mmt = moment(new Date())
    const min = mmt.format('HH:mm')
    const max = mmt.add(1, 'minutes').format('HH:mm')
    const reminders = await services.User.getReminderFromTime(min, max)

    // 送信
    // TODO: ユーザーのプラットフォームごとに切り分け
    const bot = new LineBot(config.line.channelAccessToken)
    for (const reminder of reminders) {
      const lineUserId = await services.User.getLineUserId(reminder.userId)
      const remindHistory = await services.User.addRemindHistory(reminder.userId, reminder.id)
      await bot.send(lineUserId, _createMessages(reminder, remindHistory))
    }
  }
}

const _createMessages = (reminder, remindHistory) => {
  return [{
    type: 'template',
    altText: `「${reminder.name}」の時間ですよ〜`,
    template: {
      type: 'confirm',
      text: `「${reminder.name}」の時間ですよ〜`,
      actions: [{
        type: 'postback',
        label: 'やった',
        data: `action=answerReminder&remindHistoryId=${remindHistory.id}&answer=true`,
        text: 'やった'
      }, {
        type: 'postback',
        label: 'やってない',
        data: `action=answerReminder&remindHistoryId=${remindHistory.id}&answer=false`,
        text: 'やってない'
      }]
    }
  }, Stickers.notify()]
}