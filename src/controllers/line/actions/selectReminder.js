import services from '../../../shared/services'
import Stickers from '../../../views/Stickers'

export default async (bot, user, event) => {
  if (event.message.type != 'text' || !event.message.text.match(/[0-9]+/)) {
    await _except(bot)
    return
  }
  const reminders = await services.User.getAllReminders(user.id)
  const reminderNum = event.message.text.match(/[0-9]+/)[0]
  const selectedReminder = reminders[reminderNum - 1]
  if (!selectedReminder) {
    // 該当リマインダーなし
    await _notExist(bot, reminderNum)
    return
  }
  await services.User.setState(user.id, 'editReminder', selectedReminder.id)
  await _edit(bot, selectedReminder)
}

const _except = async (bot) => {
  await bot.send([Stickers.badMessage(), {
    type: 'text',
    text: 'タスクの番号を数字で送ってね'
  }])
}

const _notExist = async (bot, num) => {
  await bot.send([Stickers.notExist(), {
    type: 'text',
    text: `${num}？そんなもの、ウチにはないよ`
  }])
}

const _edit = async (bot, reminder) => {
  await bot.send([{
    type: 'template',
    altText: `「${reminder.name}」をどうする？`,
    template: {
      type: 'buttons',
      text: `「${reminder.name}」をどうする？`,
      actions: [{
        type: 'datetimepicker',
        label: '時刻を編集',
        mode: 'time',
        data: `action=setRemindTime&reminderId=${reminder.id}`
      }, {
        type: 'message',
        label: '名前を編集',
        text: '名前を編集'
      }, {
        type: 'message',
        label: '削除',
        text: '削除'
      }]
    }
  }])
}
