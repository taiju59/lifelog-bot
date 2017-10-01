import actions from '../actions'

export default async (bot, user, event) => {
  switch (event.message.type) {
    case 'text':
      await actions.echo(bot, user, event)
      break
    default:
      //TODO: 例外メッセージ
  }
}
