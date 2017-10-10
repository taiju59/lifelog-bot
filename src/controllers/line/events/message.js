import actions from '../actions'

export default async (bot, user, event) => {
  switch (event.message.type) {
    case 'text':
      await _matchText(bot, user, event)
      break
    default:
      await actions.help(bot)
  }
}

const _matchText = async (bot, user, event) => {
  // TODO: 雑談
  await actions.help(bot)
}
