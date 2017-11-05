import config from 'config'
import moment from 'moment-timezone'
import services from '../shared/services'
import LineBot from '../libs/bots/LineBot'
import NotificationMessages from '../views/NotificationMessages'
import AskNotificationMessages from '../views/AskNotificationMessages'

const ASK_DURATION_HOURS = 1

export default class Notifier {

  static async checkOrSend() {
    const now = new Date()
    await _notification(now) // 通知
    await _reNotification(now) // 再通知
  }
}

const _notification = async (now) => {
  // 対象のリマインダーを取得
  const mmt = moment(now)
  const min = mmt.format('HH:mm')
  const max = mmt.clone().add(1, 'minutes').format('HH:mm')
  const reminders = await services.User.getReminderFromTime(min, max)

  // 送信
  // TODO: ユーザーのプラットフォームごとに切り分け
  const bot = new LineBot(config.line.channelAccessToken)
  for (const reminder of reminders) {
    const lineUserId = await services.User.getLineUserId(reminder.userId)
    const remindHistory = await services.User.addRemindHistory(reminder.userId, reminder.id)
    const messages = NotificationMessages.create(reminder, remindHistory.id)
    await bot.send(lineUserId, messages)
    const nextRemindAt = mmt.add(ASK_DURATION_HOURS, 'hours').format()
    await services.User.setNextRemind(remindHistory.id, nextRemindAt)
  }
}

const _reNotification = async (now) => {
  // 対象のリマインド履歴を取得
  const mmt = moment(now)
  const min = mmt.format()
  const max = mmt.clone().add(1, 'minutes').format()
  const remindHistories = await services.User.getNextRemind(min, max)

  // 送信
  // TODO: ユーザーのプラットフォームごとに切り分け
  const bot = new LineBot(config.line.channelAccessToken)
  for (const remindHistory of remindHistories) {
    const reminder = await services.User.getReminder(remindHistory.reminderId)
    if (!reminder.isActive) continue // 削除済みの場合スキップ
    const lineUserId = await services.User.getLineUserId(reminder.userId)
    const messages = AskNotificationMessages.create(reminder, remindHistory.id)
    await services.User.removeNextRemind(remindHistory.id)
    await bot.send(lineUserId, messages)
  }
}
