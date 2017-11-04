import utils from '../../../libs/utils'
import services from '../../../shared/services'
import Stickers from '../../../views/Stickers'

export default async (bot, user, event, state) => {
  const reminders = await services.User.getAllReminders(user.id)
  if (utils.isEmpty(reminders)) {
    await bot.send([Stickers.notExist(), {
      type: 'text',
      text: '登録されてるタスクがないよ。'
    }])
    return
  }
  await services.User.removeState(user.id)  // 一覧表示は「状態なし」とする
  const remindersText = reminders.map((reminder, index) => {
    let text = `(${index + 1})`
    if (reminder.time) {
      const time = utils.timeStrFromUtc(reminder.time, user.timezone, 'HH:mm')
      text += ` ${time}`
    }
    text += `\n${reminder.name}`
    return text
  }).join('\n\n')
  await bot.send([Stickers.showReminder(), {
    type: 'text',
    text: `[一覧]\n\n${remindersText}`
  }, {
    type: 'text',
    text: '編集・削除する場合は対象の番号を教えてね'
  }])
}
