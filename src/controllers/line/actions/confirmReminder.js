import services from '../../../shared/services'
import Stickers from '../../../views/Stickers'

export default async (bot, user, event, state) => {
  if (event.message.type != 'text') {
    await _except(bot)
    return
  }
  switch (event.message.text) {
    case '登録':
      await _register(bot, user, state)
      break
    default:
      await _except(bot)
  }
}

const _register = async (bot, user, state) => {
  const reminder = await services.User.addReminder(user.id, state.argument)
  await services.User.removeState(user.id)
  await bot.send([Stickers.registered(), {
    type: 'text',
    text: `は〜い、「${reminder.name}」で登録したよ`
  }, {
    type: 'template',
    altText: 'で、どうする？',
    template: {
      type: 'buttons',
      text: 'で、どうする？',
      actions: [{
        type: 'datetimepicker',
        label: '時刻を設定',
        mode: 'time',
        data: `action=setRemindTime&reminderId=${reminder.id}`
      }, {
        type: 'message',
        label: 'さらに追加',
        text: '追加'
      }, {
        type: 'message',
        label: '一覧を見る',
        text: '一覧'
      }]
    }
  }])
}

const _except = async (bot) => {
  await bot.send([Stickers.badMessage(), {
    type: 'text',
    text: '「登録」か「キャンセル」で答えてね'
  }])
}
