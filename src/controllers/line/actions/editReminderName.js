import utils from '../../../libs/utils'
import services from '../../../shared/services'
import Stickers from '../../../views/Stickers'

export default async (bot, user, event, state) => {
  if (event.message.type != 'text') {
    await _except(bot)
    return
  }
  const reminder = await services.User.getReminder(state.argument)
  if (utils.isEmpty(reminder)) {
    await _notExist(bot, user)
    return
  }
  const newName = event.message.text
  await services.User.setReminderName(reminder.id, newName)
  await bot.send([Stickers.edited(), {
    type: 'template',
    altText: `「${reminder.name}」を「${newName}」に変更したよ`,
    template: {
      type: 'buttons',
      text: `「${reminder.name}」を「${newName}」に変更したよ`,
      actions: [{
        type: 'message',
        label: '一覧を見る',
        text: '一覧'
      }]
    }
  }])
  await services.User.removeState(user.id)
}

const _except = async (bot) => {
  await bot.send([Stickers.badMessage(), {
    type: 'text',
    text: '名前はテキストで教えてね'
  }])
}

const _notExist = async (bot, user) => {
  await services.User.removeState(user.id)
  await bot.send([Stickers.notExist(), {
    type: 'template',
    altText: 'あれ？これもうないみたいよ',
    template: {
      type: 'buttons',
      text: 'あれ？これもうないみたいよ',
      actions: [{
        type: 'message',
        label: '一覧を見る',
        text: '一覧'
      }]
    }
  }])
}
