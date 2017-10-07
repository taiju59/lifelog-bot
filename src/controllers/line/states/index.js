import actions from '../actions'

export default async (bot, user, event, state) => {
  switch (state.name) {
    case 'hearReminder':
      await actions.hearReminder(bot, user, event)
      break
    case 'confirmReminder':
      await actions.confirmReminder(bot, user, event, state)
      break
    default:
      console.log(Error('Invalid arguments(state): ' + state))
  }
}
