import config from 'config'
import moment from 'moment-timezone'
import services from '../shared/services'
import LineBot from '../libs/bots/LineBot'
import NotificationMessages from '../views/NotificationMessages'
import AskNotificationMessages from '../views/AskNotificationMessages'

const ASK_DELAY_HOURS = 1 // 通知の1時間後に確認

export default class Notifier {

  static async checkOrSend() {
    console.log('call')
    const now = new Date()
    await _notification(now) // 通知
    await _askNotification(now) // 確認通知
  }
}

const _notification = async (now) => {
  // 対象のリマインダーを取得
  const mmt = moment(now)
  const min = mmt.format('HH:mm')
  const max = mmt.add(1, 'minutes').format('HH:mm') // addは破壊型関数のため注意
  const reminders = await services.User.getReminderFromTime(min, max)

  // 送信
  // TODO: ユーザーのプラットフォームごとに切り分け
  const bot = new LineBot(config.line.channelAccessToken)
  for (const reminder of reminders) {
    const lineUserId = await services.User.getLineUserId(reminder.userId)
    const messages = NotificationMessages.create(reminder)
    await bot.send(lineUserId, messages)
    await services.User.addRemindHistory(reminder.userId, reminder.id)
  }
}

const _askNotification = async (now) => {
  // 対象のリマインド履歴を取得
  const mmt = moment(now)
  const max = mmt.subtract(ASK_DELAY_HOURS, 'hours') // subtractは破壊型関数のため注意
  const remindHistories = await services.User.getShouldConfirmRemindHistories(max)

  // 送信
  // TODO: ユーザーのプラットフォームごとに切り分け
  const bot = new LineBot(config.line.channelAccessToken)
  for (const remindHistory of remindHistories) {
    const reminder = await services.User.getReminder(remindHistory.reminderId)
    const lineUserId = await services.User.getLineUserId(reminder.userId)
    const messages = AskNotificationMessages.create(reminder, remindHistory.id)
    await bot.send(lineUserId, messages)
    await services.User.setRemindHistoryConfirmed(remindHistory.id)
  }
}
