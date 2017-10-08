import utils from '../../../tools/utils'
import services from '../../../shared/services'
import Stickers from '../../../views/Stickers'

export default async (bot, user, event, state) => {
  if (event.message.type != 'text') {
    await _except(bot)
    return
  }
  switch (event.message.text) {
    case '名前を編集':
      await _editName(bot, user, state)
      break
    case '削除':
      await _delete(bot, user, state)
      break
    default:
      await _except(bot)
  }
}

const _editName = async (bot, user, state) => {
  const reminder = await services.User.getReminder(state.argument)
  if (utils.isEmpty(reminder)) {
    await _notExist(bot, user)
    return
  }
  await services.User.setState(user.id, 'editReminderName', state.argument)
  await bot.send([{
    type: 'text',
    text: 'なんて名前に変更するの？'
  }])
}

const _delete = async (bot, user, state) => {
  const reminder = await services.User.getReminder(state.argument)
  if (utils.isEmpty(reminder)) {
    await _notExist(bot, user)
    return
  }
  await services.User.removeReminder(state.argument)
  await bot.send([Stickers.edited(), {
    type: 'template',
    altText: `「${reminder.name}」を削除したよ`,
    template: {
      type: 'buttons',
      text: `「${reminder.name}」を削除したよ`,
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
    type: 'template',
    altText: 'え、なに？他のも見る？',
    template: {
      type: 'buttons',
      text: 'え、なに？他のも見る？',
      actions: [{
        type: 'message',
        label: '一覧を見る',
        text: '一覧'
      }]
    }
  }])
}

const _notExist = async (bot, user) => {
  await services.User.removeState(user.id)
  await bot.send([Stickers.notExist(), {
    type: 'template',
    altText: 'あれ？それもうないみたいよ',
    template: {
      type: 'buttons',
      text: 'あれ？それもうないみたいよ',
      actions: [{
        type: 'message',
        label: '一覧を見る',
        text: '一覧'
      }]
    }
  }])
}
