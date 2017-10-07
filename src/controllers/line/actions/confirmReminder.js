import services from '../../../shared/services'

export default async (bot, user, event, state) => {
  if (event.message.type != 'text') {
    await _except(bot)
    return
  }
  switch (event.message.text) {
    case '登録':
      await _register(bot, user, state)
      break
    case 'キャンセル':
      await _cancel(bot, user)
      break
    default:
      await _except(bot)
  }
}

const _register = async (bot, user, state) => {
  await services.User.addReminder(user.id, state.argument)
  await services.User.removeState(user.id)
  // TODO: 通知時刻設定フェーズに入る
  await bot.send([{
    type: 'text',
    text: `は〜い、「${state.argument}」で登録したよ`
  }])
}

const _cancel = async (bot, user) => {
  await services.User.removeState(user.id)
  await bot.send([{
    type: 'text',
    text: 'キャンセルしたよ'
  }])
}

const _except = async (bot) => {
  await bot.send([{
    type: 'text',
    text: '「登録」か「キャンセル」で答えてね'
  }])
}
