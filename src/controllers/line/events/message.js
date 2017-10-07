import actions from '../actions'

export default async (bot, user, event) => {
  switch (event.message.type) {
    case 'text':
      await _matchText(bot, user, event)
      break
    default:
      //TODO: 例外メッセージ
  }
}

const _matchText = async (bot, user, event) => {
  switch (event.message.text) {
    case '追加':
      await actions.askReminder(bot, user, event)
      break
    default:
      //TODO: 例外メッセージ
  }
}
