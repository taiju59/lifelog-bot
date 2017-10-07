import utils from '../../../tools/utils'
import services from '../../../shared/services'

export default async (bot, user, event, state) => {
  const reminders = await services.User.getAllReminder(user.id)
  if (utils.isEmpty(reminders)) {
    await bot.send([{
      type: 'text',
      text: '登録されてるリマインダーがないよ。'
    }])
    return
  }
  const remindersText = reminders.map((reminder, index) => {
    return `(${index + 1})\n${reminder.name}`
  }).join('\n\n')
  await bot.send([{
    type: 'text',
    text: '登録されているリマインダー一覧はこれだよ'
  }, {
    type: 'text',
    text: remindersText
  }])
}